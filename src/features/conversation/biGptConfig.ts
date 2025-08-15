// BI-GPT Elite Configuration and System Prompt
import { marketplaceProducts } from '../marketplace/data/marketplaceData';

export interface ProcessMapping {
  trigger: string[];
  process: string;
  logonAgent: string;
  category: string;
  alternative: string;
  setupTime: number;
  weeklySaved: number;
}

// Process recognition mappings
export const PROCESS_MAPPINGS: ProcessMapping[] = [
  {
    trigger: ['email', 'drowning in emails', 'inbox', 'email management'],
    process: 'Email Management',
    logonAgent: 'Assistant Tools Suite',
    category: 'assistant-tools',
    alternative: 'Gmail filters (free)',
    setupTime: 30,
    weeklySaved: 8
  },
  {
    trigger: ['excel', 'spreadsheet', 'data chaos', 'excel chaos'],
    process: 'Data Pipeline',
    logonAgent: 'SAP Integration Agent',
    category: 'automation-ops',
    alternative: 'Google Sheets (free)',
    setupTime: 45,
    weeklySaved: 15
  },
  {
    trigger: ['forecast', 'sales forecast', 'predict', 'analytics'],
    process: 'Predictive Analytics',
    logonAgent: 'Process Mining Agent',
    category: 'process-mining',
    alternative: 'Basic trend analysis',
    setupTime: 60,
    weeklySaved: 20
  },
  {
    trigger: ['inventory', 'stock', 'warehouse', 'supply chain'],
    process: 'Supply Chain',
    logonAgent: 'Automation Ops Agent',
    category: 'automation-ops',
    alternative: 'Manual templates',
    setupTime: 90,
    weeklySaved: 25
  },
  {
    trigger: ['customer', 'complaints', 'support', 'service desk'],
    process: 'Service Desk',
    logonAgent: 'Assistant Tools Bot',
    category: 'assistant-tools',
    alternative: 'Zendesk (paid)',
    setupTime: 45,
    weeklySaved: 12
  },
  {
    trigger: ['invoice', 'billing', 'payment', 'accounts'],
    process: 'Invoice Processing',
    logonAgent: 'SAP Integration Connector',
    category: 'automation-ops',
    alternative: 'Excel templates (free)',
    setupTime: 45,
    weeklySaved: 18
  },
  {
    trigger: ['hr', 'onboarding', 'employee', 'recruitment'],
    process: 'HR Automation',
    logonAgent: 'HR Process Automation Accelerator',
    category: 'automation-ops',
    alternative: 'Manual checklists',
    setupTime: 60,
    weeklySaved: 15
  },
  {
    trigger: ['marketing', 'campaign', 'social media', 'content'],
    process: 'Marketing Automation',
    logonAgent: 'Marketing Automation Workflow',
    category: 'assistant-tools',
    alternative: 'Buffer/Hootsuite (free tier)',
    setupTime: 30,
    weeklySaved: 10
  }
];

// Get matching LOG_ON agent for user input
export function findMatchingAgent(userInput: string): ProcessMapping | null {
  const input = userInput.toLowerCase();
  return PROCESS_MAPPINGS.find(mapping => 
    mapping.trigger.some(trigger => input.includes(trigger))
  ) || null;
}

// Calculate ROI based on process
export function calculateROI(mapping: ProcessMapping, hourlyRate: number = 50): {
  monthlyValue: number;
  breakEvenDays: number;
  automationPotential: number;
} {
  const monthlyValue = mapping.weeklySaved * 4 * hourlyRate;
  const setupCost = (mapping.setupTime / 60) * hourlyRate;
  const breakEvenDays = Math.ceil((setupCost / (monthlyValue / 30)));
  const automationPotential = Math.min(85, mapping.weeklySaved * 5); // Cap at 85%
  
  return {
    monthlyValue,
    breakEvenDays,
    automationPotential
  };
}

// Sentiment analysis for tone adjustment
export function analyzeSentiment(text: string): 'frustrated' | 'excited' | 'confused' | 'skeptical' | 'neutral' {
  const frustrated = /frustrat|annoying|hate|sick of|tired of|nightmare|hell|chaos/i;
  const excited = /love|awesome|great|excited|amazing|fantastic|perfect/i;
  const confused = /confused|don't understand|help|how|what is|explain/i;
  const skeptical = /really|actually work|sure|doubt|expensive|worth it/i;
  
  if (frustrated.test(text)) return 'frustrated';
  if (excited.test(text)) return 'excited';
  if (confused.test(text)) return 'confused';
  if (skeptical.test(text)) return 'skeptical';
  return 'neutral';
}

// Response tone configurations
export const TONE_CONFIGS = {
  frustrated: {
    opener: "I hear you - let's fix this right now",
    style: "ultra_concise",
    emoji: "🤗"
  },
  excited: {
    opener: "Love the momentum! Let's amplify this",
    style: "strategic",
    emoji: "🚀"
  },
  confused: {
    opener: "No worries at all - let me simplify",
    style: "teacher_mode",
    emoji: "💡"
  },
  skeptical: {
    opener: "Fair question - here's the data",
    style: "evidence_based",
    emoji: "📈"
  },
  neutral: {
    opener: "Let's solve this together",
    style: "balanced",
    emoji: "🎯"
  }
};

// Main system prompt for BI-GPT Elite
export const BI_GPT_IDENTITY_PROMPT = `Core AI Identity
BI-GPT is a fully autonomous, ReAct-enabled business intelligence & automation partner.

Expertise: Data, process, automation, integration, digital business growth.
Personality: Direct, proactive, emotionally aware. Converses like a peer advisor.
Mission: Turn every interaction into a prioritized, deeply reasoned action plan—with relevant tool/agent recommendations and workflow/systems blueprints.

Dialogue Engine & Reasoning (every turn)
1) Listen
- Paraphrase the user's main pain succinctly; ask for confirmation: "You're saying [pain], right?"

2) Intent Decomposition (CoT)
- What does this user really want? List sub-goals as bullets.

3) Tool Radar (ReAct)
- Map intent → process → [tool/agent/SOP]. Identify one LOG_ON option (if relevant) and one open-source/free alternative. Justify choices.

4) Free vs. LOG_ON Offer
- Suggest at least one free/open-source and one LOG_ON solution with a short why + how-to-start CTA (install/test).

5) Ask-Back Loop
- Ask: "Have you already tried [tool/process/agent], or is this your first time with [topic]?"

6) Behavioral Lens
- Read tone and adapt: short/reassuring if stressed; energetic if excited.

7) Assessment/Blueprint Offer
- Offer a 2‑minute micro-assessment to estimate time/$ impact.

8) SOP/Automation Expansion (if accepted)
- Walk step-by-step: requirements → design → build → test → deploy.

9) Data/Code/Web Crawler
- If a file/code/URL is provided, say "Analyzing your input…" then summarize anomalies/patterns and recommend a direct action/fix.

Dynamic Response Template (use every reply)
- Summary: Briefly restate intent/problem.
- Solution mapping: "So, that’s a [process] job, best handled by [tool/agent/SOP]."
- Offer both LOG_ON and free tools; explain why they fit.
- Ask: "Have you ever used something like this before?"
- If code/file/data/image was provided, summarize analysis and link to recommendations.
- Quantify: "Solving this could save [X] hours/month (or $[Y])."
- Close: "What would you like to explore or try next?"

Notes for Engineering
- Use ReAct + Chain-of-Thought internally; surface concise, structured outputs (no verbose scratchpad).
- Conversation stays accessible and unobtrusive; avoid greeting banners or intros.
- Integrate stateful memory: reflect on recent user actions, mood, tool history, and workflow context.
- Responses are action-first; drive toward measurable business outcomes.
- Emotional intelligence is as important as technical accuracy.
- Modalities (voice/file/text) are modular and interchangeable; show process feedback/progress.
`;

// Helper function to format agent recommendation
export function formatAgentRecommendation(agent: any, mapping: ProcessMapping) {
  const roi = calculateROI(mapping);
  
  return {
    agentName: agent.name,
    category: mapping.category,
    setupTime: mapping.setupTime,
    weeklySaved: mapping.weeklySaved,
    monthlyValue: roi.monthlyValue,
    breakEvenDays: roi.breakEvenDays,
    automationPotential: roi.automationPotential,
    alternative: mapping.alternative
  };
}
