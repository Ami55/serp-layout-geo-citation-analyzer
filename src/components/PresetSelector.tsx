import React from "react";
import { PRESETS } from "../presets";
import { Award, ShoppingCart, Info, Activity } from "lucide-react";

interface PresetSelectorProps {
  currentPresetId: string;
  onSelectPreset: (id: string) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  currentPresetId,
  onSelectPreset,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6" id="preset-selector">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase font-mono">
            Benchmark Analysis Presets
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyze complex search segments loaded instantly without API consumption.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
          {Object.values(PRESETS).map((p) => {
            const isSelected = currentPresetId === p.id;
            return (
              <button
                key={p.id}
                id={`preset-btn-${p.id}`}
                onClick={() => onSelectPreset(p.id)}
                className={`flex items-start gap-4 p-3 rounded-lg text-left transition-all duration-200 border text-white ${
                  isSelected
                    ? "bg-indigo-950/40 border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.15)]"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                }`}
              >
                <div
                  className={`p-2 rounded-md ${
                    isSelected ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {p.intent === "commercial" && <ShoppingCart className="h-4 w-4" />}
                  {p.intent === "informational" && <Info className="h-4 w-4" />}
                  {p.intent === "ymyl_medical" && <Activity className="h-4 w-4" />}
                </div>
                <div>
                  <div className="font-medium text-xs text-slate-100 line-clamp-1">
                    "{p.query}"
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wide font-mono">
                    {p.intent === "ymyl_medical" ? "Medical YMYL" : p.intent}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
