import { useMessageStore } from "../store/useMessageStore";

export function MessageDisplay() {
  const message = useMessageStore((s) => s.message);

  return (
    <div>
      <h3 className="mb-3 text-lg text-[#4fc3f7]">Reader</h3>
      <p className="text-center text-2xl font-bold text-white">
        {message || <span className="text-[#666]">No message yet</span>}
      </p>
    </div>
  );
}
