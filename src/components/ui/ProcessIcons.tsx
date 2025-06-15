import styled from 'styled-components';
import {
  Target,
  Palette,
  Monitor,
  FileText,
  Layers,
  Users,
  Heart,
  Compass,
  Network,
  CheckCircle,
  TrendingUp,
  Zap
} from 'lucide-react';

// Clean icon container with consistent styling
const IconContainer = styled.div`
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 48px;
    height: 48px;
    color: ${({ theme }) => theme.colors.accent};
    transition: all ${({ theme }) => theme.transitions.default};
  }
`;

// Service Icons - Using standard Lucide icons
export const BrandStrategyIcon = () => (
  <IconContainer>
    <Target />
  </IconContainer>
);

export const VisualIdentityIcon = () => (
  <IconContainer>
    <Palette />
  </IconContainer>
);

export const DigitalExperienceIcon = () => (
  <IconContainer>
    <Monitor />
  </IconContainer>
);

export const ContentStrategyIcon = () => (
  <IconContainer>
    <FileText />
  </IconContainer>
);

export const BrandArchitectureIcon = () => (
  <IconContainer>
    <Layers />
  </IconContainer>
);

export const CommunityBuildingIcon = () => (
  <IconContainer>
    <Users />
  </IconContainer>
);

// Process Icons - using unique icons for the Process page
export const AuthenticConnectionIcon = () => (
  <IconContainer>
    <Heart />
  </IconContainer>
);

export const StrategicAlignmentIcon = () => (
  <IconContainer>
    <Compass />
  </IconContainer>
);

export const CommunityIntegrationIcon = () => (
  <IconContainer>
    <Network />
  </IconContainer>
);

export const ConsistentExperienceIcon = () => (
  <IconContainer>
    <CheckCircle />
  </IconContainer>
);

export const MeasurableImpactIcon = () => (
  <IconContainer>
    <TrendingUp />
  </IconContainer>
);

export const AdaptiveEvolutionIcon = () => (
  <IconContainer>
    <Zap />
  </IconContainer>
);
