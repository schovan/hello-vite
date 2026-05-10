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
    <div className="mx-auto max-w-[600px] px-4 py-16">
      <h1 className="mb-8 text-center text-4xl">Hello World</h1>

      <section className="mb-6 rounded-lg border border-[#333] bg-[#16213e] p-6">
        <h2 className="mb-4 text-xl text-[#0f9d58]">Client Counter</h2>
        <p className="mb-4 text-center text-5xl font-bold text-white">{clientCount}</p>
        <button className="mr-2 cursor-pointer rounded bg-[#0f9d58] px-5 py-2.5 text-base text-white hover:bg-[#0b8045] disabled:cursor-not-allowed disabled:opacity-50" onClick={() => setClientCount((c) => c + 1)}>Increment</button>
        <button className="cursor-pointer rounded bg-[#0f9d58] px-5 py-2.5 text-base text-white hover:bg-[#0b8045] disabled:cursor-not-allowed disabled:opacity-50" onClick={() => setClientCount(0)}>Reset</button>
      </section>

      <section className="mb-6 rounded-lg border border-[#333] bg-[#16213e] p-6">
        <h2 className="mb-4 text-xl text-[#0f9d58]">Server Counter (Persistent)</h2>
        <p className="mb-4 text-center text-5xl font-bold text-white">{serverCount !== null ? serverCount : "…"}</p>
        <button className="cursor-pointer rounded bg-[#0f9d58] px-5 py-2.5 text-base text-white hover:bg-[#0b8045] disabled:cursor-not-allowed disabled:opacity-50" onClick={handleServerIncrement}>
          Increment
        </button>
      </section>
    </div>
  );
}
