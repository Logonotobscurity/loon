import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  label: string;
  href: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MarketplaceMenuProps {
  title: string;
  href: string;
  sections: MenuSection[];
  highlight?: string;
}

/**
 * A dropdown menu for the marketplace with a link to the main marketplace page.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.title - The title of the menu.
 * @param {string} props.href - The link to the main marketplace page.
 * @param {Array<MenuSection>} props.sections - The sections to display in the dropdown menu.
 * @param {string} [props.highlight] - A highlight text to display at the bottom of the dropdown.
 * @returns {JSX.Element} The rendered marketplace menu component.
 */
export const MarketplaceMenu: React.FC<MarketplaceMenuProps> = ({ 
  title, 
  href,
  sections,
  highlight 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center">
        <Link
          to={href}
          className="text-sm font-inter font-medium text-text-white-80 hover:text-primary transition-colors duration-200 py-2 pr-1"
        >
          {title}
        </Link>
        <button
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="text-text-white-80 hover:text-primary transition-colors duration-200 py-2 pl-1"
        >
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="absolute left-0 top-full mt-2 w-[600px] rounded-2xl bg-bg-dark/95 backdrop-blur-xl border border-border-white-10 shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-6 p-6">
              {sections.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-sm font-semibold text-text-white uppercase tracking-wide">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {item.href.startsWith('/') ? (
                          <Link
                            to={item.href}
                            className="block text-sm text-text-white-60 hover:text-primary transition-colors duration-200 py-1"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            className="block text-sm text-text-white-60 hover:text-primary transition-colors duration-200 py-1"
                          >
                            {item.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {highlight && (
              <div className="px-6 py-4 bg-bg-white-5 border-t border-border-white-10">
                <p className="text-sm text-text-white-80 italic">
                  {highlight}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
