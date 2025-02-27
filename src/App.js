import logo from "./logo.svg";
import "./App.css";
import AICenter from "./AICenter";
import { useState } from "react";

function App() {
  const [postId, setPostId] = useState(1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "20px", // Increase the gap for better spacing
        padding: "20px", // Add padding to the whole container
        backgroundColor: "#f0f4f8", // Light background color for the container
        height: "100vh", // Fill the full height of the viewport
        alignItems: "center", // Vertically center the content
      }}
    >
      <div
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "12px", // Rounded corners
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for elevation
          textAlign: "center",
          fontSize: "18px",
          color: "#333",
          maxWidth: "400px", // Limit the width of the left section
        }}
      >
        <h2 style={{ marginBottom: "10px", fontWeight: "bold" }}>React Code</h2>
        <p>This section contains React code and content.</p>
        <input
          value={postId}
          type="number"
          onChange={(e) => setPostId(e.target.value)}
        />
      </div>

      <div
        style={{
          flex: 2, // Take more space for the second column
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ marginBottom: "15px", fontWeight: "bold" }}>
          Component from Next.js ID: {postId}
        </h2>
        <div
          style={{
            backgroundColor: "#f9fafb", // Light background for embedded component
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          <AICenter id={postId} />
        </div>
      </div>
    </div>
  );
}

export default App;
