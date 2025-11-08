import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CTAButton } from '../Global/CTAButton';

interface LeadGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * A modal for lead generation.
 *
 * @param {object} props - The properties for the component.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {Function} props.onClose - The function to call when the modal is closed.
 * @returns {JSX.Element} The rendered lead generation modal.
 */
export const LeadGenerationModal: React.FC<LeadGenerationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industryType: '',
    userType: 'User',
    psychologyQuestion: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate async operation
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        industryType: '',
        userType: 'User',
        psychologyQuestion: ''
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
            <div className="relative bg-bg-dark/95 backdrop-blur-xl border border-border-white-20 rounded-2xl shadow-2xl w-full max-w-2xl my-8">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent-purple/10 pointer-events-none" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-lg hover:bg-bg-white-10 transition-colors duration-200 z-10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-text-white-60" />
              </button>
              
              {/* Content */}
              <div className="relative z-10 p-8 sm:p-10">
                <h2 className="font-satoshi font-bold text-2xl sm:text-3xl text-text-white mb-2">
                  Join the AI Revolution
                </h2>
                <p className="text-text-white-60 mb-8">
                  Tell us about your needs and we'll help you deploy the perfect AI agents.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-white-80 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bg-white-5 border border-border-white-10 rounded-lg 
                        text-text-white placeholder-text-white-40 
                        focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
                        transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-white-80 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bg-white-5 border border-border-white-10 rounded-lg 
                        text-text-white placeholder-text-white-40 
                        focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
                        transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  {/* Industry Type field */}
                  <div>
                    <label htmlFor="industryType" className="block text-sm font-medium text-text-white-80 mb-2">
                      Industry Type
                    </label>
                    <select
                      id="industryType"
                      name="industryType"
                      value={formData.industryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bg-white-5 border border-border-white-10 rounded-lg 
                        text-text-white placeholder-text-white-40 
                        focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
                        transition-all duration-200"
                    >
                      <option value="">Select your industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="education">Education</option>
                      <option value="services">Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  {/* User Type field */}
                  <div>
                    <label htmlFor="userType" className="block text-sm font-medium text-text-white-80 mb-2">
                      User Type
                    </label>
                    <select
                      id="userType"
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bg-white-5 border border-border-white-10 rounded-lg 
                        text-text-white placeholder-text-white-40 
                        focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
                        transition-all duration-200"
                    >
                      <option value="Developer/Vendor">Developer/Vendor</option>
                      <option value="User">User</option>
                      <option value="Business Owner">Business Owner</option>
                    </select>
                  </div>
                  
                  {/* Psychology Question field */}
                  <div>
                    <label htmlFor="psychologyQuestion" className="block text-sm font-medium text-text-white-80 mb-2">
                      Your AI Challenge
                    </label>
                    <p className="text-xs text-text-white-60 mb-2">
                      If you were to implement an AI agent to help with a task, what is the biggest bottleneck or challenge you would want it to solve for your {formData.userType === 'Developer/Vendor' ? 'development' : formData.userType === 'Business Owner' ? 'business operations' : 'personal use'}?
                    </p>
                    <textarea
                      id="psychologyQuestion"
                      name="psychologyQuestion"
                      value={formData.psychologyQuestion}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-bg-white-5 border border-border-white-10 rounded-lg 
                        text-text-white placeholder-text-white-40 resize-none
                        focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
                        transition-all duration-200"
                      placeholder="Describe your biggest challenge that AI could help solve..."
                    />
                  </div>
                  
                  {/* Submit button */}
                  <div className="flex gap-4 pt-4">
                    <CTAButton 
                type="submit" 
                variant="primary"
                className="flex-1"
                disabled={isLoading}
              >
                      Get Started
                    </CTAButton>
                    <CTAButton 
                      type="button" 
                      variant="secondary"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Cancel
                    </CTAButton>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
