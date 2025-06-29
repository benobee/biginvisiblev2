import { useEffect, useState } from 'react';
import Section from '../components/ui/Section';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import Button from '../components/ui/Button';
import { initRevealAnimations } from '../utils/animations';

interface QuestionnaireData {
  // Basic info
  name: string;
  email: string;
  company: string;
  phone: string;
  
  // Business questions
  businessStage: string;
  companySize: string;
  industry: string;
  currentChallenges: string[];
  brandMaturity: string;
  digitalPresence: string;
  communityGoals: string;
  projectTimeline: string;
  budget: string;
  primaryGoals: string[];
  
  // Additional context
  additionalInfo: string;
}

const Contact = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuestionnaireData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    businessStage: '',
    companySize: '',
    industry: '',
    currentChallenges: [],
    brandMaturity: '',
    digitalPresence: '',
    communityGoals: '',
    projectTimeline: '',
    budget: '',
    primaryGoals: [],
    additionalInfo: ''
  });

  const totalSteps = 10;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleInputChange = (field: keyof QuestionnaireData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: keyof QuestionnaireData, value: string) => {
    setFormData(prev => {
      const currentValues = prev[field] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Questionnaire submitted:', formData);
    alert('Thank you! We\'ll analyze your responses and get back to you with personalized recommendations within 24 hours.');
  };

  const getRecommendations = () => {
    const services = [];
    let packageTier = 'Starter';

    // Analyze responses to determine recommendations
    if (formData.primaryGoals.includes('brand-strategy') || formData.brandMaturity === 'early') {
      services.push('Brand Strategy');
    }
    if (formData.primaryGoals.includes('visual-identity') || formData.brandMaturity === 'needs-refresh') {
      services.push('Visual Identity');
    }
    if (formData.digitalPresence === 'basic' || formData.digitalPresence === 'none' || formData.primaryGoals.includes('digital-experience')) {
      services.push('Digital Experience');
    }
    if (formData.communityGoals === 'build' || formData.primaryGoals.includes('community-building')) {
      services.push('Community Building');
    }
    if (formData.primaryGoals.includes('content-strategy')) {
      services.push('Content Strategy');
    }
    if (formData.primaryGoals.includes('brand-architecture')) {
      services.push('Brand Architecture');
    }

    // Determine package tier based on company size and budget
    if (formData.companySize === 'enterprise' || formData.budget === 'high') {
      packageTier = 'Enterprise';
    } else if (formData.companySize === 'medium' || formData.companySize === 'large' || formData.budget === 'medium') {
      packageTier = 'Growth';
    }

    return { services, packageTier };
  };

  useEffect(() => {
    const cleanup = initRevealAnimations();
    return cleanup;
  }, []);

  const questions = [
    // Step 0: Basic Info
    {
      title: "Let's start with the basics",
      description: "Tell us a bit about yourself and your company.",
      content: (
        <Grid columns={2} gap="medium">
          <GridItem span={1}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-dark">Your Name *</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors text-dark bg-white"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Smith"
                required
              />
            </div>
          </GridItem>
          <GridItem span={1}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-dark">Email Address *</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors text-dark bg-white"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@company.com"
                required
              />
            </div>
          </GridItem>
          <GridItem span={1}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-dark">Company Name *</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors text-dark bg-white"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Your Company"
                required
              />
            </div>
          </GridItem>
          <GridItem span={1}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-dark">Phone Number</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors text-dark bg-white"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </GridItem>
        </Grid>
      )
    },
    // Step 1: Business Stage
    {
      title: "What stage is your business in?",
      description: "This helps us understand your current position and needs.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { value: 'startup', title: 'Startup', desc: 'Early stage, building our foundation' },
            { value: 'growth', title: 'Growth Stage', desc: 'Established, ready to scale' },
            { value: 'mature', title: 'Mature Business', desc: 'Well-established, optimizing operations' },
            { value: 'pivot', title: 'Pivoting', desc: 'Changing direction or repositioning' }
          ].map(option => (
            <div
              key={option.value}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                formData.businessStage === option.value
                  ? 'border-accent bg-accent/5'
                  : 'border-gray-200 hover:border-accent/50'
              }`}
              onClick={() => handleInputChange('businessStage', option.value)}
            >
              <h4 className="text-lg font-semibold mb-2 text-dark">{option.title}</h4>
              <p className="text-sm opacity-80 text-dark">{option.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    // Step 2: Company Size
    {
      title: "How large is your team?",
      description: "Understanding your company size helps us tailor our approach.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { value: 'solo', title: 'Solo/Freelancer', desc: 'Just me or 1-2 people' },
            { value: 'small', title: 'Small Team', desc: '3-10 people' },
            { value: 'medium', title: 'Medium Company', desc: '11-50 people' },
            { value: 'large', title: 'Large Company', desc: '51-200 people' },
            { value: 'enterprise', title: 'Enterprise', desc: '200+ people' }
          ].map(option => (
            <div
              key={option.value}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                formData.companySize === option.value
                  ? 'border-accent bg-accent/5'
                  : 'border-gray-200 hover:border-accent/50'
              }`}
              onClick={() => handleInputChange('companySize', option.value)}
            >
              <h4 className="text-lg font-semibold mb-2 text-dark">{option.title}</h4>
              <p className="text-sm opacity-80 text-dark">{option.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    // Step 3: Industry
    {
      title: "What industry are you in?",
      description: "Industry context helps us understand your market and audience.",
      content: (
        <div className="mb-6">
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors text-dark bg-white"
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
          >
            <option value="">Select your industry</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
            <option value="retail">Retail/E-commerce</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="consulting">Consulting</option>
            <option value="non-profit">Non-Profit</option>
            <option value="hospitality">Hospitality</option>
            <option value="real-estate">Real Estate</option>
            <option value="creative">Creative/Design</option>
            <option value="other">Other</option>
          </select>
        </div>
      )
    },
    // Step 4: Current Challenges
    {
      title: "What are your biggest brand challenges?",
      description: "Select all that apply to help us understand your pain points.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { value: 'brand-clarity', title: 'Brand Clarity', desc: 'Unclear brand message or positioning' },
            { value: 'visual-consistency', title: 'Visual Consistency', desc: 'Inconsistent visual identity' },
            { value: 'market-differentiation', title: 'Standing Out', desc: 'Difficulty differentiating from competitors' },
            { value: 'audience-connection', title: 'Audience Connection', desc: 'Struggling to connect with target audience' },
            { value: 'digital-presence', title: 'Digital Presence', desc: 'Weak online presence or outdated website' },
            { value: 'community-building', title: 'Community Building', desc: 'Difficulty building loyal community' }
          ].map(option => (
            <div
              key={option.value}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                formData.currentChallenges.includes(option.value)
                  ? 'border-accent bg-accent/5'
                  : 'border-gray-200 hover:border-accent/50'
              }`}
              onClick={() => handleMultiSelect('currentChallenges', option.value)}
            >
              <h4 className="text-lg font-semibold mb-2 text-dark">{option.title}</h4>
              <p className="text-sm opacity-80 text-dark">{option.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    // Step 5: Brand Maturity
    {
      title: "How would you describe your current brand?",
      description: "Understanding your brand's current state helps us recommend the right approach.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { value: 'early', title: 'Just Starting', desc: 'Brand new or very early stage' },
            { value: 'basic', title: 'Basic Brand', desc: 'Have logo/colors but need more development' },
            { value: 'established', title: 'Established', desc: 'Solid brand but could be stronger' },
            { value: 'needs-refresh', title: 'Needs Refresh', desc: 'Outdated brand that needs updating' }
          ].map(option => (
            <div
              key={option.value}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                formData.brandMaturity === option.value
                  ? 'border-accent bg-accent/5'
                  : 'border-gray-200 hover:border-accent/50'
              }`}
              onClick={() => handleInputChange('brandMaturity', option.value)}
            >
              <h4 className="text-lg font-semibold mb-2 text-dark">{option.title}</h4>
              <p className="text-sm opacity-80 text-dark">{option.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    // Step 6: Digital Presence
    {
      title: "How's your current digital presence?",
      description: "This helps us understand your digital foundation and needs.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { value: 'none', title: 'No Website', desc: 'No website or very basic landing page' },
            { value: 'basic', title: 'Basic Website', desc: 'Simple website but needs improvement' },
            { value: 'good', title: 'Good Website', desc: 'Decent website but could be optimized' },
            { value: 'strong', title: 'Strong Presence', desc: 'Great website and digital strategy' }
          ].map(option => (
            <div
              key={option.value}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                formData.digitalPresence === option.value
                  ? 'border-accent bg-accent/5'
                  : 'border-gray-200 hover:border-accent/50'
              }`}
              onClick={() => handleInputChange('digitalPresence', option.value)}
            >
              <h4 className="text-lg font-semibold mb-2 text-dark">{option.title}</h4>
              <p className="text-sm opacity-80 text-dark">{option.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    // Step 7: Community Goals
    {
      title: "What are your community-building goals?",
      description: "Understanding your community aspirations helps us recommend the right strategy.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { value: 'build', title: 'Build Community', desc: 'Create a new community from scratch' },
            { value: 'grow', title: 'Grow Existing', desc: 'Expand and strengthen current community' },
            { value: 'engage', title: 'Increase Engagement', desc: 'Improve interaction with existing audience' },
            { value: 'convert', title: 'Convert to Customers', desc: 'Turn community members into customers' }
          ].map(option => (
            <div
              key={option.value}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                formData.communityGoals === option.value
                  ? 'border-accent bg-accent/5'
                  : 'border-gray-200 hover:border-accent/50'
              }`}
              onClick={() => handleInputChange('communityGoals', option.value)}
            >
              <h4 className="text-lg font-semibold mb-2 text-dark">{option.title}</h4>
              <p className="text-sm opacity-80 text-dark">{option.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    // Step 8: Timeline & Budget
    {
      title: "Project timeline and investment",
      description: "This helps us recommend the right approach and package for your needs.",
      content: (
        <Grid columns={2} gap="medium">
          <GridItem span={1}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-dark">Project Timeline</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors text-dark bg-white"
                value={formData.projectTimeline}
                onChange={(e) => handleInputChange('projectTimeline', e.target.value)}
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP (1-2 months)</option>
                <option value="soon">Soon (2-3 months)</option>
                <option value="flexible">Flexible (3-6 months)</option>
                <option value="planning">Planning phase (6+ months)</option>
              </select>
            </div>
          </GridItem>
          <GridItem span={1}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-dark">Investment Range</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors text-dark bg-white"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
              >
                <option value="">Select budget range</option>
                <option value="low">$5,000 - $10,000</option>
                <option value="medium">$10,000 - $25,000</option>
                <option value="high">$25,000+</option>
                <option value="discuss">Let's discuss</option>
              </select>
            </div>
          </GridItem>
        </Grid>
      )
    },
    // Step 9: Primary Goals
    {
      title: "What are your primary goals?",
      description: "Select your top priorities to help us create the perfect recommendation.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { value: 'brand-strategy', title: 'Brand Strategy', desc: 'Define brand positioning and messaging' },
            { value: 'visual-identity', title: 'Visual Identity', desc: 'Create or refresh logo and visual system' },
            { value: 'digital-experience', title: 'Digital Experience', desc: 'Build or improve website and UX' },
            { value: 'content-strategy', title: 'Content Strategy', desc: 'Develop content and storytelling approach' },
            { value: 'community-building', title: 'Community Building', desc: 'Build and nurture brand community' },
            { value: 'brand-architecture', title: 'Brand Architecture', desc: 'Structure multi-brand portfolio' }
          ].map(option => (
            <div
              key={option.value}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                formData.primaryGoals.includes(option.value)
                  ? 'border-accent bg-accent/5'
                  : 'border-gray-200 hover:border-accent/50'
              }`}
              onClick={() => handleMultiSelect('primaryGoals', option.value)}
            >
              <h4 className="text-lg font-semibold mb-2 text-dark">{option.title}</h4>
              <p className="text-sm opacity-80 text-dark">{option.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    // Step 10: Additional Info & Results
    {
      title: "Almost done! Any additional context?",
      description: "Share any additional information that would help us understand your needs better.",
      content: (
        <div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-dark">Additional Information (Optional)</label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors text-dark bg-white min-h-[120px] resize-y"
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
              placeholder="Tell us about specific challenges, goals, or anything else that would help us understand your needs..."
            />
          </div>
          
          {currentStep === totalSteps - 1 && (
            <div className="bg-accent/5 border border-accent/20 p-8 rounded-xl mt-8">
              <h3 className="text-xl font-bold mb-4 text-dark">Our Recommendations for {formData.company || 'Your Business'}</h3>
              <p className="text-sm opacity-80 mb-6 text-dark">Based on your responses, here's what we recommend:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-dark">Recommended Services:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {getRecommendations().services.length > 0 ? (
                    getRecommendations().services.map(service => (
                      <li key={service} className="text-sm text-dark">{service}</li>
                    ))
                  ) : (
                    <li className="text-sm text-dark">Complete the questionnaire to see personalized recommendations</li>
                  )}
                </ul>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-dark">Suggested Package: {getRecommendations().packageTier}</h4>
                <p className="text-sm opacity-80 text-dark">This package aligns with your company size, budget, and goals.</p>
              </div>
              
              <p className="text-xs opacity-70 text-dark">
                We'll send you a detailed proposal within 24 hours with customized recommendations and pricing.
              </p>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <>
      <Section background="accent" className="pt-80">
        <Grid>
          <GridItem span={8}>
            <div className="reveal-text bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div className="bg-accent h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
              
              <div style={{ marginBottom: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
                Step {currentStep + 1} of {totalSteps}
              </div>
              
              {questions.map((question, index) => (
                <div key={index} className={currentStep === index ? 'block' : 'hidden'}>
                  <h2 className="text-2xl font-bold mb-4 text-dark">{question.title}</h2>
                  <p className="text-base opacity-80 mb-8 leading-relaxed text-dark">{question.description}</p>
                  {question.content}
                </div>
              ))}
              
              <div className="flex justify-between mt-8">
                <div>
                  {currentStep > 0 && (
                    <Button variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  )}
                </div>
                <div>
                  {currentStep < totalSteps - 1 ? (
                    <Button variant="primary" onClick={nextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={handleSubmit}>
                      Get My Recommendations
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </GridItem>
          
          <GridItem span={4}>
            <div className="reveal-text space-y-8">
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <h3 className="flex items-center text-lg font-semibold mb-4 text-dark">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-3 text-accent">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  Get in Touch
                </h3>
                <p className="text-sm leading-relaxed opacity-80 text-dark">
                  Ready to transform your brand? We'd love to hear from you. 
                  Complete the questionnaire and we'll get back to you within 24 hours 
                  with personalized recommendations.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <h3 className="flex items-center text-lg font-semibold mb-4 text-dark">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-3 text-accent">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Our Location
                </h3>
                <p className="text-sm leading-relaxed opacity-80 text-dark">
                  Based in the Pacific Northwest<br />
                  Serving clients worldwide<br />
                  <em>Remote collaboration available</em>
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <h3 className="flex items-center text-lg font-semibold mb-4 text-dark">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-3 text-accent">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  What to Expect
                </h3>
                <p className="text-sm leading-relaxed opacity-80 text-dark">
                  <strong>Quick Response:</strong> We'll review your questionnaire and respond within 24 hours
                  <br /><br />
                  <strong>Custom Proposal:</strong> Receive a tailored proposal with specific recommendations and pricing
                  <br /><br />
                  <strong>Strategy Call:</strong> Schedule a complimentary 30-minute strategy session to discuss your project
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <h3 className="flex items-center text-lg font-semibold mb-4 text-dark">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-3 text-accent">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Direct Contact
                </h3>
                <p className="text-sm leading-relaxed opacity-80 text-dark">
                  Prefer to reach out directly?<br />
                  <a href="mailto:hello@biginvisible.com" className="text-accent hover:underline">hello@biginvisible.com</a>
                  <br /><br />
                  <em>We typically respond to emails within 4-6 hours during business days.</em>
                </p>
              </div>
            </div>
          </GridItem>
        </Grid>
      </Section>
    </>
  );
};

export default Contact;
