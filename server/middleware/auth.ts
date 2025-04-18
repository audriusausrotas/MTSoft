// import jwt from "jsonwebtoken";

// export default defineEventHandler(async (event: any) => {
//   const url = event.node.req.url;
//   const config = useRuntimeConfig();

//   if (
//     url.includes("auth") ||
//     url.includes("userChanges") ||
//     url.includes("profile") ||
//     url.includes("mail") ||
//     url.includes("gamybaFence") ||
//     url.includes("gamybaMeasure") ||
//     url.includes("bindings")
//   ) {
//     const body = await readBody(event);
//     const token = getCookie(event, "mtud");

//     if (token) {
//       jwt.verify(token, config.tokenSecret as string, (err: any, user: any) => {
//         if (!err && user.verified) {
//           body.userId = user.id;
//         }
//       });
//     }
//   }
// });

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
    const contentType = getRequestHeader(event, "content-type");
    const token = getCookie(event, "mtud");

    if (token) {
      try {
        const user: any = await new Promise((resolve, reject) => {
          jwt.verify(token, config.tokenSecret as string, (err: any, decoded: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(decoded);
            }
          });
        });

        if (user && user.verified) {
          // console.log("User verified:", user.id);

          if (contentType?.includes("multipart/form-data")) {
            event.context.userId = user.id;
            // console.log("Added userId to event.context:", event.context.userId);
          } else {
            const body = await readBody(event);
            if (body && typeof body === "object") {
              body.userId = user.id;
              // console.log("Added userId to body:", body.userId);
            }
          }
        } else {
          console.error("User not verified");
        }
      } catch (error) {
        console.error("JWT verification failed:", error);
      }
    } else {
      console.error("No token provided");
    }
  }
});
