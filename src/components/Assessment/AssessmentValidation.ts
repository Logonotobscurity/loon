import { AssessmentType } from './AssessmentModal';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateAssessmentStep(
  assessmentType: AssessmentType,
  stepIndex: number,
  formData: Record<string, any>,
  questions: any[]
): ValidationResult {
  const errors: string[] = [];
  
  questions.forEach((question) => {
    const value = formData[question.id];
    
    // Check required fields
    if (question.required) {
      if (value === undefined || value === null || value === '') {
        errors.push(`${question.text} is required`);
      }
      
      // Check array fields (checkboxes)
      if (question.type === 'checkbox' && (!value || value.length === 0)) {
        errors.push(`Please select at least one option for: ${question.text}`);
      }
    }
    
    // Type-specific validation
    if (value !== undefined && value !== null && value !== '') {
      switch (question.type) {
        case 'number':
        case 'currency':
          const numValue = parseFloat(value);
          if (isNaN(numValue) || numValue < 0) {
            errors.push(`${question.text} must be a valid positive number`);
          }
          break;
          
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors.push(`${question.text} must be a valid email address`);
          }
          break;
          
        case 'scale':
          const scaleValue = parseInt(value);
          if (isNaN(scaleValue) || scaleValue < 1 || scaleValue > 5) {
            errors.push(`${question.text} must be between 1 and 5`);
          }
          break;
      }
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function sanitizeFormData(formData: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // Convert string numbers to actual numbers
      if (typeof value === 'string' && !isNaN(parseFloat(value)) && key.includes('cost') || key.includes('savings') || key.includes('revenue') || key.includes('time') || key.includes('people')) {
        sanitized[key] = parseFloat(value);
      } else {
        sanitized[key] = value;
      }
    }
  });
  
  return sanitized;
}
