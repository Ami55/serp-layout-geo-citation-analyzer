export interface AIOverview {
  present: boolean;
  summary: string;
  citations: string[];
}

export interface SponsoredAd {
  title: string;
  url: string;
  snippet: string;
}

export interface SCRB {
  type: "Carousel" | "Local Map" | "Video" | "Product Shelf" | "Other SCRB";
  description: string;
}

export interface IntentExploration {
  paa: string[];
  related_searches: string[];
}

export interface OrganicResult {
  position: number;
  url: string;
  title: string;
  snippet: string;
}

export interface SERPMap {
  query: string;
  ai_overview: AIOverview;
  sponsored_count: number;
  sponsored_ads: SponsoredAd[];
  scrbs: SCRB[];
  intent_exploration: IntentExploration;
  organic_results: OrganicResult[];
}

export interface EntityRecord {
  name: string;
  type: "Person" | "Organization" | "Product" | "Event" | "Location" | "Other";
  salience: number; // 0.0 - 1.0
  wikipedia_url: string;
  knowledge_graph_id: string; /** KG ID e.g. /m/02mjmr */
  urls_present_in: string[];
}

export interface NGram {
  phrase: string;
  count: number;
}

export interface NGramDensity {
  bigrams: NGram[];
  trigrams: NGram[];
}

export interface LogicTree {
  word: string;
  pos: string;
  relation: string;
  children?: LogicTree[];
}

export interface SemanticTriple {
  subject: string;
  predicate: string;
  object: string;
}

export interface QueryToken {
  token: string;
  pos: string;
}

export interface NLPAudit {
  entities: EntityRecord[];
  ngrams: NGramDensity;
  logic_tree: LogicTree;
  triples: SemanticTriple[];
  raw_tokens: QueryToken[];
}

export interface PredictedPrompt {
  prompt: string;
  intent: string;
  target_url: string;
}

export interface CitableRewrite {
  original_sentence: string;
  citable_rewrite: string;
  reason: string;
  target_url: string;
}

export interface EEATRecord {
  url: string;
  title: string;
  experience: number; // 1 - 10
  expertise: number; // 1 - 10
  authoritativeness: number; // 1 - 10
  trustworthiness: number; // 1 - 10 (Trust Mandate: most critical)
  reputation_verified_via: string; // e.g., "Wikipedia author search, Crunchbase profile, review aggregation"
  justification: string;
}

export interface AntiSpamRecord {
  url: string;
  title: string;
  is_scaled_content: boolean;
  flags: string[]; // e.g. "Low Effort", "Repetitive phrasing", "Generic AI formatting"
  details: string;
}

export interface GEOInsights {
  predicted_prompts: PredictedPrompt[];
  citable_rewrites: CitableRewrite[];
  eeat_scorecard: EEATRecord[];
  anti_spam_check: AntiSpamRecord[];
}

export interface SERPAnalysisResponse {
  serp_map: SERPMap;
  nlp_audit: NLPAudit;
  geo_insights: GEOInsights;
}

export interface AnalysisJob {
  id: string;
  timestamp: string;
  query: string;
  response: SERPAnalysisResponse;
}
