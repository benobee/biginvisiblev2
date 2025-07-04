import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';
import StatisticsGrid from './StatisticsGrid';
import type { BrandingStatistic } from '../data/brandingStatistics';

interface StatisticsSectionProps {
  // Section content
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  
  // Statistics configuration
  category?: string;
  categories?: string[];
  statistics?: BrandingStatistic[];
  randomCount?: number;
  
  // Grid configuration
  columns?: number;
  gap?: 'small' | 'medium' | 'large' | 'xl' | 'xxl';
  
  // Card configuration
  variant?: 'default' | 'large' | 'minimal' | 'featured';
  showSource?: boolean;
  limit?: number;
  
  // Section styling
  background?: 'primary' | 'secondary' | 'light' | 'dark';
  className?: string;
}

const StatisticsSection = ({
  subtitle,
  title,
  description,
  align = 'center',
  category,
  categories,
  statistics,
  randomCount,
  columns = 3,
  gap = 'large',
  variant = 'default',
  showSource = false,
  limit,
  background = 'light',
  className = ''
}: StatisticsSectionProps) => {
  return (
    <Section background={background} className={className}>
      <SectionHeader
        subtitle={subtitle}
        title={title}
        description={description}
        align={align}
      />
      
      <div className="mt-16">
        <StatisticsGrid
          category={category}
          categories={categories}
          statistics={statistics}
          randomCount={randomCount}
          columns={columns}
          gap={gap}
          variant={variant}
          showSource={showSource}
          limit={limit}
        />
      </div>
    </Section>
  );
};

export default StatisticsSection;