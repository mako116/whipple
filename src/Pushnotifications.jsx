import { useState } from "react";

export default function PushNotifications() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

      setTitle("");
      setBody("");
      setMessage("Notification sent successfully!");
    } catch (error) {
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
