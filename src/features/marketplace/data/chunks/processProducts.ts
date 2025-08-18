import { MarketplaceProduct } from '../marketplaceData';

export const processProducts: MarketplaceProduct[] = [
  {
    id: 'process-001',
    name: 'Workflow Automation',
    description: 'Automate repetitive tasks and create efficient workflows across your organization.',
    price: 49,
    category: 'process',
    tags: ['automation', 'workflow', 'efficiency', 'productivity'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 234,
    featured: true,
    demoUrl: 'https://demo.looniu.com/process/workflow-automation',
    documentationUrl: 'https://docs.looniu.com/process/workflow-automation',
    integrationLevel: 'advanced',
    capabilities: [
      'Visual workflow builder',
      'Multi-step automation',
      'Conditional logic',
      'Integration with 100+ apps',
      'Real-time monitoring',
      'Error handling & retries'
    ]
  },
  {
    id: 'process-002',
    name: 'Process Intelligence',
    description: 'Gain deep insights into your business processes with AI-powered analytics.',
    price: 79,
    category: 'process',
    tags: ['analytics', 'insights', 'ai', 'optimization'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 189,
    featured: false,
    demoUrl: 'https://demo.looniu.com/process/process-intelligence',
    documentationUrl: 'https://docs.looniu.com/process/process-intelligence',
    integrationLevel: 'intermediate',
    capabilities: [
      'Process discovery',
      'Bottleneck identification',
      'Performance metrics',
      'Predictive analytics',
      'Custom dashboards',
      'Automated recommendations'
    ]
  },
  {
    id: 'process-003',
    name: 'Business Process Management',
    description: 'Design, execute, monitor, and optimize your business processes end-to-end.',
    price: 99,
    category: 'process',
    tags: ['bpm', 'orchestration', 'governance', 'compliance'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 312,
    featured: true,
    demoUrl: 'https://demo.looniu.com/process/business-process-management',
    documentationUrl: 'https://docs.looniu.com/process/business-process-management',
    integrationLevel: 'advanced',
    capabilities: [
      'Process modeling',
      'Form builder',
      'Role-based access',
      'Audit trails',
      'SLA management',
      'Compliance reporting'
    ]
  },
  {
    id: 'process-004',
    name: 'Document Processing',
    description: 'Automatically extract, classify, and process documents using AI and OCR.',
    price: 69,
    category: 'process',
    tags: ['ocr', 'document-ai', 'extraction', 'classification'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 156,
    featured: false,
    demoUrl: 'https://demo.looniu.com/process/document-processing',
    documentationUrl: 'https://docs.looniu.com/process/document-processing',
    integrationLevel: 'intermediate',
    capabilities: [
      'OCR & text extraction',
      'Document classification',
      'Data validation',
      'Template recognition',
      'Batch processing',
      'Integration with storage systems'
    ]
  },
  {
    id: 'process-005',
    name: 'Approval Workflows',
    description: 'Streamline approval processes with customizable workflows and automated routing.',
    price: 39,
    category: 'process',
    tags: ['approval', 'routing', 'notifications', 'escalation'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    rating: 4.4,
    reviews: 98,
    featured: false,
    demoUrl: 'https://demo.looniu.com/process/approval-workflows',
    documentationUrl: 'https://docs.looniu.com/process/approval-workflows',
    integrationLevel: 'beginner',
    capabilities: [
      'Multi-level approvals',
      'Conditional routing',
      'Mobile approvals',
      'Deadline tracking',
      'Escalation rules',
      'Audit logging'
    ]
  }
];