export default defineEventHandler(async (event) => {
  const { date, comment, selectedJobs, worker } = await readBody(event);

  if (comment.trim() === "" && selectedJobs.length === 0) {
    const existingSchedule = await scheduleSchema.findOneAndDelete({ date, worker });
    if (existingSchedule) {
      return {
        success: true,
        message: "Išsaugota",
      };
    } else {
      return {
        success: false,
        message: "Klaida saugant",
      };
    }
  }

  const existingSchedule = await scheduleSchema.findOne({ date, worker });
  if (existingSchedule) {
    existingSchedule.comment = comment;
    existingSchedule.jobs = selectedJobs;
    const data = await existingSchedule.save();
    return {
      success: true,
      data: data,
      message: "",
    };
  } else {
    const newSchedule = new scheduleSchema({ date, comment, jobs: selectedJobs, worker });
    const data = await newSchedule.save();

    return {
      success: true,
      data: data,
      message: "Išsaugota",
    };
  }
});
