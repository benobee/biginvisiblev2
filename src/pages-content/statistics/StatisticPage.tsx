import { useParams } from 'react-router-dom';
import StatisticDetail from './StatisticDetail';
import { getStatisticEntry } from '../../data/statisticsDatabase';

const StatisticPage = () => {
  const { statisticId } = useParams<{ statisticId: string }>();
  
  if (!statisticId) {
    return <div>Statistic not found</div>;
  }
  
  const statistic = getStatisticEntry(statisticId);
  
  if (!statistic) {
    return <div>Statistic not found</div>;
  }
  
  return <StatisticDetail statistic={statistic} />;
};

export default StatisticPage;