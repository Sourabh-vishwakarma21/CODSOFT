
// @@@
import axios from "axios";

// ✅ Axios instance setup
const API = axios.create({
  baseURL: "http://localhost:5000/api", // direct backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Get all jobs
export const getJobs = async () => {
  const response = await API.get("/jobs");
  return response.data;
};

// ✅ Get single job by ID
export const getJob = async (id) => {
  const response = await API.get(`/jobs/${id}`);
  return response.data;
};

// ✅ Post new job
export const postJob = async (data) => {
  const response = await API.post("/jobs", data);
  return response.data;
};

// ✅ Delete job by ID
export const deleteJob = async (id) => {
  const response = await API.delete(`/jobs/${id}`);
  return response.data;
};

export default API;
