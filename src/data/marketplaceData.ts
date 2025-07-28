export interface MarketplaceProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  industry?: string;
  imageUrl: string;
  tags: string[];
  isTrending?: boolean;
}

export interface MarketplaceCategory {
  id: string;
  name: string;
  title: string;
  description: string;
}

export const customMarketplaceCategories: MarketplaceCategory[] = [
  { 
    id: 'automation-ops', 
    name: 'Automation Ops', 
    title: 'Automation Operations', 
    description: 'Streamline your workflows and business processes with intelligent automation agents.' 
  },
  { 
    id: 'assistant-tools', 
    name: 'Assistant Tools', 
    title: 'AI Assistant Tools', 
    description: 'Enhance productivity and decision-making with smart AI assistants for various tasks.' 
  },
  { 
    id: 'process-mining', 
    name: 'Process Mining', 
    title: 'Process Mining Solutions', 
    description: 'Uncover bottlenecks and optimize your operational efficiency by analyzing business processes.' 
  },
  { 
    id: 'integration-services', 
    name: 'Integration Services', 
    title: 'Integration Services', 
    description: 'Seamlessly connect your existing systems and applications with powerful integrations.' 
  },
  { 
    id: 'agent-catalog', 
    name: 'Agent Catalog', 
    title: 'Full Agent Catalog', 
    description: 'Explore a comprehensive list of all available AI agents, tools, and automations.' 
  }
];

// Industry categories for filtering
export interface IndustryCategory {
  id: string;
  name: string;
  description: string;
}

export const industryCategories: IndustryCategory[] = [
  { id: 'finance', name: 'Finance & Banking', description: 'Financial services, banking, and fintech solutions' },
  { id: 'healthcare', name: 'Healthcare', description: 'Medical, pharmaceutical, and healthcare technology' },
  { id: 'retail', name: 'Retail & E-commerce', description: 'Online retail, e-commerce, and consumer goods' },
  { id: 'real-estate', name: 'Real Estate', description: 'Property management, real estate, and construction' },
  { id: 'insurance', name: 'Insurance', description: 'Insurance carriers, claims processing, and risk management' },
  { id: 'manufacturing', name: 'Manufacturing', description: 'Industrial manufacturing, supply chain, and logistics' },
  { id: 'technology', name: 'Technology', description: 'Software, IT services, and technology companies' },
  { id: 'marketing', name: 'Marketing & Media', description: 'Advertising, marketing, media, and communications' },
  { id: 'hr', name: 'Human Resources', description: 'HR services, talent management, and workforce solutions' },
  { id: 'general', name: 'General Business', description: 'Cross-industry and general business applications' }
];

// Legacy categories - kept for backward compatibility
export const marketplaceCategories = customMarketplaceCategories;

export const marketplaceProducts: MarketplaceProduct[] = [
  // Automation Ops
  {
    id: 'apache-airflow',
    name: 'Apache Airflow Workflow Template',
    description: 'Orchestrate complex computational workflows and data processing pipelines with ease.',
    category: 'automation-ops',
    imageUrl: '/images/apache-airflow.png',
    tags: ['Data Pipeline Automation', 'Task Scheduling', 'Workflow Orchestration'],
    isTrending: true
  },
  {
    id: 'advanced-web-automation',
    name: 'Advanced Web Automation Template',
    description: 'Automate complex web-based tasks and browser interactions at scale.',
    category: 'automation-ops',
    imageUrl: '/images/web-automation.png',
    tags: ['Browser Automation', 'Data Collection', 'Task Scheduling']
  },
  {
    id: 'crm-automation-accelerator',
    name: 'CRM Automation Accelerator',
    description: 'Streamline customer relationship management with intelligent automation.',
    category: 'automation-ops',
    imageUrl: '/images/crm-automation.png',
    tags: ['Customer Management', 'Lead Tracking', 'Sales Automation']
  },
  {
    id: 'hr-process-automation',
    name: 'HR Process Automation Accelerator',
    description: 'Automate HR workflows from onboarding to performance management.',
    category: 'automation-ops',
    imageUrl: '/images/hr-automation.png',
    tags: ['Employee Onboarding', 'Payroll Automation', 'Leave Management']
  },
  {
    id: 'sap-integration-connector',
    name: 'SAP Integration Connector',
    description: 'Seamlessly integrate SAP systems with your automation infrastructure.',
    category: 'automation-ops',
    imageUrl: '/images/sap-connector.png',
    tags: ['ERP Integration', 'Data Synchronization', 'Business Process Automation'],
    isTrending: true
  },
  {
    id: 'aws-glue-etl',
    name: 'AWS Glue ETL Template',
    description: 'Build serverless ETL pipelines with AWS Glue for data integration.',
    category: 'automation-ops',
    imageUrl: '/images/aws-glue.png',
    tags: ['Data Integration', 'Serverless ETL', 'Cloud Data Processing']
  },
  {
    id: 'document-processing-automation',
    name: 'Document Processing Automation Template',
    description: 'Automate document processing with OCR and intelligent data extraction.',
    category: 'automation-ops',
    imageUrl: '/images/document-automation.png',
    tags: ['OCR', 'Document Classification', 'Data Extraction']
  },
  {
    id: 'hyperscience-document',
    name: 'Hyperscience Document Automation Template',
    description: 'AI-powered document processing for claims and data extraction.',
    category: 'automation-ops',
    imageUrl: '/images/hyperscience.png',
    tags: ['AI Document Processing', 'Claims Automation', 'Data Extraction']
  },
  {
    id: 'ai-automation-skill',
    name: 'AI Automation Skill Template',
    description: 'Build intelligent automation with machine learning capabilities.',
    category: 'automation-ops',
    imageUrl: '/images/ai-automation.png',
    tags: ['Machine Learning', 'Predictive Analytics', 'Task Automation']
  },
  {
    id: 'blue-prism-ia',
    name: 'SS&C Blue Prism IA Template',
    description: 'Enterprise-grade intelligent automation platform for process optimization.',
    category: 'automation-ops',
    imageUrl: '/images/blue-prism.png',
    tags: ['Intelligent Automation', 'Process Optimization', 'RPA Governance']
  },
  {
    id: 'business-process-bot',
    name: 'Business Process Automation Bot',
    description: 'Automate repetitive business processes with configurable bots.',
    category: 'automation-ops',
    imageUrl: '/images/process-bot.png',
    tags: ['Workflow Automation', 'Task Management', 'Process Optimization']
  },
  {
    id: 'automation-anywhere-enterprise',
    name: 'Automation Anywhere Enterprise Bot',
    description: 'Deploy enterprise-scale RPA with business rules and exception handling.',
    category: 'automation-ops',
    imageUrl: '/images/automation-anywhere.png',
    tags: ['Robotic Process Automation', 'Business Rules Engine', 'Exception Handling']
  },
  {
    id: 'cloud-workflow-automation',
    name: 'Cloud Workflow Automation Template',
    description: 'Build cloud-native workflows with automated notifications and data sync.',
    category: 'automation-ops',
    imageUrl: '/images/cloud-workflow.png',
    tags: ['Cloud Integration', 'Data Sync', 'Automated Notifications']
  },
  {
    id: 'azure-data-factory',
    name: 'Azure Data Factory Pipeline Template',
    description: 'Create data integration pipelines in the cloud with Azure.',
    category: 'automation-ops',
    imageUrl: '/images/azure-factory.png',
    tags: ['Cloud Data Orchestration', 'ETL Automation', 'Data Integration']
  },
  {
    id: 'crm-workflow-automation',
    name: 'CRM Workflow Automation Template',
    description: 'Automate sales workflows from lead nurturing to pipeline management.',
    category: 'automation-ops',
    imageUrl: '/images/crm-workflow.png',
    tags: ['Lead Nurturing', 'Customer Engagement', 'Sales Pipeline Management']
  },
  {
    id: 'ecommerce-automation',
    name: 'E-commerce Automation Template',
    description: 'Streamline e-commerce operations from order processing to customer notifications.',
    category: 'automation-ops',
    industry: 'retail',
    imageUrl: '/images/ecommerce-automation.png',
    tags: ['Order Processing', 'Inventory Management', 'Customer Notifications']
  },
  {
    id: 'digital-worker-finance',
    name: 'Digital Worker for Finance',
    description: 'Deploy digital workers for financial process automation.',
    category: 'automation-ops',
    industry: 'finance',
    imageUrl: '/images/finance-worker.png',
    tags: ['Invoice Automation', 'Expense Management', 'Financial Reporting']
  },
  {
    id: 'digital-worker-hr',
    name: 'Digital Worker for HR',
    description: 'Automate HR processes with intelligent digital workers.',
    category: 'automation-ops',
    industry: 'hr',
    imageUrl: '/images/hr-worker.png',
    tags: ['Recruitment Automation', 'Employee Data Management', 'Compliance Tracking']
  },
  {
    id: 'aws-integration-automation',
    name: 'AWS Integration Automation Template',
    description: 'Build serverless automation workflows with AWS services.',
    category: 'automation-ops',
    imageUrl: '/images/aws-integration.png',
    tags: ['Cloud Service Integration', 'Data Migration', 'Serverless Automation']
  },
  {
    id: 'streamsets-data-collector',
    name: 'StreamSets Data Collector Template',
    description: 'Build real-time data pipelines with monitoring capabilities.',
    category: 'automation-ops',
    imageUrl: '/images/streamsets.png',
    tags: ['Real-Time Data Streaming', 'Pipeline Monitoring', 'Data Integration']
  },

  // Assistant Tools
  {
    id: 'clickup-task-automation',
    name: 'ClickUp Task Automation Template',
    description: 'Automate task assignment, deadline prediction, and team collaboration workflows.',
    category: 'assistant-tools',
    imageUrl: '/images/clickup.png',
    tags: ['Task Assignment', 'Deadline Prediction', 'Team Collaboration']
  },
  {
    id: 'marketing-automation-workflow',
    name: 'Marketing Automation Workflow',
    description: 'Streamline marketing campaigns with automated email sequences and social scheduling.',
    category: 'assistant-tools',
    industry: 'marketing',
    imageUrl: '/images/marketing-workflow.png',
    tags: ['Campaign Management', 'Email Automation', 'Social Media Scheduling'],
    isTrending: true
  },
  {
    id: 'asana-workflow-automation',
    name: 'Asana Workflow Automation Template',
    description: 'Automate project tracking, task management, and team notifications in Asana.',
    category: 'assistant-tools',
    imageUrl: '/images/asana.png',
    tags: ['Task Management', 'Notification Automation', 'Project Tracking']
  },
  {
    id: 'business-optimization-automation',
    name: 'Business Optimization Automation Template',
    description: 'Optimize business operations with automated efficiency tracking and resource allocation.',
    category: 'assistant-tools',
    imageUrl: '/images/business-optimization.png',
    tags: ['Efficiency Improvement', 'Resource Allocation', 'Performance Tracking']
  },
  {
    id: 'grammarly-writing-automation',
    name: 'Grammarly Writing Automation Template',
    description: 'Enhance content quality with automated grammar checking and tone analysis.',
    category: 'assistant-tools',
    imageUrl: '/images/grammarly.png',
    tags: ['Grammar Checking', 'Tone Analysis', 'Content Enhancement']
  },
  {
    id: 'social-media-automation-applet',
    name: 'Social Media Automation Applet',
    description: 'Schedule posts, curate content, and track engagement across social platforms.',
    category: 'assistant-tools',
    imageUrl: '/images/social-automation.png',
    tags: ['Post Scheduling', 'Content Curation', 'Engagement Tracking']
  },
  {
    id: 'taskade-productivity-template',
    name: 'Taskade Productivity Template',
    description: 'Collaborate on tasks with real-time updates and project management features.',
    category: 'assistant-tools',
    imageUrl: '/images/taskade.png',
    tags: ['Task Collaboration', 'Real-Time Updates', 'Project Management']
  },
  {
    id: 'home-automation-applet',
    name: 'Home Automation Applet',
    description: 'Control smart devices, manage energy usage, and enhance home security.',
    category: 'assistant-tools',
    imageUrl: '/images/home-automation.png',
    tags: ['Smart Device Control', 'Energy Management', 'Security Alerts']
  },
  {
    id: 'work-productivity-automation',
    name: 'Work Productivity Automation Applet',
    description: 'Boost productivity with task prioritization, time tracking, and focus mode features.',
    category: 'assistant-tools',
    imageUrl: '/images/work-productivity.png',
    tags: ['Task Prioritization', 'Time Tracking', 'Focus Mode']
  },
  {
    id: 'database-automation-template',
    name: 'Database Automation Template',
    description: 'Automate data entry, record management, and report generation tasks.',
    category: 'assistant-tools',
    imageUrl: '/images/database-automation.png',
    tags: ['Data Entry Automation', 'Record Management', 'Report Generation']
  },
  {
    id: 'notion-ai-notes-template',
    name: 'Notion AI Notes Template',
    description: 'Organize notes and tasks with AI-powered content creation and automation.',
    category: 'assistant-tools',
    imageUrl: '/images/notion-ai.png',
    tags: ['Note Automation', 'Task Organization', 'Content Creation']
  },
  {
    id: 'productivity-automation-template',
    name: 'Productivity Automation Template',
    description: 'Streamline daily tasks with calendar integration and email management.',
    category: 'assistant-tools',
    imageUrl: '/images/productivity-automation.png',
    tags: ['Task Automation', 'Calendar Integration', 'Email Management']
  },
  {
    id: 'reclaim-ai-scheduling',
    name: 'Reclaim AI Scheduling Template',
    description: 'Optimize calendar with smart meeting scheduling and focus time management.',
    category: 'assistant-tools',
    imageUrl: '/images/reclaim-ai.png',
    tags: ['Calendar Optimization', 'Meeting Scheduling', 'Focus Time Management']
  },
  {
    id: 'workflow-automation-template',
    name: 'Workflow Automation Template',
    description: 'Automate team processes with collaboration tools and file sharing integration.',
    category: 'assistant-tools',
    imageUrl: '/images/workflow-automation.png',
    tags: ['Process Automation', 'Team Collaboration', 'File Sharing']
  },
  {
    id: 'clockwise-scheduling-template',
    name: 'Clockwise Scheduling Template',
    description: 'Protect focus time and optimize meetings with intelligent calendar management.',
    category: 'assistant-tools',
    imageUrl: '/images/clockwise.png',
    tags: ['Meeting Optimization', 'Focus Time Protection', 'Calendar Management']
  },
  {
    id: 'community-workflow-automation',
    name: 'Community Workflow Automation Template',
    description: 'Engage community members with automated forum management and event scheduling.',
    category: 'assistant-tools',
    imageUrl: '/images/community-workflow.png',
    tags: ['User Engagement', 'Forum Management', 'Event Scheduling']
  },
  {
    id: 'feedhive-social-media',
    name: 'FeedHive Social Media Template',
    description: 'Manage social media with AI-powered content suggestions and analytics.',
    category: 'assistant-tools',
    imageUrl: '/images/feedhive.png',
    tags: ['Social Media Posting', 'Content Suggestions', 'Analytics Tracking']
  },
  {
    id: 'business-blueprint-automation',
    name: 'Business Blueprint Automation Template',
    description: 'Plan and track business strategy with automated resource management.',
    category: 'assistant-tools',
    imageUrl: '/images/business-blueprint.png',
    tags: ['Strategic Planning', 'Resource Management', 'Milestone Tracking']
  },
  {
    id: 'airtable-data-automation',
    name: 'Airtable Data Automation Template',
    description: 'Organize data with automated workflows and integration actions.',
    category: 'assistant-tools',
    imageUrl: '/images/airtable.png',
    tags: ['Data Organization', 'Workflow Triggers', 'Integration Actions']
  },
  {
    id: 'trengo-communication-template',
    name: 'Trengo Communication Template',
    description: 'Manage multi-channel communications with smart routing and engagement tools.',
    category: 'assistant-tools',
    imageUrl: '/images/trengo.png',
    tags: ['Multi-Channel Inbox', 'Smart Routing', 'Customer Engagement']
  },

  // Process Mining
  {
    id: 'apromore-process-mining',
    name: 'Apromore Process Mining Template',
    description: 'Visualize processes, identify bottlenecks, and integrate custom data sources.',
    category: 'process-mining',
    imageUrl: '/images/apromore.png',
    tags: ['Process Visualization', 'Bottleneck Identification', 'Custom Data Integration']
  },
  {
    id: 'skan-ai-digital-twin',
    name: 'Skan AI Digital Twin Template',
    description: 'Create digital twins of processes with real-time insights and optimization.',
    category: 'process-mining',
    imageUrl: '/images/skan-ai.png',
    tags: ['Real-Time Insights', 'Human-System Integration', 'Process Optimization']
  },
  {
    id: 'source-system-process',
    name: 'Source System Process Template',
    description: 'Integrate and analyze processes from multiple source systems.',
    category: 'process-mining',
    imageUrl: '/images/source-system.png',
    tags: ['Data Source Integration', 'Process Mapping', 'System Audit']
  },
  {
    id: 'igrafx-process-optimization',
    name: 'iGrafx Process Optimization Template',
    description: 'Simulate processes and optimize workflows with analytics integration.',
    category: 'process-mining',
    imageUrl: '/images/igrafx.png',
    tags: ['Process Simulation', 'Analytics Integration', 'Workflow Improvement']
  },
  {
    id: 'actionable-process-blueprint',
    name: 'Actionable Process Blueprint',
    description: 'Transform process insights into actionable improvement plans.',
    category: 'process-mining',
    imageUrl: '/images/process-blueprint.png',
    tags: ['Process Improvement', 'Automation Opportunities', 'KPI Tracking']
  },
  {
    id: 'celonis-execution-management',
    name: 'Celonis Execution Management Template',
    description: 'Execute process improvements with data-driven decision making.',
    category: 'process-mining',
    imageUrl: '/images/celonis.png',
    tags: ['Process Execution', 'Performance Monitoring', 'Data-Driven Decisions']
  },
  {
    id: 'process-connector-analysis',
    name: 'Process Connector Analysis Template',
    description: 'Analyze system integrations and data flows between process connectors.',
    category: 'process-mining',
    imageUrl: '/images/process-connector.png',
    tags: ['System Integration', 'Data Flow Monitoring', 'Connector Performance']
  },
  {
    id: 'minit-process-discovery',
    name: 'Minit Process Discovery Template',
    description: 'Discover and map processes with efficiency analysis and compliance tracking.',
    category: 'process-mining',
    imageUrl: '/images/minit.png',
    tags: ['Process Mapping', 'Efficiency Analysis', 'Compliance Tracking']
  },
  {
    id: 'use-case-process-template',
    name: 'Use Case Process Template',
    description: 'Industry-specific process analysis with benchmarking and best practices.',
    category: 'process-mining',
    imageUrl: '/images/use-case-process.png',
    tags: ['Industry-Specific Analysis', 'Process Benchmarking', 'Best Practices']
  },
  {
    id: 'qpr-process-analyzer',
    name: 'QPR ProcessAnalyzer Template',
    description: 'Gain process insights with advanced visualization and performance tracking.',
    category: 'process-mining',
    imageUrl: '/images/qpr.png',
    tags: ['Process Insights', 'Visualization Tools', 'Performance Tracking']
  },
  {
    id: 'data-transformation-process',
    name: 'Data Transformation Process Template',
    description: 'Transform and cleanse data for process mining with quality monitoring.',
    category: 'process-mining',
    imageUrl: '/images/data-transformation.png',
    tags: ['Data Cleansing', 'ETL Processes', 'Data Quality Monitoring']
  },
  {
    id: 'signavio-process-intelligence',
    name: 'Signavio Process Intelligence Template',
    description: 'Detect bottlenecks and optimize processes with intelligent analytics.',
    category: 'process-mining',
    imageUrl: '/images/signavio.png',
    tags: ['Process Analytics', 'Bottleneck Detection', 'Optimization Insights']
  },
  {
    id: 'process-data-extraction',
    name: 'Process Data Extraction Tool',
    description: 'Extract and analyze event logs for process mining inputs.',
    category: 'process-mining',
    imageUrl: '/images/data-extraction.png',
    tags: ['Log Analysis', 'Event Data Collection', 'Process Mining Input']
  },
  {
    id: 'myinvenio-process-analysis',
    name: 'myInvenio Process Analysis Template',
    description: 'Simulate processes and optimize costs with workflow insights.',
    category: 'process-mining',
    imageUrl: '/images/myinvenio.png',
    tags: ['Process Simulation', 'Cost Optimization', 'Workflow Insights']
  },
  {
    id: 'automation-opportunity-identification',
    name: 'Automation Opportunity Identification Template',
    description: 'Identify and prioritize automation opportunities with ROI analysis.',
    category: 'process-mining',
    imageUrl: '/images/automation-opportunity.png',
    tags: ['ROI Analysis', 'Automation Feasibility', 'Process Prioritization']
  },
  {
    id: 'process-optimization-analysis',
    name: 'Process Optimization Analysis Template',
    description: 'Analyze processes for efficiency gains and resource optimization.',
    category: 'process-mining',
    imageUrl: '/images/process-optimization.png',
    tags: ['Efficiency Gains', 'Cost Reduction', 'Resource Allocation']
  },
  {
    id: 'timeline-process-analysis',
    name: 'Timeline Process Analysis Tool',
    description: 'Analyze process timelines with event sequencing and duration tracking.',
    category: 'process-mining',
    imageUrl: '/images/timeline-analysis.png',
    tags: ['Event Sequencing', 'Duration Analysis', 'Process Visualization']
  },
  {
    id: 'disco-process-mining',
    name: 'Disco Process Mining Template',
    description: 'Discover processes with performance analysis and visual mapping.',
    category: 'process-mining',
    imageUrl: '/images/disco.png',
    tags: ['Process Discovery', 'Performance Analysis', 'Visual Mapping']
  },
  {
    id: 'process-mining-insight',
    name: 'Process Mining Insight Template',
    description: 'Generate insights for decision support and continuous improvement.',
    category: 'process-mining',
    imageUrl: '/images/process-insight.png',
    tags: ['Process Insights', 'Decision Support', 'Continuous Improvement']
  },
  {
    id: 'logpickr-process-analytics',
    name: 'Logpickr Process Analytics Template',
    description: 'Real-time process monitoring with optimization and data integration.',
    category: 'process-mining',
    imageUrl: '/images/logpickr.png',
    tags: ['Real-Time Monitoring', 'Process Optimization', 'Data Integration']
  },

  // Integration Services
  {
    id: 'informatica-ipaas',
    name: 'Informatica iPaaS Connector',
    description: 'Cloud Integration, Data Sync, Enterprise Connectivity.',
    category: 'integration-services',
    imageUrl: '/images/informatica.png',
    tags: ['Cloud Integration', 'Data Sync', 'Enterprise Connectivity']
  },
  {
    id: 'crm-data-export',
    name: 'CRM Data Export Connector',
    description: 'Data Export, Reporting, Analytics Integration.',
    category: 'integration-services',
    imageUrl: '/images/crm-export.png',
    tags: ['Data Export', 'Reporting', 'Analytics Integration']
  },
  {
    id: 'ai-powered-automation-connector',
    name: 'AI-Powered Automation Connector',
    description: 'AI Integration, Automation, Decision Support.',
    category: 'integration-services',
    imageUrl: '/images/ai-automation-connector.png',
    tags: ['AI Integration', 'Automation', 'Decision Support']
  },
  {
    id: 'talend-integration',
    name: 'Talend Integration Connector',
    description: 'Data Integration, ETL Processes, Cloud Connectivity.',
    category: 'integration-services',
    imageUrl: '/images/talend.png',
    tags: ['Data Integration', 'ETL Processes', 'Cloud Connectivity']
  },
  {
    id: 'erp-system-connector',
    name: 'ERP System Connector',
    description: 'ERP Integration, Financial Data Sync, Inventory Management.',
    category: 'integration-services',
    imageUrl: '/images/erp-connector.png',
    tags: ['ERP Integration', 'Financial Data Sync', 'Inventory Management']
  },
  {
    id: 'matillion-data',
    name: 'Matillion Data Connector',
    description: 'Cloud Data Integration, ETL Automation, Data Warehousing.',
    category: 'integration-services',
    imageUrl: '/images/matillion.png',
    tags: ['Cloud Data Integration', 'ETL Automation', 'Data Warehousing']
  },
  {
    id: 'custom-integration',
    name: 'Custom Integration Connector',
    description: 'Custom API, Tailored Workflows, Flexible Integration.',
    category: 'integration-services',
    imageUrl: '/images/custom-integration.png',
    tags: ['Custom API', 'Tailored Workflows', 'Flexible Integration']
  },
  {
    id: 'saas-application',
    name: 'SaaS Application Connector',
    description: 'Cloud App Integration, Data Sync, User Management.',
    category: 'integration-services',
    imageUrl: '/images/saas-app.png',
    tags: ['Cloud App Integration', 'Data Sync', 'User Management']
  },
  {
    id: 'database-integration',
    name: 'Database Integration Connector',
    description: 'SQL Integration, Data Warehousing, Real-Time Sync.',
    category: 'integration-services',
    imageUrl: '/images/database-integration.png',
    tags: ['SQL Integration', 'Data Warehousing', 'Real-Time Sync']
  },
  {
    id: 'fivetran-data-pipeline',
    name: 'Fivetran Data Pipeline Connector',
    description: 'Automated Data Sync, Cloud Integration, Data Warehousing.',
    category: 'integration-services',
    imageUrl: '/images/fivetran.png',
    tags: ['Automated Data Sync', 'Cloud Integration', 'Data Warehousing']
  },
  {
    id: 'community-built-connector',
    name: 'Community-Built Connector',
    description: 'Open-Source Integration, Custom Solutions, Community Support.',
    category: 'integration-services',
    imageUrl: '/images/community-connector.png',
    tags: ['Open-Source Integration', 'Custom Solutions', 'Community Support']
  },
  {
    id: 'data-source-integration',
    name: 'Data Source Integration Connector',
    description: 'Data Ingestion, ETL Processes, Data Pipeline Management.',
    category: 'integration-services',
    imageUrl: '/images/data-source-integration.png',
    tags: ['Data Ingestion', 'ETL Processes', 'Data Pipeline Management']
  },
  {
    id: 'secure-messaging',
    name: 'Secure Messaging Connector',
    description: 'Encrypted Communication, Secure Data Transfer, Compliance.',
    category: 'integration-services',
    imageUrl: '/images/secure-messaging.png',
    tags: ['Encrypted Communication', 'Secure Data Transfer', 'Compliance']
  },
  {
    id: 'workflow-automation-connector',
    name: 'Workflow Automation Connector',
    description: 'Task Automation, Process Orchestration, Event Triggers.',
    category: 'integration-services',
    imageUrl: '/images/workflow-connector.png',
    tags: ['Task Automation', 'Process Orchestration', 'Event Triggers']
  },
  {
    id: 'project-management-integration',
    name: 'Project Management Integration Connector',
    description: 'Task Sync, Milestone Tracking, Team Collaboration.',
    category: 'integration-services',
    imageUrl: '/images/project-management-integration.png',
    tags: ['Task Sync', 'Milestone Tracking', 'Team Collaboration']
  },
  {
    id: 'enterprise-integration',
    name: 'Enterprise Integration Connector',
    description: 'Large-Scale Integration, Multi-System Orchestration, API Management.',
    category: 'integration-services',
    imageUrl: '/images/enterprise-integration.png',
    tags: ['Large-Scale Integration', 'Multi-System Orchestration', 'API Management']
  },
  {
    id: 'exalate-sync',
    name: 'Exalate Sync Connector',
    description: 'Cross-Platform Sync, ITSM Integration, Secure Data Transfer.',
    category: 'integration-services',
    imageUrl: '/images/exalate.png',
    tags: ['Cross-Platform Sync', 'ITSM Integration', 'Secure Data Transfer']
  },
  {
    id: 'on-premise-system',
    name: 'On-Premise System Connector',
    description: 'Legacy System Integration, Data Migration, Hybrid Cloud.',
    category: 'integration-services',
    imageUrl: '/images/on-premise.png',
    tags: ['Legacy System Integration', 'Data Migration', 'Hybrid Cloud']
  },
  {
    id: 'cloud-business-app',
    name: 'Cloud Business App Connector',
    description: 'Cloud Service Integration, SaaS Management, User Provisioning.',
    category: 'integration-services',
    imageUrl: '/images/cloud-business-app.png',
    tags: ['Cloud Service Integration', 'SaaS Management', 'User Provisioning']
  },
  {
    id: 'portable-long-tail',
    name: 'Portable Long-Tail Connector',
    description: 'Niche API Integration, Custom Data Sync, Flexible Connectivity.',
    category: 'integration-services',
    imageUrl: '/images/portable-long-tail.png',
    tags: ['Niche API Integration', 'Custom Data Sync', 'Flexible Connectivity']
  },

  // Agent Catalog
  {
    id: 'salesforce-agentforce',
    name: 'Salesforce Agentforce Sales Agent',
    description: 'Sales Automation, CRM Integration, Lead Management.',
    category: 'agent-catalog',
    imageUrl: '/images/salesforce-agentforce.png',
    tags: ['Sales Automation', 'CRM Integration', 'Lead Management']
  },
  {
    id: 'data-analysis-ai',
    name: 'Data Analysis AI Agent',
    description: 'Data Insights, Predictive Analytics, Reporting Automation.',
    category: 'agent-catalog',
    imageUrl: '/images/data-analysis-agent.png',
    tags: ['Data Insights', 'Predictive Analytics', 'Reporting Automation']
  },
  {
    id: 'crm-ai-agent',
    name: 'CRM AI Agent',
    description: 'Customer Relationship Management, Lead Scoring, Sales Forecasting.',
    category: 'agent-catalog',
    imageUrl: '/images/crm-agent.png',
    tags: ['Customer Relationship Management', 'Lead Scoring', 'Sales Forecasting']
  },
  {
    id: 'lindy-ai-meeting',
    name: 'Lindy AI Meeting Scheduler',
    description: 'Meeting Automation, Calendar Integration, Scheduling Efficiency.',
    category: 'agent-catalog',
    imageUrl: '/images/lindy-ai.png',
    tags: ['Meeting Automation', 'Calendar Integration', 'Scheduling Efficiency']
  },
  {
    id: 'workflow-automation-ai',
    name: 'Workflow Automation AI Agent',
    description: 'Process Automation, Task Scheduling, Resource Allocation.',
    category: 'agent-catalog',
    imageUrl: '/images/workflow-ai-agent.png',
    tags: ['Process Automation', 'Task Scheduling', 'Resource Allocation']
  },
  {
    id: 'business-automation-ai',
    name: 'Business Automation AI Agent',
    description: 'Operational Efficiency, Process Optimization, Decision Support.',
    category: 'agent-catalog',
    imageUrl: '/images/business-ai-agent.png',
    tags: ['Operational Efficiency', 'Process Optimization', 'Decision Support']
  },
  {
    id: 'marketing-ai-agent',
    name: 'Marketing AI Agent',
    description: 'Campaign Management, Audience Segmentation, Content Personalization.',
    category: 'agent-catalog',
    imageUrl: '/images/marketing-ai-agent.png',
    tags: ['Campaign Management', 'Audience Segmentation', 'Content Personalization']
  },
  {
    id: 'data-extraction-ai',
    name: 'Data Extraction AI Agent',
    description: 'Document Parsing, Data Capture, Information Retrieval.',
    category: 'agent-catalog',
    imageUrl: '/images/data-extraction-agent.png',
    tags: ['Document Parsing', 'Data Capture', 'Information Retrieval']
  },
  {
    id: 'insurance-claims-ai',
    name: 'Insurance Claims AI Agent',
    description: 'Claims Processing, Fraud Detection, Policy Management.',
    category: 'agent-catalog',
    industry: 'insurance',
    imageUrl: '/images/insurance-agent.png',
    tags: ['Claims Processing', 'Fraud Detection', 'Policy Management']
  },
  {
    id: 'zendesk-ai-ticket',
    name: 'Zendesk AI Ticket Agent',
    description: 'Ticket Automation, Sentiment Analysis, Customer Support.',
    category: 'agent-catalog',
    imageUrl: '/images/zendesk-ai.png',
    tags: ['Ticket Automation', 'Sentiment Analysis', 'Customer Support']
  },
  {
    id: 'property-management-ai',
    name: 'Property Management AI Agent',
    description: 'Lease Management, Maintenance Scheduling, Tenant Communication.',
    category: 'agent-catalog',
    industry: 'real-estate',
    imageUrl: '/images/property-agent.png',
    tags: ['Lease Management', 'Maintenance Scheduling', 'Tenant Communication']
  },
  {
    id: 'debt-collection-ai',
    name: 'Debt Collection AI Agent',
    description: 'Payment Reminders, Negotiation Support, Compliance Tracking.',
    category: 'agent-catalog',
    industry: 'finance',
    imageUrl: '/images/debt-collection-agent.png',
    tags: ['Payment Reminders', 'Negotiation Support', 'Compliance Tracking']
  },
  {
    id: 'decision-support-ai',
    name: 'Decision Support AI Agent',
    description: 'Business Intelligence, Scenario Analysis, Risk Assessment.',
    category: 'agent-catalog',
    imageUrl: '/images/decision-support-agent.png',
    tags: ['Business Intelligence', 'Scenario Analysis', 'Risk Assessment']
  },
  {
    id: 'liveperson-conversational',
    name: 'LivePerson Conversational Agent',
    description: 'Omnichannel Messaging, Intent Recognition, Customer Engagement.',
    category: 'agent-catalog',
    imageUrl: '/images/liveperson.png',
    tags: ['Omnichannel Messaging', 'Intent Recognition', 'Customer Engagement']
  },
  {
    id: 'low-code-automation-ai',
    name: 'Low-Code Automation AI Agent',
    description: 'No-Code Development, Workflow Automation, User-Friendly Interface.',
    category: 'agent-catalog',
    imageUrl: '/images/low-code-agent.png',
    tags: ['No-Code Development', 'Workflow Automation', 'User-Friendly Interface']
  },
  {
    id: 'policy-management-ai',
    name: 'Policy Management AI Agent',
    description: 'Policy Compliance, Document Management, Approval Workflows.',
    category: 'agent-catalog',
    imageUrl: '/images/policy-agent.png',
    tags: ['Policy Compliance', 'Document Management', 'Approval Workflows']
  },
  {
    id: 'maintenance-management-ai',
    name: 'Maintenance Management AI Agent',
    description: 'Preventive Maintenance, Asset Tracking, Work Order Automation.',
    category: 'agent-catalog',
    imageUrl: '/images/maintenance-agent.png',
    tags: ['Preventive Maintenance', 'Asset Tracking', 'Work Order Automation']
  },
  {
    id: 'tenant-communication-ai',
    name: 'Tenant Communication AI Agent',
    description: 'Resident Engagement, Notification System, Feedback Collection.',
    category: 'agent-catalog',
    imageUrl: '/images/tenant-comm-agent.png',
    tags: ['Resident Engagement', 'Notification System', 'Feedback Collection']
  },
  {
    id: 'partner-solution-ai',
    name: 'Partner Solution AI Agent',
    description: 'Collaborative Workflows, Partner Integration, Joint Venture Support.',
    category: 'agent-catalog',
    imageUrl: '/images/partner-agent.png',
    tags: ['Collaborative Workflows', 'Partner Integration', 'Joint Venture Support']
  },
  {
    id: 'orby-ai-enterprise',
    name: 'Orby AI Enterprise Agent',
    description: 'Generative Process Automation, Workflow Efficiency, Scalable Deployment.',
    category: 'agent-catalog',
    imageUrl: '/images/orby-ai.png',
    tags: ['Generative Process Automation', 'Workflow Efficiency', 'Scalable Deployment']
  },
  {
    id: 'logon-strategic-intelligence-agent',
    name: 'LOG_ON Strategic Intelligence Agent',
    description: 'Conversational, autonomous agent for business strategy and opportunity identification.',
    category: 'agent-catalog',
    imageUrl: '/images/logon-agent.png',
    tags: ['Strategic AI', 'Business Intelligence', 'Opportunity Identification', 'Conversational Agent']
  },
  {
    id: 'ai-marketing-campaign-agent',
    name: 'AI Marketing Campaign Agent',
    description: 'Develops and optimizes marketing campaigns using advanced AI algorithms.',
    category: 'agent-catalog',
    imageUrl: '/images/marketing-campaign-agent.png',
    tags: ['Marketing Automation', 'Campaign Optimization', 'AI Marketing']
  }
];
