import { MarketplaceProduct } from '../../types';

export default [
  {
    id: 'sales-enrichment-assistant',
    name: 'Sales Enrichment Assistant',
    description: 'Auto-enriches leads from public sources and prioritizes outreach.',
    category: 'assistant-tools',
    imageUrl: '/images/marketing-workflow.png',
    tags: ['Lead Enrichment', 'Scoring', 'Outreach']
  },
  {
    id: 'customer-feedback-miner',
    name: 'Customer Feedback Miner',
    description: 'Clusters NPS/CSAT comments and recommends product improvements.',
    category: 'assistant-tools',
    imageUrl: '/images/community-workflow.png',
    tags: ['NLP', 'Clustering', 'Insights']
  },
  {
    id: 'content-brief-generator',
    name: 'Content Brief Generator',
    description: 'Turns keywords into SEO-ready briefs with outline and references.',
    category: 'assistant-tools',
    imageUrl: '/images/grammarly.png',
    tags: ['SEO', 'Brief', 'Content']
  },
  {
    id: 'cost-optimization-advisor',
    name: 'Cost Optimization Advisor',
    description: 'Finds cloud/app waste and recommends savings actions.',
    category: 'assistant-tools',
    imageUrl: '/images/azure-factory.png',
    tags: ['FinOps', 'Savings', 'Recommendations']
  },
  {
    id: 'recruiting-matcher',
    name: 'Recruiting Matcher',
    description: 'Matches candidates to roles and drafts outreach messages.',
    category: 'assistant-tools',
    imageUrl: '/images/hr-worker.png',
    tags: ['Matching', 'Outreach', 'HR']
  },
  {
    id: 'support-auto-triage',
    name: 'Support Auto Triage',
    description: 'Routes tickets by intent, urgency and sentiment with summaries.',
    category: 'assistant-tools',
    imageUrl: '/images/zendesk-ai.png',
    tags: ['Routing', 'Summaries', 'Sentiment']
  },
  {
    id: 'meeting-notes-synthesizer',
    name: 'Meeting Notes Synthesizer',
    description: 'Turns call recordings into action items and CRM updates.',
    category: 'assistant-tools',
    imageUrl: '/images/reclaim-ai.png',
    tags: ['Transcription', 'Actions', 'CRM']
  },
  {
    id: 'email-assistant',
    name: 'Email Assistant',
    description: 'Drafts and optimizes email responses based on context.',
    category: 'assistant-tools',
    imageUrl: '/images/email-assistant.png',
    tags: ['Email', 'Drafting', 'Optimization']
  }
] as MarketplaceProduct[];