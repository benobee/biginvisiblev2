import { useEffect } from 'react';
import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import Grid from '../../components/ui/Grid';
import GridItem from '../../components/ui/GridItem';
import Button from '../../components/ui/Button';
import CTASection from '../../components/ui/CTASection';
import ServiceCard from '../../components/ServiceCard';
import { ExternalLink, TrendingUp, Users, Target, Zap } from 'lucide-react';
import { type StatisticEntry, getStatisticEntry } from '../../data/statisticsDatabase';
import { services, type Service } from '../../data/services';
import DonutChart from '../../components/ui/DonutChart';
import Breadcrumb from '../../components/ui/Breadcrumb';

interface StatisticDetailProps {
  statistic: StatisticEntry;
}

// Expanded explanations for each statistic type
const getStatisticExplanation = (statistic: StatisticEntry) => {
  const explanations: { [key: string]: { 
    overview: string; 
    whatItMeans: string; 
    whyItMatters: string; 
    implications: string[];
    icon: React.ComponentType;
  } } = {
    'social-media-facebook': {
      overview: 'Turns out Facebook is still the go-to when marketers want to create experiences people actually remember.',
      whatItMeans: 'When brands want to do something cool and immersive (not just another ad), Facebook has the tools and the audience to make it happen.',
      whyItMatters: 'Because experiences beat ads every time. People remember how you made them feel, not what you tried to sell them.',
      implications: [
        'Mix it up with video, live streams, and events (Facebook has them all)',
        'Target the right people at the right time (their data game is strong)',
        'Build communities, not just follower counts'
      ],
      icon: Users
    },
    'video-purchase': {
      overview: 'Nearly two-thirds of people buy stuff after watching a brand video. Yeah, video works that well.',
      whatItMeans: 'Videos don\'t just get views—they get wallets open. Show people what you\'re about, and they\'ll show you the money.',
      whyItMatters: 'Because seeing is believing. A good video builds trust faster than a thousand words ever could.',
      implications: [
        'Videos create emotional connections that stick',
        'Show your product in action (people want to see it work)',
        'Videos get shared more (free marketing, anyone?)'
      ],
      icon: TrendingUp
    },
    'brand-name-decisions': {
      overview: 'Your brand name influences almost 8 out of 10 purchase decisions. No pressure or anything.',
      whatItMeans: 'Your name is doing heavy lifting before people even know what you do. Make it count.',
      whyItMatters: 'A great name opens doors. A bad one? Well, you\'re starting the race with your shoelaces tied together.',
      implications: [
        'Pick a name people can actually pronounce (and remember)',
        'Make it mean something (or at least feel like it does)',
        'Keep it consistent across everything you do'
      ],
      icon: Target
    },
    'trust-requirement': {
      overview: '81% of people need to trust you before they\'ll buy from you. Trust first, transactions second.',
      whatItMeans: 'No trust, no sale. It\'s that simple. People have too many options to waste time on brands they don\'t believe in.',
      whyItMatters: 'Because nobody buys from someone they don\'t trust. Would you?',
      implications: [
        'Lead with honesty (people can smell BS a mile away)',
        'Be transparent about... well, everything',
        'Let your happy customers do the talking'
      ],
      icon: Users
    },
    'consistent-branding-revenue': {
      overview: '60% of companies with consistent branding see 10-20% revenue jumps. Consistency literally pays.',
      whatItMeans: 'When everything looks and feels like it belongs together, people pay attention (and pay money).',
      whyItMatters: 'Consistency builds familiarity. Familiarity builds trust. Trust builds revenue. See how that works?',
      implications: [
        'Make sure everything matches (yes, everything)',
        'Train your team on brand standards (consistency is a team sport)',
        'Check yourself regularly (brands drift without maintenance)'
      ],
      icon: TrendingUp
    }
    // Add more explanations as needed
  };

  // Default explanation for statistics not specifically mapped
  const defaultExplanation = {
    overview: `Here's a stat that'll make you rethink how you're doing business.`,
    whatItMeans: `${statistic.percentage}% is not just a number—it's a wake-up call about what your customers actually care about.`,
    whyItMatters: `Ignore this at your own risk. Smart brands use insights like this to get ahead (and stay there).`,
    implications: [
      'Get on board or get left behind (harsh but true)',
      'Use this to make smarter decisions about your brand',
      'Miss this trend, miss your customers'
    ],
    icon: Zap
  };

  return explanations[statistic.id] || defaultExplanation;
};

// Get related services based on statistic categories
const getRelatedServices = (statistic: StatisticEntry): Service[] => {
  return services.filter(service => 
    statistic.categories.some(category => service.id === category)
  );
};

// Get source URL if available
const getSourceUrl = (source: string) => {
  const sourceUrls: { [key: string]: string } = {
    'WiserNotify 2025': 'https://wisernotify.com/blog/branding-statistics/',
    'Edelman Trust Barometer 2025': 'https://www.edelman.com/trust/2025-trust-barometer'
  };
  
  return sourceUrls[source] || null;
};

// Get unique images for each specific statistic
const getStatisticImages = (statistic: StatisticEntry) => {
  // Create a clean pool of unique, verified business images
  const imagePool = [
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1553028826-f4804a6dfd3f?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1573164713712-03790a178651?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1609877546074-5a03c93b5a5f?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1545670723-196ed0d7334c?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1562564055-71e051d33c19?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1586946820367-6b8b0c5b0a06?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1559137370-6c25c24c31de?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1552581234-26160f608093?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1553830591-fddf7c6dba12?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542744173-05336fce7ad4?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542744173-b3cd58d90c67?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1553729784-e91953dec042?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1553830591-e6b96ac14d3a?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1564865878688-9a244444042a?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1591123120675-6f7a16cd5d45?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542744173-b3cd58d90c67?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1511376777868-611b54f68947?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1583325470923-ba620bbce1cb?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1507919909716-c8262e491cde?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1621111848501-8d3634f82336?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1616587896595-8bb4774e8be8?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1558403194-611308249627?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=600&h=400&fit=crop&auto=format'
  ];

  // Use statistic ID to create a deterministic but unique selection
  const hash = statistic.id.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  // Ensure positive hash and create different starting points for each section
  const baseIndex = Math.abs(hash) % (imagePool.length - 4);
  
  return {
    insights: imagePool[baseIndex],
    strategy: imagePool[baseIndex + 1],
    implementation: imagePool[baseIndex + 2],
    results: imagePool[baseIndex + 3]
  };
};

const StatisticDetail: React.FC<StatisticDetailProps> = ({ statistic }) => {
  const explanation = getStatisticExplanation(statistic);
  const relatedServices = getRelatedServices(statistic);
  const sourceUrl = getSourceUrl(statistic.source);
  const images = getStatisticImages(statistic);


  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Statistics', href: '/statistics' },
          { label: statistic.title }
        ]}
      />
      {/* Hero Section */}
      <Section background="primary" className="min-h-[90vh] !bg-[#0F1923] text-white flex items-center relative overflow-hidden pt-[0px] pb-[60px]">
        <Grid>
          <GridItem span={8}>
            <div className="relative z-[3]">
              <div className="inline-flex items-center mb-6 reveal-text">
                <span className="text-white/80 text-lg">The numbers don't lie</span>
              </div>
              
              <div className="mb-8 reveal-text">
                <div className="text-7xl lg:text-8xl font-bold text-accent mb-4">
                  {statistic.title}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] tracking-[-0.02em] text-white">
                  {statistic.percentage}% {statistic.statement}
                </h1>
              </div>
              
              <p className="text-xl text-white/90 leading-[1.6] max-w-[600px] mb-8 reveal-text">
                {explanation.overview}
              </p>
              <div className="flex flex-wrap gap-4 reveal-text">
                {sourceUrl && (
                  <Button 
                    href={`${sourceUrl}`} 
                    variant="outline" 
                    size="medium"
                    className="text-white border-white hover:bg-white hover:text-gray-900"
                    
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Source
                  </Button>
                )}
                <Button to="/contact" variant="primary" size="medium">
                  Use this insight
                </Button>
              </div>
            </div>
          </GridItem>
        
        </Grid>
      </Section>

      {/* What It Means Section */}
      <Section background="light">
        <SectionHeader
          subtitle="Let's break it down"
          title="What this actually means for you"
          align="center"
        />
        
        <div className="mt-16 mb-16 mx-auto">
          {/* Key Insights - Left Text, Right Image */}
          <div className="reveal-text">
            <Grid>
              <GridItem span={12}>
                <div className="pr-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">The real story here</h3>
                  <p className="text-xl leading-relaxed text-gray-700 mb-6">
                    {statistic.synopsis}
                  </p>
                </div>
              </GridItem>
            </Grid>
          </div>
        </div>
      {/* Related Findings Section */}
      {statistic.relatedFindings.length > 0 && (
        <div>
         <h3 className="text-3xl font-bold text-gray-900">This isn't just one stat—it's part of a bigger picture</h3>
          <div className="mt-16 mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl leading-relaxed text-gray-700 mb-8">
                  That {statistic.percentage}% we just talked about? It's not alone. 
                  Other smart people have been digging into this too, and guess what they found...
              </p>
              <Grid className="reveal-text" columns={1}>                
                {statistic.relatedFindings.map((relatedId, index) => {
                  const relatedStatistic = getStatisticEntry(relatedId);
                  if (!relatedStatistic) return null;
                  
                  const connectors = [
                    "And it gets better",
                    "Here's another piece of the puzzle",
                    "Want more proof? Check this out",
                    "The plot thickens"
                  ];
                  
                  return (
                    <GridItem key={relatedId} className="last:mb-0">

                      <div className="bg-white rounded-xl pt-8 pl-8 pr-8 pb-3 border-l-4 border-accent shadow-sm">
                        <div className='flex flex-auto'>
                        <div className='h-32 w-1/6'>
                          <DonutChart 
                            percentage={relatedStatistic.percentage} 
                            size="medium" 
                            variant={relatedStatistic.statisticType === 'multiplier' ? 'icon' : 'default'}
                            statisticType={relatedStatistic.statisticType}
                          />
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6 w-5/6">
                          {index < connectors.length ? connectors[index] : `Here's what ${relatedStatistic.source} found`}: 
                          {' '}{relatedStatistic.synopsis} 
                        </p>
                        </div>
                        
                        {/* Metadata section */}
                        <div className="border-t border-gray-100 pt-6 pb-4">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <span>Source: {relatedStatistic.source}</span>
                              {relatedStatistic.sourceUrl && (
                                <a 
                                  href={relatedStatistic.sourceUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-accent hover:text-accent-dark transition-colors"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  View Source
                                </a>
                              )}
                            </div>
                          <div className="flex items-end justify-end">
                              <Button 
                                variant="primaryInverse" 
                                size="small"
                                to={`/stat-detail?id=${relatedStatistic.id}`}
                              >
                                Dig deeper →
                              </Button>
                          </div>
                          </div>
                        </div>
                        
                      </div>
                    
                    </GridItem>
                  );
                })}
                
              </Grid>
               <div className="flex justify-center my-8">
                    <div className="w-12 h-0.5 bg-gray-200"></div>
              </div>
               <div className="mt-12 p-6 bg-accent/5 rounded-xl border border-accent/20">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong>Here's the big picture:</strong> All these stats are telling the same story from different angles. 
                    Put them together and you've got a roadmap for what actually works (and what doesn't).
                  </p>
                </div>
            </div>
          </div>
        </div>
      )}
      </Section>

            {/* What It Means Section */}
      <Section background="primary">
        <SectionHeader
          subtitle="Now for the good part"
          title="What this means for your brand"
          align="center"
        />
        
        <div className="mt-16 mx-auto">
          {/* Why This Matters - Right Text, Left Image */}
          <div className="mb-32 reveal-text">
            <Grid>
              <GridItem span={6}>
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={images.strategy} 
                    alt="Strategic business planning and growth"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </GridItem>
              <GridItem span={6}>
                <div className="pl-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Why you should care</h3>
                  <p className="text-xl leading-relaxed text-gray-700 mb-6">
                    {explanation.whyItMatters}
                  </p>
                  <p className="text-lg leading-relaxed text-gray-600">
                    Get this right and you're golden. Get it wrong and... well, let's not go there. The good news? Now you know what to focus on.
                  </p>
                </div>
              </GridItem>
            </Grid>
          </div>

          {/* Business Implications - Left Text, Right Image */}
          <div className="mb-32 reveal-text">
            <Grid>
              <GridItem span={6}>
                <div className="pr-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">What this means for business</h3>
                  <p className="text-xl leading-relaxed text-gray-700 mb-6">
                    {explanation.implications[0]}
                  </p>
                  <p className="text-lg leading-relaxed text-gray-600">
                    Act on this and watch good things happen: more engagement, better conversions, customers who actually stick around. Ignore it? Your competitors won't.
                  </p>
                </div>
              </GridItem>
              <GridItem span={6}>
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={images.implementation} 
                    alt="Business strategy implementation and results"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </GridItem>
            </Grid>
          </div>

          {/* Strategic Implementation - Right Text, Left Image */}
          <div className="reveal-text">
            <Grid>
              <GridItem span={6}>
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={images.results} 
                    alt="Team collaboration and strategic planning"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </GridItem>
              <GridItem span={6}>
                <div className="pl-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Making it happen</h3>
                  <p className="text-xl leading-relaxed text-gray-700 mb-6">
                    Knowing is half the battle. The other half? Actually doing something about it. Smart brands turn insights like this into action plans that work.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-600">
                    Fair warning: this isn't a one-person job. You'll need your whole team on board—from the folks designing your stuff to the ones talking to customers.
                  </p>
                </div>
              </GridItem>
            </Grid>
          </div>
        </div>
      </Section>

      {/* Related Services Section */}
      {relatedServices.length > 0 && (
        <Section background="light">
          <SectionHeader
            subtitle="Want to use this insight?"
            title="Here's how we can help"
            description="We've got the tools and know-how to turn this stat into your competitive advantage. (Yes, really.)"
            align="center"
          />
          
          <div className="mt-16">
            <Grid columns={relatedServices.length > 2 ? 3 : 2} gap="large">
              {relatedServices.map((service) => (
                <GridItem key={service.id} span={1} className="reveal-text">
                  <ServiceCard service={service} variant="services" />
                </GridItem>
              ))}
            </Grid>
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <CTASection
        title="Ready to put this insight to work?"
        description="Let's chat about how to use what you just learned to make your brand impossible to ignore."
        buttonText="Let's talk"
        buttonTo="/contact"
        buttonVariant="primaryInverse"
      />
    </>
  );
};

export default StatisticDetail;