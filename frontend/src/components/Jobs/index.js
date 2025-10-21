import React, { useEffect, useState } from "react";
import { getJobs, deleteJob } from '../api/api';

// import "./Jobs.css";
import './Jobs.css';


export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Jobs Fetch Function
  const fetchJobs = () => {
    setLoading(true);
    getJobs()
      .then((res) => {
        setJobs(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
      })
      .finally(() => setLoading(false));
  };

  // Delete Job
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    deleteJob(id)
      .then(() => fetchJobs())
      .catch((err) => console.error("Error deleting job:", err));
  };

  // Fetch on Mount
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="jobs-container">
      <h1>Browse Latest Jobs</h1>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="jobs-list">
          {jobs.map((job, index) => (
            <div key={index} className="job-card">
              <h2>{job.title}</h2>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Category:</strong> {job.category}</p>
              <p><strong>Salary:</strong> {job.salary}</p>

              <div className="actions">
                <button>Apply Now</button>
                <button className="delete" onClick={() => handleDelete(job._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
