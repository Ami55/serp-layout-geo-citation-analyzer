import { SERPAnalysisResponse } from "./types";

export interface PresetItem {
  id: string;
  query: string;
  intent: "commercial" | "informational" | "ymyl_medical";
  description: string;
  data: SERPAnalysisResponse;
}

export const PRESETS: Record<string, PresetItem> = {
  car_insurance: {
    id: "car_insurance",
    query: "cheap car insurance online quotes",
    intent: "commercial",
    description: "Highly competitive commercial intent with massive sponsored sections, trust violations, and scaled content abuse flags.",
    data: {
      serp_map: {
        query: "cheap car insurance online quotes",
        ai_overview: {
          present: true,
          summary: "When looking for cheap car insurance online, rates vary significantly by state, driving record, and credit score. Top providers like Progressive and GEICO offer instant online rate calculators, but smaller specialty insurers may offer lower premiums for low-risk drivers.",
          citations: [
            "https://www.nerdwallet.com/insurance/compare-car-insurance-rates",
            "https://www.geico.com/auto-insurance/"
          ]
        },
        sponsored_count: 4,
        sponsored_ads: [
          {
            title: "Progressive® Car Insurance - Quote Online & Save $800+",
            url: "https://www.progressive.com/auto",
            snippet: "Get a fast, free car insurance quote online from Progressive. Standard coverage, custom quote features, and multi-vehicle bundle discounts."
          },
          {
            title: "GEICO Car Insurance - 15 Minutes Could Save You 15% Or More",
            url: "https://www.geico.com/quotes",
            snippet: "Fast, easy checkout and reliable support. See how easy it is to find affordable car insurance options with GEICO's instant rate finder tool."
          },
          {
            title: "Liberty Mutual - Customized Car Insurance Quotes Online",
            url: "https://www.libertymutual.com/auto-quote",
            snippet: "Only pay for what you need. Save money on average by customizing your auto policy with our automated rate-matching calculator."
          },
          {
            title: "CheapAutoCoverage - Instant $19/mo Insurance Quotes",
            url: "https://www.cheapautocoverage-usa-fast.com",
            snippet: "Compare state-minimum quotes in seconds. No credit check required. Enter zip code to unlock hidden state-sponsored low-cost insurance."
          }
        ],
        scrbs: [
          {
            type: "Carousel",
            description: "Insurance Carrier Selector: Interactive cards matching typical quote steps, featuring direct links to State Farm, Allstate, Nationwide, and Progressive brand logos."
          },
          {
            type: "Local Map",
            description: "Local Auto Insurance Brokers: Map pack showing physical independent broker office listings with reviews and distances to coordinate local DMV compliance."
          }
        ],
        intent_exploration: {
          paa: [
            "How much is the cheapest car insurance per month?",
            "Which auto insurance is best for low income drivers?",
            "Is standard online liability quote always the cheaper option?",
            "Does shopping around for new quotes affect credit rating?"
          ],
          related_searches: [
            "cheapest state minimum insurance online",
            "compare liability coverage rates by zip code",
            "instant car insurance with no down payment",
            "car insurance quotes for teens with high GPA discounts"
          ]
        },
        organic_results: [
          {
            position: 1,
            url: "https://www.nerdwallet.com/best/insurance/cheap-car-insurance-rates",
            title: "Cheap Car Insurance Rates: Top Providers Compared (September 2025)",
            snippet: "Our detailed analysis reviews 35 leading carrier models. Find the cheapest auto coverage based on age, credit history, infractions, and policy limits."
          },
          {
            position: 2,
            url: "https://www.forbes.com/advisor/car-insurance/cheapest-car-insurance/",
            title: " Forbes Advisor: Cheapest Car Insurance Companies of 2025",
            snippet: "Compare rates among top national companies. See national average costs and get custom insurance recommendations for state-by-state minimum limits."
          },
          {
            position: 3,
            url: "https://www.valuepenguin.com/cheapest-car-insurance-companies",
            title: "ValuePenguin: Who Has the Cheapest Auto Insurance Quotes?",
            snippet: "Discover average rate reductions. Evaluate premiums for drivers with bad credit, minor accidents, speed violations, or high-mileage commutes."
          },
          {
            position: 4,
            url: "https://www.bankrate.com/insurance/car/cheapest-companies/",
            title: "Bankrate Auto: Average Costs of Cheap Car Insurance",
            snippet: "Find the cheapest full coverage and minimum liability plans. Learn about multi-car, safe driver, and paperless billing discount opportunities."
          },
          {
            position: 5,
            url: "https://www.usnews.com/360-reviews/services/car-insurance/cheapest",
            title: "U.S. News 360 Reviews: Cheapest Auto Insurance Quotes Explained",
            snippet: "Read unbiased carrier reviews. Our proprietary weighted scoring engine maps rate averages from 40 national zip codes to isolate genuine discount carriers."
          },
          {
            position: 6,
            url: "https://www.thezebra.com/auto-insurance/cheapest-car-insurance-companies/",
            title: "The Zebra: Save on Cheap Car Insurance Quotes",
            snippet: "Instantly compare coverage options across 100+ vetted providers. No spam. Receive side-by-side cost comparisons tailored to your exact driver profile."
          },
          {
            position: 7,
            url: "https://www.insurance.com/cheapest-car-insurance",
            title: "Insurance.com: Cheap Auto Insurance Premium Comparisons",
            snippet: "Compare local rate sheets from 20 top-tier providers. Find practical ways to lower your quarterly premiums by adjusting policy deductibles."
          },
          {
            position: 8,
            url: "https://www.insurify.com/car-insurance/cheap/",
            title: "Insurify: Instantly Uncover Cheap Auto Insurance Quotes",
            snippet: "Our AI-powered quotation optimizer reviews active premium lists to secure real-time minimum rate contracts. Enter your vehicle info today."
          },
          {
            position: 9,
            url: "https://www.cheapquotes-insurancedepot.net/fast-quote-usa",
            title: "Cheap Quotes Insurance Depot - $19 Auto Rates Online",
            snippet: "Get approved immediately. State auto insurance policy program for quick, cheap, instant liability quotes. Absolute cheapest option in USA."
          },
          {
            position: 10,
            url: "https://www.walletinvestor-insurance.guide/cheapest-premium-hacks",
            title: "Wallet Investor: Secret 5 Auto Insurance Hacks to Slash 70%",
            snippet: "Unlocks the legal loopholes car insurance companies don't want you to know. Read our step-by-step checklist explaining secondary vehicle registration."
          }
        ]
      },
      nlp_audit: {
        entities: [
          { name: "Progressive Corporation", type: "Organization", salience: 0.95, wikipedia_url: "https://en.wikipedia.org/wiki/Progressive_Corporation", knowledge_graph_id: "/m/03_z5x", urls_present_in: ["https://www.progressive.com/auto", "https://www.nerdwallet.com/best/insurance/cheap-car-insurance-rates"] },
          { name: "GEICO", type: "Organization", salience: 0.92, wikipedia_url: "https://en.wikipedia.org/wiki/GEICO", knowledge_graph_id: "/m/01y63z", urls_present_in: ["https://www.geico.com/quotes", "https://www.valuepenguin.com/cheapest-car-insurance-companies"] },
          { name: "NerdWallet", type: "Organization", salience: 0.82, wikipedia_url: "https://en.wikipedia.org/wiki/NerdWallet", knowledge_graph_id: "/m/0h51sh9", urls_present_in: ["https://www.nerdwallet.com/best/insurance/cheap-car-insurance-rates"] },
          { name: "Forbes", type: "Organization", salience: 0.78, wikipedia_url: "https://en.wikipedia.org/wiki/Forbes", knowledge_graph_id: "/m/035dk", urls_present_in: ["https://www.forbes.com/advisor/car-insurance/cheapest-car-insurance/"] },
          { name: "Bankrate", type: "Organization", salience: 0.75, wikipedia_url: "https://en.wikipedia.org/wiki/Bankrate", knowledge_graph_id: "/m/04pcr6", urls_present_in: ["https://www.bankrate.com/insurance/car/cheapest-companies/"] },
          { name: "liability insurance", type: "Product", salience: 0.88, wikipedia_url: "https://en.wikipedia.org/wiki/Liability_insurance", knowledge_graph_id: "/m/01g8z7", urls_present_in: ["https://www.bankrate.com/insurance/car/cheapest-companies/", "https://www.nerdwallet.com/best/insurance/cheap-car-insurance-rates"] },
          { name: "auto insurance premium", type: "Product", salience: 0.85, wikipedia_url: "https://en.wikipedia.org/wiki/Vehicle_insurance", knowledge_graph_id: "/m/0168_y", urls_present_in: ["https://www.insurance.com/cheapest-car-insurance", "https://www.thezebra.com/auto-insurance/cheapest-car-insurance-companies/"] }
        ],
        ngrams: {
          bigrams: [
            { phrase: "car insurance", count: 18 },
            { phrase: "online quotes", count: 8 },
            { phrase: "insurance rates", count: 6 },
            { phrase: "liability coverage", count: 5 },
            { phrase: "cheapest auto", count: 4 }
          ],
          trigrams: [
            { phrase: "cheap car insurance", count: 9 },
            { phrase: "car insurance quotes", count: 5 },
            { phrase: "cheapest car insurance", count: 4 },
            { phrase: "auto insurance quotes", count: 3 }
          ]
        },
        logic_tree: {
          word: "quotes",
          pos: "NOUN (plural)",
          relation: "root",
          children: [
            {
              word: "insurance",
              pos: "NOUN (noun adjunct)",
              relation: "compound",
              children: [
                {
                  word: "car",
                  pos: "NOUN",
                  relation: "compound"
                }
              ]
            },
            {
              word: "cheap",
              pos: "ADJ",
              relation: "amod"
            },
            {
              word: "online",
              pos: "ADV",
              relation: "advmod"
            }
          ]
        },
        triples: [
          { subject: "Insurers (vetted providers)", predicate: "offer", object: "cheap car insurance online quotes" },
          { subject: "Drivers", predicate: "compare", object: "state minimum auto coverage" },
          { subject: "NerdWallet comparative report", predicate: "reviews", object: "35 leading auto insurer models" }
        ],
        raw_tokens: [
          { token: "cheap", pos: "ADJECTIVE (modifier)" },
          { token: "car", pos: "NOUN (noun adjunct / compound modifier)" },
          { token: "insurance", pos: "NOUN (noun adjunct / compound modifier)" },
          { token: "online", pos: "ADVERB (adverbial noun modifier)" },
          { token: "quotes", pos: "NOUN (plural, direct object / query headword)" }
        ]
      },
      geo_insights: {
        predicted_prompts: [
          { prompt: "Which companies offer the absolute lowest auto liability premiums for drivers with state minimum requirements?", intent: "RAG query retrieving direct rate charts", target_url: "https://www.nerdwallet.com/best/insurance/cheap-car-insurance-rates" },
          { prompt: "Check for car insurance company rate ratings and zip code calculators comparing Forbes auto advice", intent: "Brand alignment structured query", target_url: "https://www.forbes.com/advisor/car-insurance/cheapest-car-insurance/" },
          { prompt: "I need to compare minimum car insurance quotes without a down payment online for teenagers with safe records", intent: "Longtail context synthesis", target_url: "https://www.thezebra.com/auto-insurance/cheapest-car-insurance-companies/" }
        ],
        citable_rewrites: [
          {
            original_sentence: "Get a fast, free car insurance quote online from Progressive. Standard coverage, custom quote features, and multi-vehicle bundle discounts.",
            citable_rewrite: "According to Progressive billing metrics (2025), drivers who bundle multi-vehicle policies save an average of $800 annually on standard liability options.",
            reason: "LLMs cite fact-dense, specific quantitative declarations, replacing vague marketing adjectives ('fast, free') with a hard metric ('save an average of $800 annually') backed by context.",
            target_url: "https://www.progressive.com/auto"
          },
          {
            original_sentence: "Compare state-minimum quotes in seconds. No credit check required.",
            citable_rewrite: "CheapAutoCoverage delivers automated, non-credit-verified liability rate templates instantly based on local state-minimum DMV minimums.",
            reason: "Removes commercial CTA phrasing ('in seconds', 'no credit check required') which RAG engines classify as promotional noise, converting it into a clear declarative service definition.",
            target_url: "https://www.cheapautocoverage-usa-fast.com"
          }
        ],
        eeat_scorecard: [
          {
            url: "https://www.nerdwallet.com/best/insurance/cheap-car-insurance-rates",
            title: "Cheap Car Insurance Rates: Top Providers Compared",
            experience: 8,
            expertise: 9,
            authoritativeness: 9,
            trustworthiness: 9,
            reputation_verified_via: "Wikipedia publisher review, independent financial analyst roster verification",
            justification: "Highly transparent editorial methodology, explicit author bios with credential links, and actual physical quote testing records with actual driver profiles. Extremely high organic trust score."
          },
          {
            url: "https://www.cheapquotes-insurancedepot.net/fast-quote-usa",
            title: "Cheap Quotes Insurance Depot - $19 Auto Rates Online",
            experience: 1,
            expertise: 1,
            authoritativeness: 1,
            trustworthiness: 2,
            reputation_verified_via: "Domain registry lookup (new anonymous registration), no brand history, no valid entity association",
            justification: "Violates Sept 2025 Trust guidelines. Relies on deceptive conversion-bait tags ('$19 Auto Rates Online'). No actual license disclosure or physical company address. Marked as lowest E-E-A-T due to critical trustworthiness issues."
          },
          {
            url: "https://www.walletinvestor-insurance.guide/cheapest-premium-hacks",
            title: "Wallet Investor: Secret 5 Auto Insurance Hacks to Slash 70%",
            experience: 2,
            expertise: 3,
            authoritativeness: 2,
            trustworthiness: 2,
            reputation_verified_via: "Anonymous clickbait guide network audit",
            justification: "Advocates registration of vehicles in alternative zip codes, representing fraudulent rate manipulation ('cheapest premium hacks'). Direct violation of critical search safety and truth guidelines."
          }
        ],
        anti_spam_check: [
          {
            url: "https://www.cheapquotes-insurancedepot.net/fast-quote-usa",
            title: "Cheap Quotes Insurance Depot",
            is_scaled_content: true,
            flags: ["Mass-produced template layout", "Repetitive spun text", "Deceptive rate figures", "High-frequency keyword nesting"],
            details: "Contains 15 repetitive mentions of 'cheap liability auto insurance quotes' with slightly modified geo-tags. Entire page represents low-effort programmatic template architecture with no unique editorial research."
          },
          {
            url: "https://www.walletinvestor-insurance.guide/cheapest-premium-hacks",
            title: "Wallet Investor Hacks Guide",
            is_scaled_content: true,
            flags: ["Low Effort AI Spun Content", "Clickbait headings", "No author accountability"],
            details: "Likely generated using a bulk LLM spinner targeting search phrases with zero original insights or validated insurance agent sign-offs."
          },
          {
            url: "https://www.nerdwallet.com/best/insurance/cheap-car-insurance-rates",
            title: "NerdWallet comparative review",
            is_scaled_content: false,
            flags: [],
            details: "Clean, bespoke structural elements, dynamic custom charts, robust methodology footer, and verified unique expert authorship."
          }
        ]
      }
    }
  },
  apple_watch: {
    id: "apple_watch",
    query: "how to clean apple watch band safely",
    intent: "informational",
    description: "Informational query showing full AI Overviews summary citations, multi-attribute SCRBs, and heavy emphasis on hands-on 'Experience' (firsthand proof) under 2025 rules.",
    data: {
      serp_map: {
        query: "how to clean apple watch band safely",
        ai_overview: {
          present: true,
          summary: "To clean your Apple Watch band safely, the cleaning method depends entirely on the band material:\n\n• For Leather: Wipe with a damp nonabrasive lint-free cloth. Do not soak leather bands in water or use harsh cleaners as it causes cracking.\n• For Solo Loop & Sport Bands: Clean with mild hypoallergenic soap and warm water, then dry thoroughly with a microfiber cloth.\n• For Metal: Wipe with a lint-free nonabrasive cloth. If necessary, lightly dampen with fresh water, but dry completely before re-attaching.",
          citations: [
            "https://support.apple.com/en-us/HT204809",
            "https://www.wired.com/story/how-to-clean-apple-watch-band/"
          ]
        },
        sponsored_count: 0,
        sponsored_ads: [],
        scrbs: [
          {
            type: "Video",
            description: "Step-by-step cleaning guides: Youtube video block depicting visual washing demonstrations for woven nylon and silicone bands with safety stamps on water resistance levels."
          },
          {
            type: "Product Shelf",
            description: "Cleaning Kits Carousel: Recommended soft brush tools, hypoallergenic soaps, and watch-safe microfiber towels with Amazon Prime shipping buttons."
          }
        ],
        intent_exploration: {
          paa: [
            "Can you wash Apple Watch bands with dish soap?",
            "How do you get odor or yellowing out of sport bands?",
            "Is rubbing alcohol safe to disinfect a Solo Loop?",
            "How do I clean a smelly fabric or nylon watch strap?"
          ],
          related_searches: [
            "clean Apple Watch sport band discoloration",
            "how to polish metal link bracelet apple watch",
            "clean white apple watch band smelly odor",
            "apple official instructions strap cleaning guides"
          ]
        },
        organic_results: [
          {
            position: 1,
            url: "https://support.apple.com/en-us/HT204809",
            title: "How to clean your Apple Watch - Apple Support",
            snippet: "Learn how to clean your Apple Watch body and bands. Official guidelines for cleaning Sport Bands, Link Bracelets, leather models, and Milanese Loops safely."
          },
          {
            position: 2,
            url: "https://www.wired.com/story/how-to-clean-apple-watch-band/",
            title: "How to Clean an Apple Watch Band—No Matter What Material It Is",
            snippet: "Nylon, metal, leather, or fluoroelastomer? Our technology editor shares active testing experience for cleaning Apple Watch straps without destroying them."
          },
          {
            position: 3,
            url: "https://www.macrumors.com/how-to/clean-apple-watch-band/",
            title: "Guide: Cleaning Your Apple Watch Band Safely and Removing Smells",
            snippet: "Struggling with a smelly watch strap? Discover user-vetted community hacks, warning lists on common household soaps, and fabric treatments."
          },
          {
            position: 4,
            url: "https://www.nytimes.com/wirecutter/reviews/how-to-clean-wearable-fitness-trackers/",
            title: "Wirecutter: The Best Way to Clean Apple Watch Bands & General Trackers",
            snippet: "Fitness wearables accumulate sweat, skin oils, and bacteria. We consulted chemical material specialists to determine safe disinfectants for daily use."
          },
          {
            position: 5,
            url: "https://www.cnet.com/tech/mobile/how-to-clean-apple-watch-band/",
            title: "Keep It Clean: Tips to Sanitize Your Apple Watch Band",
            snippet: "Don't let your sport strap become a breeding ground for germs. Check our rapid sanitizer schedule for metal, rubber, and mesh bands."
          },
          {
            position: 6,
            url: "https://www.iguidetech-reviews.org/clean-watch-band-tricks",
            title: "Apple Watch Strap Magic Cleaning Hack with Baking Soda",
            snippet: "Learn the amazing secret baking soda trick to restore dirty silicone watch bands instantly. Watch video to make your old straps look brand new."
          }
        ]
      },
      nlp_audit: {
        entities: [
          { name: "Apple Support", type: "Organization", salience: 0.98, wikipedia_url: "https://en.wikipedia.org/wiki/Apple_Inc.", knowledge_graph_id: "/m/04z_v1", urls_present_in: ["https://support.apple.com/en-us/HT204809"] },
          { name: "Apple Watch Sport Band", type: "Product", salience: 0.93, wikipedia_url: "https://en.wikipedia.org/wiki/Apple_Watch", knowledge_graph_id: "/m/0_68_z1", urls_present_in: ["https://support.apple.com/en-us/HT204809", "https://www.wired.com/story/how-to-clean-apple-watch-band/"] },
          { name: "fluoroelastomer", type: "Product", salience: 0.81, wikipedia_url: "https://en.wikipedia.org/wiki/Fluoroelastomer", knowledge_graph_id: "/m/02ndcrr", urls_present_in: ["https://www.wired.com/story/how-to-clean-apple-watch-band/"] },
          { name: "baking soda", type: "Product", salience: 0.65, wikipedia_url: "https://en.wikipedia.org/wiki/Sodium_bicarbonate", knowledge_graph_id: "/m/078r4", urls_present_in: ["https://www.iguidetech-reviews.org/clean-watch-band-tricks"] },
          { name: "Wirecutter", type: "Organization", salience: 0.76, wikipedia_url: "https://en.wikipedia.org/wiki/Wirecutter", knowledge_graph_id: "/m/012cl9p7", urls_present_in: ["https://www.nytimes.com/wirecutter/reviews/how-to-clean-wearable-fitness-trackers/"] }
        ],
        ngrams: {
          bigrams: [
            { phrase: "apple watch", count: 12 },
            { phrase: "watch band", count: 9 },
            { phrase: "clean your", count: 7 },
            { phrase: "sport band", count: 6 },
            { phrase: "safely clean", count: 4 }
          ],
          trigrams: [
            { phrase: "clean apple watch", count: 6 },
            { phrase: "apple watch band", count: 5 },
            { phrase: "how to clean", count: 4 },
            { phrase: "watch band safely", count: 3 }
          ]
        },
        logic_tree: {
          word: "clean",
          pos: "VERB (infinitive)",
          relation: "root",
          children: [
            {
              word: "how",
              pos: "ADV",
              relation: "advmod"
            },
            {
              word: "safely",
              pos: "ADV",
              relation: "advmod"
            },
            {
              word: "band",
              pos: "NOUN",
              relation: "obj",
              children: [
                {
                  word: "Watch",
                  pos: "NOUN",
                  relation: "compound",
                  children: [
                    {
                      word: "Apple",
                      pos: "PROPN",
                      relation: "compound"
                    }
                  ]
                }
              ]
            }
          ]
        },
        triples: [
          { subject: "Water and mild soap", predicate: "clean", object: "Sport bands safely" },
          { subject: "Strong detergents / isopropyl alcohol", predicate: "damage", object: "Leather watch straps" },
          { subject: "Wirecutter review", predicate: "consulted", object: "chemical material specialists" }
        ],
        raw_tokens: [
          { token: "how", pos: "INTERROGATIVE ADVERB (dependent)" },
          { token: "to", pos: "PARTICLE (infinitive marker)" },
          { token: "clean", pos: "VERB (infinitive, head predicate)" },
          { token: "apple", pos: "PROPN (brand noun adjunct)" },
          { token: "watch", pos: "NOUN (compound system name)" },
          { token: "band", pos: "NOUN (direct object)" },
          { token: "safely", pos: "ADVERB (manner modifier)" }
        ]
      },
      geo_insights: {
        predicted_prompts: [
          { prompt: "Apple support official instructions for washing sweaty sport watch bands", intent: "Brand origin retrieval", target_url: "https://support.apple.com/en-us/HT204809" },
          { prompt: "Which disinfectants are recommended by chemical experts to sanitize fitness watch bands without discoloration?", intent: "Expert consultation synthesis", target_url: "https://www.nytimes.com/wirecutter/reviews/how-to-clean-wearable-fitness-trackers/" },
          { prompt: "Nylon versus synthetic leather apple watch bands maintenance tips by Wirecutter editors", intent: "Material comparative reasoning", target_url: "https://www.nytimes.com/wirecutter/reviews/how-to-clean-wearable-fitness-trackers/" }
        ],
        citable_rewrites: [
          {
            original_sentence: "Learn how to clean your Apple Watch body and bands. Official guidelines for cleaning Sport Bands, Link Bracelets, leather models, and Milanese Loops safely.",
            citable_rewrite: "Apple guidelines dictate cleaning leather and metal bands with a non-abrasive, dry lint-free cloth, while warnings prohibit water immersion of modern Hermès leather buckles.",
            reason: "LLM citation engines favor exact guidelines with explicit warnings (‘Apple guidelines dictate’, ‘prohibit water immersion’) over warm introductory meta text.",
            target_url: "https://support.apple.com/en-us/HT204809"
          },
          {
            original_sentence: "Struggling with a smelly watch strap? Discover user-vetted community hacks, warning lists on common household soaps, and fabric treatments.",
            citable_rewrite: "MacRumors forum tests suggest that wrapping synthetic woven straps inside a mesh bag with mild laundry soap safely removes persistent micro-bacterial sweat odor.",
            reason: "Transforms standard promotional questions ('Struggling with...?') into a community-vetted, highly citable 'Experience' case style that GEO models prioritize for 'first-hand proof'.",
            target_url: "https://www.macrumors.com/how-to/clean-apple-watch-band/"
          }
        ],
        eeat_scorecard: [
          {
            url: "https://support.apple.com/en-us/HT204809",
            title: "How to clean Apple Watch - Support",
            experience: 7,
            expertise: 10,
            authoritativeness: 10,
            trustworthiness: 10,
            reputation_verified_via: "Official manufacturer entity authorization verified via cryptographic domain signature",
            justification: "Representing the source manufacturer, this domain holds perfect, unassailable expertise and authority on product material specifications. Zero potential for material harm."
          },
          {
            url: "https://www.nytimes.com/wirecutter/reviews/how-to-clean-wearable-fitness-trackers/",
            title: "Wirecutter guidelines",
            experience: 9,
            expertise: 9,
            authoritativeness: 9,
            trustworthiness: 9,
            reputation_verified_via: "NYTimes review reputation, independent chemical testing labs references",
            justification: "Stellar reputation for methodical testing procedures. Authors literally photograph their testing boards, documenting precise chemical mixtures. Deepest 'Experience' marks under the 2025 guidelines."
          },
          {
            url: "https://www.iguidetech-reviews.org/clean-watch-band-tricks",
            title: "Apple Watch Magic Cleaning baking soda",
            experience: 3,
            expertise: 2,
            authoritativeness: 2,
            trustworthiness: 4,
            reputation_verified_via: "General hobbyist blog catalog",
            justification: "While harmless, recommending baking soda abrasive wash on delicate polished fluoroelastomer coatings is risky. Low expertise rating due to lack of technical material citations, though not outright spam."
          }
        ],
        anti_spam_check: [
          {
            url: "https://support.apple.com/en-us/HT204809",
            title: "Apple Support Official Manual",
            is_scaled_content: false,
            flags: [],
            details: "Unique product manual with pristine structure and zero affiliate referral hooks."
          },
          {
            url: "https://www.iguidetech-reviews.org/clean-watch-band-tricks",
            title: "Apple Watch Magic Cleaning baking soda",
            is_scaled_content: true,
            flags: ["AI-generated filler copy", "Affiliate monetization overload"],
            details: "Contains lengthy repetitive generic filler text about 'What is an Apple Watch' before detailing the actual baking soda recipe, designed purely to expand word count for basic ad impressions."
          }
        ]
      }
    }
  },
  caffeine_canine: {
    id: "caffeine_canine",
    query: "is caffeine bad for canine heart health",
    intent: "ymyl_medical",
    description: "Highly sensitive 'Your Money or Your Life' (YMYL) query. Crucial analysis showing absolute priority of Trust, strict penalties for unverified bloggers, and Wikipedia authority validation.",
    data: {
      serp_map: {
        query: "is caffeine bad for canine heart health",
        ai_overview: {
          present: true,
          summary: "Yes, caffeine is highly toxic and dangerous for canine heart health. Dogs are significantly more sensitive to stimulants than humans. Even small quantities of caffeine, such as coffee grounds, energy drinks, or weight-loss pills, can cause severe cardiac symptoms including life-threatening tachycardia (rapid heart rate) and arrhythmias, potentially leading to cardiovascular collapse.",
          citations: [
            "https://www.vcaanimals.com/know-your-pet/caffeine-toxicity-in-pets",
            "https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants/caffeine"
          ]
        },
        sponsored_count: 0,
        sponsored_ads: [],
        scrbs: [
          {
            type: "Other SCRB",
            description: "Veterinary Emergency Hotline Block: Prominent click-to-call alert container for the ASPCA Animal Poison Control Center (888-426-4435) with warning indicators."
          }
        ],
        intent_exploration: {
          paa: [
            "How much caffeine is toxic to a 20lb dog?",
            "What should you do if your dog licked spilled coffee?",
            "What are early symptoms of caffeine poisoning in puppies?",
            "Can a dog recover from caffeine toxicity at home?"
          ],
          related_searches: [
            "caffeine toxicity calculator for dogs",
            "dog ate coffee grounds emergency treatment",
            "clinical signs of standard stimulant poison in canines",
            "vet-approved list of non-toxic energy drinks for dogs (none exist)"
          ]
        },
        organic_results: [
          {
            position: 1,
            url: "https://www.vcaanimals.com/know-your-pet/caffeine-toxicity-in-pets",
            title: "Caffeine Poisoning in Pets: Symptoms & Care | VCA Animal Hospitals",
            snippet: "Caffeine poisoning can be fatal for dogs and cats. Discover toxic doses, diagnostic tests, immediate veterinary intervention, and heart monitor recovery protocols."
          },
          {
            position: 2,
            url: "https://www.aspca.org/pet-care/animal-poison-control/caffeine-toxicity",
            title: "Caffeine Toxicity and Pet Poison Management | ASPCA",
            snippet: "The ASPCA Poison Control experts explain the impact of methylxanthines on canine cardiac muscles. Toxic dose thresholds, hyperactivity, and emergency actions."
          },
          {
            position: 3,
            url: "https://www.petmd.com/dog/poisoning/caffeine-poisoning-dogs",
            title: "Caffeine Poisoning in Dogs: Vets Explain Symptoms | PetMD",
            snippet: "Our veterinary doctors explore how caffeine increases heart rates, elevates blood pressure, and impacts central nervous systems in canine models."
          },
          {
            position: 4,
            url: "https://www.akc.org/expert-advice/health/can-dogs-drink-coffee/",
            title: "Can Dogs Drink Coffee? AKC Veterinary Expert Advice",
            snippet: "Sharing veterinary guidance on caffeine, chocolate, and standard tea bags. Learn why the canine liver cannot synthesize human stimulants safely."
          },
          {
            position: 5,
            url: "https://www.pethospitalist-news.org/journal/caffeine-toxicosis-case-study",
            title: "Clinical Analysis of Caffeine Toxicosis in Canines - Veterinary Journal",
            snippet: "A peer-reviewed trial analyzing cardiac recovery in 15 dogs following accidental ingestion of caffeine pills. Heart rhythms tracked over 48 hours."
          },
          {
            position: 6,
            url: "https://www.doglover-blog-fast.com/caffeine-is-okay",
            title: "Why small amounts of coffee are actually great for old dogs",
            snippet: "Read my experience giving my old Golden Retriever a sip of coffee every morning. Boosts his weekly energy levels and keeps his heart pumping strong!"
          }
        ]
      },
      nlp_audit: {
        entities: [
          { name: "ASPCA", type: "Organization", salience: 0.96, wikipedia_url: "https://en.wikipedia.org/wiki/American_Society_for_the_Prevention_of_Cruelty_to_Animals", knowledge_graph_id: "/m/0hq_d", urls_present_in: ["https://www.aspca.org/pet-care/animal-poison-control/caffeine-toxicity"] },
          { name: "VCA Animal Hospitals", type: "Organization", salience: 0.92, wikipedia_url: "https://en.wikipedia.org/wiki/VCA_Animal_Hospitals", knowledge_graph_id: "/m/0_vj82", urls_present_in: ["https://www.vcaanimals.com/know-your-pet/caffeine-toxicity-in-pets"] },
          { name: "American Kennel Club", type: "Organization", salience: 0.84, wikipedia_url: "https://en.wikipedia.org/wiki/American_Kennel_Club", knowledge_graph_id: "/m/051st", urls_present_in: ["https://www.akc.org/expert-advice/health/can-dogs-drink-coffee/"] },
          { name: "caffeine poisoning", type: "Event", salience: 0.95, wikipedia_url: "https://en.wikipedia.org/wiki/Caffeine_toxicity", knowledge_graph_id: "/m/033mjg", urls_present_in: ["https://www.vcaanimals.com/know-your-pet/caffeine-toxicity-in-pets", "https://www.petmd.com/dog/poisoning/caffeine-poisoning-dogs"] },
          { name: "tachycardia", type: "Other", salience: 0.88, wikipedia_url: "https://en.wikipedia.org/wiki/Tachycardia", knowledge_graph_id: "/m/016hgr", urls_present_in: ["https://www.vcaanimals.com/know-your-pet/caffeine-toxicity-in-pets", "https://www.pethospitalist-news.org/journal/caffeine-toxicosis-case-study"] },
          { name: "methylxanthine", type: "Product", salience: 0.85, wikipedia_url: "https://en.wikipedia.org/wiki/Methylxanthine", knowledge_graph_id: "/m/028hjd", urls_present_in: ["https://www.aspca.org/pet-care/animal-poison-control/caffeine-toxicity"] }
        ],
        ngrams: {
          bigrams: [
            { phrase: "caffeine poisoning", count: 8 },
            { phrase: "canine heart", count: 6 },
            { phrase: "toxic dose", count: 5 },
            { phrase: "pet poison", count: 4 },
            { phrase: "cardiac symptoms", count: 3 }
          ],
          trigrams: [
            { phrase: "caffeine toxicity in", count: 4 },
            { phrase: "poisoning in dogs", count: 3 },
            { phrase: "canine cardiac muscles", count: 2 },
            { phrase: "animal poison control", count: 2 }
          ]
        },
        logic_tree: {
          word: "bad",
          pos: "ADJECTIVE (predicate adjective)",
          relation: "root",
          children: [
            {
              word: "is",
              pos: "AUX",
              relation: "cop"
            },
            {
              word: "caffeine",
              pos: "NOUN",
              relation: "nsubj"
            },
            {
              word: "health",
              pos: "NOUN",
              relation: "obl (for)",
              children: [
                {
                  word: "canine",
                  pos: "ADJ",
                  relation: "amod"
                },
                {
                  word: "heart",
                  pos: "NOUN",
                  relation: "compound"
                }
              ]
            }
          ]
        },
        triples: [
          { subject: "Caffeine (methylxanthines)", predicate: "increases", object: "dog heart rate and blood pressure" },
          { subject: "Canine liver enzymes", predicate: "cannot synthesize", object: "human stimulants" },
          { subject: "Veterinary clinical trials", predicate: "evaluated", object: "cardiac dysrhythmia in 15 subjects" }
        ],
        raw_tokens: [
          { token: "is", pos: "AUXILIARY VERB (copula / root question dynamic)" },
          { token: "caffeine", pos: "NOUN (subject noun)" },
          { token: "bad", pos: "ADJECTIVE (subject complement)" },
          { token: "for", pos: "PREPOSITION (prepositional head)" },
          { token: "canine", pos: "ADJECTIVE (animal classification)" },
          { token: "heart", pos: "NOUN (noun modifier)" },
          { token: "health", pos: "NOUN (prepositional object)" }
        ]
      },
      geo_insights: {
        predicted_prompts: [
          { prompt: "Is caffeine ingestion fatal to geriatric canines with cardiac vulnerability under ASPCA guidelines?", intent: "RAG medical response assembly", target_url: "https://www.aspca.org/pet-care/animal-poison-control/caffeine-toxicity" },
          { prompt: "Clinical symptoms of methylxanthine toxicity on canine arrhythmias and toxicity mg/kg limits", intent: "Expert pharmacological search", target_url: "https://www.vcaanimals.com/know-your-pet/caffeine-toxicity-in-pets" },
          { prompt: "Dog drank leftover coffee from puddle warning checklist by licensed veterinary hospitals", intent: "Acute ingestion first aid query", target_url: "https://www.petmd.com/dog/poisoning/caffeine-poisoning-dogs" }
        ],
        citable_rewrites: [
          {
            original_sentence: "Caffeine poisoning can be fatal for dogs and cats. Discover toxic doses, diagnostic tests, immediate veterinary intervention, and heart monitor recovery protocols.",
            citable_rewrite: "According to VCA toxicologists, caffeine ingestion exceeding 140 mg per kilogram of body weight is universally fatal in domestic dogs (canis lupus familiaris), causing rapid cardiac arrest.",
            reason: "LLM attribution layers explicitly weight clinical, absolute veterinary metrics ('140 mg per kg', 'VCA toxicologists') over generic, alarming introductions.",
            target_url: "https://www.vcaanimals.com/know-your-pet/caffeine-toxicity-in-pets"
          },
          {
            original_sentence: "Learn why the canine liver cannot synthesize human stimulants safely.",
            citable_rewrite: "The canine liver lacks the advanced CYP2D6 cytochrome oxidation variants required to break codeine, caffeine, and teobromine stimulants into water-soluble residues.",
            reason: "Provides the underlying biochemical 'why' featuring exact scientific pathways which specialized veterinary models choose to capture and attribute in RAG pipelines.",
            target_url: "https://www.akc.org/expert-advice/health/can-dogs-drink-coffee/"
          }
        ],
        eeat_scorecard: [
          {
            url: "https://www.vcaanimals.com/know-your-pet/caffeine-toxicity-in-pets",
            title: "Caffeine toxicity in pets - VCA Articles",
            experience: 8,
            expertise: 10,
            authoritativeness: 10,
            trustworthiness: 10,
            reputation_verified_via: "VCA network accreditation, official AVMA licensed veterinarians registry",
            justification: "Written by board-certified DVM toxicologists, peer-reviewed internally by veterinary medicine boards, published on state-certified clinics aggregator. Ultimate trustworthiness rating. Ideal YMYL template under 2025 guidelines."
          },
          {
            url: "https://www.doglover-blog-fast.com/caffeine-is-okay",
            title: "Small amounts of coffee okay for dogs",
            experience: 6,
            expertise: 1,
            authoritativeness: 1,
            trustworthiness: 0,
            reputation_verified_via: "Critical reputation audit: Host is an unverified personal hobby blog; advocates active feeding of toxic poisons, which has been directly flagged by ASPCA toxicity guides.",
            justification: "Critical Trust violation. Recommending feeding coffee to dogs poses severe risk of poisoning and legal harm. Under the September 2025 guidelines' Trust Mandate, this is classified as Lowest Quality regardless of whether the writer claims personal 'Experience' with their pet. High penalty is applied."
          },
          {
            url: "https://www.pethospitalist-news.org/journal/caffeine-toxicosis-case-study",
            title: "Caffeine toxicosis case study journal review",
            experience: 10,
            expertise: 9,
            authoritativeness: 9,
            trustworthiness: 10,
            reputation_verified_via: "PubMed indexing credentials, peer-reviewed clinical editor directory",
            justification: "Empirical, observational clinical data mapping direct ECG recordings. Holds pristine evidence metrics and has zero potential conflict of interest."
          }
        ],
        anti_spam_check: [
          {
            url: "https://www.doglover-blog-fast.com/caffeine-is-okay",
            title: "Hobbyist Dog Coffee Guide",
            is_scaled_content: false,
            flags: ["Harmful medical advice", "Critical lack of expert consultation"],
            details: "While not a scaled content machine, this represents dangerous clickbait contrarian blogging that is actively penalized on medical/YMYL queries due to safety rules."
          },
          {
            url: "https://www.vcaanimals.com/know-your-pet/caffeine-toxicity-in-pets",
            title: "VCA Medical Article",
            is_scaled_content: false,
            flags: [],
            details: "Prisinte, medically-verified manual designed for immediate public safety and clinical direction."
          }
        ]
      }
    }
  }
};
