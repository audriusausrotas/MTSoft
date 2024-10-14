import { processJob } from "~/utils/montavimasHelper";
import { Job } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const { date, comment, selectedJobs, worker } = await readBody(event);

  if (comment.trim() === "" && selectedJobs.length === 0) {
    const existingSchedule = await scheduleSchema.findOneAndDelete({
      date,
      worker,
    });
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

  const workerFound = await userSchema.findById(worker._id);
  if (!workerFound)
    return {
      success: false,
      data: null,
      message: "Darbuotojas nerastas",
    };

  if (workerFound.accountType !== "Gamyba") {
    selectedJobs.forEach(async (job: Job) => {
      await processJob(job._id.toString(), worker.lastName);
    });
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
    const newSchedule = new scheduleSchema({
      date,
      comment,
      jobs: selectedJobs,
      worker,
    });

    const data = await newSchedule.save();

    return {
      success: true,
      data: data,
      message: "Išsaugota",
    };
  }
});
