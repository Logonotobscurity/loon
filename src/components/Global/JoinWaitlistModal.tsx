import React, { useMemo, useState } from 'react';

export function JoinWaitlistModal({ mode = 'waitlist', onClose }: { mode?: 'waitlist' | 'vendor'; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const mailtoHref = useMemo(() => {
    const to = 'logonthepage@gmail.com';
    const subject = encodeURIComponent(
      mode === 'vendor' ? `Vendor/Developer Application - ${name || 'Applicant'}` : `Join Waitlist - ${name || 'User'}`
    );
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      mode === 'vendor' ? `Role/Services: ${role}` : undefined,
      '',
      message,
    ].filter(Boolean);
    const body = encodeURIComponent(lines.join('\n'));
    return `mailto:${to}?subject=${subject}&body=${body}`;
  }, [mode, name, email, company, role, message]);

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-xl font-satoshi font-bold text-text-white mb-1">
        {mode === 'vendor' ? 'Become a Vendor / Developer' : 'Join the Waitlist'}
      </h2>
      <p className="text-text-white-70 mb-4">
        {mode === 'vendor'
          ? 'Tell us about your services or solutions. We will reach out with next steps.'
          : 'Enter your details and we will notify you when we launch.'}
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Company (optional)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="input sm:col-span-2"
        />
        {mode === 'vendor' && (
          <input
            type="text"
            placeholder="Role / Services you provide"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input sm:col-span-2"
          />
        )}
      </div>

      <textarea
        placeholder={mode === 'vendor' ? 'Describe your offering or solution' : 'What are you most interested in?'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        className="input mt-3"
      />

      <div className="mt-4 flex items-center gap-3 justify-end">
        <button onClick={onClose} className="btn-secondary">Cancel</button>
        <a href={mailtoHref} className="btn-primary">
          {mode === 'vendor' ? 'Send Application' : 'Join Waitlist'}
        </a>
      </div>
    </div>
  );
}

