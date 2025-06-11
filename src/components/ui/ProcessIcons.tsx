import styled, { keyframes } from 'styled-components';

// Animation keyframes - more subtle and professional
const gentlePulse = keyframes`
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
`;

const smoothRotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const subtleGlow = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
`;

const gentleWave = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1px); }
`;

const progressDraw = keyframes`
  0% { stroke-dashoffset: 60; }
  100% { stroke-dashoffset: 0; }
`;

const subtleScale = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Simplified styled components
const PulsingElement = styled.g`
  animation: ${gentlePulse} 3s ease-in-out infinite;
`;

const RotatingElement = styled.g`
  animation: ${smoothRotate} 12s linear infinite;
  transform-origin: 50% 50%;
`;

const GlowingElement = styled.circle<{ delay?: string }>`
  animation: ${subtleGlow} 2.5s ease-in-out infinite ${props => props.delay || '0s'};
`;

const WavingElement = styled.g`
  animation: ${gentleWave} 4s ease-in-out infinite;
`;

const DrawingPath = styled.path`
  stroke-dasharray: 60;
  animation: ${progressDraw} 4s ease-in-out infinite;
`;

const ScalingElement = styled.circle`
  animation: ${subtleScale} 3s ease-in-out infinite;
`;

// Clean icon container
const IconContainer = styled.div`
  width: 96px;
  height: 96px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  svg {
    width: 100%;
    height: 100%;
    transition: all ${({ theme }) => theme.transitions.default};
  }
  
  &:hover svg {
    transform: scale(1.05);
  }
`;

// Clean, professional icon components
export const AuthenticConnectionIcon = () => (
  <IconContainer>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <PulsingElement>
        <circle
          cx="18"
          cy="24"
          r="10"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="2"
          opacity="0.6"
        />
        <circle
          cx="30"
          cy="24"
          r="10"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="2"
          opacity="0.6"
        />
      </PulsingElement>
      <circle
        cx="24"
        cy="24"
        r="3"
        fill="#FF3A46"
        opacity="0.8"
      />
    </svg>
  </IconContainer>
);

export const StrategicAlignmentIcon = () => (
  <IconContainer>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="24"
        cy="24"
        r="18"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <RotatingElement>
        <path
          d="M24 8v32M8 24h32"
          stroke="#FF3A46"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </RotatingElement>
      <circle
        cx="24"
        cy="24"
        r="4"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="2"
      />
      <circle
        cx="24"
        cy="24"
        r="1.5"
        fill="#FF3A46"
      />
    </svg>
  </IconContainer>
);

export const CommunityIntegrationIcon = () => (
  <IconContainer>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="24"
        cy="16"
        r="6"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <circle
        cx="12"
        cy="32"
        r="6"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <circle
        cx="36"
        cy="32"
        r="6"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <path
        d="M20 20l-6 8M28 20l6 8"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <GlowingElement
        cx="24"
        cy="16"
        r="2"
        fill="#FF3A46"
      />
      <GlowingElement
        cx="12"
        cy="32"
        r="2"
        fill="#FF3A46"
        delay="0.8s"
      />
      <GlowingElement
        cx="36"
        cy="32"
        r="2"
        fill="#FF3A46"
        delay="1.6s"
      />
    </svg>
  </IconContainer>
);

export const ConsistentExperienceIcon = () => (
  <IconContainer>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <WavingElement>
        <path
          d="M6 24c4-4 8-4 12 0s8 4 12 0 8-4 12 0"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </WavingElement>
      <path
        d="M6 18c4-4 8-4 12 0s8 4 12 0 8-4 12 0"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.5"
        strokeLinecap="round"
      />
      <path
        d="M6 30c4-4 8-4 12 0s8 4 12 0 8-4 12 0"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.5"
        strokeLinecap="round"
      />
    </svg>
  </IconContainer>
);

export const MeasurableImpactIcon = () => (
  <IconContainer>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 38h32M8 38V10"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      />
      <DrawingPath
        d="M12 34l6-8 6 4 6-12 6 6"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="34" r="2" fill="#FF3A46" opacity="0.7" />
      <circle cx="18" cy="26" r="2" fill="#FF3A46" opacity="0.7" />
      <circle cx="24" cy="30" r="2" fill="#FF3A46" opacity="0.7" />
      <circle cx="30" cy="18" r="2" fill="#FF3A46" opacity="0.7" />
      <circle cx="36" cy="24" r="2" fill="#FF3A46" />
      <path
        d="M33 15l6 6-3 0v-3z"
        fill="#FF3A46"
        opacity="0.8"
      />
    </svg>
  </IconContainer>
);

export const AdaptiveEvolutionIcon = () => (
  <IconContainer>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="24"
        cy="24"
        r="16"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <circle
        cx="24"
        cy="24"
        r="10"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <ScalingElement
        cx="24"
        cy="24"
        r="4"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="2"
      />
      <circle
        cx="24"
        cy="24"
        r="2"
        fill="#FF3A46"
        opacity="0.8"
      />
      <path
        d="M24 8v4M40 24h-4M24 40v-4M8 24h4"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  </IconContainer>
);

// Service Icons for Home Page
export const BrandStrategyIcon = () => (
  <IconContainer>
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Strategic Documents - Bottom Left */}
      <rect
        x="8"
        y="60"
        width="24"
        height="28"
        rx="2"
        fill="none"
        stroke="#4A90E2"
        strokeWidth="2"
        opacity="0.6"
      />
      <rect
        x="12"
        y="68"
        width="16"
        height="2"
        rx="1"
        fill="#4A90E2"
        opacity="0.4"
      />
      <rect
        x="12"
        y="72"
        width="12"
        height="2"
        rx="1"
        fill="#4A90E2"
        opacity="0.4"
      />
      <rect
        x="12"
        y="76"
        width="14"
        height="2"
        rx="1"
        fill="#4A90E2"
        opacity="0.4"
      />
      
      {/* Chart/Graph */}
      <path
        d="M14 64l4-3 4 2 4-4 2 2"
        stroke="#FF8A50"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      
      {/* Central Lightbulb */}
      <PulsingElement>
        <path
          d="M48 32c-6 0-10 4-10 10 0 3 1 6 3 8v6c0 2 2 4 4 4h6c2 0 4-2 4-4v-6c2-2 3-5 3-8 0-6-4-10-10-10z"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="2.5"
          opacity="0.8"
        />
        <path
          d="M42 56h12M44 60h8"
          stroke="#FF3A46"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </PulsingElement>
      
      {/* Idea spark lines */}
      <path
        d="M42 38l-3-3M54 38l3-3M48 28v-4"
        stroke="#FF3A46"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      
      {/* Target - Top Right */}
      <circle
        cx="72"
        cy="24"
        r="14"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="2"
        opacity="0.3"
      />
      <circle
        cx="72"
        cy="24"
        r="9"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="2"
        opacity="0.5"
      />
      <circle
        cx="72"
        cy="24"
        r="4"
        fill="#FF3A46"
        opacity="0.8"
      />
      
      {/* Arrows pointing to target */}
      <path
        d="M56 16l12 4-2-2 2-2z"
        fill="#FF8A50"
        opacity="0.7"
      />
      <path
        d="M58 32l10-4-2 2 2 2z"
        fill="#FF8A50"
        opacity="0.7"
      />
      
      {/* Strategic Connection Lines */}
      <DrawingPath
        d="M32 72c8-8 16-16 24-24"
        stroke="#FF3A46"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        opacity="0.4"
        strokeLinecap="round"
      />
      <DrawingPath
        d="M54 48c6-8 12-16 18-24"
        stroke="#FF3A46"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        opacity="0.4"
        strokeLinecap="round"
      />
      
      {/* Process indicators */}
      <GlowingElement
        cx="20"
        cy="52"
        r="2"
        fill="#4A90E2"
      />
      <GlowingElement
        cx="48"
        cy="42"
        r="3"
        fill="#FF3A46"
        delay="0.5s"
      />
      <GlowingElement
        cx="72"
        cy="24"
        r="2"
        fill="#FF8A50"
        delay="1s"
      />
    </svg>
  </IconContainer>
);

export const VisualIdentityIcon = () => (
  <IconContainer>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <PulsingElement>
        <rect
          x="12"
          y="12"
          width="12"
          height="12"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="2"
          opacity="0.4"
          rx="2"
        />
      </PulsingElement>
      <PulsingElement>
        <circle
          cx="30"
          cy="18"
          r="6"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="2"
          opacity="0.5"
        />
      </PulsingElement>
      <PulsingElement>
        <polygon
          points="18,42 12,30 24,30"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="2"
          opacity="0.4"
        />
      </PulsingElement>
      <WavingElement>
        <path
          d="M30 30l6 6M36 30l-6 6"
          stroke="#FF3A46"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      </WavingElement>
      <circle cx="18" cy="18" r="2" fill="#FF3A46" opacity="0.6" />
      <circle cx="30" cy="18" r="2" fill="#FF3A46" opacity="0.6" />
      <circle cx="18" cy="36" r="2" fill="#FF3A46" opacity="0.6" />
      <circle cx="33" cy="33" r="2" fill="#FF3A46" opacity="0.8" />
    </svg>
  </IconContainer>
);

export const DigitalExperienceIcon = () => (
  <IconContainer>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="8"
        y="12"
        width="32"
        height="24"
        rx="2"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <path
        d="M8 20h32"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <WavingElement>
        <rect
          x="12"
          y="24"
          width="6"
          height="4"
          rx="1"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <rect
          x="21"
          y="24"
          width="6"
          height="4"
          rx="1"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <rect
          x="30"
          y="24"
          width="6"
          height="4"
          rx="1"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="1.5"
          opacity="0.5"
        />
      </WavingElement>
      <DrawingPath
        d="M15 40c0-4 4-4 8 0s8 4 12 0"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <GlowingElement cx="12" cy="16" r="1" fill="#FF3A46" />
      <GlowingElement cx="16" cy="16" r="1" fill="#FF3A46" delay="0.3s" />
      <GlowingElement cx="20" cy="16" r="1" fill="#FF3A46" delay="0.6s" />
      <circle cx="24" cy="26" r="1.5" fill="#FF3A46" opacity="0.8" />
    </svg>
  </IconContainer>
);

export const ContentStrategyIcon = () => (
  <IconContainer>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="6"
        y="8"
        width="36"
        height="32"
        rx="2"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <PulsingElement>
        <rect
          x="12"
          y="16"
          width="12"
          height="2"
          rx="1"
          fill="#FF3A46"
          opacity="0.6"
        />
        <rect
          x="12"
          y="22"
          width="18"
          height="2"
          rx="1"
          fill="#FF3A46"
          opacity="0.4"
        />
        <rect
          x="12"
          y="28"
          width="15"
          height="2"
          rx="1"
          fill="#FF3A46"
          opacity="0.5"
        />
      </PulsingElement>
      <WavingElement>
        <path
          d="M30 16c2 0 4 1.5 4 3.5s-2 3.5-4 3.5"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M32 20h6"
          stroke="#FF3A46"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </WavingElement>
      <DrawingPath
        d="M6 12h36M6 36h36"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.4"
        strokeLinecap="round"
      />
      <GlowingElement cx="10" cy="12" r="1.5" fill="#FF3A46" />
      <GlowingElement cx="14" cy="12" r="1.5" fill="#FF3A46" delay="0.4s" />
      <GlowingElement cx="18" cy="12" r="1.5" fill="#FF3A46" delay="0.8s" />
    </svg>
  </IconContainer>
);

export const BrandArchitectureIcon = () => (
  <IconContainer>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="8"
        y="32"
        width="32"
        height="8"
        rx="1"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <PulsingElement>
        <rect
          x="12"
          y="24"
          width="8"
          height="8"
          rx="1"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <rect
          x="28"
          y="24"
          width="8"
          height="8"
          rx="1"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="1.5"
          opacity="0.5"
        />
      </PulsingElement>
      <ScalingElement
        cx="24"
        cy="16"
        r="6"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="2"
        opacity="0.7"
      />
      <path
        d="M16 32v-4M32 32v-4M24 22v10"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      />
      <WavingElement>
        <path
          d="M18 16l6-6 6 6"
          stroke="#FF3A46"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
      </WavingElement>
      <GlowingElement cx="24" cy="16" r="2" fill="#FF3A46" />
      <circle cx="16" cy="28" r="1.5" fill="#FF3A46" opacity="0.6" />
      <circle cx="32" cy="28" r="1.5" fill="#FF3A46" opacity="0.6" />
      <circle cx="24" cy="36" r="1.5" fill="#FF3A46" opacity="0.8" />
    </svg>
  </IconContainer>
);

export const CommunityBuildingIcon = () => (
  <IconContainer>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="24"
        cy="24"
        r="18"
        fill="none"
        stroke="#FF3A46"
        strokeWidth="1.5"
        opacity="0.2"
      />
      <PulsingElement>
        <circle
          cx="24"
          cy="18"
          r="4"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <circle
          cx="14"
          cy="28"
          r="3"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <circle
          cx="34"
          cy="28"
          r="3"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <circle
          cx="18"
          cy="36"
          r="2.5"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="1.5"
          opacity="0.3"
        />
        <circle
          cx="30"
          cy="36"
          r="2.5"
          fill="none"
          stroke="#FF3A46"
          strokeWidth="1.5"
          opacity="0.3"
        />
      </PulsingElement>
      <DrawingPath
        d="M21 22l-5 4M27 22l5 4M16 31l2 3M32 31l-2 3"
        stroke="#FF3A46"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <GlowingElement cx="24" cy="18" r="1.5" fill="#FF3A46" />
      <GlowingElement cx="14" cy="28" r="1" fill="#FF3A46" delay="0.3s" />
      <GlowingElement cx="34" cy="28" r="1" fill="#FF3A46" delay="0.6s" />
      <GlowingElement cx="18" cy="36" r="1" fill="#FF3A46" delay="0.9s" />
      <GlowingElement cx="30" cy="36" r="1" fill="#FF3A46" delay="1.2s" />
    </svg>
  </IconContainer>
);
