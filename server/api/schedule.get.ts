import { Schedule } from "~/data/interfaces";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  let _id;
  const token = getCookie(event, "mtud");
  if (token) {
    jwt.verify(token, config.tokenSecret as string, (err: any, user: any) => {
      if (!err && user.verified) {
        _id = user.id;
      }
    });
  }

  const user = await userSchema.findById(_id);

  if (!user)
    return {
      success: false,
      data: null,
      message: "Klaidingas varotojas",
    };

  let schedule: Schedule[] = [];
  if (user.accountType === "Administratorius" || user.accountType === "Gamyba") {
    schedule = await scheduleSchema.find();
  } else if (user.accountType === "Montavimas") {
    schedule = await scheduleSchema.find({ "worker.lastName": user.lastName });
  }

  if (schedule.length === 0)
    return {
      success: false,
      data: null,
      message: "Grafikas nerastas",
    };

  return {
    success: true,
    data: schedule,
    message: "",
  };
});
