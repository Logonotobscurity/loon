import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../Global/Logo';
import { CTAButton } from '../Global/CTAButton';
import { Github, Twitter, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';
import { ResponsiveModal } from '../Global/ResponsiveModal';
import { JoinWaitlistModal } from '../Global/JoinWaitlistModal';

const footerLinks = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Use Cases', href: '/#use-cases' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Enterprise', href: '/about' }
  ],
  developers: [
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/docs#api' },
    { name: 'SDK \u0026 Tools', href: '/docs#sdks' },
    { name: 'Community', href: '/about#community' },
    { name: 'Open Source', href: '/about#open-source' }
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/about#careers' },
    { name: 'Press', href: '/about#press' },
    { name: 'Contact', href: '/about#contact' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Compliance', href: '#' }
  ]
};

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' }
];

/**
 * A footer component that displays navigation links, social media links, and a call-to-action.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
export const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'waitlist' | 'vendor'>('waitlist');

  return (
    <footer className="relative bg-bg-dark pt-12 sm:pt-16 md:pt-20 pb-20 md:pb-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container relative z-10">
        {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 md:p-12 mb-16 text-center"
          >
            <h3 className="font-satoshi font-bold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">
              Ready to Deploy Your First Agent?
            </h3>
            <p className="text-text-white-80 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of businesses automating their workflows with LOG_ON's autonomous AI agents
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton 
                variant="primary" 
                className="!px-8 !py-4"
                onClick={() => { setModalMode('waitlist'); setShowModal(true); }}
              >
                Join Waitlist
              </CTAButton>
              <CTAButton 
                variant="secondary" 
                className="!px-8 !py-4"
                onClick={() => { setModalMode('vendor'); setShowModal(true); }}
              >
                Become a Vendor
              </CTAButton>
            </div>
          </motion.div>

        {/* Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Logo and description */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2 mb-6 sm:mb-8 md:mb-0">
            <Logo className="mb-4" />
            <p className="text-text-white-60 text-sm mb-6 max-w-sm">
              Building the future of work with autonomous AI agents that amplify human potential.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="p-2 rounded-lg bg-bg-white-5 hover:bg-bg-white-10 text-text-white-60 hover:text-text-white transition-all duration-200"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h4 className="font-semibold text-text-white mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-text-white-60 hover:text-text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.name}
                    {link.href === '#' && (
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-text-white mb-3 sm:mb-4 text-sm sm:text-base">Developers</h4>
            <ul className="space-y-2">
              {footerLinks.developers.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-text-white-60 hover:text-text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-text-white mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-text-white-60 hover:text-text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-text-white mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-text-white-60 hover:text-text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border-white-10 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="text-center lg:text-left w-full lg:w-auto">
              <h4 className="font-semibold text-text-white mb-1 sm:mb-2">Stay Updated</h4>
              <p className="text-text-white-60 text-sm">Get the latest updates on AI agents and automation</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1 sm:flex-initial md:w-64 text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-white-10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-text-white-60 text-xs sm:text-sm order-2 sm:order-1">
            © {new Date().getFullYear()} LOG_ON. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6 order-1 sm:order-2">
            <a href="#" className="text-text-white-60 hover:text-text-white text-xs sm:text-sm transition-colors">
              System Status
            </a>
            <a href="#" className="text-text-white-60 hover:text-text-white text-xs sm:text-sm transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>

      {showModal && (
        <ResponsiveModal isOpen={showModal} onClose={() => setShowModal(false)}>
          <JoinWaitlistModal mode={modalMode} onClose={() => setShowModal(false)} />
        </ResponsiveModal>
      )}
    </footer>
  );
};
