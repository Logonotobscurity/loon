import React, { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface TextMarqueeProps {
  text: string;
  bidirectional?: boolean;
  speed?: number;
  className?: string;
}

/**
 * A text marquee component with bidirectional scrolling.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.text - The text to display in the marquee.
 * @param {boolean} [props.bidirectional=true] - Whether the marquee should scroll in both directions.
 * @param {number} [props.speed=20] - The speed of the marquee.
 * @param {string} [props.className] - Additional CSS classes to apply to the marquee.
 * @returns {JSX.Element} The rendered text marquee component.
 */
export const TextMarquee: React.FC<TextMarqueeProps> = ({ 
  text, 
  bidirectional = true,
  speed = 20,
  className = ''
}) => {
  // Split text into two lines
  const line1 = "Conquer Converse, Convert, Conquer";
  const line2 = "The Power of Voice-First Business Intelligence • ";
  const controls = useAnimationControls();
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  useEffect(() => {
    if (!bidirectional) {
      // Unidirectional scrolling
      controls.start({
        x: [0, -50 + '%'],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        },
      });
    } else {
      // Bidirectional scrolling based on scroll
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const lastScrollY = parseInt(document.body.getAttribute('data-last-scroll') || '0');
        
        if (scrollY > lastScrollY) {
          setDirection('left');
        } else {
          setDirection('right');
        }
        
        document.body.setAttribute('data-last-scroll', scrollY.toString());
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [bidirectional, controls, speed]);

  useEffect(() => {
    if (bidirectional) {
      if (direction === 'left') {
        controls.start({
          x: [0, -50 + '%'],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          },
        });
      } else {
        controls.start({
          x: [-50 + '%', 0],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          },
        });
      }
    }
  }, [direction, bidirectional, controls, speed]);

  return (
    <div className={`marquee-container ${className}`}>
      <div className="marquee-line">
        <motion.div
          className="marquee-content"
          animate={controls}
        >
          {/* Line 1 - Duplicate for seamless loop */}
          <span className="marquee-text">{line1}</span>
          <span className="marquee-text">{line1}</span>
        </motion.div>
      </div>
      <div className="marquee-line">
        <motion.div
          className="marquee-content"
          animate={controls}
        >
          {/* Line 2 - Duplicate for seamless loop */}
          <span className="marquee-text">{line2}</span>
          <span className="marquee-text">{line2}</span>
        </motion.div>
      </div>
    </div>
  );
};
