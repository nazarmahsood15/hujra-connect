import type { Vouch } from "@/types";

const NODE_COLORS: Record<string, string> = {
  Elder: "#A63A2E",
  Imam: "#0F4C4C",
  "Senior Worker": "#17706B",
};

function initials(name: string) {
  return name.split(" ").map((s) => s[0]).slice(0, 2).join("");
}

export function VouchChain({ vouches, workerName }: { vouches: Vouch[]; workerName: string }) {
  const nodes = [...vouches, { role: workerName, name: workerName } as Vouch];

  return (
    <div className="flex items-center">
      {nodes.map((n, i) => (
        <div key={i} className={`flex items-center ${i < nodes.length - 1 ? "flex-1" : ""}`}>
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-app-card"
              style={{ background: NODE_COLORS[n.role] ?? "#E8A23D", boxShadow: "0 0 0 2px var(--brass)" }}
              title={n.name}
            >
              {initials(n.name)}
            </div>
            <span className="text-[10px] text-app-inkSoft w-16 text-center leading-tight">
              {i === nodes.length - 1 ? "This worker" : n.role}
            </span>
          </div>
          {i < nodes.length - 1 && <div className="vouch-line" />}
        </div>
      ))}
    </div>
  );
}
