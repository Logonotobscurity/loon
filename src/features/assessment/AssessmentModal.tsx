import React, { useState } from 'react';
import ResponsiveModal from '../Global/ResponsiveModal';
import CTAButton from '../Global/CTAButton';
import { trackEvent } from '../../analytics/analytics';

export type AssessmentType = 'ai-readiness' | 'workflow-automation' | 'roi-calculator' | 'security-compliance';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentType?: AssessmentType;
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({ isOpen, onClose, assessmentType }) => {
  const [fullName, setFullName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessGoals, setBusinessGoals] = useState('');
  const [currentChallenges, setCurrentChallenges] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      trackEvent('assessment_submit', {
        type: assessmentType || 'unknown',
        hasGoals: !!businessGoals,
        hasChallenges: !!currentChallenges,
      });
    } catch {}
    onClose();
  };

  return (
    <ResponsiveModal isOpen={isOpen} onClose={onClose} title="Business Assessment">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-white-80 mb-2">Full Name</label>
          <input className="input" placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-white-80 mb-2">Business Email</label>
          <input className="input" type="email" placeholder="Your business email" value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-white-80 mb-2">Company Name</label>
          <input className="input" placeholder="Your company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-white-80 mb-2">Business Goals</label>
          <textarea className="input" placeholder="Describe your business goals" value={businessGoals} onChange={(e) => setBusinessGoals(e.target.value)} required rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-white-80 mb-2">Current Challenges</label>
          <textarea className="input" placeholder="Describe your current challenges" value={currentChallenges} onChange={(e) => setCurrentChallenges(e.target.value)} required rows={3} />
        </div>
        <div className="flex justify-end">
          <CTAButton type="submit">Submit Assessment</CTAButton>
        </div>
      </form>
    </ResponsiveModal>
  );
};

export { AssessmentModal };
export default AssessmentModal;
