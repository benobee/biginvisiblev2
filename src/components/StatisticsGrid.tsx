import Grid from './ui/Grid';
import GridItem from './ui/GridItem';
import StatisticCard from './StatisticCard';
import { getStatisticsByCategory, getStatisticsByCategories, getRandomStatistics, type BrandingStatistic } from '../data/brandingStatistics';

interface StatisticsGridProps {
  // Specify statistics by category
  category?: string;
  categories?: string[];
  // Or provide specific statistics
  statistics?: BrandingStatistic[];
  // Or show random statistics
  randomCount?: number;
  // Grid configuration
  columns?: number;
  gap?: 'small' | 'medium' | 'large' | 'xl' | 'xxl';
  // Card configuration
  variant?: 'default' | 'large' | 'minimal' | 'featured';
  showSource?: boolean;
  limit?: number;
  className?: string;
}

const StatisticsGrid = ({
  category,
  categories,
  statistics,
  randomCount,
  columns = 3,
  gap = 'large',
  variant = 'default',
  showSource = false,
  limit,
  className = ''
}: StatisticsGridProps) => {
  // Determine which statistics to show
  let statsToShow: BrandingStatistic[] = [];
  
  if (statistics) {
    statsToShow = statistics;
  } else if (category) {
    statsToShow = getStatisticsByCategory(category);
  } else if (categories) {
    statsToShow = getStatisticsByCategories(categories);
  } else if (randomCount) {
    statsToShow = getRandomStatistics(randomCount);
  }
  
  // Apply limit if specified
  if (limit && limit < statsToShow.length) {
    statsToShow = statsToShow.slice(0, limit);
  }

  if (statsToShow.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <Grid columns={columns} gap={gap}>
        {statsToShow.map((statistic) => (
          <GridItem key={statistic.id} span={1}>
            <StatisticCard 
              statistic={statistic}
              variant={variant}
              showSource={showSource}
            />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default StatisticsGrid;