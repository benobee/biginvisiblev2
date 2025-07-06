import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import type { StatisticEntry } from '../data/statisticsDatabase';

interface StatisticBrowseCardProps {
  statistic: StatisticEntry;
  className?: string;
}

const StatisticBrowseCard = ({ 
  statistic, 
  className = ''
}: StatisticBrowseCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/stat-detail?id=${statistic.id}`);
  };

  const categoryInfo = {
    'brand-strategy': 'Brand Strategy',
    'visual-identity': 'Visual Identity',
    'digital-experience': 'Digital Experience',
    'content-strategy': 'Content Strategy',
    'community-building': 'Community Building',
    'brand-architecture': 'Brand Architecture'
  };

  const getCategoryDisplayName = (category: string) => {
    return categoryInfo[category as keyof typeof categoryInfo] || category;
  };

  return (
    <div 
      className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 h-full flex flex-col ${className}`}
      onClick={handleClick}
    >
      {/* Main Content */}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
          {statistic.title}
        </h3>
        
        {/* Percentage Display */}
        <div className="text-4xl font-bold text-accent mb-2">
          {statistic.percentage}%
        </div>
        
        {/* Statement */}
        <p className="text-gray-700 text-sm leading-relaxed">
          {statistic.statement}
        </p>
      </div>
      
      {/* Footer with metadata */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {statistic.categories.map((category, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {getCategoryDisplayName(category)}
            </span>
          ))}
        </div>
        
        {/* Verification Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {statistic.verified && (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600 font-medium">Verified</span>
              </>
            )}
            {!statistic.verified && (
              <span className="text-xs text-gray-500">Unverified</span>
            )}
          </div>
          
          {/* Credibility Score */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">Credibility:</span>
            <span className={`text-xs font-medium ${
              statistic.credibilityScore === 'high' ? 'text-green-600' :
              statistic.credibilityScore === 'medium' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {statistic.credibilityScore}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticBrowseCard;