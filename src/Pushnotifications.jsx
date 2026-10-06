import { useState } from "react";

export default function PushNotifications() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f6f8",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    resize: "none",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  message: {
    marginBottom: "16px",
    fontSize: "14px",
    textAlign: "center",
    color: "#16a34a",
  },
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      setMessage("Please fill in both fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch( `${import.meta.env.VITE_BASE_URL}/api/send-push-notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });
      

      if (!res.ok) {
        throw new Error("Failed to send notification");
      }
      const data = await res.json();
      

      setTitle("");
      setBody("");
      setMessage(data.message);
    } catch (error) {
      console.log(error)
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.heading}>Send Push Notification</h2>

        {message && <p style={styles.message}>{message}</p>}

        <label style={styles.label}>Title</label>
        <input
          type="text"
          placeholder="Notification title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Body</label>
        <textarea
          placeholder="Notification message"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          style={styles.textarea}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </form>
    </div>
  );
}
