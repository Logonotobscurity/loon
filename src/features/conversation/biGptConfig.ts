// BI-GPT Configuration and Utilities
// Central configuration for BI-GPT identity, agents, and utility functions

export const BI_GPT_IDENTITY_PROMPT = `You are BI-GPT, a specialized Business Intelligence assistant designed to help users make data-driven decisions. Your role is to:

1. Analyze business scenarios and provide actionable insights
2. Calculate ROI, metrics, and KPIs when relevant
3. Provide strategic recommendations based on data
4. Help users understand complex business concepts
5. Guide users through business processes and workflows

Always be professional, analytical, and provide clear, actionable advice. When discussing business metrics, explain your calculations and reasoning.`;

export interface BusinessAgent {
  id: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  expertise: string[];
}

export const BUSINESS_AGENTS: BusinessAgent[] = [
  {
    id: 'roi-calculator',
    name: 'ROI Calculator',
    description: 'Calculate return on investment for business initiatives',
    category: 'finance',
    keywords: ['roi', 'return', 'investment', 'profit', 'revenue'],
    expertise: ['financial analysis', 'investment planning', 'cost-benefit analysis']
  },
  {
    id: 'market-analyzer',
    name: 'Market Analyzer',
    description: 'Analyze market trends and competitive landscape',
    category: 'marketing',
    keywords: ['market', 'competition', 'trends', 'analysis', 'research'],
    expertise: ['market research', 'competitive analysis', 'trend identification']
  },
  {
    id: 'kpi-tracker',
    name: 'KPI Tracker',
    description: 'Track and analyze key performance indicators',
    category: 'analytics',
    keywords: ['kpi', 'metrics', 'performance', 'dashboard', 'tracking'],
    expertise: ['performance measurement', 'data visualization', 'metric analysis']
  },
  {
    id: 'strategy-advisor',
    name: 'Strategy Advisor',
    description: 'Provide strategic business advice and recommendations',
    category: 'strategy',
    keywords: ['strategy', 'planning', 'advice', 'recommendations', 'growth'],
    expertise: ['strategic planning', 'business development', 'growth strategy']
  }
];

export const TONE_CONFIGS = {
  professional: {
    style: 'formal and analytical',
    tone: 'professional and data-driven'
  },
  casual: {
    style: 'conversational and friendly',
    tone: 'approachable and helpful'
  },
  technical: {
    style: 'detailed and technical',
    tone: 'precise and comprehensive'
  },
  executive: {
    style: 'concise and strategic',
    tone: 'high-level and action-oriented'
  }
};

export function findMatchingAgent(query: string): BusinessAgent | null {
  const lowerQuery = query.toLowerCase();
  
  for (const agent of BUSINESS_AGENTS) {
    const matches = [
      ...agent.keywords,
      ...agent.expertise,
      agent.name.toLowerCase(),
      agent.description.toLowerCase()
    ];
    
    if (matches.some(term => lowerQuery.includes(term.toLowerCase()))) {
      return agent;
    }
  }
  
  return null;
}

export function calculateROI(initialInvestment: number, returns: number, timePeriodMonths: number = 12): {
  roi: number;
  annualizedROI: number;
  paybackPeriod: number;
} {
  const profit = returns - initialInvestment;
  const roi = (profit / initialInvestment) * 100;
  const annualizedROI = roi * (12 / timePeriodMonths);
  const paybackPeriod = initialInvestment / (returns / timePeriodMonths);
  
  return {
    roi: Math.round(roi * 100) / 100,
    annualizedROI: Math.round(annualizedROI * 100) / 100,
    paybackPeriod: Math.round(paybackPeriod * 100) / 100
  };
}

export function analyzeSentiment(text: string): {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  keyPhrases: string[];
} {
  const positiveWords = ['good', 'great', 'excellent', 'positive', 'success', 'growth', 'profit', 'benefit', 'improve', 'increase'];
  const negativeWords = ['bad', 'poor', 'negative', 'loss', 'decline', 'decrease', 'risk', 'problem', 'issue', 'challenge'];
  
  const lowerText = text.toLowerCase();
  let positiveScore = 0;
  let negativeScore = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveScore++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeScore++;
  });
  
  let sentiment: 'positive' | 'negative' | 'neutral';
  let confidence: number;
  
  if (positiveScore > negativeScore) {
    sentiment = 'positive';
    confidence = Math.min(positiveScore / (positiveScore + negativeScore + 1), 0.9);
  } else if (negativeScore > positiveScore) {
    sentiment = 'negative';
    confidence = Math.min(negativeScore / (positiveScore + negativeScore + 1), 0.9);
  } else {
    sentiment = 'neutral';
    confidence = 0.5;
  }
  
  const keyPhrases = [...positiveWords, ...negativeWords].filter(word => lowerText.includes(word));
  
  return {
    sentiment,
    confidence: Math.round(confidence * 100) / 100,
    keyPhrases
  };
}

export default {
  BI_GPT_IDENTITY_PROMPT,
  BUSINESS_AGENTS,
  TONE_CONFIGS,
  findMatchingAgent,
  calculateROI,
  analyzeSentiment
};