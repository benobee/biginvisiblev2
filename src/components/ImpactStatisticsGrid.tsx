import Grid from './ui/Grid';
import GridItem from './ui/GridItem';
import ImpactStatisticCard from './ImpactStatisticCard';
import { getImpactStatisticsByService, type ServiceImpactStatistic } from '../data/serviceImpactStatistics';

interface ImpactStatisticsGridProps {
  // Specify statistics by service category
  serviceCategory?: string;
  // Or provide specific statistics
  statistics?: ServiceImpactStatistic[];
  // Grid configuration
  columns?: number;
  gap?: 'small' | 'medium' | 'large' | 'xl' | 'xxl';
  // Card configuration
  variant?: 'default' | 'large' | 'minimal' | 'featured';
  showSource?: boolean;
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
  limit,
  className = ''
}: ImpactStatisticsGridProps) => {
  // Determine which statistics to show
  let statsToShow: ServiceImpactStatistic[] = [];
  
  if (statistics) {
    statsToShow = statistics;
  } else if (serviceCategory) {
    statsToShow = getImpactStatisticsByService(serviceCategory);
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
            <ImpactStatisticCard 
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

export default ImpactStatisticsGrid;