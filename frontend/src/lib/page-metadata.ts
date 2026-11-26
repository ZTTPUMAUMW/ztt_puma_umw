import { buildPageMetadata } from "./seo";
import { getSharedContent } from "./cms-shared-loader";
export async function websiteMetadata(options: Parameters<typeof buildPageMetadata>[0]) {
  const { socialImage } = await getSharedContent("shell", options.locale);
  return buildPageMetadata({ ...options, socialImage });
}
