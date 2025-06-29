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

// Clean icon container with consistent styling using Tailwind
const IconContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="w-24 h-24 flex items-center justify-center">
    <div className="text-accent transition-all duration-300">
      {children}
    </div>
  </div>
);

// Service Icons - Using standard Lucide icons
export const BrandStrategyIcon = () => (
  <IconContainer>
    <Target className="w-full h-full" />
  </IconContainer>
);

export const VisualIdentityIcon = () => (
  <IconContainer>
    <Palette className="w-full h-full" />
  </IconContainer>
);

export const DigitalExperienceIcon = () => (
  <IconContainer>
    <Monitor className="w-full h-full" />
  </IconContainer>
);

export const ContentStrategyIcon = () => (
  <IconContainer>
    <FileText className="w-full h-full" />
  </IconContainer>
);

export const BrandArchitectureIcon = () => (
  <IconContainer>
    <Layers className="w-full h-full" />
  </IconContainer>
);

export const CommunityBuildingIcon = () => (
  <IconContainer>
    <Users className="w-full h-full" />
  </IconContainer>
);

// Process Icons - using unique icons for the Process page
export const AuthenticConnectionIcon = () => (
  <IconContainer>
    <Heart className="w-full h-full" />
  </IconContainer>
);

export const StrategicAlignmentIcon = () => (
  <IconContainer>
    <Compass className="w-full h-full" />
  </IconContainer>
);

export const CommunityIntegrationIcon = () => (
  <IconContainer>
    <Network className="w-full h-full" />
  </IconContainer>
);

export const ConsistentExperienceIcon = () => (
  <IconContainer>
    <CheckCircle className="w-full h-full" />
  </IconContainer>
);

export const MeasurableImpactIcon = () => (
  <IconContainer>
    <TrendingUp className="w-full h-full" />
  </IconContainer>
);

export const AdaptiveEvolutionIcon = () => (
  <IconContainer>
    <Zap className="w-full h-full" />
  </IconContainer>
);
