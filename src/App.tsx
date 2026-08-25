import React, { useState, useEffect } from "react";
import { SERPAnalysisResponse, SERPMap, NLPAudit, GEOInsights } from "./types";
import { PRESETS } from "./presets";
import { PresetSelector } from "./components/PresetSelector";
import { SerpLayoutMap } from "./components/SerpLayoutMap";
import { NlpAuditPanel } from "./components/NlpAuditPanel";
import { GeoInsightsPanel } from "./components/GeoInsightsPanel";
import { GuideModal } from "./components/GuideModal";
import { QuickGuideBar } from "./components/QuickGuideBar";
import {
  Search,
  Sliders,
  Sparkles,
  Award,
  AlertTriangle,
  FileText,
  Paperclip,
  CheckCircle,
  HelpCircle,
  Cpu,
  Bookmark,
  ExternalLink,
  ShieldAlert,
  Terminal,
  RefreshCw,
  Zap,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<"serp" | "nlp" | "geo">("serp");
  const [searchQuery, setSearchQuery] = useState("how to clean apple watch band safely");
  const [serpHtml, setSerpHtml] = useState("");
  const [isHtmlDrawerOpen, setIsHtmlDrawerOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  
  // Active Preset ID (defaults to apple_watch)
  const [selectedPresetId, setSelectedPresetId] = useState("apple_watch");
  
  // Active analysis results holding state
  const [analysisData, setAnalysisData] = useState<SERPAnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);
  const [analysisError, setAnalysisError] = useState("");
  
  // Highlighted URL state across panels for the exact Entity Overlap feature
  const [focusedUrl, setFocusedUrl] = useState<string>("");

  // Load Preset directly
  const loadPresetData = (presetId: string) => {
    setSelectedPresetId(presetId);
    if (PRESETS[presetId]) {
      setSearchQuery(PRESETS[presetId].query);
      setAnalysisData(PRESETS[presetId].data);
      setFocusedUrl("");
      setAnalysisError("");
    }
  };

  // Initialize with default apple_watch preset on first load
  useEffect(() => {
    loadPresetData("apple_watch");
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const res = await fetch("https://gemini-proxy-2-pearl.vercel.app/api/serp-geo-analyzer");
      const data = await res.json();
      setHasApiKey(Boolean(data.apiKeyConfigured));
    } catch (e) {
      console.warn("Could not retrieve backend health status:", e);
    }
  };

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsAnalyzing(true);
    setAnalysisError("");
    setSelectedPresetId(""); // Reset baseline preset selection during custom runs

    try {
      const response = await fetch("https://gemini-proxy-2-pearl.vercel.app/api/serp-geo-analyzer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
          serp_content: serpHtml,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.details || "Failed to process audit.");
      }

      const results: SERPAnalysisResponse = await response.json();
      setAnalysisData(results);
      setFocusedUrl("");
      setIsHtmlDrawerOpen(false); // Close drawer on success
    } catch (err: any) {
      console.error("Analysis Failure:", err);
      setAnalysisError(err.message || "An unexpected network or engine error took place.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white antialiased transition-colors duration-200">
      
      {/* HEADER CONTROLS BAR */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4" id="app-header">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 shadow-inner">
              <Terminal className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold tracking-tight md:text-base font-display flex items-center gap-2">
                Search Quality Auditor &amp; GEO Engine
                <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider border border-emerald-900/50">
                  Sept 2025 Ruleset
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Senior SEO analytics mapping raw SERP schemas, E-E-A-T trustworthiness ratios, and NLP n-gram structures.
              </p>
            </div>
          </div>
          
          {/* Controls and Guide buttons */}
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <button
              id="header-guidelines-btn"
              onClick={() => setIsGuideOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-all font-sans font-semibold text-xs"
              title="Open full guidelines & how it works"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>How To Use &amp; Guidelines</span>
            </button>

            {!hasApiKey && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/40 border border-amber-900/50 text-amber-300">
                <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                <span>Preset benchmark mode</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-950/40 border border-indigo-900/50 text-indigo-300">
              <Zap className="h-3 w-3 text-indigo-400 shrink-0" />
              <span>GEO-RAG Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* CORE CONTROL CONSOLE CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">

        {/* QUICK GUIDE & GOALS BAR */}
        <QuickGuideBar
          onOpenFullGuide={() => setIsGuideOpen(true)}
          onSelectGoal={(tab) => setCurrentTab(tab)}
          currentTab={currentTab}
        />

        {/* Audit Search control panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden" id="search-control-panel">
          
          {/* subtle background glow */}
          <div className="absolute left-0 top-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <form onSubmit={handleRunAnalysis} className="space-y-4 relative">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  id="query-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter a keyword phrase to simulate or audit..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 font-medium"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  id="html-drawer-trigger"
                  onClick={() => setIsHtmlDrawerOpen(!isHtmlDrawerOpen)}
                  className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                    isHtmlDrawerOpen || serpHtml.trim() !== ""
                      ? "bg-indigo-950/40 border-indigo-800 text-indigo-300"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                  title="Paste raw SERP HTML output elements to run actual audit extraction"
                >
                  <Paperclip className="h-3.5 w-3.5" />
                  <span>SERP HTML {serpHtml.trim() !== "" ? "(Pasted)" : ""}</span>
                </button>

                <button
                  type="submit"
                  id="run-analysis-btn"
                  disabled={isAnalyzing || !searchQuery.trim()}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-850 hover:shadow-indigo-950 disabled:text-slate-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg transition-all"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Auditing NLP...</span>
                    </>
                  ) : (
                    <>
                      <Sliders className="h-3.5 w-3.5" />
                      <span>Execute Audit</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Expansible SERP raw paste element box */}
            <AnimatePresence>
              {isHtmlDrawerOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl mt-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                        Raw SERP HTML or Text Element Paste Box (Optional)
                      </span>
                      {serpHtml ? (
                        <button
                          type="button"
                          onClick={() => setSerpHtml("")}
                          className="text-[9px] text-rose-400 hover:underline"
                        >
                          Clear Text
                        </button>
                      ) : null}
                    </div>
                    <textarea
                      id="html-raw-textarea"
                      rows={5}
                      value={serpHtml}
                      onChange={(e) => setSerpHtml(e.target.value)}
                      placeholder="Paste elements of search engine pages, tag structures, organic snippets, or copy directly. If empty, the engine automatically simulates the SERP layout for auditing."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/40 font-mono"
                    />
                    <div className="text-[9px] text-slate-500 italic max-w-2xl leading-normal">
                      Note: Raw lists or full HTML containers hold visual tags matching SCRBs and ads. The Gemini model parses text densities to isolate entity salience vectors.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Preset selections */}
        <PresetSelector
          currentPresetId={selectedPresetId}
          onSelectPreset={loadPresetData}
        />

        {/* LOADING SCREEN OR RECENT ENGINE RUN INDICATOR */}
        {isAnalyzing && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="h-12 w-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
              <Sparkles className="h-5 w-5 text-indigo-400 absolute top-3.5 left-3.5 animate-pulse" />
            </div>
            <div className="space-y-1.5 max-w-md">
              <h3 className="font-bold text-sm tracking-tight font-display text-slate-100">
                Running Full Search Guidelines Audit...
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                The server-side AI is mapping n-gram frequencies, estimating E-E-A-T indicators, and structuring citation-ready atomic facts.
              </p>
            </div>
          </div>
        )}

        {/* ERROR SCREEN CONTROLS */}
        {!isAnalyzing && analysisError && (
          <div className="p-5 bg-rose-950/10 border border-rose-900/30 rounded-2xl flex items-start gap-4">
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg shrink-0">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-rose-400 tracking-wider font-mono uppercase">
                Search Architect Engine Exception
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {analysisError}
              </p>
              <p className="text-[11px] text-slate-400 mt-2">
                Confirm that the <span className="font-bold text-slate-300 font-mono">serp-geo-analyzer.js</span> endpoint is deployed in Gemini Proxy 2, or load a benchmark preset below to continue offline.
              </p>
            </div>
          </div>
        )}

        {/* DASHBOARD AUDIT CONTROLLER GRID */}
        {!isAnalyzing && analysisData && (
          <div className="space-y-6">
            
            {/* TABS SELECTOR CONTAINER */}
            <div className="flex border-b border-slate-900 overflow-x-auto gap-4 scrollbar-none" id="dashboard-tab-bar">
              <button
                id="tab-serp-layout"
                onClick={() => setCurrentTab("serp")}
                className={`py-3 px-1 text-xs font-bold uppercase tracking-wider relative shrink-0 transition-all ${
                  currentTab === "serp" ? "text-indigo-400 font-extrabold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Phase 1: SERP Layout Map</span>
                </div>
                {currentTab === "serp" && (
                  <motion.div
                    layoutId="active-dashboard-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                  />
                )}
              </button>

              <button
                id="tab-nlp-audit"
                onClick={() => setCurrentTab("nlp")}
                className={`py-3 px-1 text-xs font-bold uppercase tracking-wider relative shrink-0 transition-all ${
                  currentTab === "nlp" ? "text-indigo-400 font-extrabold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  <span>Phase 2: Organic NLP Audit</span>
                </div>
                {currentTab === "nlp" && (
                  <motion.div
                    layoutId="active-dashboard-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                  />
                )}
              </button>

              <button
                id="tab-geo-insights"
                onClick={() => setCurrentTab("geo")}
                className={`py-3 px-1 text-xs font-bold uppercase tracking-wider relative shrink-0 transition-all ${
                  currentTab === "geo" ? "text-indigo-400 font-extrabold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>Phase 3: GEO Optimization</span>
                </div>
                {currentTab === "geo" && (
                  <motion.div
                    layoutId="active-dashboard-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                  />
                )}
              </button>
            </div>

            {/* DYNAMIC TAB COMPONENT LOADER */}
            <div className="min-h-[500px]" id="dashboard-views">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                >
                  {currentTab === "serp" && (
                    <SerpLayoutMap
                      serpMap={analysisData.serp_map}
                      onFocusUrl={(url) => {
                        setFocusedUrl(url);
                        // Quick highlight callback trigger -> automatically route user to NLP tab to see results!
                        setCurrentTab("nlp");
                      }}
                      focusedUrl={focusedUrl}
                      eeatScores={analysisData.geo_insights?.eeat_scorecard}
                      antiSpam={analysisData.geo_insights?.anti_spam_check}
                    />
                  )}

                  {currentTab === "nlp" && (
                    <NlpAuditPanel
                      nlpAudit={analysisData.nlp_audit}
                      organicResults={analysisData.serp_map?.organic_results || []}
                      focusedUrl={focusedUrl}
                      onFocusUrl={setFocusedUrl}
                    />
                  )}

                  {currentTab === "geo" && (
                    <GeoInsightsPanel
                      geoInsights={analysisData.geo_insights}
                      onFocusUrl={(url) => {
                        setFocusedUrl(url);
                        setCurrentTab("serp");
                      }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-6 mt-12 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto space-y-2">
          <p>
            © 2026 SERP Layout &amp; GEO Citation Analyzer. Developed by <strong className="text-slate-300">Ami - SEO Girl</strong>. All rights reserved.
          </p>
          <p className="opacity-60 text-[10px]">
            SERP structure, NLP entity and GEO citation diagnostic
          </p>
        </div>
      </footer>

      {/* COMPREHENSIVE HOW-IT-WORKS & PLAYBOOK MODAL */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onSelectGoal={(tab, presetId) => {
          if (presetId) {
            loadPresetData(presetId);
          }
          setCurrentTab(tab);
        }}
      />
    </div>
  );
}
