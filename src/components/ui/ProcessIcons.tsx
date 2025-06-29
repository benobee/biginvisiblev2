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
  Zap,
} from 'lucide-react';

type IconSize = 'xxs' | 'xs' | 's' | 'l' | 'xl' | 'xxl';

const convertSizeToNumber = (size?: IconSize): number => {
  switch (size) {
    case 'xxs':
      return 16;
    case 'xs':
      return 20;
    case 's':
      return 24;
    case 'l':
      return 32;
    case 'xl':
      return 40;
    case 'xxl':
      return 48;
    default:
      return 40; // Default size
  }
}

// Clean icon container with consistent styling using Tailwind
const IconContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="w-24 h-24 flex items-center justify-center">
    <div className="text-accent transition-all duration-300">
      {children}
    </div>
  </div>
);

// Service Icons - Using standard Lucide icons
export const BrandStrategyIcon = (props?: {
  size?: IconSize
}) => {
  const size = convertSizeToNumber(props?.size);
  return (
    <IconContainer {...props}>
      <Target className="w-full h-full" size={size} />
    </IconContainer>
  )
}


export const VisualIdentityIcon = (props?: {
  size?: IconSize
}) => {
  const size = convertSizeToNumber(props?.size);
  return (
    <IconContainer {...props}>
      <Palette className="w-full h-full" size={size} />
    </IconContainer>
  )
}

export const DigitalExperienceIcon = (props?: {
  size?: IconSize
}) => {
  const size = convertSizeToNumber(props?.size);
  return (
    <IconContainer {...props}>
      <Monitor className="w-full h-full" size={size} />
    </IconContainer>
  )
}

export const ContentStrategyIcon = (props?: {
  size?: IconSize
}) => {
  const size = convertSizeToNumber(props?.size);
  return (
    <IconContainer {...props}>
      <FileText className="w-full h-full" size={size} />
    </IconContainer>
  )
}

export const BrandArchitectureIcon = (props?: {
  size?: IconSize
}) => {
  const size = convertSizeToNumber(props?.size);
  return (
    <IconContainer {...props}>
      <Layers className="w-full h-full" size={size} />
    </IconContainer>
  )
}

export const CommunityBuildingIcon = (props?: {
  size?: IconSize
}) => {
  const size = convertSizeToNumber(props?.size);
  return (
    <IconContainer {...props}>
      <Users className="w-full h-full" size={size} />
    </IconContainer>
  )
}

// Process Icons - using unique icons for the Process page
export const AuthenticConnectionIcon = (props?: {
  size?: IconSize
}) => {
  const size = convertSizeToNumber(props?.size);
  return (
    <IconContainer {...props}>
      <Heart className="w-full h-full" size={size} />
    </IconContainer>
  )
}

export const StrategicAlignmentIcon = (props?: {
  size?: IconSize
}) => {
  const size = convertSizeToNumber(props?.size);
  return (
    <IconContainer {...props}>
      <Compass className="w-full h-full" size={size} />
    </IconContainer>
  )
}

export const CommunityIntegrationIcon = (props?: {
  size?: IconSize
}) => {
  const size = convertSizeToNumber(props?.size);
  return (
    <IconContainer {...props}>
      <Network className="w-full h-full" size={size} />
    </IconContainer>
  )
}

export const ConsistentExperienceIcon = (props?: {
  size?: IconSize
}) => {
  const size = convertSizeToNumber(props?.size);
  return (
    <IconContainer {...props}>
      <CheckCircle className="w-full h-full" size={size} />
    </IconContainer>
  )
}

export const MeasurableImpactIcon = (props?: {
  size?: IconSize
}) => {
  const size = convertSizeToNumber(props?.size);
  return (
    <IconContainer {...props}>
      <TrendingUp className="w-full h-full" size={size} />
    </IconContainer>
  )
}

export const AdaptiveEvolutionIcon = (props?: {
  size?: IconSize
}) => {
  const size = convertSizeToNumber(props?.size);
  return (
    <IconContainer {...props}>
      <Zap className="w-full h-full" size={size} />
    </IconContainer>
  )
}
