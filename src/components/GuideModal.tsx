import React, { useState } from "react";
import {
  HelpCircle,
  X,
  Sparkles,
  Search,
  Award,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  FileEdit,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGoal: (tab: "serp" | "nlp" | "geo", presetId?: string) => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  isOpen,
  onClose,
  onSelectGoal,
}) => {
  const [activeSection, setActiveSection] = useState<
    "use_cases" | "how_it_works" | "guidelines" | "glossary"
  >("use_cases");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
        id="guide-modal-backdrop"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden text-slate-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* MODAL HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold font-display text-white">
                  How This App Works &amp; Guidelines
                </h2>
                <p className="text-xs text-slate-400">
                  A beginner-friendly playbook for Generative Engine Optimization (GEO) &amp; Search Quality.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Guide"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* SUB-NAV TABS */}
          <div className="flex border-b border-slate-800 px-6 bg-slate-950/30 gap-6 text-xs font-semibold">
            <button
              onClick={() => setActiveSection("use_cases")}
              className={`py-3 relative border-b-2 transition-all ${
                activeSection === "use_cases"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              1. What Is It Good For?
            </button>
            <button
              onClick={() => setActiveSection("how_it_works")}
              className={`py-3 relative border-b-2 transition-all ${
                activeSection === "how_it_works"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              2. 3-Step Simple Routine
            </button>
            <button
              onClick={() => setActiveSection("guidelines")}
              className={`py-3 relative border-b-2 transition-all ${
                activeSection === "guidelines"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              3. Quality Guidelines
            </button>
            <button
              onClick={() => setActiveSection("glossary")}
              className={`py-3 relative border-b-2 transition-all ${
                activeSection === "glossary"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              4. Plain-English Glossary
            </button>
          </div>

          {/* MODAL BODY */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm custom-scrollbar leading-relaxed">
            
            {/* SECTION 1: WHAT IS IT GOOD FOR */}
            {activeSection === "use_cases" && (
              <div className="space-y-6">
                <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl">
                  <h3 className="text-sm font-bold text-emerald-300 mb-3">Practical workflow</h3>
                  <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                    <li><strong>1.</strong> Enter the exact search query you want to analyze.</li>
                    <li><strong>2.</strong> For evidence-based analysis, paste exported SERP HTML or text using <strong>SERP HTML</strong>.</li>
                    <li><strong>3.</strong> Select <strong>Execute Audit</strong> and keep the page open while the analysis runs.</li>
                    <li><strong>4.</strong> Review Phase 1 for layout and citation sources.</li>
                    <li><strong>5.</strong> Review Phase 2 for entities, n-grams, triples, and topic gaps.</li>
                    <li><strong>6.</strong> Use Phase 3 to prioritize citable rewrites and E-E-A-T improvements.</li>
                  </ol>
                  <p className="mt-3 text-[11px] text-amber-300/90">If you do not paste SERP content, the app generates a simulated planning model. It is not a live Google scrape, and URLs, rankings, reputation findings, and citations must be verified manually.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display mb-1">
                    The 3 Core Things You Can Accomplish
                  </h3>
                  <p className="text-xs text-slate-400">
                    Modern search is no longer just keywords. AI engines like ChatGPT, Perplexity, and Google AI Overviews read for direct facts, authority, and conciseness.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Goal 1 */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between hover:border-indigo-500/50 transition-colors">
                    <div className="space-y-2">
                      <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 w-fit">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-slate-100 text-sm">
                        1. Win AI Answer Citations
                      </h4>
                      <p className="text-xs text-slate-400 leading-normal">
                        Transform vague marketing fluff (e.g. <em>"We are the premier choice..."</em>) into high-density <strong>Atomic Sentences</strong> that LLMs love to quote.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectGoal("geo");
                      }}
                      className="mt-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 pt-2 border-t border-slate-850"
                    >
                      <span>Jump to GEO Rewrites</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Goal 2 */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
                    <div className="space-y-2">
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 w-fit">
                        <Layers className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-slate-100 text-sm">
                        2. Find Competitor Topic Gaps
                      </h4>
                      <p className="text-xs text-slate-400 leading-normal">
                        Identify what entities, technical terms, and phrase patterns (n-grams) top-ranking competitors cover so your content doesn't miss key concepts.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectGoal("nlp");
                      }}
                      className="mt-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 pt-2 border-t border-slate-850"
                    >
                      <span>Jump to NLP Entity Audit</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Goal 3 */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between hover:border-amber-500/50 transition-colors">
                    <div className="space-y-2">
                      <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 w-fit">
                        <FileEdit className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-slate-100 text-sm">
                        3. Audit Titles in the Sandbox
                      </h4>
                      <p className="text-xs text-slate-400 leading-normal">
                        Paste your current page title or meta description into the interactive sandbox to get instant E-E-A-T ratings and an AI-optimized rewrite.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectGoal("geo");
                      }}
                      className="mt-2 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 pt-2 border-t border-slate-850"
                    >
                      <span>Open Snippet Sandbox</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-indigo-950/30 border border-indigo-900/40 rounded-xl text-xs space-y-2 text-slate-300">
                  <div className="font-bold text-indigo-300 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-indigo-400" />
                    Who is this designed for?
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Content Creators &amp; Bloggers:</strong> Ensure posts get cited in AI searches.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>SEO Specialists &amp; Agencies:</strong> Audit SERP layout, ad density, and E-E-A-T signals.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Copywriters &amp; Marketers:</strong> Replace promotional filler with authoritative facts.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span><strong>YMYL &amp; Health Sites:</strong> Verify strict safety and trust rating criteria.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* SECTION 2: 3-STEP ROUTINE */}
            {activeSection === "how_it_works" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display mb-1">
                    How To Use the Tool (3-Step Routine)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Follow this simple step-by-step workflow for any keyword or article you want to publish.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <div className="h-8 w-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 font-mono text-sm">
                      1
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-100 text-sm">
                        Select a Topic or Enter Your Search Query
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Choose one of the top presets (e.g., <em>"How to clean Apple Watch band safely"</em> or <em>"Can dogs drink coffee"</em>) to see immediate results, or type your own keyword into the search bar at the top and hit <strong>Execute Audit</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <div className="h-8 w-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 font-mono text-sm">
                      2
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-100 text-sm">
                        Inspect the 3 Analysis Phases
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mt-2">
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                          <span className="font-bold text-indigo-300 block mb-1">Phase 1: SERP Layout</span>
                          See if Google shows an AI Overview, Video Carousel, or Ads at the top.
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                          <span className="font-bold text-emerald-300 block mb-1">Phase 2: NLP Audit</span>
                          Inspect extracted entities, Google Knowledge Graph IDs, and common phrases.
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                          <span className="font-bold text-amber-300 block mb-1">Phase 3: GEO Optimization</span>
                          Review E-E-A-T scorecards, anti-spam checks, and citable rewrites.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <div className="h-8 w-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 font-mono text-sm">
                      3
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-100 text-sm">
                        Apply the "Atomic Rewrites" to Your Content
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Go to <strong>Phase 3: GEO Optimization</strong>. Click the copy icon next to any <em>Optimized Citable Rewrite</em>. Paste these precise, fact-dense sentence blueprints into your website's intro or meta description to maximize AI search citations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: QUALITY GUIDELINES */}
            {activeSection === "guidelines" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display mb-1">
                    Google Quality Rater Guidelines (2025 Ruleset)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Key principles used by search evaluation algorithms and human quality raters.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-mono">
                      <ShieldCheck className="h-4 w-4" />
                      The Trust Mandate
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      In E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness), <strong>Trust is the center</strong>. Even if an author has great writing and design, if the advice is factually inaccurate or hazardous (especially on health/finance YMYL topics), the rating drops immediately.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase font-mono">
                      <Award className="h-4 w-4" />
                      Scaled Content Abuse Penalty
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Mass-produced, programmatic AI pages designed solely to manipulate rankings without original data or firsthand evidence are penalized under modern anti-spam rules.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase font-mono">
                      <Sparkles className="h-4 w-4" />
                      The "Atomic Sentence" Rule
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      AI retrieval engines (RAG) extract self-contained declarative statements. Sentences with specific numbers, verified organizations, and explicit standards rank higher for AI answers than ambiguous marketing adjectives.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase font-mono">
                      <Layers className="h-4 w-4" />
                      Entity Salience &amp; Knowledge Graph
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Search engines connect topics using recognized real-world entities (Wikipedia links, Wikidata IDs). Pages that establish clear entity relationships build stronger topic authority.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: GLOSSARY */}
            {activeSection === "glossary" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-display mb-1">
                    Plain-English Glossary
                  </h3>
                  <p className="text-xs text-slate-400">
                    Demystifying technical terms used across this app.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <span className="font-bold text-indigo-300 font-mono text-[11px] block">
                      GEO (Generative Engine Optimization)
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      The practice of optimizing content so AI chatbots (ChatGPT, Perplexity, Gemini, AI Overviews) quote and link to your website as a trusted primary source.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <span className="font-bold text-indigo-300 font-mono text-[11px] block">
                      E-E-A-T
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      Experience, Expertise, Authoritativeness, and Trustworthiness. Google's benchmark for evaluating whether content is created by a credible, knowledgeable source.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <span className="font-bold text-indigo-300 font-mono text-[11px] block">
                      YMYL (Your Money or Your Life)
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      Topics that could significantly impact a person's health, financial security, or safety (e.g., medical advice, insurance, legal guidance). Subject to the highest quality standards.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <span className="font-bold text-indigo-300 font-mono text-[11px] block">
                      Atomic Sentence
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      A clear, stand-alone factual statement containing verifiable entities and numbers, ideal for AI synthesis engines to cite without needing surrounding context.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <span className="font-bold text-indigo-300 font-mono text-[11px] block">
                      N-Grams (Bigrams &amp; Trigrams)
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      Frequent 2-word (bigram) and 3-word (trigram) combinations appearing across top results. Useful for understanding standard vocabulary expected in a niche.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <span className="font-bold text-indigo-300 font-mono text-[11px] block">
                      SCRB (Special Content Result Block)
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      Rich Google search blocks outside standard blue links, such as Video Carousels, Local Map Packs, and People Also Ask modules.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* MODAL FOOTER */}
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              Ready to explore? Pick a preset above or try the interactive sandbox.
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
            >
              Got It, Close Guide
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
