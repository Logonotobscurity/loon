import { AssessmentType } from './AssessmentModal'; // Assuming AssessmentModal is in the same directory initially

// Define validation rules for each assessment type
const validationRules: Record<AssessmentType, Record<string, (value: any) => string | null>> = {
  'ai-readiness': {
    purpose_clarity: (value) => (value ? null : 'Purpose clarity is required.'),
    strategic_alignment: (value) => (value ? null : 'Strategic alignment is required.'),
    ai_skills: (value) => (value ? null : 'AI skills level is required.'),
    dedicated_teams: (value) => (value ? null : 'Dedicated teams information is required.'),
    process_documentation: (value) => (value !== undefined && value !== null ? null : 'Process documentation level is required.'),
    data_flow: (value) => (value ? null : 'Data flow information is required.'),
    infrastructure: (value) => (value ? null : 'Infrastructure information is required.'),
    data_integration: (value) => (value ? null : 'Data integration information is required.'),
    success_metrics: (value) => (value ? null : 'Success metrics information is required.'),
    roi_confidence: (value) => (value ? null : 'ROI confidence level is required.'),
  },
  'workflow-automation': {
    department: (value) => (value ? null : 'Department is required.'),
    task_description: (value) => (value ? null : 'Task description is required.'),
    time_spent: (value) => (value !== undefined && value !== null && value >= 0 ? null : 'Time spent must be a non-negative number.'),
    people_involved: (value) => (value !== undefined && value !== null && value >= 0 ? null : 'People involved must be a non-negative number.'),
    bottlenecks: (value) => (value && value.length > 0 ? null : 'At least one bottleneck must be selected.'),
    monthly_cost: (value) => (value !== undefined && value !== null && value >= 0 ? null : 'Monthly cost must be a non-negative number.'),
    criticality: (value) => (value ? null : 'Criticality is required.'),
  },
  'roi-calculator': {
    initial_cost: (value) => (value !== undefined && value !== null && value >= 0 ? null : 'Initial cost must be a non-negative number.'),
    monthly_cost: (value) => (value !== undefined && value !== null && value >= 0 ? null : 'Monthly cost must be a non-negative number.'),
    training_cost: (value) => (value !== undefined && value !== null && value >= 0 ? null : 'Training cost must be a non-negative number.'),
    monthly_savings: (value) => (value !== undefined && value !== null && value >= 0 ? null : 'Monthly savings must be a non-negative number.'),
    revenue_increase: (value) => (value !== undefined && value !== null && value >= 0 ? null : 'Revenue increase must be a non-negative number.'),
    region: (value) => (value ? null : 'Region is required.'),
  },
  'security-compliance': {
    industry: (value) => (value ? null : 'Industry is required.'),
    region: (value) => (value ? null : 'Region is required.'),
    cybersecurity_policy: (value) => (value ? null : 'Cybersecurity policy information is required.'),
    asset_categorization: (value) => (value ? null : 'Asset categorization information is required.'),
    access_controls: (value) => (value ? null : 'Access controls information is required.'),
    monitoring_systems: (value) => (value ? null : 'Monitoring systems information is required.'),
    incident_response: (value) => (value ? null : 'Incident response plan information is required.'),
    disaster_recovery: (value) => (value ? null : 'Disaster recovery information is required.'),
    gdpr_compliance: (value) => (value ? null : 'GDPR compliance information is required.'),
    industry_compliance: (value) => (value ? null : 'Industry compliance information is required.'),
  },
};

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateAssessmentStep = (
  assessmentType: AssessmentType,
  stepQuestions: { id: string; required?: boolean }[],
  formData: Record<string, any>
): ValidationResult => {
  const errors: Record<string, string> = {};
  let isValid = true;

  stepQuestions.forEach(question => {
    if (question.required) {
      const value = formData[question.id];
      const rule = validationRules[assessmentType]?.[question.id];
      if (rule) {
        const error = rule(value);
        if (error) {
          errors[question.id] = error;
          isValid = false;
        }
      } else if (value === undefined || value === null || value === '') {
         // Basic check if no specific rule exists but required is true
         errors[question.id] = `${question.id} is required.`;
         isValid = false;
      }
    }
  });

  return { isValid, errors };
};

export const sanitizeFormData = (formData: Record<string, any>): Record<string, any> => {
  const sanitizedData: Record<string, any> = {};
  for (const key in formData) {
    if (formData.hasOwnProperty(key)) {
      const value = formData[key];
      // Basic sanitization: trim strings
      if (typeof value === 'string') {
        sanitizedData[key] = value.trim();
      }
      // Basic sanitization: convert empty strings for numbers/currency to 0 or null
       else if (typeof value === 'number' && (value === null || isNaN(value))) {
         sanitizedData[key] = 0; // Or null, depending on desired behavior
       }
      else {
        sanitizedData[key] = value;
      }
    }
  }
  return sanitizedData;
};