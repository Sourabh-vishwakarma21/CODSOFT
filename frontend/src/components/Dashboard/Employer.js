import React, { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../api/api";

export default function Employer() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch jobs from backend
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

  // Delete job
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJob(id)
        .then(() => {
          alert("Job deleted successfully!");
          fetchJobs(); // refresh list
        })
        .catch((err) => console.error("Error deleting job:", err));
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Employer Dashboard</h2>
      {loading ? <p>Loading jobs...</p> : null}

      {!loading && jobs.length === 0 && <p>No jobs posted yet.</p>}

      <ul>
        {jobs.map((job) => (
          <li key={job._id} style={{ marginBottom: 12 }}>
            <strong>{job.title}</strong> — {job.company}
            <button
              onClick={() => handleDelete(job._id)}
              style={{
                marginLeft: 12,
                background: "red",
                color: "white",
                border: "none",
                padding: "4px 10px",
                borderRadius: 4,
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
