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
    <a 
      href={`/stat-detail?id=${statistic.id}`}
      className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 h-full flex flex-col no-underline ${className}`}
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
      </div>
    </a>
  );
};

export default StatisticBrowseCard;