import React, { Fragment } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUp } from 'lucide-react';
import { copy } from '../../copy';

export const UseCaseList = () => {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white/5 p-2 space-y-2">
        {copy.useCases.map((useCase, index) => {
          const [title, content] = useCase.split(': ');
          return (
            <Disclosure as="div" key={title} defaultOpen={index === 0}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-primary/20 px-4 py-3 text-left text-sm font-medium text-primary hover:bg-primary/30 focus:outline-none focus-visible:ring focus-visible:ring-primary/75">
                    <span>{title}</span>
                    <ChevronUp
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-primary transition-transform`}
                    />
                  </Disclosure.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-1"
                  >
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-textLight/80">
                      {content}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          );
        })}
      </div>
    </div>
  );
};
