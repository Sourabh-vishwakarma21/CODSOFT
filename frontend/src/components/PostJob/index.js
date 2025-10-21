import React, { useState } from "react";
// import { postJob } from "../../api/api"; // ensure this function exists
import { postJob } from '../api/api';

import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    salary: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.company) {
      alert("Title and Company are required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await postJob(form);
      setMessage("✅ Job posted successfully!");
      setForm({
        title: "",
        company: "",
        location: "",
        category: "",
        salary: "",
        description: "",
      });

      setTimeout(() => navigate("/jobs"), 1500);
    } catch (err) {
      console.error("Error posting job:", err);
      alert("❌ Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: 24,
        maxWidth: 640,
        margin: "40px auto",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        color: "white",
        background: "linear-gradient(180deg, #3f0071, #000)",
        borderRadius: 10,
      }}
    >
      <h2 style={{ textAlign: "center" }}>Post a Job</h2>

      <input
        name="title"
        placeholder="Job Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />
      <input
        name="salary"
        placeholder="Salary (₹)"
        value={form.salary}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        rows={5}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: 12,
          background: "skyblue",
          border: "none",
          color: "#000",
          fontWeight: "bold",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {loading ? "Posting..." : "Submit"}
      </button>

      {message && (
        <p style={{ textAlign: "center", marginTop: 10, color: "lime" }}>
          {message}
        </p>
      )}
    </form>
  );
}
