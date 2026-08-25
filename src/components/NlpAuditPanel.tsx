import React, { useState } from "react";
import { NLPAudit, EntityRecord, OrganicResult } from "../types";
import {
  Tag,
  BookOpen,
  Cpu,
  Layers,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  GitCommit,
  GitMerge,
  Search,
  Filter,
} from "lucide-react";

interface NlpAuditPanelProps {
  nlpAudit: NLPAudit;
  organicResults: OrganicResult[];
  focusedUrl?: string;
  onFocusUrl?: (url: string) => void;
}

export const NlpAuditPanel: React.FC<NlpAuditPanelProps> = ({
  nlpAudit,
  organicResults,
  focusedUrl,
  onFocusUrl,
}) => {
  const [selectedEntity, setSelectedEntity] = useState<EntityRecord | null>(null);
  const [ngramTab, setNgramTab] = useState<"bigrams" | "trigrams">("bigrams");
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({ root: true });

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  // Safe checks for arrays
  const entities = nlpAudit?.entities || [];
  const bigrams = nlpAudit?.ngrams?.bigrams || [];
  const trigrams = nlpAudit?.ngrams?.trigrams || [];
  const triples = nlpAudit?.triples || [];
  const rawTokens = nlpAudit?.raw_tokens || [];

  // Filter which entities belong to a focused organic result URL (overlap calculation)
  const filteredEntities = focusedUrl
    ? entities.filter((e) => e.urls_present_in?.includes(focusedUrl))
    : entities;

  const currentNgrams = ngramTab === "bigrams" ? bigrams : trigrams;
  const maxNgramCount = currentNgrams.length > 0 ? Math.max(...currentNgrams.map((n) => n.count)) : 1;

  // Recursive Logic Tree Renderer
  const renderLogicTree = (node: any, path: string = "root"): React.ReactNode => {
    if (!node) return null;
    const isExpanded = !!expandedNodes[path];
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="pl-6 select-none font-mono text-xs text-white" key={path}>
        <div className="flex items-center gap-2 py-1 hover:bg-slate-800/40 rounded px-2 transition-all">
          {hasChildren ? (
            <button
              onClick={() => toggleNode(path)}
              className="p-0.5 rounded text-slate-500 hover:text-indigo-400 hover:bg-slate-800"
            >
              {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </button>
          ) : (
            <GitCommit className="h-3 w-3 text-slate-600 ml-1.5 shrink-0" />
          )}

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-emerald-400 font-bold bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-[11px]">
              "{node.word}"
            </span>
            <span className="text-slate-500 text-[10px]">::</span>
            <span className="text-indigo-300 font-medium text-[10px] bg-indigo-950/40 border border-indigo-900/30 px-1 rounded uppercase tracking-wide">
              {node.pos}
            </span>
            <span className="text-slate-500 text-[10px] italic">
              ({node.relation})
            </span>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="border-l border-slate-800 ml-2.5 mt-1 space-y-1">
            {node.children.map((child: any, idx: number) =>
              renderLogicTree(child, `${path}-${idx}`)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4" id="nlp-audit-panel">
      {/* GUIDANCE CALLOUT BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 shrink-0">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <span className="font-bold text-slate-200 block text-xs">
              Phase 2 Purpose: Competitor Entity &amp; Vocabulary Gap Analysis
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Modern search engines rank pages that cover the full semantic cluster of a topic. Check what entities, Wikipedia links, and high-frequency n-grams top competitors use.
            </p>
          </div>
        </div>
        <div className="text-[11px] text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-850 shrink-0 font-mono">
          💡 <span className="text-slate-300">Action:</span> Include top bigrams &amp; entities in your drafts!
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* 1. ENTITY & SALIENCE & OVERLAP PANEL (Bento Left - 7 Cols) */}
      <div className="xl:col-span-7 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 font-display">
                <Cpu className="h-4 w-4 text-emerald-400" /> Entity & Salience Overlap
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {focusedUrl
                  ? `Filtering entities found inside organic path: ${focusedUrl.split("/")[2]}`
                  : "Click any organic result to highlight overlapping extracted NLP entities."}
              </p>
            </div>
            {focusedUrl && (
              <button
                onClick={() => onFocusUrl?.("")}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-mono bg-indigo-950/40 border border-indigo-800/40 px-2 py-1 rounded"
              >
                Clear URL Filter
              </button>
            )}
          </div>

          {/* Overlap Matrix layout info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Entity roster */}
            <div className="bg-slate-950 border border-slate-850 rounded-xl p-3 max-h-[380px] overflow-y-auto custom-scrollbar">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 shrink-0">
                Extracted NLP Entities ({filteredEntities.length})
              </div>
              {filteredEntities.length === 0 ? (
                <div className="text-xs text-slate-500 p-4 italic text-center">
                  No overlapping entities found.
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredEntities.map((e, idx) => {
                    const isSelected = selectedEntity?.name === e.name;
                    return (
                      <button
                        key={idx}
                        id={`entity-btn-${idx}`}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left border ${
                          isSelected
                            ? "bg-emerald-950/20 border-emerald-500"
                            : "bg-slate-900/60 border-slate-850 hover:border-slate-800 hover:bg-slate-900"
                        }`}
                        onClick={() => setSelectedEntity(e)}
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-slate-100 truncate">
                            {e.name}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                            Type: <span className="text-slate-300">{e.type}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[10px] text-emerald-400 font-mono font-medium">
                            {Math.round(e.salience * 100)}%
                          </div>
                          <div className="text-[9px] text-slate-500 font-mono">
                            Salience
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Entity detailed inspect pane */}
            <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 flex flex-col justify-between min-h-[300px]">
              {selectedEntity ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] bg-indigo-950 text-indigo-300 font-mono px-2 py-0.5 rounded uppercase border border-indigo-850">
                      Entity Focus
                    </span>
                    <h4 className="text-base font-bold text-slate-100 mt-2 font-display">
                      {selectedEntity.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Grammatical NLP Type: <span className="text-slate-300 font-semibold">{selectedEntity.type}</span>
                    </p>
                  </div>

                  {/* Salience Bar */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span>Salience Score (Frequency & Weight)</span>
                      <span className="text-emerald-400 font-bold">{(selectedEntity.salience).toFixed(2)}</span>
                    </div>
                    <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all rounded-full"
                        style={{ width: `${selectedEntity.salience * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Knowledge Graph and Authority Verification */}
                  <div className="space-y-2 pt-2 border-t border-slate-900">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Reputation Credentials Found
                    </div>
                    {selectedEntity.wikipedia_url ? (
                      <a
                        href={selectedEntity.wikipedia_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between text-xs text-blue-400 hover:underline bg-slate-900/60 border border-slate-850 px-2.5 py-1.5 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                          <span>Wikipedia Reference Manual</span>
                        </div>
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                    ) : (
                      <div className="text-[10px] text-slate-500 italic px-2.5 py-1 bg-slate-900/20 border border-slate-850/40 rounded">
                        No Wikipedia reputation record established.
                      </div>
                    )}

                    {selectedEntity.knowledge_graph_id ? (
                      <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-900/60 border border-slate-850 px-2.5 py-1.5 rounded-lg font-mono">
                        <div className="flex items-center gap-2">
                          <Tag className="h-3.5 w-3.5 text-slate-400" />
                          <span>Google Knowledge Graph ID</span>
                        </div>
                        <span className="text-[10px] text-indigo-400 font-bold bg-slate-950 px-1.5 py-0.5 border border-slate-850 rounded">
                          {selectedEntity.knowledge_graph_id}
                        </span>
                      </div>
                    ) : (
                      <div className="text-[10px] text-slate-500 italic px-2.5 py-1 bg-slate-900/20 border border-slate-850/40 rounded">
                        No Knowledge Graph entity ID aligned.
                      </div>
                    )}
                  </div>

                  {/* Overlap occurrences lists */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-900">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Present in organic listings ({selectedEntity.urls_present_in?.length || 0})
                    </div>
                    <div className="max-h-[90px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                      {selectedEntity.urls_present_in?.map((url, idx) => {
                        const org = organicResults.find((o) => o.url === url);
                        return (
                          <div
                            key={idx}
                            onClick={() => onFocusUrl?.(url)}
                            className="text-[10px] font-mono text-indigo-300 cursor-pointer truncate hover:underline py-0.5 flex items-center gap-1.5"
                          >
                            <span className="h-1 w-1 rounded-full bg-indigo-500"></span>
                            <span>{org ? `[Pos ${org.position}] ` : ""}{url}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 text-slate-500 text-center space-y-2 p-4">
                  <Cpu className="h-8 w-8 opacity-30 text-indigo-400" />
                  <p className="text-xs italic leading-normal">
                    Select an NLP entity on the left checklist to examine salience weights, entity-URL overlaps, and authority registries.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. SEMANTIC TRIPLES AND RAW TOKENS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Query tokenization */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between" id="query-tokenizer-box">
            <div>
              <h3 className="text-xs font-bold text-slate-200 tracking-widest font-mono uppercase mb-1">
                Query Tokenizer & POS
              </h3>
              <p className="text-[10px] text-slate-400 mb-3 leading-normal">
                Grammatical decomposition and part-of-speech structure representing the original query.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 py-3 bg-slate-950/60 p-3 rounded-xl border border-slate-850/50">
              {rawTokens.length > 0 ? (
                rawTokens.map((tok, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-2 bg-slate-900 rounded border border-slate-800 text-center grow"
                  >
                    <span className="text-xs font-bold font-mono text-emerald-300">
                      "{tok.token}"
                    </span>
                    <span className="h-px bg-slate-800 w-full my-1.5"></span>
                    <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest leading-none">
                      {tok.pos}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-[11px] text-slate-500 italic p-2">
                  No query tokens extracted.
                </div>
              )}
            </div>
          </div>

          {/* Semantic triples flow */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between" id="semantic-triples-box">
            <div>
              <h3 className="text-xs font-bold text-slate-200 tracking-widest font-mono uppercase mb-1">
                Semantic Fact Triples
              </h3>
              <p className="text-[10px] text-slate-400 mb-3 leading-normal">
                Subject-Predicate-Object statements mined to represent structured knowledge on the segment.
              </p>
            </div>
            <div className="space-y-2 overflow-y-auto max-h-[140px] pr-1 scrollbar-thin">
              {triples.length > 0 ? (
                triples.map((t, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col p-2 bg-slate-950/60 rounded-xl border border-slate-850/40 text-[10px] font-mono font-medium text-slate-200 space-y-1"
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-400">[S]</span>
                      <span className="truncate">{t.subject}</span>
                    </div>
                    <div className="flex items-center gap-1 border-l border-indigo-500/30 pl-2">
                      <span className="text-indigo-400 font-bold">➔ (P)</span>
                      <span className="truncate text-indigo-300 uppercase italic text-[9px]">{t.predicate}</span>
                    </div>
                    <div className="flex items-center gap-1 border-l border-indigo-500/30 pl-2">
                      <span className="text-sky-400">[O]</span>
                      <span className="truncate text-slate-300">{t.object}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-[11px] text-slate-500 italic p-2">
                  No semantic triples extracted.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. GRAMMAR & VOCAB DENSITY (Bento Right - 5 Cols) */}
      <div className="xl:col-span-4 space-y-6">
        {/* N-Gram Density Bar charts */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg" id="ngram-density-box">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-200 font-display flex items-center gap-1">
                <Layers className="h-4 w-4 text-indigo-400" /> N-Gram Density Audit
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Key phrases across top listings, critical for authority anchors.
              </p>
            </div>
            {/* toggle btn */}
            <div className="flex rounded-md p-0.5 bg-slate-950 border border-slate-850">
              <button
                id="ngram-tab-bigrams"
                onClick={() => setNgramTab("bigrams")}
                className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
                  ngramTab === "bigrams" ? "bg-indigo-505/20 text-indigo-300 border border-indigo-900/50 bg-slate-900" : "text-slate-500"
                }`}
              >
                Bigrams
              </button>
              <button
                id="ngram-tab-trigrams"
                onClick={() => setNgramTab("trigrams")}
                className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
                  ngramTab === "trigrams" ? "bg-indigo-505/20 text-indigo-300 border border-indigo-900/50 bg-slate-900" : "text-slate-500"
                }`}
              >
                Trigrams
              </button>
            </div>
          </div>

          <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
            {currentNgrams.length > 0 ? (
              currentNgrams.map((ng, index) => {
                const ratioPercent = Math.max((ng.count / maxNgramCount) * 100, 8);
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-200 truncate font-semibold">"{ng.phrase}"</span>
                      <span className="text-indigo-400 font-bold shrink-0">{ng.count}x</span>
                    </div>
                    <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 transition-all rounded-full"
                        style={{ width: `${ratioPercent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-xs text-slate-500 italic p-4 text-center">
                No phrase pattern density mapped.
              </div>
            )}
          </div>
        </div>

        {/* Dependency Parser Logic Tree */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between" id="logic-tree-box">
          <div>
            <h3 className="text-sm font-bold text-slate-200 font-display flex items-center gap-1.5 mb-1">
              <GitMerge className="h-4 w-4 text-emerald-400" /> Dependency Logic Parse
            </h3>
            <p className="text-[10px] text-slate-400 mb-4 leading-normal">
              A linguistic dependency parse of the search query layout representing grammatical hierarchy and headwords.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl max-h-[300px] overflow-auto custom-scrollbar">
            {nlpAudit?.logic_tree ? (
              renderLogicTree(nlpAudit.logic_tree)
            ) : (
              <div className="text-xs text-slate-500 italic p-4 text-center">
                Grammar tree could not be compiled.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
