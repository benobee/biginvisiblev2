import { useState, useMemo, useEffect, useRef } from 'react';
import { Filter, TrendingUp, Target, Palette, Monitor, FileText, Layers, Users, Search, X } from 'lucide-react';
import { statisticsDatabase, getStatisticsByCategory, getDatabaseSummary } from '../data/statisticsDatabase';
import StatisticBrowseCard from '../components/StatisticBrowseCard';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import CTASection from '../components/ui/CTASection';

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'percentage' | 'credibility'>('percentage');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fuzzy search function
  const fuzzySearch = (query: string, text: string): boolean => {
    if (!query) return true;
    
    const queryLower = query.toLowerCase();
    const textLower = text.toLowerCase();
    
    // Direct match
    if (textLower.includes(queryLower)) return true;
    
    // Fuzzy match - check if all characters in query appear in order
    let queryIndex = 0;
    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
      if (textLower[i] === queryLower[queryIndex]) {
        queryIndex++;
      }
    }
    return queryIndex === queryLower.length;
  };
  
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
    let stats = statisticsDatabase;
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      stats = stats.filter(stat => 
        stat.categories.some(category => selectedCategories.includes(category))
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      stats = stats.filter(stat => 
        fuzzySearch(searchQuery, stat.title) ||
        fuzzySearch(searchQuery, stat.statement) ||
        fuzzySearch(searchQuery, stat.source) ||
        stat.categories.some(category => fuzzySearch(searchQuery, categoryInfo[category as keyof typeof categoryInfo]?.name || category))
      );
    }
    
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
  }, [selectedCategories, searchQuery, sortBy, showVerifiedOnly]);

  // Category management functions
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  const selectAllCategories = () => {
    setSelectedCategories([...categories]);
  };

  const getCategoryStats = (category: string) => {
    const stats = getStatisticsByCategory(category);
    const verified = stats.filter(s => s.verified).length;
    return { total: stats.length, verified };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="min-h-[70vh] bg-white text-dark flex items-center relative overflow-hidden pt-[120px]">
        <div className="section-container">
          <Grid>
            <GridItem span={6}>
              <div className="relative z-10">
                <h1 className="reveal-text text-4xl lg:text-5xl xl:text-6xl mb-6 font-bold leading-tight tracking-tight text-dark">
                  Branding <span className="text-accent">Statistics</span>
                </h1>
                <p className="reveal-text text-lg lg:text-xl mb-8 opacity-80 leading-relaxed max-w-2xl text-dark">
                  Explore {summary.total} data-driven insights across {categories.length} categories. 
                  Make informed brand decisions with verified research and industry benchmarks.
                </p>
                <Button to="/contact" variant="primary" className="reveal-text">
                  Apply these insights
                </Button>
              </div>
            </GridItem>
            <GridItem span={6}>
              <div className="reveal-text relative h-96 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Data analytics and business insights" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </GridItem>
          </Grid>
        </div>
      </section>

      {/* Categories Section */}
      <Section background="secondary" spacing="normal">
        <h2 className="text-3xl font-bold text-center mb-12 reveal-text">Browse by Category</h2>
          
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg mb-8 reveal-text">
            <div className="p-6">
              <div className="flex flex-col gap-4">
                {/* Search and Filter Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-700">Filters & Search</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {filteredStatistics.length} of {summary.total} statistics
                  </div>
                </div>

                {/* Search Field */}
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search statistics by title, content, source, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Category Multi-Select Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm transition-colors ${
                        selectedCategories.length > 0 
                          ? 'bg-accent text-white border-accent' 
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>Categories</span>
                      {selectedCategories.length > 0 && (
                        <span className="bg-white text-accent px-2 py-0.5 rounded-full text-xs font-medium">
                          {selectedCategories.length}
                        </span>
                      )}
                      <Filter className="w-4 h-4" />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700">Select Categories</span>
                            <div className="flex gap-2">
                              <button
                                onClick={selectAllCategories}
                                className="text-xs text-accent hover:text-accent-dark"
                              >
                                Select All
                              </button>
                              <button
                                onClick={clearAllCategories}
                                className="text-xs text-gray-500 hover:text-gray-700"
                              >
                                Clear
                              </button>
                            </div>
                          </div>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {categories.map((category) => {
                              const info = categoryInfo[category as keyof typeof categoryInfo];
                              const stats = getCategoryStats(category);
                              return (
                                <label
                                  key={category}
                                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => toggleCategory(category)}
                                    className="rounded border-gray-300 text-accent focus:ring-accent"
                                  />
                                  <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-700">
                                      {info?.name || category}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {stats.total} stats, {stats.verified} verified
                                    </div>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Verification Filter */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showVerifiedOnly}
                      onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                    <span className="text-sm text-gray-700">Verified only</span>
                  </label>
                  
                  {/* Sort By */}
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-gray-700">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'percentage' | 'credibility')}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="credibility">Credibility</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters Display */}
                {(selectedCategories.length > 0 || searchQuery) && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Active filters:</span>
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        Search: "{searchQuery}"
                        <button
                          onClick={() => setSearchQuery('')}
                          className="hover:text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedCategories.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent rounded-full text-xs"
                      >
                        {categoryInfo[category as keyof typeof categoryInfo]?.name || category}
                        <button
                          onClick={() => toggleCategory(category)}
                          className="hover:text-accent-dark"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
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