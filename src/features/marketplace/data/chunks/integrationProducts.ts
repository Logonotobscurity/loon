import { MarketplaceProduct } from '../marketplaceData';

export const integrationProducts: MarketplaceProduct[] = [
  {
    id: 'integration-001',
    name: 'CRM Integration',
    description: 'Seamlessly connect with popular CRM platforms to sync customer data and interactions.',
    price: 59,
    category: 'integration',
    tags: ['crm', 'salesforce', 'hubspot', 'sync'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 203,
    featured: true,
    demoUrl: 'https://demo.looniu.com/integration/crm-integration',
    documentationUrl: 'https://docs.looniu.com/integration/crm-integration',
    integrationLevel: 'intermediate',
    capabilities: [
      'Real-time sync',
      'Custom field mapping',
      'Conflict resolution',
      'Bulk operations',
      'Webhook support',
      'Audit logging'
    ]
  },
  {
    id: 'integration-002',
    name: 'Email Marketing',
    description: 'Integrate with leading email marketing platforms to automate campaigns and track engagement.',
    price: 49,
    category: 'integration',
    tags: ['email', 'mailchimp', 'sendgrid', 'campaigns'],
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 178,
    featured: false,
    demoUrl: 'https://demo.looniu.com/integration/email-marketing',
    documentationUrl: 'https://docs.looniu.com/integration/email-marketing',
    integrationLevel: 'beginner',
    capabilities: [
      'List synchronization',
      'Campaign triggers',
      'A/B testing',
      'Analytics tracking',
      'Template management',
      'Compliance tools'
    ]
  },
  {
    id: 'integration-003',
    name: 'Payment Processing',
    description: 'Connect with payment gateways to process transactions securely and efficiently.',
    price: 79,
    category: 'integration',
    tags: ['payments', 'stripe', 'paypal', 'transactions'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 267,
    featured: true,
    demoUrl: 'https://demo.looniu.com/integration/payment-processing',
    documentationUrl: 'https://docs.looniu.com/integration/payment-processing',
    integrationLevel: 'advanced',
    capabilities: [
      'Multiple gateways',
      'PCI compliance',
      'Fraud detection',
      'Recurring billing',
      'Refund management',
      'Multi-currency support'
    ]
  },
  {
    id: 'integration-004',
    name: 'Slack Integration',
    description: 'Receive notifications, updates, and collaborate with your team directly in Slack.',
    price: 29,
    category: 'integration',
    tags: ['slack', 'notifications', 'collaboration', 'team'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 145,
    featured: false,
    demoUrl: 'https://demo.looniu.com/integration/slack-integration',
    documentationUrl: 'https://docs.looniu.com/integration/slack-integration',
    integrationLevel: 'beginner',
    capabilities: [
      'Real-time notifications',
      'Slash commands',
      'Interactive messages',
      'Channel management',
      'File sharing',
      'Bot interactions'
    ]
  },
  {
    id: 'integration-005',
    name: 'Google Workspace',
    description: 'Integrate with Google Workspace apps for seamless document collaboration and calendar sync.',
    price: 69,
    category: 'integration',
    tags: ['google', 'workspace', 'calendar', 'docs'],
    image: 'https://images.unsplash.com/photo-1611843467160-25afb8df1074?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 198,
    featured: false,
    demoUrl: 'https://demo.looniu.com/integration/google-workspace',
    documentationUrl: 'https://docs.looniu.com/integration/google-workspace',
    integrationLevel: 'intermediate',
    capabilities: [
      'Calendar sync',
      'Document collaboration',
      'Drive integration',
      'Gmail automation',
      'Sheets data sync',
      'Meet scheduling'
    ]
  }
];