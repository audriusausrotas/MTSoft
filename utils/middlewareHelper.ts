import type { UserRights } from "~/data/interfaces";

export default function middlewareHelper(userRights: UserRights) {
  if (userRights.project) return "/";
  else if (userRights.gate) return "/vartai";
  else if (userRights.orders) return "/uzsakymai";
  else if (userRights.schedule) return "/grafikas";
  else if (userRights.production) return "/gamyba";
  else if (userRights.installation) return "/montavimas";
  else return "/login";
}
