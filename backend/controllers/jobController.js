import Job from "../models/Job.js";

// Create Job
export const createJob = async (req, res) => {
  try {
    const { title, description, company, location } = req.body;
    const newJob = new Job({ title, description, company, location });
    await newJob.save();
    res.status(201).json({ message: "Job posted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating job", error: err.message });
  }
};

// Get All Jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs", error: err.message });
  }
};
