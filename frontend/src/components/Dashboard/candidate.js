import React, { useEffect, useState } from "react";
import { getJobs } from "../api/api";

export default function Candidate() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);

  // Fetch all jobs from backend
  const fetchJobs = () => {
    setLoading(true);
    getJobs()
      .then((res) => {
        if (res && res.data) {
          if (Array.isArray(res.data.jobs)) {
            setJobs(res.data.jobs);
          } else if (Array.isArray(res.data)) {
            setJobs(res.data);
          } else {
            setJobs([]);
          }
        } else {
          setJobs([]);
        }
        

      })
      .catch((err) => console.error("Error fetching jobs:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle resume upload
  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
    alert("Resume uploaded successfully!");
  };

  // Handle job apply
  const handleApply = (jobTitle) => {
    if (!resume) {
      alert("Please upload your resume before applying!");
      return;
    }
    alert(`Applied successfully for ${jobTitle}!`);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Candidate Dashboard</h2>

      <div style={{ marginBottom: 20 }}>
        <label>
          <strong>Upload Resume:</strong>{" "}
          <input type="file" onChange={handleResumeUpload} />
        </label>
      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div>
          {jobs.length === 0 ? (
            <p>No jobs available at the moment.</p>
          ) : (
            <ul>
              {jobs.map((job) => (
                <li key={job._id} style={{ marginBottom: 12 }}>
                  <strong>{job.title}</strong> — {job.company}
                  <button
                    onClick={() => handleApply(job.title)}
                    style={{
                      marginLeft: 12,
                      background: "green",
                      color: "white",
                      border: "none",
                      padding: "4px 10px",
                      borderRadius: 4,
                    }}
                  >
                    Apply
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
