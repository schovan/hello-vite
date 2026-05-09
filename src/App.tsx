import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverCount, setServerCount] = useState<number | null>(null);
  const [greeting, setGreeting] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const debugPlaceholder = true;

  const fetchHello = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hello`);
      const data = await res.json();
      setServerMessage(data.message);
    } catch {
      setServerMessage("Failed to reach server");
    } finally {
      setLoading(false);
    }
  };

  const fetchCount = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/count`);
      const data = await res.json();
      setServerCount(data.count);
    } catch {
      setServerCount(-1);
    } finally {
      setLoading(false);
    }
  };

  const postGreet = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/greet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      setGreeting(data.greeting ?? data.error);
    } catch {
      setGreeting("Failed to reach server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Hello Vite!</h1>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>

      <div className="card">
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          Client count is {count}
        </button>
        <button type="button" onClick={fetchHello} disabled={loading}>
          Greet the server
        </button>
        <button type="button" onClick={fetchCount} disabled={loading}>
          Get server count
        </button>
      </div>

      <div className="card">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="button" onClick={postGreet} disabled={loading || !name.trim()}>
          Send greeting
        </button>
      </div>

      {serverMessage && (
        <div className="response">
          <strong>Server says:</strong> {serverMessage}
        </div>
      )}
      {serverCount !== null && (
        <div className="response">
          <strong>Server count:</strong> {serverCount}
        </div>
      )}
      {greeting && (
        <div className="response">
          <strong>Greeting:</strong> {greeting}
        </div>
      )}
    </div>
  );
}

export default App;
