export default defineEventHandler(async (event) => {
  const {
    accountType,
    project,
    schedule,
    production,
    installation,
    gate,
    admin,
  } = await readBody(event);

  let doesExist = await userRightsSchema.findOne({ accountType });
  if (doesExist) {
    doesExist.project = project;
    doesExist.schedule = schedule;
    doesExist.production = production;
    doesExist.installation = installation;
    doesExist.gate = gate;
    doesExist.admin = admin;
  } else {
    doesExist = new userRightsSchema({
      accountType,
      project,
      schedule,
      production,
      installation,
      gate,
      admin,
    });
  }

  const data = await doesExist.save();
  return {
    success: true,
    data,
    message: "Išsaugota",
  };
});
