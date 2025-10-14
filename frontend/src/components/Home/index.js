// import React from "react";
// import { Link } from "react-router-dom";

// function Home() {
//   return (
//     <div>
//       <h1>Welcome to Job Board</h1>
//       <nav>
//         <Link to="/jobs">View Jobs</Link> | 
//         <Link to="/post-job">Post a Job</Link>
//       </nav>
//     </div>
//   );
// }

// export default Home;


// import React from "react";
// import "./Home.css";

// export default function Home() {
//   return (
//     <div className="home-root">
//       <header className="hb-topbar">
//         <div className="hb-logo">Job Board</div>
//         <nav className="hb-nav">
//           <a href="/">Home</a>
//           <a href="/jobs">Browse Jobs</a>
//           <a href="/can">Browse Jobs</a>

//           <a href="/postjob" className="post-btn">Post A Job</a>
//         </nav>
//       </header>

//       <section className="hb-hero">
//         <div className="hb-hero-left">
//           {/* <h1>Find your Dream Job so</h1>
//           <p>We provide latest job openings tailored to your needs.</p> */}
//            <h1>Your ideal job awaits, start the search</h1> 
//            <p> Get latest job opening that best suits you</p>
//           <div className="hb-cta-row">
//             <button className="primary">Upload Your Resume</button>
//             <a className="secondary" href="/jobs">Browse Jobs</a>
//           </div>
//         </div>

//         {/* <div className="hb-hero-right">
//           placeholder illustration box (replace with image if you have one)
//           <div className="illustration">[ Illustration ]</div>
//         </div> */}
//       </section>

//       <section className="hb-search">
//         <input placeholder="Keyword (eg. Frontend Developer)" />
//         <input placeholder="Location (eg. Remote / City)" />
//         <select>
//           <option value="">All Categories</option>
//           <option>Engineering</option>
//           <option>Design</option>
//           <option>Product</option>
//         </select>
//         <button className="primary">Find Jobs</button>
//       </section>

//       <footer className="hb-footer">
//         <p>© {new Date().getFullYear()} Job Board — built with ❤️</p>
//       </footer>
//     </div>
//   );
// }


// @@ orgiginal code strt@@

// import React from "react";
// import "./Home.css";

// export default function Home() {
//   return (
//     <div className="home-root">
//       <header className="hb-topbar">
//         <div className="hb-logo">Job Board </div>
//         <nav className="hb-nav">
//           <a href="/">Home</a>
//           <a href="/jobs">Browse Jobs</a>
//           <a href="/candidate-dashboard">Candidate </a>
//           <a href="/employer-dashboard">Employer</a>
//           <a href="/login">Login</a>
//           <a href="/register">Register</a>
//         </nav>
//         <a href="/postjob" className="post-btn">Post A Job</a>
//         <button className="primary">Upload Your Resume</button>


//       </header>

//       <section className="hb-hero">
//         <div className="hb-hero-left">
//           <h1>Your ideal job awaits, start the search</h1>
//           <p>Get the latest job openings that best suit you</p>
//           </div>
//           {/* <div className="hb-cta-row">
//             <a className="secondary" href="/jobs">Browse Jobs</a>
//           </div> */}
       
//       </section>

//       <section className="hb-search">
//         <input placeholder="Keyword (e.g.Frontend Developer)" />
//         <input placeholder="Location (e.g.Remote / City)" />
//         <select>
//           <option value="">All Categories</option>
//           <option>Engineering</option>
//           <option>Design</option>
//           <option>Product</option>
//           <option>Others</option>

//         </select>
//         <button className="primary">Find Jobs</button>
//       </section>

//       <footer className="hb-footer">
//         <p>© {new Date().getFullYear()} Job Board — built with ❤️</p>
//       </footer>
//     </div>
//   );
// }


// @@ orgiginal code ove
import React, { useState } from "react";
import "./Home.css";

export default function Home() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    setUploading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Resume uploaded successfully!");
        setUploadedFileUrl(data.fileUrl);
      } else {
        alert(data.message || "Upload failed!");
      }
    } catch (error) {
      alert("Error uploading resume!");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="home-root">
      {/* HEADER */}
      <header className="hb-topbar">
        <div className="hb-logo">Job Board</div>
        <nav className="hb-nav">
          <a href="/">Home</a>
          <a href="/jobs">Browse Jobs</a>
          <a href="/candidate-dashboard">Candidate</a>
          <a href="/employer-dashboard">Employer</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>

        {/* Buttons */}
        <a href="/postjob" className="post-btn">Post A Job</a>

        {/* Upload Resume Button */}
        <label className="primary upload-btn">
          {uploading ? "Uploading..." : "Upload Your Resume "}
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            style={{ display: "none" }}
            onChange={handleFileChange}
            onClick={(e) => (e.target.value = null)}
          />
        </label>
        {file && !uploading && (
          <button onClick={handleUpload} className="primary" style={{ marginLeft: "10px" }}>
            Submit
          </button>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="hb-hero">
        <div className="hb-hero-left">
          <h1>Your ideal job awaits, start the search</h1>
          <p>Get the latest job openings that best suit you</p>
        </div>
        {/* <div className="hb-cta-row">
          <a className="secondary" href="/jobs">Browse Jobs</a>
        </div> */}
      </section>

      {/* SEARCH SECTION */}
      <section className="hb-search">
        <input placeholder="Keyword (e.g.Frontend Developer)" />
        <input placeholder="Location (e.g.Remote / City)" />
        <select>
          <option>All Categories</option>
          <option>Engineering</option>
          <option>Design</option>
          <option>Marketing</option>
          <option>Others</option>
        </select>
        <button className="primary">Find Jobs</button>
      </section>

      {/* UPLOADED RESUME PREVIEW */}
      {uploadedFileUrl && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>✅ Uploaded Resume:</p>
          <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">
            {uploadedFileUrl}
          </a>
        </div>
      )}
      {/* FOOTER */}
      <footer className="hb-footer">
        <p>
          © {new Date().getFullYear()} Job Board — built with ❤️
        </p>
      </footer>
    </div>
  );
}

