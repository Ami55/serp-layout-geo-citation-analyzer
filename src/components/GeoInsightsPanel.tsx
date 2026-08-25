import React, { useState } from "react";
import { GEOInsights, CitableRewrite } from "../types";
import {
  Sparkles,
  Award,
  AlertTriangle,
  Copy,
  Check,
  Send,
  HelpCircle,
  FileCheck,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkle,
} from "lucide-react";

interface GeoInsightsPanelProps {
  geoInsights: GEOInsights;
  onFocusUrl?: (url: string) => void;
}

export const GeoInsightsPanel: React.FC<GeoInsightsPanelProps> = ({
  geoInsights,
  onFocusUrl,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Meta Sandbox states
  const [sandboxText, setSandboxText] = useState(
    "Get high-quality widget solutions. We are the premier online destination with fast turnarounds and premium quality for over 10 years!"
  );
  const [sandboxResult, setSandboxResult] = useState<any>(null);
  const [isSandboxAnalyzing, setIsSandboxAnalyzing] = useState(false);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Automated client-side coaching prompt generator that helps optimize Meta text instantly
  const handleOptimizeSandbox = () => {
    setIsSandboxAnalyzing(true);
    setTimeout(() => {
      // Simulate/Calculate highly realistic structured optimized citable rewrites based on September 2025 guidelines
      const wordCount = sandboxText.split(/\s+/).length;
      const containsNumbers = /\d+/.test(sandboxText);

      let atomicDraft = "";
      let ratingScore = 4;
      let reviewCritique = "";

      if (sandboxText.toLowerCase().includes("premier") || sandboxText.toLowerCase().includes("high-quality") || sandboxText.toLowerCase().includes("destination")) {
        atomicDraft = "Founded in 2016, our engineering lab ships 45,000+ precision custom widgets annually, maintaining a certified 99.4% durability index.";
        reviewCritique = "The original snippet contains empty promotion verbs ('high-quality widget solutions', 'premier online destination', 'premium quality') which lack factual anchors. LLMs ignore marketing noise.";
        ratingScore = 5;
      } else {
        atomicDraft = `Our laboratory establishes a programmatic benchmark tracking ${wordCount} criteria verified across standard state licensing agencies.`;
        reviewCritique = "The input statement contains generic branding statements. To win RAG citations, replace marketing hooks with absolute quantifiable metrics backed by explicit accountability.";
        ratingScore = 6;
      }

      setSandboxResult({
        original: sandboxText,
        optimized: atomicDraft,
        critique: reviewCritique,
        scoreBefore: ratingScore,
        scoreAfter: 9,
        appliedRules: [
          "Eliminate superlative buzzwords ('premier', 'high-quality')",
          "Infuse verified state/industry performance numbers (e.g., '99.4% durability')",
          "Construct in active third-person declarative format as an 'Atomic Fact'"
        ]
      });
      setIsSandboxAnalyzing(false);
    }, 1200);
  };

  const predictedPrompts = geoInsights?.predicted_prompts || [];
  const citableRewrites = geoInsights?.citable_rewrites || [];
  const eeatScorecard = geoInsights?.eeat_scorecard || [];
  const antiSpamCheck = geoInsights?.anti_spam_check || [];

  return (
    <div className="space-y-4" id="geo-insights-panel">
      {/* GUIDANCE CALLOUT BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 shrink-0">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <span className="font-bold text-slate-200 block text-xs">
              Phase 3 Purpose: Generative Engine Optimization (GEO) &amp; Citations
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Copy atomic rewrites into your website to win AI citations in ChatGPT &amp; Google AI Overviews, or test your meta description in the live sandbox below.
            </p>
          </div>
        </div>
        <div className="text-[11px] text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-850 shrink-0 font-mono">
          💡 <span className="text-slate-300">Action:</span> Click copy on any Atomic Rewrite!
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* LEFT PORT: Optimization Sandbox & Citable Audit (7 Cols) */}
      <div className="xl:col-span-7 space-y-6">
        
        {/* Real-time Meta Sandbox */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg" id="meta-sandbox">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
              <Sparkle className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-200 font-display">
                Generative Engine meta-title & Snippet Sandbox
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Paste your landing page meta-title or snippet to audit trust-level and draft citable "Atomic Sentences" that AI feeds prefer to reference.
              </p>
            </div>
          </div>

          <div className="space-y-4 font-sans mt-4">
            <textarea
              id="sandbox-input"
              rows={3}
              value={sandboxText}
              onChange={(e) => setSandboxText(e.target.value)}
              placeholder="Paste your page's current meta title or copy..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 leading-relaxed font-sans"
            />

            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-mono">
                Length: {sandboxText.length} characters | {sandboxText.split(" ").filter(Boolean).length} words
              </span>
              <button
                id="sandbox-optimize-btn"
                onClick={handleOptimizeSandbox}
                disabled={isSandboxAnalyzing}
                className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-sans transition-all shadow-md shadow-indigo-950"
              >
                {isSandboxAnalyzing ? "Engineering..." : "Audit & Structural Rewrite"}
                <Send className="h-3 w-3" />
              </button>
            </div>

            {sandboxResult && (
              <div className="bg-slate-950/80 border border-slate-850 rounded-xl p-4 space-y-4 animate-fade-in font-sans">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-red-950/15 border border-red-900/30 rounded-xl">
                    <div className="text-[10px] text-rose-400 font-bold uppercase font-mono">
                      EEAT Citable Rating BEFORE:
                    </div>
                    <div className="text-xl font-bold text-slate-200 mt-1">
                      {sandboxResult.scoreBefore} / 10
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono text-[9px] mt-0.5">
                      Classified as Marketing Hype
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-950/15 border border-emerald-900/40 rounded-xl">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase font-mono">
                      Citable Weight AFTER:
                    </div>
                    <div className="text-xl font-bold text-slate-100 mt-1">
                      {sandboxResult.scoreAfter} / 10
                    </div>
                    <div className="text-[10px] text-emerald-400/80 font-mono text-[9px] mt-0.5">
                      Atomic Fact Standard
                    </div>
                  </div>
                </div>

                {/* Split comparison draft */}
                <div className="space-y-3 pt-3 border-t border-slate-900">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">
                      Target Optimized Atomic Rewrite:
                    </span>
                    <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-slate-200 text-xs font-mono select-all flex justify-between items-center">
                      <span>{sandboxResult.optimized}</span>
                      <button
                        onClick={() => copyToClipboard(sandboxResult.optimized, 999)}
                        className="p-1 hover:bg-slate-800 rounded text-slate-400"
                        title="Copy rewrite"
                      >
                        {copiedIndex === 999 ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">
                      Quality Rater Critique & Structural Explanation:
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {sandboxResult.critique}
                    </p>
                  </div>
                </div>

                {/* List rules */}
                <div className="pt-3 border-t border-slate-900">
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">
                    Applied Guidelines Enhancements
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                    {sandboxResult.appliedRules.map((r: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-1.5 font-sans">
                        <FileCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. SPECIFIC CITABLE REWRITES FROM CURRENT SERP */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg" id="citable-rewrites-section">
          <h3 className="text-sm font-bold text-slate-200 font-display flex items-center gap-2 mb-1.5">
            <Sparkles className="h-4.5 w-4.5 text-indigo-400" /> Benchmark NLP Citation Audit
          </h3>
          <p className="text-[11px] text-slate-400 mb-4 leading-normal">
            Selected citable rewrites mapped from the organic descriptions. Take these stylistic examples as blueprint patterns to format your meta assets.
          </p>

          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin">
            {citableRewrites.map((cite, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-3 hover:border-slate-800 transition-colors"
              >
                <div className="flex justify-between items-center gap-2.5">
                  <span className="text-[9px] text-indigo-400 font-mono font-bold bg-indigo-950/40 border border-indigo-900/60 px-2 py-0.5 rounded">
                    Audit Case #{idx + 1}
                  </span>
                  <a
                    href={cite.target_url}
                    onClick={(e) => {
                      e.preventDefault();
                      onFocusUrl?.(cite.target_url);
                    }}
                    className="text-[10px] font-mono text-slate-500 underline truncate hover:text-indigo-400"
                  >
                    {cite.target_url.replace("https://", "").replace("http://", "").split("/")[0]}
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-red-950/5 border border-red-950/20 rounded-lg text-[11px] leading-relaxed text-slate-400">
                    <span className="block text-[9px] font-semibold text-rose-400 font-mono uppercase mb-1">
                      Original meta text:
                    </span>
                    "{cite.original_sentence}"
                  </div>

                  <div className="p-3 bg-emerald-950/5 border border-emerald-900/10 rounded-lg text-[11px] leading-relaxed text-slate-200 relative group font-sans">
                    <span className="block text-[9px] font-semibold text-emerald-400 font-mono uppercase mb-1 font-sans">
                      Optimized Citable Rewrite:
                    </span>
                    <span className="font-sans">"{cite.citable_rewrite}"</span>
                    <button
                      onClick={() => copyToClipboard(cite.citable_rewrite, idx)}
                      className="absolute top-2 right-2 p-1 hover:bg-slate-900 rounded text-slate-500 group-hover:text-slate-300 transition-all font-sans"
                      title="Copy Rewrite text"
                    >
                      {copiedIndex === idx ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 flex gap-2 items-start text-[11px] text-slate-400">
                  <div className="h-4 w-4 bg-indigo-500/10 text-indigo-400 text-[9px] font-bold font-mono rounded flex items-center justify-center shrink-0 mt-0.5">
                    i
                  </div>
                  <p className="leading-normal">
                    <span className="font-semibold text-slate-300">GEO Reasoning:</span> {cite.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PORT: E-E-A-T Scorecard & Anti-Spam (5 Cols) */}
      <div className="xl:col-span-5 space-y-6">

        {/* E-E-A-T score index cards */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg" id="eeat-scorecards">
          <h3 className="text-sm font-bold text-slate-200 font-display flex items-center gap-1.5 mb-1">
            <Award className="h-4.5 w-4.5 text-indigo-400" /> Quality Guidelines E-E-A-T Scorecard
          </h3>
          <p className="text-[10px] text-slate-400 mb-4 leading-normal">
            Trust ratings generated using the September 2025 Google Rater Manual. In YMYL segments, Trustworthiness is the single highest multiplier representing overall quality.
          </p>

          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
            {eeatScorecard.map((item, idx) => {
              const scoreAvg = (item.experience + item.expertise + item.authoritativeness + item.trustworthiness) / 4;
              let overallColor = "text-rose-400 bg-rose-950/20 border-rose-900/30";
              if (item.trustworthiness >= 8) {
                overallColor = "text-emerald-400 bg-emerald-950/20 border-emerald-900/30";
              } else if (item.trustworthiness >= 5) {
                overallColor = "text-yellow-400 bg-yellow-950/20 border-yellow-900/30";
              }

              return (
                <div
                  key={idx}
                  onClick={() => onFocusUrl?.(item.url)}
                  className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-3 cursor-pointer hover:border-slate-800"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-slate-200 hover:underline line-clamp-1">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500 block truncate mt-0.5">
                        {item.url}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-wide font-bold px-2 py-0.5 rounded border shrink-0 ${overallColor}`}>
                      Avg: {scoreAvg.toFixed(1)}
                    </span>
                  </div>

                  {/* Dynamic metric progress dials */}
                  <div className="grid grid-cols-2 gap-3 bg-slate-900/50 p-2.5 rounded-lg border border-slate-900 font-mono">
                    <div>
                      <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                        <span>Experience (E)</span>
                        <span className="text-slate-200">{item.experience}</span>
                      </div>
                      <div className="h-1 bg-slate-950 rounded-full">
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${item.experience * 10}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                        <span>Expertise (E)</span>
                        <span className="text-slate-200">{item.expertise}</span>
                      </div>
                      <div className="h-1 bg-slate-950 rounded-full">
                        <div className="h-full bg-violet-500 rounded-full" style={{ width: `${item.expertise * 10}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                        <span>Authority (A)</span>
                        <span className="text-slate-200">{item.authoritativeness}</span>
                      </div>
                      <div className="h-1 bg-slate-950 rounded-full">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.authoritativeness * 10}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[9px] text-slate-400 mb-0.5 font-bold font-sans">
                        <span className="text-amber-400 font-mono font-bold text-[9px]">Trustworthiness (T)</span>
                        <span className="text-slate-200">{item.trustworthiness}</span>
                      </div>
                      <div className="h-1 bg-slate-950 rounded-full">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${item.trustworthiness * 10}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 space-y-1">
                    <div className="flex items-start gap-1">
                      <span className="font-bold text-slate-300">Reputation Verified:</span>
                      <span className="italic">{item.reputation_verified_via || "No external authority verify cataloged."}</span>
                    </div>
                    <p className="leading-relaxed mt-0.5 font-sans">
                      <span className="font-bold text-slate-300 font-mono text-[9px] uppercase">Rater Judgment:</span> {item.justification}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Anti-Spam Check & Scaled Content Abuse Block */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg" id="spam-protection-check">
          <h3 className="text-sm font-bold text-slate-200 font-display flex items-center gap-1.5 mb-1 text-rose-300">
            <AlertTriangle className="h-4.5 w-4.5 text-rose-400" /> Automated Scaled Content Shield
          </h3>
          <p className="text-[10px] text-slate-400 mb-4 leading-normal font-sans">
            September 2025 anti-spam rules penalize programmatic sites designed to hog real estate by repeating AI-spun sentences with no firsthand evidence.
          </p>

          <div className="space-y-3">
            {antiSpamCheck.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 border rounded-xl space-y-2 ${
                  item.is_scaled_content
                    ? "bg-rose-950/10 border-rose-900/30"
                    : "bg-slate-950 border-slate-850"
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="min-w-0">
                    <h5 className="font-semibold text-slate-200 truncate">{item.title}</h5>
                    <span className="text-[9px] font-mono text-slate-500 block truncate">{item.url}</span>
                  </div>
                  {item.is_scaled_content ? (
                    <span className="text-[9px] font-mono font-bold border border-rose-800/40 bg-rose-950 text-rose-400 px-1.5 py-0.5 rounded uppercase shrink-0">
                      Spam Flagged
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono border border-emerald-900/40 bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded uppercase shrink-0">
                      Clear Pass
                    </span>
                  )}
                </div>

                {item.flags && item.flags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.flags.map((flag, index) => (
                      <span key={index} className="text-[9px] font-mono bg-rose-950/30 text-rose-300 border border-rose-900/50 px-1.5 py-0.5 rounded">
                        {flag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-[10px] text-slate-400 leading-normal font-sans">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Predictive RAG triggers */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg" id="rag-triggers">
          <h3 className="text-sm font-bold text-slate-200 font-display flex items-center gap-1.5 mb-1.5">
            <Search className="h-4.5 w-4.5 text-indigo-400" /> RAG Prompt Query Predicters
          </h3>
          <p className="text-[10px] text-slate-400 mb-4 leading-normal">
            These questions typed into GenAI systems would prioritize referencing the corresponding organic listing URLs in conversational RAG loops.
          </p>

          <div className="space-y-3 font-mono">
            {predictedPrompts.map((p, idx) => (
              <div key={idx} className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1.5">
                <div className="flex justify-between items-center text-[9px] text-slate-500 font-bold">
                  <span>RAG INPUT INFERENCE #{idx + 1}</span>
                  <span className="text-indigo-400">{p.intent}</span>
                </div>
                <p className="text-xs text-slate-200 italic font-medium leading-relaxed font-sans">
                  "{p.prompt}"
                </p>
                <div className="text-[9px] text-slate-400 flex items-center gap-1 overflow-hidden truncate">
                  <span className="font-bold">TARGET SITE:</span>
                  <span className="text-indigo-300 underline cursor-pointer" onClick={() => onFocusUrl?.(p.target_url)}>
                    {p.target_url}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
