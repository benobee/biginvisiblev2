import Grid from './ui/Grid';
import GridItem from './ui/GridItem';
import ImpactStatisticCard from './ImpactStatisticCard';
import StatisticCard from './StatisticCard';
import { getStatisticsByCategories, type StatisticEntry } from '../data/statisticsDatabase';

interface ImpactStatisticsGridProps {
  // Specify statistics by service category
  serviceCategory?: string;
  // Or provide specific statistics
  statistics?: StatisticEntry[];
  // Grid configuration
  columns?: number;
  gap?: 'small' | 'medium' | 'large' | 'xl' | 'xxl';
  // Card configuration
  variant?: 'default' | 'large' | 'minimal' | 'featured';
  showSource?: boolean;
  showPercentage?: boolean;
  // When true, render the statistics-page detail card (StatisticCard) instead of the impact card
  useDetailCard?: boolean;
  limit?: number;
  className?: string;
}

const ImpactStatisticsGrid = ({
  serviceCategory,
  statistics,
  columns = 4,
  gap = 'large',
  variant = 'default',
  showSource = false,
  showPercentage = true,
  useDetailCard = false,
  limit,
  className = ''
}: ImpactStatisticsGridProps) => {
  // Determine which statistics to show
  let statsToShow: StatisticEntry[] = [];
  
  if (statistics) {
    statsToShow = statistics;
  } else if (serviceCategory) {
    statsToShow = getStatisticsByCategories([serviceCategory]);
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
            {useDetailCard ? (
              <StatisticCard
                statistic={{ 
                  ...statistic, 
                  percentage: statistic.impactPercentage, 
                  statement: statistic.impactStatement 
                }}
                variant={variant}
                showSource={showSource}
                clickable={false}
              />
            ) : (
              <ImpactStatisticCard 
                statistic={statistic}
                variant={variant}
                showSource={showSource}
                showPercentage={showPercentage}
              />
            )}
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default ImpactStatisticsGrid;
