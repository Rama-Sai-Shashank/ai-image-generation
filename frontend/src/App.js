import React, { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError("");
    setImage(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      // If backend returns any error (credits over / HF issue / etc.)
      if (!res.ok) {
        setError(
          "Something went wrong while generating.\n" +
            "Possible reason: your free monthly AI credits on Hugging Face may be finished.\n" +
            "Try again after your credits reset next month or update the API key."
        );
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (!data.image_base64) {
        setError(
          "No image received from AI.\n" +
            "This can also happen if your free monthly credits are over.\n" +
            "Try a simpler prompt or wait for credits to reset."
        );
        setLoading(false);
        return;
      }

      setImage("data:image/png;base64," + data.image_base64);
    } catch (err) {
      console.error(err);
      setError(
        "Network / server error while contacting the AI.\n" +
          "If everything looks fine, your free monthly AI credits might be finished.\n" +
          "Try again later or next month."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!image) return;

    const link = document.createElement("a");
    link.href = image;
    link.download = `ai-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-root">
      <div className="glow-bg" />

      <div className="app-card">
        <header className="app-header">
          <h1>NovaVision</h1>
          <p>Mini AI Image Generator • FastAPI + React</p>
        </header>

        <section className="prompt-section">
          <label className="prompt-label">
            Describe the image you want to create
          </label>

          <div className="prompt-row">
            <textarea
              rows="3"
              placeholder="e.g. futuristic city at sunset in pastel colors"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="actions-row">
            <button
              className={`primary-btn ${loading ? "btn-loading" : ""}`}
              onClick={generateImage}
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <span className="spinner" />
              ) : (
                <span className="btn-dot" />
              )}
              {loading ? "Generating…" : "Generate Image"}
            </button>
          </div>

          {error && (
            <div className="error-banner">
              {error.split("\n").map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          )}
        </section>

        <section className="output-section">
          {!image && !loading && (
            <div className="empty-state">
              <div className="empty-orbit">
                <div className="orbit-dot" />
              </div>
              <p>Generated image will appear here.</p>
              <span>Use detailed, imaginative prompts ✨</span>
            </div>
          )}

          {image && (
            <div className="image-card">
              <img src={image} alt="Generated" />
              <div className="image-actions">
                <button className="ghost-btn" onClick={downloadImage}>
                  ⬇ Download PNG
                </button>
                <button
                  className="ghost-btn secondary"
                  onClick={() => setImage(null)}
                >
                  ✨ New Image
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
