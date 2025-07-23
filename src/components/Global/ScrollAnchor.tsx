import React from 'react';

interface ScrollAnchorProps {
  id: string;
}

export const ScrollAnchor = ({ id }: ScrollAnchorProps) => {
  return <div id={id} className="relative -top-24" />;
};
