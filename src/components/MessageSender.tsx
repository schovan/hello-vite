import { useMessageStore } from "../store/useMessageStore";

export function MessageSender() {
  const setMessage = useMessageStore((s) => s.setMessage);

  return (
    <div>
      <h3 className="mb-3 text-lg text-[#4fc3f7]">Sender</h3>
      <input
        className="w-full rounded border border-[#333] bg-[#1a1a2e] px-3 py-2 text-white outline-none focus:border-[#0f9d58]"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message…"
      />
    </div>
  );
}
