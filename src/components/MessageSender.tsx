import { useState } from "react";
import { useMessageStore } from "../store/useMessageStore";

export function MessageSender() {
  const [draft, setDraft] = useState("");
  const setMessage = useMessageStore((s) => s.setMessage);

  const send = () => {
    setMessage(draft);
    setDraft("");
  };

  return (
    <div>
      <h3 className="mb-3 text-lg text-[#4fc3f7]">Sender</h3>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border border-[#333] bg-[#1a1a2e] px-3 py-2 text-white outline-none focus:border-[#0f9d58]"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message…"
        />
        <button
          className="cursor-pointer rounded bg-[#0f9d58] px-5 py-2 text-white hover:bg-[#0b8045]"
          onClick={send}
        >
          Send
        </button>
      </div>
    </div>
  );
}
