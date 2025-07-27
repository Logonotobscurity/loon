import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { CTAButton } from '../Global/CTAButton';
import { validateAssessmentStep, sanitizeFormData, ValidationResult } from './AssessmentValidation';

export type AssessmentType = 'ai-readiness' | 'workflow-automation' | 'roi-calculator' | 'security-compliance';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentType: AssessmentType;
}

interface AssessmentStep {
  title: string;
  questions: Question[];
}

interface Question {
  id: string;
  text: string;
  type: 'radio' | 'select' | 'number' | 'currency' | 'text' | 'textarea' | 'checkbox' | 'scale';
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({ isOpen, onClose, assessmentType }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);

  const assessmentConfig = getAssessmentConfig(assessmentType);
  const totalSteps = assessmentConfig.steps.length;

  const handleInputChange = (questionId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const results = calculateResults(assessmentType, formData);
    setAssessmentResults(results);
    setShowResults(true);
    
    // Log to console for MVP
    console.log('Assessment Submitted:', {
      type: assessmentType,
      data: formData,
      results: results,
      timestamp: new Date().toISOString()
    });
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setFormData({});
    setShowResults(false);
    setAssessmentResults(null);
    onClose();
  };

  const currentStepData = assessmentConfig.steps[currentStep];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <div className="relative bg-bg-dark/95 backdrop-blur-xl border border-border-white-20 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] my-8 overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent-purple/10 pointer-events-none" />
              
              {/* Close button */}
              <button
                onClick={resetAssessment}
                className="absolute right-4 top-4 p-2 rounded-lg hover:bg-bg-white-10 transition-colors duration-200 z-10"
                aria-label="Close assessment"
              >
                <X className="h-5 w-5 text-text-white-60" />
              </button>
              
              {/* Content */}
              <div className="relative z-10 p-8 sm:p-10 max-h-[calc(90vh-2rem)] overflow-y-auto">
                {!showResults ? (
                  <>
                    {/* Header */}
                    <div className="mb-8">
                      <h2 className="font-satoshi font-bold text-2xl sm:text-3xl text-text-white mb-2">
                        {assessmentConfig.title}
                      </h2>
                      <div className="flex items-center justify-between">
                        <p className="text-text-white-60">
                          {assessmentConfig.description}
                        </p>
                        <span className="text-sm text-text-white-60">
                          Step {currentStep + 1} of {totalSteps}
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-4 h-2 bg-bg-white-10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-6">
                      <h3 className="font-satoshi font-semibold text-xl text-text-white">
                        {currentStepData.title}
                      </h3>
                      
                      {currentStepData.questions.map((question) => (
                        <QuestionField
                          key={question.id}
                          question={question}
                          value={formData[question.id]}
                          onChange={(value) => handleInputChange(question.id, value)}
                        />
                      ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between mt-8">
                      <CTAButton
                        variant="secondary"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </CTAButton>
                      
                      <CTAButton
                        variant="primary"
                        onClick={handleNext}
                        className="flex items-center gap-2"
                      >
                        {currentStep === totalSteps - 1 ? 'Submit Assessment' : 'Next'}
                        {currentStep < totalSteps - 1 && <ChevronRight className="h-4 w-4" />}
                      </CTAButton>
                    </div>
                  </>
                ) : (
                  <AssessmentResults
                    assessmentType={assessmentType}
                    results={assessmentResults}
                    onClose={resetAssessment}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Question Field Component
const QuestionField: React.FC<{
  question: Question;
  value: any;
  onChange: (value: any) => void;
}> = ({ question, value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-white-80">
        {question.text}
        {question.required && <span className="text-accent-red ml-1">*</span>}
      </label>
      
      {question.type === 'radio' && question.options && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <span className="text-text-white-80">{option.label}</span>
            </label>
          ))}
        </div>
      )}
      
      {question.type === 'select' && question.options && (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-bg-white-5 border border-border-white-10 rounded-lg 
            text-text-white placeholder-text-white-40 
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
            transition-all duration-200"
        >
          <option value="">Select an option</option>
          {question.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      
      {(question.type === 'number' || question.type === 'currency') && (
        <div className="relative">
          {question.type === 'currency' && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-white-60">$</span>
          )}
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            className={`w-full px-4 py-3 bg-bg-white-5 border border-border-white-10 rounded-lg 
              text-text-white placeholder-text-white-40 
              focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
              transition-all duration-200 ${question.type === 'currency' ? 'pl-8' : ''}`}
          />
        </div>
      )}
      
      {question.type === 'text' && (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className="w-full px-4 py-3 bg-bg-white-5 border border-border-white-10 rounded-lg 
            text-text-white placeholder-text-white-40 
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
            transition-all duration-200"
        />
      )}
      
      {question.type === 'textarea' && (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className="w-full px-4 py-3 bg-bg-white-5 border border-border-white-10 rounded-lg 
            text-text-white placeholder-text-white-40 resize-none
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
            transition-all duration-200"
        />
      )}
      
      {question.type === 'checkbox' && question.options && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                value={option.value}
                checked={value?.includes(option.value)}
                onChange={(e) => {
                  const newValue = value || [];
                  if (e.target.checked) {
                    onChange([...newValue, option.value]);
                  } else {
                    onChange(newValue.filter((v: string) => v !== option.value));
                  }
                }}
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <span className="text-text-white-80">{option.label}</span>
            </label>
          ))}
        </div>
      )}
      
      {question.type === 'scale' && (
        <div className="flex items-center gap-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => onChange(num)}
              className={`w-12 h-12 rounded-lg font-medium transition-all duration-200 ${
                value === num
                  ? 'bg-primary text-white'
                  : 'bg-bg-white-10 text-text-white-60 hover:bg-bg-white-20'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Results Component
const AssessmentResults: React.FC<{
  assessmentType: AssessmentType;
  results: any;
  onClose: () => void;
}> = ({ assessmentType, results, onClose }) => {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </motion.div>
      
      <h3 className="font-satoshi font-bold text-2xl text-text-white mb-4">
        Assessment Complete!
      </h3>
      
      {assessmentType === 'ai-readiness' && (
        <div className="space-y-4">
          <p className="text-lg text-text-white-80">
            Your AI Readiness Level: <span className="font-bold text-primary">{results.maturityLevel}</span>
          </p>
          <div className="bg-bg-white-10 rounded-lg p-6 text-left space-y-3">
            {Object.entries(results.scores).map(([category, score]) => (
              <div key={category} className="flex justify-between">
                <span className="text-text-white-80 capitalize">{category}:</span>
                <span className="font-medium text-text-white">{score as number}/10</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {assessmentType === 'workflow-automation' && (
        <div className="space-y-4">
          <p className="text-lg text-text-white-80">
            Automation Potential Score: <span className="font-bold text-primary">{results.automationScore}%</span>
          </p>
          <p className="text-text-white-60">
            Process Maturity: {results.processMaturity}%
          </p>
        </div>
      )}
      
      {assessmentType === 'roi-calculator' && (
        <div className="space-y-4">
          <p className="text-lg text-text-white-80">
            Projected ROI: <span className="font-bold text-primary">{results.roi}%</span>
          </p>
          <p className="text-text-white-60">
            Payback Period: {results.paybackPeriod} months
          </p>
        </div>
      )}
      
      {assessmentType === 'security-compliance' && (
        <div className="space-y-4">
          <p className="text-lg text-text-white-80">
            Compliance Level: <span className="font-bold text-primary">{results.complianceLevel}</span>
          </p>
          {results.gaps.length > 0 && (
            <div className="bg-bg-white-10 rounded-lg p-4 text-left">
              <p className="text-sm font-medium text-text-white-80 mb-2">Identified Gaps:</p>
              <ul className="space-y-1">
                {results.gaps.map((gap: string, index: number) => (
                  <li key={index} className="text-sm text-text-white-60 flex items-start gap-2">
                    <span className="text-accent-red">•</span>
                    {gap}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      <div className="flex gap-4 mt-8">
        <CTAButton
          variant="secondary"
          onClick={onClose}
          className="flex-1"
        >
          Close
        </CTAButton>
        <CTAButton
          variant="primary"
          onClick={() => {
            console.log('View recommended agents for:', assessmentType);
            onClose();
          }}
          className="flex-1"
        >
          View Recommended Agents
        </CTAButton>
      </div>
    </div>
  );
};

// Assessment configurations
function getAssessmentConfig(type: AssessmentType): { title: string; description: string; steps: AssessmentStep[] } {
  switch (type) {
    case 'ai-readiness':
      return aiReadinessConfig;
    case 'workflow-automation':
      return workflowAutomationConfig;
    case 'roi-calculator':
      return roiCalculatorConfig;
    case 'security-compliance':
      return securityComplianceConfig;
    default:
      return aiReadinessConfig;
  }
}

// Calculate results based on assessment type
function calculateResults(type: AssessmentType, data: Record<string, any>): any {
  switch (type) {
    case 'ai-readiness':
      return calculateAIReadinessResults(data);
    case 'workflow-automation':
      return calculateWorkflowResults(data);
    case 'roi-calculator':
      return calculateROIResults(data);
    case 'security-compliance':
      return calculateSecurityResults(data);
    default:
      return {};
  }
}

// AI Readiness Assessment Configuration
const aiReadinessConfig = {
  title: 'AI Readiness Assessment',
  description: 'Evaluate your organization\'s preparedness for AI adoption',
  steps: [
    {
      title: 'Purpose - Strategic Alignment',
      questions: [
        {
          id: 'purpose_clarity',
          text: 'How clearly defined are the problems you aim to solve with AI?',
          type: 'radio' as const,
          options: [
            { value: 'very_clear', label: 'Very Clear' },
            { value: 'moderately_clear', label: 'Moderately Clear' },
            { value: 'unclear', label: 'Unclear' }
          ],
          required: true
        },
        {
          id: 'strategic_alignment',
          text: 'Is there strong strategic alignment for AI initiatives within your organization?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'partially', label: 'Partially' },
            { value: 'no', label: 'No' }
          ],
          required: true
        }
      ]
    },
    {
      title: 'People - Skills & Teams',
      questions: [
        {
          id: 'ai_skills',
          text: 'What is the current level of AI-related skills within your workforce?',
          type: 'select' as const,
          options: [
            { value: 'high', label: 'High' },
            { value: 'medium', label: 'Medium' },
            { value: 'low', label: 'Low' },
            { value: 'none', label: 'None' }
          ],
          required: true
        },
        {
          id: 'dedicated_teams',
          text: 'Do you have dedicated teams for AI development or implementation?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ],
          required: true
        }
      ]
    },
    {
      title: 'Process - Optimization & Data Flow',
      questions: [
        {
          id: 'process_documentation',
          text: 'Are your existing business processes well-documented and optimized for automation?',
          type: 'scale' as const,
          required: true
        },
        {
          id: 'data_flow',
          text: 'How well does data flow between departments relevant to potential AI applications?',
          type: 'radio' as const,
          options: [
            { value: 'good', label: 'Good' },
            { value: 'fair', label: 'Fair' },
            { value: 'poor', label: 'Poor' }
          ],
          required: true
        }
      ]
    },
    {
      title: 'Platform - Infrastructure & Integration',
      questions: [
        {
          id: 'infrastructure',
          text: 'Do you have the necessary technological infrastructure (e.g., cloud compute, data storage) to support AI?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'partially', label: 'Partially' },
            { value: 'no', label: 'No' }
          ],
          required: true
        },
        {
          id: 'data_integration',
          text: 'How well integrated are your current data sources for AI model training?',
          type: 'radio' as const,
          options: [
            { value: 'highly', label: 'Highly Integrated' },
            { value: 'moderately', label: 'Moderately Integrated' },
            { value: 'not', label: 'Not Integrated' }
          ],
          required: true
        }
      ]
    },
    {
      title: 'Performance - Metrics & ROI',
      questions: [
        {
          id: 'success_metrics',
          text: 'Do you have clear metrics defined to measure the success of AI initiatives?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'developing', label: 'Developing' },
            { value: 'no', label: 'No' }
          ],
          required: true
        },
        {
          id: 'roi_confidence',
          text: 'How confident are you in tracking the ROI of future AI deployments?',
          type: 'radio' as const,
          options: [
            { value: 'very', label: 'Very Confident' },
            { value: 'moderately', label: 'Moderately Confident' },
            { value: 'not', label: 'Not Confident' }
          ],
          required: true
        }
      ]
    }
  ]
};

// Workflow Automation Configuration
const workflowAutomationConfig = {
  title: 'Workflow Automation Audit',
  description: 'Identify processes for automation to save time and reduce costs',
  steps: [
    {
      title: 'Workflow Identification',
      questions: [
        {
          id: 'department',
          text: 'Which department\'s workflow are you primarily auditing?',
          type: 'select' as const,
          options: [
            { value: 'sales', label: 'Sales' },
            { value: 'marketing', label: 'Marketing' },
            { value: 'hr', label: 'HR' },
            { value: 'finance', label: 'Finance' },
            { value: 'operations', label: 'Operations' },
            { value: 'other', label: 'Other' }
          ],
          required: true
        },
        {
          id: 'task_description',
          text: 'Briefly describe a specific repetitive task you\'d like to automate:',
          type: 'textarea' as const,
          placeholder: 'E.g., Manual data entry from emails to CRM...',
          required: true
        }
      ]
    },
    {
      title: 'Current State Analysis',
      questions: [
        {
          id: 'time_spent',
          text: 'Approximately how much time (hours/week) is spent on this task?',
          type: 'number' as const,
          placeholder: 'Enter hours per week',
          required: true
        },
        {
          id: 'people_involved',
          text: 'How many people are involved in this task?',
          type: 'number' as const,
          placeholder: 'Enter number of people',
          required: true
        },
        {
          id: 'bottlenecks',
          text: 'What are the primary bottlenecks or pain points in this workflow?',
          type: 'checkbox' as const,
          options: [
            { value: 'manual_data_entry', label: 'Manual Data Entry' },
            { value: 'approvals', label: 'Approval Delays' },
            { value: 'communication', label: 'Communication Delays' },
            { value: 'errors', label: 'Error Prone' },
            { value: 'other', label: 'Other' }
          ],
          required: true
        }
      ]
    },
    {
      title: 'Potential Impact',
      questions: [
        {
          id: 'monthly_cost',
          text: 'What is the estimated cost (per month) associated with this task?',
          type: 'currency' as const,
          placeholder: 'Enter monthly cost',
          required: true
        },
        {
          id: 'criticality',
          text: 'How critical is this workflow to your core business operations?',
          type: 'radio' as const,
          options: [
            { value: 'high', label: 'High' },
            { value: 'medium', label: 'Medium' },
            { value: 'low', label: 'Low' }
          ],
          required: true
        }
      ]
    }
  ]
};

// ROI Calculator Configuration
const roiCalculatorConfig = {
  title: 'ROI Calculator',
  description: 'Calculate potential savings and efficiency gains from AI implementation',
  steps: [
    {
      title: 'Investment Costs',
      questions: [
        {
          id: 'initial_cost',
          text: 'Estimated initial cost of AI agent deployment (setup, integration):',
          type: 'currency' as const,
          placeholder: 'Enter initial cost',
          required: true
        },
        {
          id: 'monthly_cost',
          text: 'Estimated ongoing monthly costs (maintenance, subscriptions):',
          type: 'currency' as const,
          placeholder: 'Enter monthly cost',
          required: true
        },
        {
          id: 'training_cost',
          text: 'Estimated training costs for staff:',
          type: 'currency' as const,
          placeholder: 'Enter training cost',
          required: true
        }
      ]
    },
    {
      title: 'Expected Gains',
      questions: [
        {
          id: 'monthly_savings',
          text: 'Estimated monthly cost savings from automation/efficiency:',
          type: 'currency' as const,
          placeholder: 'Enter monthly savings',
          required: true
        },
        {
          id: 'revenue_increase',
          text: 'Estimated monthly increase in revenue from new capabilities:',
          type: 'currency' as const,
          placeholder: 'Enter revenue increase',
          required: true
        },
        {
          id: 'region',
          text: 'Select your region for economic adjustment factors:',
          type: 'select' as const,
          options: [
            { value: 'north_america', label: 'North America' },
            { value: 'europe', label: 'Europe' },
            { value: 'asia', label: 'Asia' },
            { value: 'other', label: 'Other' }
          ],
          required: true
        }
      ]
    }
  ]
};

// Security & Compliance Configuration
const securityComplianceConfig = {
  title: 'Security & Compliance Check',
  description: 'Ensure AI implementation meets industry standards and regulations',
  steps: [
    {
      title: 'Industry & Region',
      questions: [
        {
          id: 'industry',
          text: 'Which industry best describes your organization?',
          type: 'select' as const,
          options: [
            { value: 'healthcare', label: 'Healthcare' },
            { value: 'finance', label: 'Finance' },
            { value: 'retail', label: 'Retail' },
            { value: 'tech', label: 'Technology' },
            { value: 'other', label: 'Other' }
          ],
          required: true
        },
        {
          id: 'region',
          text: 'Which region are you primarily operating in?',
          type: 'select' as const,
          options: [
            { value: 'north_america', label: 'North America' },
            { value: 'eu', label: 'European Union' },
            { value: 'asia_pacific', label: 'Asia-Pacific' },
            { value: 'other', label: 'Other' }
          ],
          required: true
        }
      ]
    },
    {
      title: 'NIST CSF - Govern & Identify',
      questions: [
        {
          id: 'cybersecurity_policy',
          text: 'Do you have a documented cybersecurity policy integrated with organizational risk management?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'developing', label: 'Developing' },
            { value: 'no', label: 'No' }
          ],
          required: true
        },
        {
          id: 'asset_categorization',
          text: 'Are all your digital assets (data, systems, applications) identified and categorized?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'partially', label: 'Partially' },
            { value: 'no', label: 'No' }
          ],
          required: true
        }
      ]
    },
    {
      title: 'NIST CSF - Protect & Detect',
      questions: [
        {
          id: 'access_controls',
          text: 'Are access controls regularly reviewed and updated?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'some', label: 'Some' },
            { value: 'no', label: 'No' }
          ],
          required: true
        },
        {
          id: 'monitoring_systems',
          text: 'Do you have continuous monitoring systems to detect cybersecurity events?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'planned', label: 'Planned' },
            { value: 'no', label: 'No' }
          ],
          required: true
        }
      ]
    },
    {
      title: 'NIST CSF - Respond & Recover',
      questions: [
        {
          id: 'incident_response',
          text: 'Is there a documented incident response plan in place?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'developing', label: 'Developing' },
            { value: 'no', label: 'No' }
          ],
          required: true
        },
        {
          id: 'disaster_recovery',
          text: 'Do you regularly test your disaster recovery and business continuity plans?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'rarely', label: 'Rarely' },
            { value: 'no', label: 'No' }
          ],
          required: true
        }
      ]
    },
    {
      title: 'Regional Compliance',
      questions: [
        {
          id: 'gdpr_compliance',
          text: 'Do you have a GDPR compliance officer or framework in place?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ],
          required: true
        },
        {
          id: 'industry_compliance',
          text: 'Are you compliant with industry-specific regulations (e.g., HIPAA, PCI-DSS)?',
          type: 'radio' as const,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ],
          required: true
        }
      ]
    }
  ]
};

// Results calculation functions
function calculateAIReadinessResults(data: Record<string, any>) {
  const scoreMap: Record<string, number> = {
    // Purpose scores
    'very_clear': 10, 'moderately_clear': 6, 'unclear': 2,
    'yes': 10, 'partially': 6, 'no': 2,
    // People scores
    'high': 10, 'medium': 7, 'low': 4, 'none': 1,
    // Process scores (scale is already numeric)
    'good': 10, 'fair': 6, 'poor': 2,
    // Platform scores
    'highly': 10, 'moderately': 6, 'not': 2,
    // Performance scores
    'developing': 6, 'very': 10
  };

  const scores = {
    purpose: (scoreMap[data.purpose_clarity] + scoreMap[data.strategic_alignment]) / 2,
    people: (scoreMap[data.ai_skills] + (data.dedicated_teams === 'yes' ? 10 : 3)) / 2,
    process: ((data.process_documentation || 3) * 2 + scoreMap[data.data_flow]) / 2,
    platform: (scoreMap[data.infrastructure] + scoreMap[data.data_integration]) / 2,
    performance: (scoreMap[data.success_metrics] + scoreMap[data.roi_confidence]) / 2
  };

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / 5;

  let maturityLevel = 'Unprepared';
  if (totalScore >= 8) maturityLevel = 'Fully Prepared';
  else if (totalScore >= 6) maturityLevel = 'Prepared';
  else if (totalScore >= 4) maturityLevel = 'Developing';

  return { scores, totalScore, maturityLevel };
}

function calculateWorkflowResults(data: Record<string, any>) {
  const timeSpent = parseFloat(data.time_spent) || 0;
  const peopleInvolved = parseFloat(data.people_involved) || 0;
  const monthlyCost = parseFloat(data.monthly_cost) || 0;
  const bottlenecks = data.bottlenecks?.length || 0;

  // Higher scores for more time, people, cost, and bottlenecks
  const automationScore = Math.min(100, 
    (timeSpent * 2) + 
    (peopleInvolved * 10) + 
    (monthlyCost / 100) + 
    (bottlenecks * 15)
  );

  const processMaturity = data.criticality === 'high' ? 85 : 
                          data.criticality === 'medium' ? 65 : 45;

  return { automationScore: Math.round(automationScore), processMaturity };
}

function calculateROIResults(data: Record<string, any>) {
  const initialCost = parseFloat(data.initial_cost) || 0;
  const monthlyCost = parseFloat(data.monthly_cost) || 0;
  const trainingCost = parseFloat(data.training_cost) || 0;
  const monthlySavings = parseFloat(data.monthly_savings) || 0;
  const revenueIncrease = parseFloat(data.revenue_increase) || 0;

  const period = 12; // Calculate for 12 months
  const totalInvestment = initialCost + (monthlyCost * period) + trainingCost;
  const totalGains = (monthlySavings + revenueIncrease) * period;
  
  const roi = totalInvestment > 0 ? ((totalGains - totalInvestment) / totalInvestment * 100) : 0;
  const monthlyNetGain = monthlySavings + revenueIncrease - monthlyCost;
  const paybackPeriod = monthlyNetGain > 0 ? Math.ceil(totalInvestment / monthlyNetGain) : 0;

  return { 
    roi: Math.round(roi), 
    paybackPeriod,
    totalInvestment: Math.round(totalInvestment),
    totalGains: Math.round(totalGains)
  };
}

function calculateSecurityResults(data: Record<string, any>) {
  const scoreMap: Record<string, number> = {
    'yes': 10, 'developing': 6, 'no': 2,
    'partially': 6, 'some': 6, 'planned': 4, 'rarely': 3
  };

  const nistScores = {
    govern: (scoreMap[data.cybersecurity_policy] + scoreMap[data.asset_categorization]) / 2,
    protect: (scoreMap[data.access_controls] + scoreMap[data.monitoring_systems]) / 2,
    respond: (scoreMap[data.incident_response] + scoreMap[data.disaster_recovery]) / 2
  };

  const regionalScore = (data.gdpr_compliance === 'yes' ? 10 : 5) + 
                       (data.industry_compliance === 'yes' ? 10 : 5);

  const totalScore = (Object.values(nistScores).reduce((sum, score) => sum + score, 0) + regionalScore) / 4;

  let complianceLevel = 'Non-Compliant';
  if (totalScore >= 8) complianceLevel = 'Compliant';
  else if (totalScore >= 6) complianceLevel = 'Maturing';
  else if (totalScore >= 4) complianceLevel = 'Basic';

  const gaps = [];
  if (data.cybersecurity_policy !== 'yes') gaps.push('Cybersecurity Policy');
  if (data.monitoring_systems !== 'yes') gaps.push('Continuous Monitoring');
  if (data.incident_response !== 'yes') gaps.push('Incident Response Plan');
  if (data.gdpr_compliance !== 'yes' && data.region === 'eu') gaps.push('GDPR Compliance');

  return { complianceLevel, gaps, nistScores, totalScore };
}
