import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Section from '../components/ui/Section';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import Button from '../components/ui/Button';
import { initRevealAnimations } from '../utils/animations';

const HeroSection = styled.section`
  min-height: 50vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 120px;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  
  h1 {
    font-size: clamp(2.5rem, 5vw, ${({ theme }) => theme.typography.fontSize['5xl']});
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: clamp(1rem, 2vw, ${({ theme }) => theme.typography.fontSize.xl});
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    opacity: 0.8;
    line-height: 1.6;
    max-width: 600px;
  }
`;

const QuestionnaireContainer = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(114, 114, 114, 0.5);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.accent} 0%, #ff6b6b 100%);
  width: ${({ progress }) => progress}%;
  transition: width ${({ theme }) => theme.transitions.default};
`;

const QuestionStep = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => isVisible ? 'block' : 'none'};
  animation: ${({ isVisible }) => isVisible ? 'fadeInUp 0.5s ease-out' : 'none'};
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const QuestionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.accent};
`;

const QuestionDescription = styled.p`
  opacity: 0.8;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.6;
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Input = styled.input`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(114, 114, 114, 0.5);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.sm} inset;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(114, 114, 114, 0.5);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  min-height: 150px;
  resize: vertical;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.sm} inset;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

const Select = styled.select`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(114, 114, 114, 0.5);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.sm} inset;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    background-color: rgba(255, 255, 255, 0.08);
  }
  
  option {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const OptionCard = styled.button<{ isSelected: boolean }>`
  background: ${({ isSelected }) => 
    isSelected ? 'rgba(255, 58, 70, 0.1)' : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid ${({ isSelected, theme }) => 
    isSelected ? theme.colors.accent : 'rgba(114, 114, 114, 0.5)'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: left;
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: rgba(255, 58, 70, 0.05);
  }
  
  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    color: ${({ isSelected, theme }) => isSelected ? theme.colors.accent : 'inherit'};
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    opacity: 0.7;
    line-height: 1.4;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const RecommendationCard = styled.div`
  background: rgba(255, 58, 70, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
  
  h3 {
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: ${({ theme }) => theme.spacing.md} 0;
    
    li {
      position: relative;
      padding-left: ${({ theme }) => theme.spacing.lg};
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      
      &:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: ${({ theme }) => theme.colors.accent};
      }
    }
  }
`;

const ContactInfo = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  height: 100%;
`;

const ContactItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    display: flex;
    align-items: center;
    
    svg {
      margin-right: ${({ theme }) => theme.spacing.sm};
      color: ${({ theme }) => theme.colors.accent};
    }
  }
  
  p {
    opacity: 0.8;
    line-height: 1.6;
  }
  
  a {
    color: ${({ theme }) => theme.colors.text};
    transition: color ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

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
            <FormGroup>
              <Label>Your Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Smith"
                required
              />
            </FormGroup>
          </GridItem>
          <GridItem span={1}>
            <FormGroup>
              <Label>Email Address *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@company.com"
                required
              />
            </FormGroup>
          </GridItem>
          <GridItem span={1}>
            <FormGroup>
              <Label>Company Name *</Label>
              <Input
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Your Company"
                required
              />
            </FormGroup>
          </GridItem>
          <GridItem span={1}>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </FormGroup>
          </GridItem>
        </Grid>
      )
    },
    // Step 1: Business Stage
    {
      title: "What stage is your business in?",
      description: "This helps us understand your current position and needs.",
      content: (
        <OptionGrid>
          {[
            { value: 'startup', title: 'Startup', desc: 'Early stage, building our foundation' },
            { value: 'growth', title: 'Growth Stage', desc: 'Established, ready to scale' },
            { value: 'mature', title: 'Mature Business', desc: 'Well-established, optimizing operations' },
            { value: 'pivot', title: 'Pivoting', desc: 'Changing direction or repositioning' }
          ].map(option => (
            <OptionCard
              key={option.value}
              isSelected={formData.businessStage === option.value}
              onClick={() => handleInputChange('businessStage', option.value)}
            >
              <h4>{option.title}</h4>
              <p>{option.desc}</p>
            </OptionCard>
          ))}
        </OptionGrid>
      )
    },
    // Step 2: Company Size
    {
      title: "How large is your team?",
      description: "Understanding your company size helps us tailor our approach.",
      content: (
        <OptionGrid>
          {[
            { value: 'solo', title: 'Solo/Freelancer', desc: 'Just me or 1-2 people' },
            { value: 'small', title: 'Small Team', desc: '3-10 people' },
            { value: 'medium', title: 'Medium Company', desc: '11-50 people' },
            { value: 'large', title: 'Large Company', desc: '51-200 people' },
            { value: 'enterprise', title: 'Enterprise', desc: '200+ people' }
          ].map(option => (
            <OptionCard
              key={option.value}
              isSelected={formData.companySize === option.value}
              onClick={() => handleInputChange('companySize', option.value)}
            >
              <h4>{option.title}</h4>
              <p>{option.desc}</p>
            </OptionCard>
          ))}
        </OptionGrid>
      )
    },
    // Step 3: Industry
    {
      title: "What industry are you in?",
      description: "Industry context helps us understand your market and audience.",
      content: (
        <FormGroup>
          <Select
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
          </Select>
        </FormGroup>
      )
    },
    // Step 4: Current Challenges
    {
      title: "What are your biggest brand challenges?",
      description: "Select all that apply to help us understand your pain points.",
      content: (
        <OptionGrid>
          {[
            { value: 'brand-clarity', title: 'Brand Clarity', desc: 'Unclear brand message or positioning' },
            { value: 'visual-consistency', title: 'Visual Consistency', desc: 'Inconsistent visual identity' },
            { value: 'market-differentiation', title: 'Standing Out', desc: 'Difficulty differentiating from competitors' },
            { value: 'audience-connection', title: 'Audience Connection', desc: 'Struggling to connect with target audience' },
            { value: 'digital-presence', title: 'Digital Presence', desc: 'Weak online presence or outdated website' },
            { value: 'community-building', title: 'Community Building', desc: 'Difficulty building loyal community' }
          ].map(option => (
            <OptionCard
              key={option.value}
              isSelected={formData.currentChallenges.includes(option.value)}
              onClick={() => handleMultiSelect('currentChallenges', option.value)}
            >
              <h4>{option.title}</h4>
              <p>{option.desc}</p>
            </OptionCard>
          ))}
        </OptionGrid>
      )
    },
    // Step 5: Brand Maturity
    {
      title: "How would you describe your current brand?",
      description: "Understanding your brand's current state helps us recommend the right approach.",
      content: (
        <OptionGrid>
          {[
            { value: 'early', title: 'Just Starting', desc: 'Brand new or very early stage' },
            { value: 'basic', title: 'Basic Brand', desc: 'Have logo/colors but need more development' },
            { value: 'established', title: 'Established', desc: 'Solid brand but could be stronger' },
            { value: 'needs-refresh', title: 'Needs Refresh', desc: 'Outdated brand that needs updating' }
          ].map(option => (
            <OptionCard
              key={option.value}
              isSelected={formData.brandMaturity === option.value}
              onClick={() => handleInputChange('brandMaturity', option.value)}
            >
              <h4>{option.title}</h4>
              <p>{option.desc}</p>
            </OptionCard>
          ))}
        </OptionGrid>
      )
    },
    // Step 6: Digital Presence
    {
      title: "How's your current digital presence?",
      description: "This helps us understand your digital foundation and needs.",
      content: (
        <OptionGrid>
          {[
            { value: 'none', title: 'No Website', desc: 'No website or very basic landing page' },
            { value: 'basic', title: 'Basic Website', desc: 'Simple website but needs improvement' },
            { value: 'good', title: 'Good Website', desc: 'Decent website but could be optimized' },
            { value: 'strong', title: 'Strong Presence', desc: 'Great website and digital strategy' }
          ].map(option => (
            <OptionCard
              key={option.value}
              isSelected={formData.digitalPresence === option.value}
              onClick={() => handleInputChange('digitalPresence', option.value)}
            >
              <h4>{option.title}</h4>
              <p>{option.desc}</p>
            </OptionCard>
          ))}
        </OptionGrid>
      )
    },
    // Step 7: Community Goals
    {
      title: "What are your community-building goals?",
      description: "Understanding your community aspirations helps us recommend the right strategy.",
      content: (
        <OptionGrid>
          {[
            { value: 'build', title: 'Build Community', desc: 'Create a new community from scratch' },
            { value: 'grow', title: 'Grow Existing', desc: 'Expand and strengthen current community' },
            { value: 'engage', title: 'Increase Engagement', desc: 'Improve interaction with existing audience' },
            { value: 'convert', title: 'Convert to Customers', desc: 'Turn community members into customers' }
          ].map(option => (
            <OptionCard
              key={option.value}
              isSelected={formData.communityGoals === option.value}
              onClick={() => handleInputChange('communityGoals', option.value)}
            >
              <h4>{option.title}</h4>
              <p>{option.desc}</p>
            </OptionCard>
          ))}
        </OptionGrid>
      )
    },
    // Step 8: Timeline & Budget
    {
      title: "Project timeline and investment",
      description: "This helps us recommend the right approach and package for your needs.",
      content: (
        <Grid columns={2} gap="medium">
          <GridItem span={1}>
            <FormGroup>
              <Label>Project Timeline</Label>
              <Select
                value={formData.projectTimeline}
                onChange={(e) => handleInputChange('projectTimeline', e.target.value)}
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP (1-2 months)</option>
                <option value="soon">Soon (2-3 months)</option>
                <option value="flexible">Flexible (3-6 months)</option>
                <option value="planning">Planning phase (6+ months)</option>
              </Select>
            </FormGroup>
          </GridItem>
          <GridItem span={1}>
            <FormGroup>
              <Label>Investment Range</Label>
              <Select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
              >
                <option value="">Select budget range</option>
                <option value="low">$5,000 - $10,000</option>
                <option value="medium">$10,000 - $25,000</option>
                <option value="high">$25,000+</option>
                <option value="discuss">Let's discuss</option>
              </Select>
            </FormGroup>
          </GridItem>
        </Grid>
      )
    },
    // Step 9: Primary Goals
    {
      title: "What are your primary goals?",
      description: "Select your top priorities to help us create the perfect recommendation.",
      content: (
        <OptionGrid>
          {[
            { value: 'brand-strategy', title: 'Brand Strategy', desc: 'Define brand positioning and messaging' },
            { value: 'visual-identity', title: 'Visual Identity', desc: 'Create or refresh logo and visual system' },
            { value: 'digital-experience', title: 'Digital Experience', desc: 'Build or improve website and UX' },
            { value: 'content-strategy', title: 'Content Strategy', desc: 'Develop content and storytelling approach' },
            { value: 'community-building', title: 'Community Building', desc: 'Build and nurture brand community' },
            { value: 'brand-architecture', title: 'Brand Architecture', desc: 'Structure multi-brand portfolio' }
          ].map(option => (
            <OptionCard
              key={option.value}
              isSelected={formData.primaryGoals.includes(option.value)}
              onClick={() => handleMultiSelect('primaryGoals', option.value)}
            >
              <h4>{option.title}</h4>
              <p>{option.desc}</p>
            </OptionCard>
          ))}
        </OptionGrid>
      )
    },
    // Step 10: Additional Info & Results
    {
      title: "Almost done! Any additional context?",
      description: "Share any additional information that would help us understand your needs better.",
      content: (
        <div>
          <FormGroup>
            <Label>Additional Information (Optional)</Label>
            <Textarea
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
              placeholder="Tell us about specific challenges, goals, or anything else that would help us understand your needs..."
            />
          </FormGroup>
          
          {currentStep === totalSteps - 1 && (
            <RecommendationCard>
              <h3>Our Recommendations for {formData.company || 'Your Business'}</h3>
              <p>Based on your responses, here's what we recommend:</p>
              
              <div style={{ marginTop: '1.5rem' }}>
                <h4>Recommended Services:</h4>
                <ul>
                  {getRecommendations().services.length > 0 ? (
                    getRecommendations().services.map(service => (
                      <li key={service}>{service}</li>
                    ))
                  ) : (
                    <li>Complete the questionnaire to see personalized recommendations</li>
                  )}
                </ul>
              </div>
              
              <div style={{ marginTop: '1.5rem' }}>
                <h4>Suggested Package: {getRecommendations().packageTier}</h4>
                <p>This package aligns with your company size, budget, and goals.</p>
              </div>
              
              <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                We'll send you a detailed proposal within 24 hours with customized recommendations and pricing.
              </p>
            </RecommendationCard>
          )}
        </div>
      )
    }
  ];

  return (
    <>
      <HeroSection>
        <div className="container">
          <HeroContent>
            <h1 className="reveal-text">Let's Find Your Perfect <span className="text-gradient">Brand Solution</span></h1>
            <p className="subtitle reveal-text">
              Answer a few questions about your business and we'll recommend the ideal services and approach to transform your brand and build authentic community connections.
            </p>
          </HeroContent>
        </div>
      </HeroSection>
      
      <Section>
        <Grid>
          <GridItem span={8}>
            <QuestionnaireContainer className="reveal-text">
              <ProgressBar>
                <ProgressFill progress={progress} />
              </ProgressBar>
              
              <div style={{ marginBottom: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
                Step {currentStep + 1} of {totalSteps}
              </div>
              
              {questions.map((question, index) => (
                <QuestionStep key={index} isVisible={currentStep === index}>
                  <QuestionTitle>{question.title}</QuestionTitle>
                  <QuestionDescription>{question.description}</QuestionDescription>
                  {question.content}
                </QuestionStep>
              ))}
              
              <ButtonGroup>
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
              </ButtonGroup>
            </QuestionnaireContainer>
          </GridItem>
          
          <GridItem span={4}>
            <ContactInfo className="reveal-text">
              <ContactItem>
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  Get in Touch
                </h3>
                <p>
                  Ready to transform your brand? We'd love to hear from you. 
                  Complete the questionnaire and we'll get back to you within 24 hours 
                  with personalized recommendations.
                </p>
              </ContactItem>

              <ContactItem>
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Our Location
                </h3>
                <p>
                  Based in the Pacific Northwest<br />
                  Serving clients worldwide<br />
                  <em>Remote collaboration available</em>
                </p>
              </ContactItem>

              <ContactItem>
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  What to Expect
                </h3>
                <p>
                  <strong>Quick Response:</strong> We'll review your questionnaire and respond within 24 hours
                  <br /><br />
                  <strong>Custom Proposal:</strong> Receive a tailored proposal with specific recommendations and pricing
                  <br /><br />
                  <strong>Strategy Call:</strong> Schedule a complimentary 30-minute strategy session to discuss your project
                </p>
              </ContactItem>

              <ContactItem>
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Direct Contact
                </h3>
                <p>
                  Prefer to reach out directly?<br />
                  <a href="mailto:hello@biginvisible.com">hello@biginvisible.com</a>
                  <br /><br />
                  <em>We typically respond to emails within 4-6 hours during business days.</em>
                </p>
              </ContactItem>
            </ContactInfo>
          </GridItem>
        </Grid>
      </Section>
    </>
  );
};

export default Contact;
