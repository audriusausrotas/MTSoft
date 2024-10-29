import jwt from "jsonwebtoken";

export default defineEventHandler(async (event: any) => {
  const url = event.node.req.url;
  const config = useRuntimeConfig();

  if (
    url.includes("auth") ||
    url.includes("userChanges") ||
    url.includes("profile") ||
    url.includes("mail") ||
    url.includes("gamybaFence") ||
    url.includes("gamybaMeasure") ||
    url.includes("bindings")
  ) {
    const body = await readBody(event);
    const token = getCookie(event, "mtud");

    if (token) {
      jwt.verify(token, config.tokenSecret as string, (err: any, user: any) => {
        if (!err && user.verified) {
          body.userId = user.id;
        }
      });
    }
  }
});
