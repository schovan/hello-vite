import { useState } from "react";

export default function App() {
  const [clientCount, setClientCount] = useState(0);
  const [serverCount, setServerCount] = useState<number | null>(null);

  const apiUrl = "__TAURI_INTERNALS__" in window
    ? "https://hello.schovan.workers.dev/api/counter"
    : "/api/counter";

  const handleServerIncrement = async () => {
    const response = await fetch(apiUrl);
    const data: { value: number } = await response.json();
    setServerCount(data.value);
  };

  return (
    <div className="app">
      <h1>Hello World</h1>

      <section className="counter-section">
        <h2>Client Counter</h2>
        <p className="counter-value">{clientCount}</p>
        <button onClick={() => setClientCount((c) => c + 1)}>Increment</button>
        <button onClick={() => setClientCount(0)}>Reset</button>
      </section>

      <section className="counter-section">
        <h2>Server Counter (Persistent)</h2>
        <p className="counter-value">{serverCount !== null ? serverCount : "…"}</p>
        <button onClick={handleServerIncrement}>
          Increment
        </button>
      </section>
    </div>
  );
}
