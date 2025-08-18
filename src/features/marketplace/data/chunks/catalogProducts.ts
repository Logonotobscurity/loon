import { MarketplaceProduct } from '../../types';

export default [
  {
    id: 'bi-quickstart-analyst',
    name: 'BI Quickstart Analyst',
    description: 'Generates dashboards and KPIs from your CSV/DB with guided prompts.',
    category: 'agent-catalog',
    imageUrl: '/images/data-analysis-agent.png',
    tags: ['Dashboarding', 'KPI', 'Guided Analysis']
  },
  {
    id: 'policy-compliance-checker',
    name: 'Policy Compliance Checker',
    description: 'Scans processes and documents to highlight compliance gaps.',
    category: 'agent-catalog',
    imageUrl: '/images/policy-agent.png',
    tags: ['Compliance', 'Audit', 'Policy']
  },
  {
    id: 'security-log-sentinel',
    name: 'Security Log Sentinel',
    description: 'Analyzes logs for anomalies and suggests actionable responses.',
    category: 'agent-catalog',
    imageUrl: '/images/tenant-comm-agent.png',
    tags: ['SIEM', 'Anomaly Detection', 'Response']
  },
  {
    id: 'contract-intelligence-agent',
    name: 'Contract Intelligence Agent',
    description: 'Extracts key terms from contracts and tracks obligations.',
    category: 'agent-catalog',
    imageUrl: '/images/document-automation.png',
    tags: ['OCR', 'Extraction', 'Obligations']
  },
  {
    id: 'churn-prediction-analyst',
    name: 'Churn Prediction Analyst',
    description: 'Scores accounts at risk and suggests save plays.',
    category: 'agent-catalog',
    imageUrl: '/images/marketing-ai-agent.png',
    tags: ['Churn', 'Save Plays', 'Scoring']
  },
  {
    id: 'governance-drift-monitor',
    name: 'Governance Drift Monitor',
    description: 'Alerts on configuration drift vs. policy baselines.',
    category: 'agent-catalog',
    imageUrl: '/images/policy-agent.png',
    tags: ['Drift', 'Baseline', 'Alerts']
  }
] as MarketplaceProduct[];