import { 
  BrandStrategyIcon, 
  VisualIdentityIcon, 
  DigitalExperienceIcon, 
  ContentStrategyIcon, 
  BrandArchitectureIcon, 
  CommunityBuildingIcon 
} from '../components/ui/ProcessIcons';

export interface Service {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: 'xxs' | 'xs' | 's' | 'l' | 'xl' | 'xxl' }>;
  shortDescription: string;
  detailedDescription: string;
  features: string[];
  expandedFeatures: {
    title: string;
    description: string;
  }[];
  process: {
    title: string;
    description: string;
  }[];
  outcomes: string[];
  heroImage: string;
}

export const services: Service[] = [
  {
    id: 'brand-strategy',
    title: 'Brand Strategy',
    icon: BrandStrategyIcon,
    shortDescription: 'Figure out what makes you different and why people should care. (Spoiler: You\'re more interesting than you think.)',
    detailedDescription: 'Every great brand starts with knowing who you are and why you matter. We\'ll help you find your sweet spot – that perfect place where what you\'re amazing at meets what people actually need. No corporate fluff, just clear thinking about your brand that actually makes sense.',
    features: [
      'Finding your sweet spot',
      'Getting to know your people',
      'Checking out the competition',
      'Saying it right'
    ],
    expandedFeatures: [
      {
        title: 'Finding Your Sweet Spot',
        description: 'We\'ll help you find that perfect place where what you\'re great at meets what people actually need. It\'s like matchmaking, but for brands.'
      },
      {
        title: 'Getting to Know Your People',
        description: 'Let\'s figure out who your people are, what keeps them up at night, and what makes them tick. Real insights, not just demographics.'
      },
      {
        title: 'Scoping Out the Competition',
        description: 'We\'ll peek at what everyone else is doing, then help you zag while they zig. Because being different is your superpower.'
      },
      {
        title: 'Finding Your Voice',
        description: 'Words matter. We\'ll help you find the right ones – the kind that make people stop scrolling and start caring.'
      }
    ],
    process: [
      {
        title: 'Getting Curious',
        description: 'We dig into your business, chat with your team, and ask the questions that matter. Think detective work, but with better coffee.'
      },
      {
        title: 'Connecting the Dots',
        description: 'Time to turn all those insights into a plan that actually works. We\'ll map out where you are, where you\'re going, and how to get there.'
      },
      {
        title: 'Making It Stick',
        description: 'We\'ll test drive your new strategy with real people. If something\'s not working, we\'ll tweak it until it does.'
      },
      {
        title: 'Your Brand Playbook',
        description: 'You get a guide that makes sense to everyone – from your CEO to your newest intern. No decoder ring required.'
      }
    ],
    outcomes: [
      'A brand position so clear, even your mom will get what you do',
      'You\'ll know your customers better than they know themselves',
      'Words that make people actually want to work with you',
      'A roadmap you\'ll actually use (not just file away)'
    ],
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'visual-identity',
    title: 'Visual Identity',
    icon: VisualIdentityIcon,
    shortDescription: 'Make your brand look as good as your product works. (First impressions count, even in sweatpants.)',
    detailedDescription: 'Good design isn\'t just about looking pretty – it\'s about being unforgettable. We\'ll create a visual identity that feels like you, works everywhere, and makes your competition a little jealous. From logos to colors to that perfect font, we\'ve got you covered.',
    features: [
      'Logos that stick',
      'Colors that pop',
      'Type that talks',
      'Rules that make sense'
    ],
    expandedFeatures: [
      {
        title: 'A Logo That Works Everywhere',
        description: 'From business cards to billboards, your logo needs to look great at any size. We\'ll make sure it does (and that people remember it).'
      },
      {
        title: 'Colors That Tell Your Story',
        description: 'Colors do more than look nice – they make people feel things. We\'ll pick the ones that say exactly what you want to say.'
      },
      {
        title: 'Type That Speaks Volumes',
        description: 'The right fonts can whisper elegance or shout excitement. We\'ll find the ones that say exactly what you mean.'
      },
      {
        title: 'A Guide Everyone Gets',
        description: 'No more design disasters. Your team gets a guide so clear, they can\'t mess it up (we\'ve tested this theory).'
      }
    ],
    process: [
      {
        title: 'Setting the Scene',
        description: 'We start by figuring out what "you" looks like. Mood boards, inspiration, and lots of "what if we tried..." conversations.'
      },
      {
        title: 'Sketching & Scheming',
        description: 'This is where the magic happens. We\'ll explore different directions until we find the one that makes you say "That\'s it!"'
      },
      {
        title: 'Making It Perfect',
        description: 'We\'ll tweak, polish, and perfect until every pixel is in its happy place. Obsessive? Maybe. Worth it? Absolutely.'
      },
      {
        title: 'Building Your Toolkit',
        description: 'You get all the files, fonts, and guidance you need to keep looking great. Forever. (Or at least until your next rebrand.)'
      }
    ],
    outcomes: [
      'A look so distinctive, people will recognize you from across the room',
      'Design consistency that makes your brand feel bigger than it is',
      'A style guide your whole team will actually use',
      'The kind of brand people remember (and want to work with)'
    ],
    heroImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'digital-experience',
    title: 'Digital Experience',
    icon: DigitalExperienceIcon,
    shortDescription: 'Build digital experiences people actually enjoy using. (Crazy concept, we know.)',
    detailedDescription: 'Your website shouldn\'t feel like homework. We create digital experiences that work like they should, look like they mean it, and turn visitors into fans. No tech headaches, no design disasters – just sites and apps people love to use.',
    features: [
      'Sites that sell',
      'Journeys that make sense',
      'Interfaces that click',
      'Strategies that work'
    ],
    expandedFeatures: [
      {
        title: 'Websites That Work Hard',
        description: 'Beautiful is great, but beautiful AND functional? That\'s the sweet spot. We build sites that look good and get results.'
      },
      {
        title: 'Paths People Actually Follow',
        description: 'Ever been lost on a website? Yeah, we hate that too. We\'ll make sure your visitors find what they need without the treasure map.'
      },
      {
        title: 'Buttons People Want to Click',
        description: 'Good design isn\'t just pretty – it\'s intuitive. We make interfaces that feel right from the first click.'
      },
      {
        title: 'A Plan That Makes Sense',
        description: 'Random tactics are for amateurs. We\'ll build you a digital strategy that actually connects the dots.'
      }
    ],
    process: [
      {
        title: 'Figuring Out What Works',
        description: 'Before we build anything, we need to know who\'s using it and why. Consider this the "measure twice" part.'
      },
      {
        title: 'Mapping the Journey',
        description: 'We\'ll sketch out how people move through your site. Think of it as GPS for your users – no wrong turns allowed.'
      },
      {
        title: 'Making It Beautiful',
        description: 'Time to make it shine. We\'ll bring your brand to life in pixels, making sure every screen feels like you.'
      },
      {
        title: 'Real People, Real Feedback',
        description: 'We test with actual humans (novel idea, right?). If something\'s not working, we fix it. Simple as that.'
      }
    ],
    outcomes: [
      'A site that turns browsers into buyers (without being pushy)',
      'Happy users who find what they need without swearing',
      'Digital presence that feels as good as your real-world brand',
      'A foundation that grows with you (not against you)'
    ],
    heroImage: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy',
    icon: ContentStrategyIcon,
    shortDescription: 'Tell stories that stick. (Because nobody remembers boring.)',
    detailedDescription: 'Good content isn\'t just words on a page – it\'s the voice that builds relationships. We\'ll help you find stories worth telling and ways to tell them that matter. No fluffy filler, just content that connects.',
    features: [
      'Stories that sell',
      'Words that work',
      'Content that connects',
      'Messages that move'
    ],
    expandedFeatures: [
      {
        title: 'Planning Worth Following',
        description: 'Random posts aren\'t a strategy. We\'ll map out what to say, when to say it, and where your people are actually listening.'
      },
      {
        title: 'Stories That Sell (Without Selling)',
        description: 'Everyone loves a good story. We\'ll find yours and tell it in a way that makes people lean in, not tune out.'
      },
      {
        title: 'Content That Counts',
        description: 'Quality over quantity, always. We create stuff people actually want to read, watch, and share.'
      },
      {
        title: 'Getting It Out There',
        description: 'Great content stuck in a drawer helps nobody. We\'ll make sure your stories reach the right people at the right time.'
      }
    ],
    process: [
      {
        title: 'Taking Stock',
        description: 'Let\'s see what you\'ve got already. We\'ll figure out what\'s working, what isn\'t, and what\'s missing.'
      },
      {
        title: 'Building Your Blueprint',
        description: 'Every great content program needs a plan. We\'ll create one that makes sense for your business and your sanity.'
      },
      {
        title: 'Bringing Stories to Life',
        description: 'Time to turn strategy into stories people actually want to consume. We\'ll create content that earns attention instead of demanding it.'
      },
      {
        title: 'Making It Better',
        description: 'We\'ll keep an eye on what\'s working (and what isn\'t) so your content keeps getting stronger, not staler.'
      }
    ],
    outcomes: [
      'Content that people look forward to reading',
      'Stories that make customers feel like insiders',
      'Results that actually move your business forward',
      'A content system that runs without daily drama'
    ],
    heroImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'brand-architecture',
    title: 'Brand Architecture',
    icon: BrandArchitectureIcon,
    shortDescription: 'Organize your brand family so it actually makes sense. (No more family dysfunction.)',
    detailedDescription: 'Got multiple brands, products, or services? We\'ll help you organize them so customers understand how they fit together (and you don\'t lose your mind managing them). Think of it as family therapy for your brand portfolio.',
    features: [
      'Family tree that works',
      'Sub-brand harmony',
      'Smart growth plans',
      'Portfolio that purrs'
    ],
    expandedFeatures: [
      {
        title: 'Your Brand Family Tree',
        description: 'We\'ll map out how all your brands relate to each other so customers (and your team) can actually follow the connections.'
      },
      {
        title: 'Playing Well Together',
        description: 'Your sub-brands need to feel like family, not distant cousins. We\'ll make sure they work together instead of against each other.'
      },
      {
        title: 'Growing Smart, Not Just Big',
        description: 'When it\'s time to expand, we\'ll help you do it in a way that builds on what you\'ve already got instead of starting from scratch.'
      },
      {
        title: 'Keeping Everyone in Line',
        description: 'Managing multiple brands doesn\'t have to be chaos. We\'ll create systems that keep everyone marching in the same direction.'
      }
    ],
    process: [
      {
        title: 'Taking Inventory',
        description: 'Let\'s see what you\'ve got and how it\'s working. We\'ll find the gaps, overlaps, and missed opportunities hiding in plain sight.'
      },
      {
        title: 'Building the Blueprint',
        description: 'Time to design a structure that actually makes sense for your business and your customers. No more brand spaghetti.'
      },
      {
        title: 'Making It Happen',
        description: 'A great plan on paper is just expensive wallpaper. We\'ll map out exactly how to roll out your new structure without breaking anything.'
      },
      {
        title: 'Rules That Stick',
        description: 'We\'ll set up simple guidelines so your brand architecture stays organized as you grow (instead of becoming a hot mess).'
      }
    ],
    outcomes: [
      'A brand family that works together instead of against each other',
      'Every brand pulling its weight and then some',
      'Customers who get what you do (and why it matters)',
      'A system that grows with you, not against you'
    ],
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'community-building',
    title: 'Community Building',
    icon: CommunityBuildingIcon,
    shortDescription: 'Turn customers into fans, and fans into family. (The kind that actually likes each other.)',
    detailedDescription: 'Great brands don\'t just sell stuff – they bring people together. We\'ll help you build a community that feels less like a customer database and more like a group of friends who happen to love what you do. Because loyalty you can\'t buy is worth way more than loyalty you can.',
    features: [
      'Belonging blueprints',
      'Connection catalysts',
      'Champion cultivation',
      'Gathering greatness'
    ],
    expandedFeatures: [
      {
        title: 'Building Your Tribe',
        description: 'Every great community starts with a plan. We\'ll figure out who your people are, where they hang out, and how to bring them together.'
      },
      {
        title: 'Keeping the Magic Alive',
        description: 'Communities need more than a Facebook group. We\'ll create programs that give people real reasons to stick around and participate.'
      },
      {
        title: 'Finding Your Champions',
        description: 'Some people will love what you do so much they\'ll tell everyone. We\'ll help you find those people and give them reasons to keep talking.'
      },
      {
        title: 'Bringing People Together',
        description: 'Nothing beats face-to-face (or screen-to-screen) connection. We\'ll create events that feel less like marketing and more like hanging out.'
      }
    ],
    process: [
      {
        title: 'Getting to Know Your People',
        description: 'Before we build anything, we need to understand who\'s already in your corner and what makes them tick. Stalking, but legal.'
      },
      {
        title: 'Crafting the Plan',
        description: 'Random acts of community don\'t work. We\'ll create a thoughtful strategy that turns strangers into superfans over time.'
      },
      {
        title: 'Going Live',
        description: 'Time to put the plan into action. We\'ll launch your community programs with the kind of excitement that gets people talking.'
      },
      {
        title: 'Keeping It Growing',
        description: 'Communities are living things. We\'ll keep an eye on the pulse and adjust things to keep your people happy and engaged.'
      }
    ],
    outcomes: [
      'A tribe of people who genuinely care about your success',
      'Customers who sell for you (because they want to, not because you asked)',
      'Feedback that actually helps you get better',
      'A community that grows itself (the dream, right?)'
    ],
    heroImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  }
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getOtherServices = (currentId: string): Service[] => {
  return services.filter(service => service.id !== currentId);
};
