import React from 'react';
import { CTAButton } from '../../../components/Global/CTAButton';

export const CreatorApplicationForm = () => (
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
);