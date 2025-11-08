import React from 'react';

interface ScrollAnchorProps {
  id: string;
}

/**
 * A component that creates an anchor point for smooth scrolling.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.id - The ID of the anchor.
 * @returns {JSX.Element} The rendered anchor component.
 */
export const ScrollAnchor = ({ id }: ScrollAnchorProps) => {
  return <div id={id} className="relative -top-24" />;
};
