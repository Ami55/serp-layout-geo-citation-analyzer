import React, { useState } from "react";
import {
  HelpCircle,
  Sparkles,
  Layers,
  FileEdit,
  Eye,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

interface QuickGuideBarProps {
  onOpenFullGuide: () => void;
  onSelectGoal: (tab: "serp" | "nlp" | "geo") => void;
  currentTab: "serp" | "nlp" | "geo";
}

export const QuickGuideBar: React.FC<QuickGuideBarProps> = ({
  onOpenFullGuide,
  onSelectGoal,
  currentTab,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm"
      id="quick-guide-bar"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
              How To Use This App &amp; Quick Goals
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Select what you want to achieve today, or open the complete guidelines.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="open-full-guide-btn"
            onClick={onOpenFullGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Guidelines &amp; Playbook</span>
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
            title={isCollapsed ? "Expand Quick Goals" : "Collapse Quick Goals"}
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* QUICK GOAL BUTTONS */}
      {!isCollapsed && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Goal 1 */}
          <button
            id="goal-win-citations"
            onClick={() => onSelectGoal("geo")}
            className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 group ${
              currentTab === "geo"
                ? "bg-indigo-950/30 border-indigo-500 text-indigo-200"
                : "bg-slate-950/60 border-slate-850 hover:border-slate-700 text-slate-300"
            }`}
          >
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 group-hover:bg-indigo-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold flex items-center justify-between">
                <span>1. Win AI Citations (GEO)</span>
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                Copy high-density atomic sentences that AI answer bots prefer to quote.
              </p>
            </div>
          </button>

          {/* Goal 2 */}
          <button
            id="goal-entity-gaps"
            onClick={() => onSelectGoal("nlp")}
            className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 group ${
              currentTab === "nlp"
                ? "bg-emerald-950/30 border-emerald-500 text-emerald-200"
                : "bg-slate-950/60 border-slate-850 hover:border-slate-700 text-slate-300"
            }`}
          >
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 group-hover:bg-emerald-500/20">
              <Layers className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold flex items-center justify-between">
                <span>2. Find Competitor Topics</span>
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                Discover what entities and n-grams top competitors are covering.
              </p>
            </div>
          </button>

          {/* Goal 3 */}
          <button
            id="goal-serp-features"
            onClick={() => onSelectGoal("serp")}
            className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 group ${
              currentTab === "serp"
                ? "bg-sky-950/30 border-sky-500 text-sky-200"
                : "bg-slate-950/60 border-slate-850 hover:border-slate-700 text-slate-300"
            }`}
          >
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 shrink-0 group-hover:bg-sky-500/20">
              <Eye className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold flex items-center justify-between">
                <span>3. Audit SERP &amp; Ads</span>
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                See AI Overviews, carousels, and paid ads taking up organic real estate.
              </p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
