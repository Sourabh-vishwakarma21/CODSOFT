// import React, { useEffect, useState } from "react";
// import { getJobs, deleteJob } from "../api/api";
// export default function Jobs() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchJobs = () => {
//     setLoading(true);
//     getJobs()
//       .then((res) => {
//         setJobs(res.data || []);
//       })
//       .catch((err) => {
//         console.error("Error fetching jobs:", err);
//       })
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const handleDelete = (id) => {
//     if (!window.confirm("Delete this job?")) return;
//     deleteJob(id)
//       .then(() => fetchJobs())
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <h1>Available Jobs</h1>
//       {loading ? <p>Loading…</p> : null}
//       {!loading && jobs.length === 0 ? <p>No jobs yet.</p> : null}
//       <ul>
//         {jobs.map((j) => (
//           <li key={j._id} style={{ marginBottom: 12 }}>
//             <strong>{j.title}</strong> — {j.company}
//             <button style={{ marginLeft: 12 }} onClick={() => handleDelete(j._id)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// @@@2
import React, { useEffect, useState } from "react";
// import { getJobs, deleteJob } from "../../api/api";
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
