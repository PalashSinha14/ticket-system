import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [description, setDescription] = useState("");
  const [tickets, setTickets] = useState([]);
  const [suggestion, setSuggestion] = useState(null);

  const API = "http://localhost:8000/api";

  const fetchTickets = async () => {
    const res = await axios.get(`${API}/tickets/`);
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleClassify = async () => {
    const res = await axios.post(`${API}/tickets/classify/`, {
      description,
    });
    setSuggestion(res.data);
  };

  const handleSubmit = async () => {
    await axios.post(`${API}/tickets/`, {
      title: description,
      description,
      category: suggestion?.suggested_category || "general",
      priority: suggestion?.suggested_priority || "medium",
    });

    setDescription("");
    setSuggestion(null);
    fetchTickets();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Support Ticket System</h2>

      <textarea
        placeholder="Describe your issue..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={handleClassify}>Classify</button>

      {suggestion && (
        <div>
          <p>Category: {suggestion.suggested_category}</p>
          <p>Priority: {suggestion.suggested_priority}</p>
        </div>
      )}

      <button onClick={handleSubmit}>Submit Ticket</button>

      <h3>Tickets</h3>
      <ul>
        {tickets.map((t) => (
          <li key={t.id}>
            {t.title} - {t.category} - {t.priority}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
*/
