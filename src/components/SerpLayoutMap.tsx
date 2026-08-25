import React, { useState } from "react";
import { SERPMap, OrganicResult } from "../types";
import {
  Sparkles,
  ExternalLink,
  MapPin,
  Play,
  Grid,
  TrendingUp,
  AlertTriangle,
  FileCheck,
  Award,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface SerpLayoutMapProps {
  serpMap: SERPMap;
  onFocusUrl?: (url: string) => void;
  focusedUrl?: string;
  eeatScores: Array<{
    url: string;
    experience: number;
    expertise: number;
    authoritativeness: number;
    trustworthiness: number;
  }>;
  antiSpam: Array<{
    url: string;
    is_scaled_content: boolean;
    flags: string[];
  }>;
}

export const SerpLayoutMap: React.FC<SerpLayoutMapProps> = ({
  serpMap,
  onFocusUrl,
  focusedUrl,
  eeatScores,
  antiSpam,
}) => {
  const [activePaaAnswers, setActivePaaAnswers] = useState<Record<number, boolean>>({});

  const togglePaa = (index: number) => {
    setActivePaaAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getEeatDetails = (url: string) => {
    return eeatScores?.find((s) => s.url === url);
  };

  const getSpamDetails = (url: string) => {
    return antiSpam?.find((s) => s.url === url);
  };

  // Layout calculations
  const totalOrganic = serpMap.organic_results.length;
  const totalAds = serpMap.sponsored_count;
  const totalScrbs = serpMap.scrbs.length;
  const totalPaa = serpMap.intent_exploration.paa.length;

  return (
    <div className="space-y-4" id="serp-layout-map">
      {/* GUIDANCE CALLOUT BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20 shrink-0">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <span className="font-bold text-slate-200 block text-xs">
              Phase 1 Purpose: Audit SERP Real Estate &amp; Visibility
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Check if an AI Overview takes the top spot, how many paid ads push organic links down, and what questions users ask in "People Also Ask".
            </p>
          </div>
        </div>
        <div className="text-[11px] text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-850 shrink-0 font-mono">
          💡 <span className="text-slate-300">Tip:</span> Click any organic listing to inspect its NLP entities!
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT PORT: SERP Simulator UI */}
      <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-red-500 font-extrabold text-lg">G</span>
              <span className="text-yellow-500 font-extrabold text-lg">o</span>
              <span className="text-blue-500 font-extrabold text-lg">o</span>
              <span className="text-green-500 font-extrabold text-lg">g</span>
              <span className="text-red-500 font-extrabold text-lg">l</span>
              <span className="text-blue-500 font-extrabold text-lg">e</span>
            </div>
            <div className="bg-slate-800 border border-slate-700 text-slate-100 px-3 py-1.5 rounded-full text-xs font-mono font-medium max-w-xs md:max-w-md truncate shadow-inner">
              {serpMap.query}
            </div>
          </div>
          <div className="text-[10px] bg-indigo-950 text-indigo-300 font-mono px-2.5 py-1 rounded-md border border-indigo-800 uppercase tracking-wider">
            Simulated SERP Frame
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[800px] overflow-y-auto custom-scrollbar">
          {/* 1. SPONSORED ADS */}
          {serpMap.sponsored_ads && serpMap.sponsored_ads.length > 0 && (
            <div className="space-y-4" id="sponsored-section">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span> Sponsored Content ({totalAds})
                </span>
                <span className="text-[10px] text-slate-500 italic">Cost-Per-Click Ad Auctions</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {serpMap.sponsored_ads.map((ad, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-amber-950/10 border border-amber-900/30 rounded-xl relative hover:border-amber-900/60 transition-colors"
                  >
                    <span className="absolute top-3 right-3 text-[9px] bg-slate-800 text-amber-400 font-mono px-1.5 py-0.5 rounded font-bold uppercase border border-slate-700">
                      Ad
                    </span>
                    <div className="text-[10px] text-amber-500 truncate mb-1">
                      {ad.url}
                    </div>
                    <h3 className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">
                      {ad.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      {ad.snippet}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. AI OVERVIEW */}
          {serpMap.ai_overview && serpMap.ai_overview.present && (
            <div
              className="bg-gradient-to-br from-indigo-950/30 to-purple-950/30 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden shadow-lg shadow-indigo-950/10"
              id="ai-overview-block"
            >
              {/* Background Accent */}
              <div className="absolute right-0 top-0 -mt-12 -mr-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-500/20 rounded-lg text-indigo-400 border border-indigo-500/30">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-indigo-200 tracking-tight font-display">
                    AI Overview
                  </span>
                </div>
                <div className="text-[9px] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full font-mono uppercase font-semibold">
                  Generative Synthesis
                </div>
              </div>

              <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {serpMap.ai_overview.summary}
              </div>

              {/* Citations list */}
              {serpMap.ai_overview.citations && serpMap.ai_overview.citations.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-800/60">
                  <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-2">
                    Verified Sources Cited:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {serpMap.ai_overview.citations.map((cite, index) => {
                      const domainName = cite.replace("https://www.", "").replace("http://www.", "").split("/")[0];
                      return (
                        <button
                          key={index}
                          onClick={() => onFocusUrl?.(cite)}
                          className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono bg-slate-900 border border-slate-800 rounded-md text-indigo-300 hover:border-indigo-500/50 hover:bg-slate-800 hover:text-white transition-all text-left max-w-xs truncate"
                        >
                          <span className="bg-indigo-505/20 text-indigo-400 font-bold px-1 rounded text-[9px]">
                            {index + 1}
                          </span>
                          <span>{domainName}</span>
                          <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. LOCAL MAP / VIDEO (SCRB blocks before organic results) */}
          {serpMap.scrbs && serpMap.scrbs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="scrb-section">
              {serpMap.scrbs.map((scrb, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start gap-3.5 hover:border-slate-700 transition-colors"
                >
                  <div className="p-2 ml-1 bg-slate-800 text-indigo-400 rounded-lg shrink-0 border border-slate-700">
                    {scrb.type === "Local Map" && <MapPin className="h-4 w-4" />}
                    {scrb.type === "Video" && <Play className="h-4 w-4 text-rose-400" />}
                    {scrb.type !== "Local Map" && scrb.type !== "Video" && <Grid className="h-4 w-4 text-emerald-400" />}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">
                      {scrb.type} (SCRB)
                    </div>
                    <div className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                      {scrb.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. INTENT EXPLORATION: PEOPLE ALSO ASK (PAAs) */}
          {serpMap.intent_exploration?.paa && serpMap.intent_exploration.paa.length > 0 && (
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 space-y-3" id="paa-section">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span> People Also Ask (PAA)
              </span>
              <div className="divide-y divide-slate-800/60">
                {serpMap.intent_exploration.paa.map((q, idx) => {
                  const isOpen = !!activePaaAnswers[idx];
                  return (
                    <div key={idx} className="py-2.5 first:pt-0 last:pb-0">
                      <button
                        onClick={() => togglePaa(idx)}
                        className="w-full flex items-center justify-between text-left text-xs font-medium text-slate-200 hover:text-indigo-400 transition-colors py-1"
                      >
                        <span>{q}</span>
                        {isOpen ? <ChevronUp className="h-3.5 w-3.5 text-slate-400 shrink-0" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="mt-2 pl-2 border-l border-indigo-500/30 py-1 text-[11px] text-slate-400 leading-relaxed font-sans mt-1">
                          Simulated RAG extraction response: This query addresses detailed user-intent seeking direct hands-on troubleshooting. Real search rater score: Highly Meets.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. ORGANIC RESULTS */}
          <div className="space-y-4" id="organic-listings font-sans">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Organic Core Index (Top 10 Results)
            </span>
            <div className="space-y-4">
              {serpMap.organic_results.map((item, idx) => {
                const eeat = getEeatDetails(item.url);
                const anti = getSpamDetails(item.url);
                const isSelected = focusedUrl === item.url;

                // Color of the Trust Badge depending on score
                let trustBadgeBg = "bg-rose-500/15 border-rose-500/30 text-rose-300";
                if (eeat && eeat.trustworthiness >= 8) {
                  trustBadgeBg = "bg-emerald-500/15 border-emerald-500/30 text-emerald-300";
                } else if (eeat && eeat.trustworthiness >= 5) {
                  trustBadgeBg = "bg-yellow-500/15 border-yellow-500/30 text-yellow-300";
                }

                return (
                  <div
                    key={idx}
                    id={`organic-${idx + 1}`}
                    onClick={() => onFocusUrl?.(item.url)}
                    className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-950/20"
                        : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          Pos {idx + 1}
                        </span>
                        <span className="text-[10px] text-indigo-400 font-mono truncate max-w-sm">
                          {item.url}
                        </span>
                      </div>

                      {/* E-E-A-T and spam score micro metrics in corner */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {eeat && (
                          <div
                            title={`Experience: ${eeat.experience}, Expertise: ${eeat.expertise}, Authority: ${eeat.authoritativeness}, Trust: ${eeat.trustworthiness}`}
                            className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${trustBadgeBg}`}
                          >
                            <Award className="h-3 w-3" />
                            <span>Trust: {eeat.trustworthiness}/10</span>
                          </div>
                        )}
                        {anti?.is_scaled_content && (
                          <div
                            title="Flagged for Scaled Content Abuse (likely programmatic low-effort generation)"
                            className="flex items-center gap-1 text-[10px] text-rose-400 bg-rose-950/40 border border-rose-900/50 px-2 py-0.5 rounded-full font-mono"
                          >
                            <AlertCircle className="h-3 w-3" />
                            <span>Scaled Content Abuse</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold text-sky-400 hover:underline">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {item.snippet}
                    </p>

                    {isSelected && eeat && (
                      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-start text-xs bg-slate-950/40 -mx-5 -mb-5 p-4 rounded-b-2xl">
                        <div className="flex-1">
                          <span className="font-mono font-bold text-[10px] text-indigo-400 uppercase block mb-1">
                            Quality rater reputation verified via:
                          </span>
                          <span className="text-slate-300 font-sans italic text-[11px]">
                            "{eeat.reputation_verified_via || 'General index records'}"
                          </span>
                        </div>
                        <div className="flex-1">
                          <span className="font-mono font-bold text-[10px] text-emerald-400 uppercase block mb-1 font-sans">
                            EEAT audit justification:
                          </span>
                          <span className="text-slate-400 block text-[11px] leading-normal font-sans">
                            {eeat.justification}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PORT: Guidelines Summary Panel */}
      <div className="lg:col-span-4 space-y-6">
        {/* SERP Layout Ratio summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5" id="serp-ratio-card">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono mb-4 flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-indigo-400" /> SERP Composition Audit
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                <span>Google Ads Density</span>
                <span>{totalAds > 0 ? `${Math.round((totalAds / (totalAds + totalOrganic)) * 100)}%` : "0%"}</span>
              </div>
              <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all rounded-full"
                  style={{ width: `${totalAds > 0 ? (totalAds / (totalAds + totalOrganic)) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                <span>Special Blocks (SCRBs)</span>
                <span>{totalScrbs} Features</span>
              </div>
              <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all rounded-full"
                  style={{ width: `${Math.min(totalScrbs * 25, 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                <span>Intent Exploration PAAs</span>
                <span>{totalPaa} Queries</span>
              </div>
              <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 transition-all rounded-full"
                  style={{ width: `${Math.min(totalPaa * 25, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Total Organic Core Listings:</span>
              <span className="font-bold text-slate-200">{totalOrganic}</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>RAG Citation Overlap ratio:</span>
              <span className="font-bold text-indigo-400">
                {serpMap.ai_overview?.citations ? `${Math.round((serpMap.ai_overview.citations.length / totalOrganic) * 100)}%` : "0%"}
              </span>
            </div>
          </div>
        </div>

        {/* Search Rater Guidelines Core Concept */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4" id="quality-rater-guide">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono flex items-center gap-1.5">
            <FileCheck className="h-4 w-4 text-emerald-400" /> Quality Guidelines (Sept 2025)
          </h3>

          <div className="space-y-3.5 text-xs text-slate-400">
            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl">
              <div className="text-emerald-400 font-semibold font-mono text-[10px] uppercase mb-1">
                The "Trust" Mandate
              </div>
              <p className="leading-relaxed text-[11px] text-slate-300">
                Prioritizes Trustworthiness above all else in E-E-A-T. If a page is untrustworthy, anonymous, or suggests harmful/unlicensed medical sips (even if based on firsthand 'Experience' or high 'Expertise' claims), Raters must grade it **Lowest Quality**.
              </p>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl">
              <div className="text-indigo-400 font-semibold font-mono text-[10px] uppercase mb-1">
                SCRB Immediate Fulfillment
              </div>
              <p className="leading-relaxed text-[11px] text-slate-300">
                Special Content Result Blocks (Carousels, Local Maps, emergency dial boxes) must immediately fulfill specific local, temporal, or visual transactional seeks.
              </p>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl">
              <div className="text-rose-400 font-semibold font-mono text-[10px] uppercase mb-1">
                Scaled Content Abuse Protection
              </div>
              <p className="leading-relaxed text-[11px] text-slate-300">
                Filters pages created purely for indexing via bulk LLM AI code, spinning low-effort repetitive articles with zero proprietary methodology or unique consumer value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
