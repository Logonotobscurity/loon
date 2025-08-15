export const navigationConfig = {
  biGpt: {
    label: '🤖 BI-GPT Elite',
    href: '/bi-gpt',
    isHighlighted: true,
    description: 'Talk to our AI Business Intelligence Expert'
  },
  solutions: {
    label: 'Solutions',
    sections: [
      {
        title: 'Customer Engagement',
        items: [
          { label: 'Voice-First Dialogue', href: '#voice-dialogue' },
          { label: 'Proactive Insights', href: '#proactive-insights' },
          { label: 'Feedback Automation', href: '#feedback-automation' }
        ]
      },
      {
        title: 'Operations',
        items: [
          { label: 'Efficiency Optimization', href: '#efficiency' },
          { label: 'Dynamic Pricing', href: '#dynamic-pricing' },
          { label: 'Process Automation', href: '#process-automation' }
        ]
      },
      {
        title: 'Growth',
        items: [
          { label: 'Marketing Intelligence', href: '#marketing-intel' },
          { label: 'Talent Management', href: '#talent-mgmt' },
          { label: 'Strategic Planning', href: '#strategic-planning' }
        ]
      }
    ],
    highlight: 'See how LOG_ON identifies and solves your unique business challenges.'
  },
  marketplace: {
    label: 'Marketplace',
    href: '/marketplace',
    sections: [
      {
        title: 'Discover',
        items: [
          { label: 'Explore All Agents', href: '/marketplace' },
          { label: 'Industry Solutions', href: '/marketplace?category=industry' },
          { label: 'Community Innovations', href: '/marketplace?trending=true' }
        ]
      },
      {
        title: 'Create',
        items: [
          { label: 'Become Agent Creator', href: '/marketplace#become-creator' },
          { label: 'Publish Automations', href: '/creators/submit' },
          { label: 'Monetize Intelligence', href: '/creators/monetization' }
        ]
      }
    ],
    highlight: 'Expand your platform\'s power with our vibrant, ever-growing ecosystem.'
  },
  developers: {
    label: 'Developers',
    sections: [
      {
        title: 'Get Started',
        items: [
          { label: 'SDKs & APIs', href: '#sdks-apis' },
          { label: 'Documentation', href: '#docs' },
          { label: 'Code Samples', href: '#code-samples' },
          { label: 'Tutorials', href: '#tutorials' }
        ]
      },
      {
        title: 'Community',
        items: [
          { label: 'Developer Forums', href: '#dev-forums' },
          { label: 'Bounty Programs', href: '#bounty' },
          { label: 'Contribute to Core', href: '#contribute' }
        ]
      }
    ],
    highlight: 'Build the future of autonomous business with our comprehensive toolkit.'
  },
  resources: {
    label: 'Resources',
    sections: [
      {
        title: 'Learn',
        items: [
          { label: 'Case Studies', href: '#case-studies' },
          { label: 'Webinars', href: '#webinars' },
          { label: 'Blog', href: '#blog' },
          { label: 'Whitepapers', href: '#whitepapers' }
        ]
      },
      {
        title: 'Support',
        items: [
          { label: 'FAQs', href: '#faqs' },
          { label: 'Support Center', href: '#support' },
          { label: 'Community Help', href: '#community-help' }
        ]
      }
    ],
    highlight: 'Everything you need to succeed with LOG_ON.'
  }
};
