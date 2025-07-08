import StatisticDetail from './StatisticDetail';
import { getStatisticEntry } from '../../data/statisticsDatabase';

interface StatisticPageProps {
  currentPath?: string;
}

const StatisticPage = ({ currentPath }: StatisticPageProps) => {
  // Extract query params from the current URL
  const urlParams = new URLSearchParams(window.location.search);
  const statisticId = urlParams.get('id');
  
  if (!statisticId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Statistic Not Found</h1>
          <p className="text-gray-600">Please provide a valid statistic ID.</p>
        </div>
      </div>
    );
  }
  
  const statistic = getStatisticEntry(statisticId);
  
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