import { draftMode } from "next/headers";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { client } from "../../../../../sanityClient";
import { editorialPath } from "@/lib/editorial-path";

export async function GET(request: Request) {
  const headers = { "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer" };
  if (!new URL(request.url).searchParams.has("sanity-preview-secret"))
    return new Response("Open preview from Studio.", { status: 401, headers });
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token)
    return new Response("Draft preview needs a Viewer token in this environment.", {
      status: 503,
      headers,
    });
  const { isValid, redirectTo } = await validatePreviewUrl(
    client.withConfig({ token, useCdn: false }),
    request.url
  );
  if (!isValid)
    return new Response("Preview link expired. Open a new preview from Studio.", {
      status: 401,
      headers,
    });
  (await draftMode()).enable();
  return new Response(null, {
    status: 303,
    headers: { ...headers, Location: editorialPath(redirectTo) },
  });
}
