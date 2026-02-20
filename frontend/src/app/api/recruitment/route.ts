import { NextRequest, NextResponse } from "next/server";
import { emailTransporter } from "@/lib/email";
import { verifyRecaptcha } from "@/lib/recaptcha";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const csrfToken = formData.get("csrf_token") as string;
    if (!csrfToken || csrfToken.length < 10) {
      return NextResponse.json({ error: "Invalid request" }, { status: 403 });
    }

    const formTimestamp = formData.get("form_timestamp") as string;
    if (formTimestamp) {
      const timeSpent = Date.now() - parseInt(formTimestamp);
      if (timeSpent < 3000) {
        return NextResponse.json({ error: "Form submitted too quickly" }, { status: 429 });
      }
      if (timeSpent > 900000) {
        return NextResponse.json({ error: "Form session expired" }, { status: 400 });
      }
    }

    const recaptchaToken = formData.get("recaptcha_token") as string;
    if (!recaptchaToken) {
      return NextResponse.json({ error: "reCAPTCHA token missing" }, { status: 400 });
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: recaptchaResult.error || "reCAPTCHA verification failed" },
        { status: 403 }
      );
    }

    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!firstName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Wszystkie wymagane pola muszą być wypełnione" },
        { status: 400 }
      );
    }

    const fullName = lastName ? `${firstName} ${lastName}` : firstName;

    const attachments: { filename: string; content: Buffer }[] = [];
    const files = formData.getAll("attachments") as File[];

    for (const file of files) {
      if (file && file.size > 0) {
        const buffer = await file.arrayBuffer();
        attachments.push({
          filename: file.name,
          content: Buffer.from(buffer),
        });
      }
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Rekrutacja: ${subject}`,
      text: `
Nadawca: ${fullName}
Email: ${email}
Temat: ${subject}

Wiadomość:
${message}

${attachments.length > 0 ? `Liczba załączników: ${attachments.length}` : "Brak załączników"}
      `,
      html: `
        <h2>Nowe zgłoszenie rekrutacyjne</h2>
        <p><strong>Nadawca:</strong> ${fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Temat:</strong> ${subject}</p>
        <h3>Wiadomość:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
        ${attachments.length > 0 ? `<p><strong>Liczba załączników:</strong> ${attachments.length}</p>` : "<p><em>Brak załączników</em></p>"}
      `,
      attachments,
    };

    await emailTransporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Zgłoszenie zostało wysłane pomyślnie" }, { status: 200 });
  } catch (error) {
    console.error("Błąd wysyłania zgłoszenia:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas wysyłania zgłoszenia" },
      { status: 500 }
    );
  }
}
