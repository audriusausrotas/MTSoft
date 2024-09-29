import jwt from "jsonwebtoken";

export default defineEventHandler(async (event: any) => {
  if (
    event.node.req.url.includes("auth") ||
    event.node.req.url.includes("userChanges") ||
    event.node.req.url.includes("profile") ||
    event.node.req.url.includes("mail")
  ) {
    const body = await readBody(event);
    const token = getCookie(event, "mtud");

    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (!err && user.verified) {
          body._id = user.id;
        }
      });
    }
  }
});
