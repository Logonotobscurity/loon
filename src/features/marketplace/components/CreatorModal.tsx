import React from 'react';
import { motion } from 'framer-motion';
import { CTAButton } from '../../../components/Global/CTAButton';

interface CreatorModalProps {
  onClose: () => void;
}

export const CreatorModal = ({ onClose }: CreatorModalProps) => (
  <motion.div
    className="bg-bg-dark-90 border border-border-white-20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
  >
    <button
      onClick={onClose}
      className="float-right text-text-white-60 hover:text-text-white transition-colors"
    >
      ✕
    </button>

    <div className="mb-6">
      <h2 className="font-satoshi font-bold text-2xl text-text-white mb-4">
        Unlock Your Creator Potential with LOG_ON
      </h2>
      <p className="text-text-white-80 mb-6">
        Joining the LOG_ON creator community means transforming your ideas into powerful AI agents and automations. Whether you're a seasoned developer or a no-code enthusiast, our comprehensive toolkit makes it easy to build, publish, and monetize your intelligence.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <h3 className="font-semibold text-primary mb-2">Easy-to-Use SDK/APIs</h3>
          <p className="text-sm text-text-white-70">Seamless integration for robust development.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <h3 className="font-semibold text-primary mb-2">No-Code/Low-Code Tools</h3>
          <p className="text-sm text-text-white-70">Build automations without complex coding.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <h3 className="font-semibold text-primary mb-2">Global/Regional Reach</h3>
          <p className="text-sm text-text-white-70">Tap into a growing user base, including our Africa-first market.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <h3 className="font-semibold text-primary mb-2">Fair Monetization</h3>
          <p className="text-sm text-text-white-70">Earn revenue through our transparent marketplace model.</p>
        </div>
      </div>
    </div>

    <form className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="bg-bg-dark border border-border-white-20 rounded-lg px-4 py-3 text-text-white placeholder-text-white-40 focus:border-primary focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="bg-bg-dark border border-border-white-20 rounded-lg px-4 py-3 text-text-white placeholder-text-white-40 focus:border-primary focus:outline-none"
        />
      </div>

      <select className="w-full bg-bg-dark border border-border-white-20 rounded-lg px-4 py-3 text-text-white focus:border-primary focus:outline-none">
        <option value="">Developer Type</option>
        <option value="individual">Individual Developer</option>
        <option value="agency">Small Agency</option>
        <option value="enterprise">Enterprise Solution Provider</option>
        <option value="other">Other</option>
      </select>

      <div>
        <label className="block text-text-white-80 mb-2">Primary Interest (select all that apply):</label>
        <div className="grid grid-cols-2 gap-2">
          {['Building AI Agents', 'Creating Automations', 'Providing Integration Services', 'Consulting/Partnership'].map((interest) => (
            <label key={interest} className="flex items-center gap-2 text-sm text-text-white-70">
              <input type="checkbox" className="rounded border-border-white-20" />
              {interest}
            </label>
          ))}
        </div>
      </div>

      <textarea
        placeholder="Message/Brief Idea (Optional)"
        rows={4}
        className="w-full bg-bg-dark border border-border-white-20 rounded-lg px-4 py-3 text-text-white placeholder-text-white-40 focus:border-primary focus:outline-none resize-none"
      />

      <CTAButton variant="primary" className="w-full">
        Apply to Become a Creator
      </CTAButton>

      <p className="text-xs text-text-white-60 text-center">
        Our team will review your application and provide access to our developer toolkit and resources.
      </p>
    </form>
  </motion.div>
);