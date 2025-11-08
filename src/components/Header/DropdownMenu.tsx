import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

interface DropdownMenuProps {
  title: string;
  items: { name: string; href: string }[];
}

/**
 * A dropdown menu component.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.title - The title of the dropdown menu.
 * @param {Array<{name: string, href: string}>} props.items - The items to display in the dropdown menu.
 * @returns {JSX.Element} The rendered dropdown menu component.
 */
export const DropdownMenu = ({ title, items }: DropdownMenuProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center rounded-md px-4 py-2 text-sm font-inter font-medium text-text-white-80 hover:text-primary hover:bg-bg-white-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all duration-200">
          {title}
          <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right glass-card shadow-glass focus:outline-none p-1">
          <div className="px-1 py-1">
            {items.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <a
                    href={item.href}
                    className={`${
                      active ? 'bg-primary text-text-white' : 'text-text-white-80'
                    } group flex w-full items-center rounded-lg px-3 py-2 text-sm font-inter transition-all duration-200`}
                  >
                    {item.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
