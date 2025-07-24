import React from 'react';
import { motion } from 'framer-motion';

interface MicrochipVisualizationProps {
  className?: string;
}

export const MicrochipVisualization: React.FC<MicrochipVisualizationProps> = ({ className = '' }) => {
  return (
    <div className={`microchip-container ${className}`}>
      {/* Background PCB */}
      <svg 
        className="microchip-pcb"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient definitions */}
          <radialGradient id="chipGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0d9488" />
          </radialGradient>
          
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          {/* Filter for glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect width="400" height="400" fill="#042f2e" />

        {/* Circuit traces - radial pattern */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 200;
          const y1 = 200;
          const x2 = 200 + 150 * Math.cos(rad);
          const y2 = 200 + 150 * Math.sin(rad);
          
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#fbbf24"
                strokeWidth="2"
                className="circuit-trace"
                filter="url(#glow)"
              />
              {/* Animated pulse along trace */}
              <circle r="3" fill="#fbbf24" filter="url(#glow)">
                <animateMotion
                  dur={`${2 + i * 0.2}s`}
                  repeatCount="indefinite"
                  path={`M${x1},${y1} L${x2},${y2}`}
                />
              </circle>
            </g>
          );
        })}

        {/* Neural web connections */}
        {[...Array(8)].map((_, i) => {
          const angle1 = (i * 45 * Math.PI) / 180;
          const angle2 = ((i + 1) * 45 * Math.PI) / 180;
          const r = 120;
          const x1 = 200 + r * Math.cos(angle1);
          const y1 = 200 + r * Math.sin(angle1);
          const x2 = 200 + r * Math.cos(angle2);
          const y2 = 200 + r * Math.sin(angle2);
          
          return (
            <path
              key={`web-${i}`}
              d={`M${x1},${y1} Q200,200 ${x2},${y2}`}
              stroke="#fbbf24"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
              className="neural-connection"
            />
          );
        })}

        {/* Component nodes */}
        {[60, 120, 180, 240, 300, 360].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 200 + 100 * Math.cos(rad);
          const y = 200 + 100 * Math.sin(rad);
          
          return (
            <g key={`component-${i}`}>
              {/* Capacitor/Resistor representation */}
              <rect
                x={x - 10}
                y={y - 5}
                width="20"
                height="10"
                fill="#d97706"
                stroke="#fbbf24"
                strokeWidth="1"
              />
              {/* Blinking node */}
              <circle
                cx={x}
                cy={y}
                r="3"
                fill="#fbbf24"
                className="signal-node"
              >
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur={`${1.5 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

        {/* Central chip */}
        <g>
          {/* Chip glow */}
          <rect
            x="150"
            y="150"
            width="100"
            height="100"
            fill="url(#glowGradient)"
            rx="10"
            className="chip-glow"
          />
          
          {/* Chip body */}
          <rect
            x="160"
            y="160"
            width="80"
            height="80"
            fill="url(#chipGradient)"
            stroke="#fbbf24"
            strokeWidth="2"
            rx="5"
            filter="url(#glow)"
          />
          
          {/* Chip pins */}
          {[...Array(8)].map((_, i) => (
            <rect
              key={`pin-${i}`}
              x={165 + i * 9}
              y={i % 2 === 0 ? 155 : 240}
              width="6"
              height="10"
              fill="#fbbf24"
            />
          ))}
          
          {/* Chip label */}
          <text
            x="200"
            y="195"
            textAnchor="middle"
            fill="#fbbf24"
            fontSize="10"
            fontFamily="monospace"
            className="chip-label"
          >
            CHIPCASE
          </text>
          <text
            x="200"
            y="210"
            textAnchor="middle"
            fill="#fbbf24"
            fontSize="8"
            fontFamily="monospace"
            className="chip-label"
          >
            VRIECGCN
          </text>
        </g>

        {/* Electric discharge effects */}
        {[...Array(3)].map((_, i) => (
          <g key={`discharge-${i}`} className="electric-discharge">
            <path
              d={`M200,200 L${200 + Math.random() * 60 - 30},${200 + Math.random() * 60 - 30}`}
              stroke="#fbbf24"
              strokeWidth="1"
              fill="none"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="0.2s"
                begin={`${i * 2}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        ))}
      </svg>

      {/* Interactive hover effect overlay */}
      <motion.div 
        className="microchip-hover-overlay"
        whileHover={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};
