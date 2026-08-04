export type ComparisonRow = {
  label: string;
  detail: string;
  nutrascan: boolean;
  myfitnesspal: boolean;
  cronometer: boolean;
  loseit: boolean;
};

const COMPETITORS = ["NutraScan", "MyFitnessPal", "Cronometer", "Lose It!"] as const;

function Mark({ yes }: { yes: boolean }) {
  return (
    <span
      className={`inline-block font-mono text-sm transition-transform duration-200 group-hover/row:scale-125 ${
        yes ? "text-[#2E6B82]" : "text-[#5B6670]/50"
      }`}
      aria-label={yes ? "Oui" : "Non"}
    >
      {yes ? "✓" : "✕"}
    </span>
  );
}

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-[#14181C]/10">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr>
            <th className="w-[38%] px-5 py-4 text-sm font-medium text-[#5B6670]" />
            {COMPETITORS.map((name) => (
              <th
                key={name}
                className={`px-4 py-4 text-sm font-semibold ${
                  name === "NutraScan" ? "bg-[#EAF3F6] text-[#2E6B82]" : "text-[#14181C]"
                }`}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={`group/row transition-colors duration-200 hover:bg-[#EAF3F6]/50 ${
                i % 2 === 0 ? "" : "bg-[#F8F9FB]"
              }`}
            >
              <th scope="row" className="px-5 py-4 align-top font-medium text-[#14181C]">
                {row.label}
                <p className="mt-1 text-xs font-normal leading-relaxed text-[#5B6670]">{row.detail}</p>
              </th>
              <td className="bg-[#EAF3F6] px-4 py-4 text-center">
                <Mark yes={row.nutrascan} />
              </td>
              <td className="px-4 py-4 text-center">
                <Mark yes={row.myfitnesspal} />
              </td>
              <td className="px-4 py-4 text-center">
                <Mark yes={row.cronometer} />
              </td>
              <td className="px-4 py-4 text-center">
                <Mark yes={row.loseit} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
