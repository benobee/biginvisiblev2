import StatisticDetail from './StatisticDetail';
import { getStatisticEntry } from '../../data/statisticsDatabase';

interface StatisticPageProps {
  currentPath?: string;
  statisticId?: string | null;
}

const StatisticPage = ({ statisticId: propStatisticId }: StatisticPageProps) => {
  
  if (!propStatisticId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Statistic Not Found</h1>
          <p className="text-gray-600">Please provide a valid statistic ID.</p>
        </div>
      </div>
    );
  }
  
  const statistic = getStatisticEntry(propStatisticId);
  
  if (!statistic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Statistic Not Found</h1>
          <p className="text-gray-600">The requested statistic could not be found.</p>
        </div>
      </div>
    );
  }
  
  return <StatisticDetail statistic={statistic} />;
};

export default StatisticPage;