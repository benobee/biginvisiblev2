import { useState, useMemo, useEffect } from 'react';
import { Filter, BarChart3, TrendingUp, Target, Palette, Monitor, FileText, Layers, Users } from 'lucide-react';
import { statisticsDatabase, getStatisticsByCategory, getDatabaseSummary } from '../data/statisticsDatabase';
import StatisticBrowseCard from '../components/StatisticBrowseCard';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import CTASection from '../components/ui/CTASection';
import { initRevealAnimations } from '../utils/animations';

// Category information with descriptions
const categoryInfo = {
  'brand-strategy': {
    name: 'Brand Strategy',
    description: 'Data on brand positioning, trust, and strategic decision-making',
    icon: Target
  },
  'visual-identity': {
    name: 'Visual Identity',
    description: 'Statistics on logos, colors, and visual brand elements',
    icon: Palette
  },
  'digital-experience': {
    name: 'Digital Experience',
    description: 'Insights on digital touchpoints and online brand interactions',
    icon: Monitor
  },
  'content-strategy': {
    name: 'Content Strategy',
    description: 'Data on content effectiveness and engagement',
    icon: FileText
  },
  'community-building': {
    name: 'Community Building',
    description: 'Statistics on audience engagement and community development',
    icon: Users
  },
  'brand-architecture': {
    name: 'Brand Architecture',
    description: 'Data on brand structure and organizational branding',
    icon: Layers
  }
};

const Statistics = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'percentage' | 'credibility'>('percentage');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  
  // Initialize reveal animations on component mount
  useEffect(() => {
    const cleanup = initRevealAnimations();
    return cleanup;
  }, []);
  
  const summary = getDatabaseSummary();
  
  // Get all unique categories from the database
  const categories = useMemo(() => {
    const allCategories = new Set<string>();
    statisticsDatabase.forEach(stat => {
      stat.categories.forEach(cat => allCategories.add(cat));
    });
    return Array.from(allCategories).sort();
  }, []);

  // Filter and sort statistics
  const filteredStatistics = useMemo(() => {
    let stats = selectedCategory === 'all' 
      ? statisticsDatabase 
      : getStatisticsByCategory(selectedCategory);
    
    // Filter by verification status if requested
    if (showVerifiedOnly) {
      stats = stats.filter(stat => stat.verified);
    }
    
    // Sort statistics
    return stats.sort((a, b) => {
      if (sortBy === 'percentage') {
        return b.percentage - a.percentage;
      } else {
        const credibilityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        return credibilityOrder[b.credibilityScore] - credibilityOrder[a.credibilityScore];
      }
    });
  }, [selectedCategory, sortBy, showVerifiedOnly]);

  const getCategoryStats = (category: string) => {
    const stats = getStatisticsByCategory(category);
    const verified = stats.filter(s => s.verified).length;
    return { total: stats.length, verified };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Section 
        background="accent" 
        spacing="normal"
        className="min-h-[70vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-5xl lg:text-6xl font-bold reveal-text text-primary">
              Branding Statistics
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed reveal-text">
            Explore {summary.total} data-driven insights across {categories.length} categories. 
            Make informed brand decisions with verified research and industry benchmarks.
          </p>
          
          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 reveal-text">
            <div className="backdrop-blur-sm rounded-xl p-6">
              <div className="text-6xl font-bold text-accent mb-2">{summary.total}</div>
              <div className="text-gray-300">Total Statistics</div>
            </div>
            <div className="backdrop-blur-sm rounded-xl p-6">
              <div className="text-6xl font-bold text-green-400 mb-2">{summary.verified}</div>
              <div className="text-gray-300">Verified Sources</div>
            </div>
            <div className="backdrop-blur-sm rounded-xl p-6">
              <div className="text-6xl font-bold text-slate-300 mb-2">{categories.length}</div>
              <div className="text-gray-300">Categories</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Categories Section */}
      <Section background="secondary" spacing="normal">
        <h2 className="text-3xl font-bold text-center mb-12 reveal-text">Browse by Category</h2>
          
          {/* Filters */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8 reveal-text">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Filters:</span>
              </div>

              {categories.map((item) => {
                return (
                  <Button
                    onClick={() => setSelectedCategory(item)}
                    variant={selectedCategory === item ? 'primary' : 'secondary'}
                    size="small"
                  >
                    {item}
                  </Button>
                )
              })}
              
              <Button
                onClick={() => setSelectedCategory('all')}
                variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
                size="small"
              >
                All Categories
              </Button>
              
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-8 reveal-text">
            <h3 className="text-2xl font-bold mb-2">
              {selectedCategory === 'all' ? 'All Statistics' : categoryInfo[selectedCategory as keyof typeof categoryInfo]?.name}
            </h3>
            <p className="text-gray-600">
              Showing {filteredStatistics.length} statistics
              {showVerifiedOnly ? ' (verified only)' : ''}
              {selectedCategory !== 'all' && ` in ${categoryInfo[selectedCategory as keyof typeof categoryInfo]?.name.toLowerCase()}`}
            </p>
          </div>

          {/* Statistics Grid */}
          <Grid>
            {filteredStatistics.map(statistic => (
              <GridItem key={statistic.id} span={4}>
                <StatisticBrowseCard 
                  statistic={statistic}
                  className="h-full"
                />
              </GridItem>
            ))}
          </Grid>

          {filteredStatistics.length === 0 && (
            <div className="text-center py-16 reveal-text">
              <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">No statistics found</h3>
              <p className="text-gray-400">Try adjusting your filters or selecting a different category.</p>
            </div>
          )}

      </Section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Apply These Insights?"
        description="Transform these statistics into actionable brand strategies. Let's discuss how these insights can drive your brand forward."
        buttonText="Start Your Brand Journey"
        buttonTo="/contact"
        buttonVariant="primaryInverse"
      />
    </div>
  );
};

export default Statistics;