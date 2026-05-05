"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Hero from "@/components/Hero";
import { useInView } from "@/hooks/useInView";
import styles from "@/styles/contact.module.scss";

type ContactIconType = "address" | "phone" | "email";

function ContactInfoIcon({ type }: { type: ContactIconType }) {
  if (type === "address") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path
          d="M12 22s7-5.8 7-12a7 7 0 1 0-14 0c0 6.2 7 12 7 12Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path
          d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.7.7 2.5a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6.1 6.1l1.6-1.4a2 2 0 0 1 2.1-.4c.8.3 1.6.6 2.5.7A2 2 0 0 1 22 16.9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const params = useParams();
  const locale = params.locale as string;
  const { ref: addressRef, inView: addressInView } = useInView();
  const { ref: phoneRef, inView: phoneInView } = useInView();
  const { ref: emailRef, inView: emailInView } = useInView();

  return (
    <>
      <Hero title={t("hero.title")} subtitle={t("hero.subtitle")} />
      <section className={styles["contact__main-section"]}>
        <div className={styles["container-content"]}>
          <div className={styles["contact__main-grid"]}>
            {}
            <div className={styles["contact__info-column"]}>
              {}
              <div
                ref={addressRef}
                className={`${styles["contact__box"]} animate-on-scroll${addressInView ? " in-view" : ""}`}
              >
                <div className={styles["contact__box-icon"]}>
                  <ContactInfoIcon type="address" />
                </div>
                <h3 className={styles["contact__box-title"]}>{t("address.title")}</h3>
                <p className={styles["contact__box-line"]}>
                  <strong>{t("address.department")}</strong>
                </p>
                <p className={styles["contact__box-line"]}>
                  <strong>{t("address.lab")}</strong>
                </p>
                <p className={styles["contact__box-line"]}>
                  <strong>{t("address.faculty")}</strong>
                </p>
                <p className={styles["contact__box-line"]}>
                  <strong>{t("address.university")}</strong>
                </p>

                <p className={styles["contact__box-line"]}>{t("address.street")}</p>
                <p
                  className={`${styles["contact__box-line"]} ${styles["contact__box-line-light"]}`}
                >
                  {t("address.floor")}
                </p>
              </div>

              {}
              <div
                ref={phoneRef}
                className={`${styles["contact__box"]} animate-on-scroll${phoneInView ? " in-view" : ""}`}
                style={{ transitionDelay: "80ms" }}
              >
                <div className={styles["contact__box-icon"]}>
                  <ContactInfoIcon type="phone" />
                </div>
                <h3 className={styles["contact__box-title"]}>{t("phone.title")}</h3>
                <p className={styles["contact__box-line"]}>
                  <a href="tel:+48717840471" className={styles["contact__box-link"]}>
                    (71) 78-40-471
                  </a>
                </p>
              </div>

              {}
              <div
                ref={emailRef}
                className={`${styles["contact__box"]} animate-on-scroll${emailInView ? " in-view" : ""}`}
                style={{ transitionDelay: "160ms" }}
              >
                <div className={styles["contact__box-icon"]}>
                  <ContactInfoIcon type="email" />
                </div>
                <h3 className={styles["contact__box-title"]}>{t("email.title")}</h3>
                <p className={styles["contact__box-line"]}>
                  <a href="mailto:WF-30@umw.edu.pl" className={styles["contact__box-link"]}>
                    WF-30@umw.edu.pl
                  </a>
                </p>
              </div>
            </div>

            {}
            <div className={styles["contact__map-box"]}>
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2505.8614883926043!2d17.039864776756954!3d51.09288197171915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fc2113f3c68c3%3A0x8a3f0f6f8f8f8f8f!2sBorowska%20211%2C%2050-556%20Wroc%C5%82aw!5e0!3m2!1s${locale}!2s${locale}!4v1234567890123!5m2!1s${locale}!2s${locale}`}
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("mapTitle")}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
