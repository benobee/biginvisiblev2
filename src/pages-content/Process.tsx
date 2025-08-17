import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Grid from '../components/ui/Grid';
import GridItem from '../components/ui/GridItem';
import CTASection from '../components/ui/CTASection';
import TimelineStep from '../components/TimelineStep';
import FrameworkCard from '../components/FrameworkCard';
import FullScreenHero from '../components/ui/FullScreenHero';
import styles from '../components/ui/FullScreenHero.module.css';
import {
  AuthenticConnectionIcon,
  StrategicAlignmentIcon,
  CommunityIntegrationIcon,
  ConsistentExperienceIcon,
  MeasurableImpactIcon,
  AdaptiveEvolutionIcon
} from '../components/ui/ProcessIcons';

const Process = () => {
  
  return (
    <>
      <FullScreenHero
        title={<>Our process<br />creates <span className={`text-accent ${styles.fadeInCycle}`}>authentic</span><br />connections</>}
        description="Our (not-so-secret) formula for turning businesses into brands people remember, trust, and choose."
        imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
        imageAlt="Our process"
        overlayOpacity={0.6}
        textAlign="left"
      />
      
      <Section background="light">
        <SectionHeader
          title="The step-by-step breakdown"
          description="Here's exactly how we turn your business into something people can't ignore (in a good way)."
          align="center"
        />
        
        <div>
          <TimelineStep
            phase={1}
            title="Getting Curious"
            description="We dig deep to understand what makes you tick, who your people are, and what you're up against. Think detective work, but with better coffee and fewer trench coats."
            deliverables={[
              "Heart-to-heart conversations with your team",
              "Market research that actually makes sense",
              "Getting to know your people (really know them)",
              "Checking out what everyone else is doing"
            ]}
          />

          <TimelineStep
            phase={2}
            title="Connecting the Dots"
            description="Time to turn all those insights into a plan that actually works. We'll map out your sweet spot and figure out how to get people excited about what you do."
            deliverables={[
              "Your unique spot in the market (finally figured out)",
              "Words that work (not just sound smart)",
              "How all your stuff fits together",
              "A plan for talking to people"
            ]}
          />

          <TimelineStep
            phase={3}
            title="Making It Real"
            description="This is where the magic happens—turning strategy into something you can see, touch, and feel. Every piece works together like a well-orchestrated symphony (but with better color palettes)."
            deliverables={[
              "A look that's unmistakably you",
              "Guidelines that actually make sense",
              "Digital experiences people enjoy",
              "Marketing stuff that doesn't look like everyone else's"
            ]}
          />

          <TimelineStep
            phase={4}
            title="Making It Stick"
            description="Great brands aren't built overnight. We stick around to make sure everything keeps working as you grow, because we actually care how this turns out."
            deliverables={[
              "Keeping track of what's working",
              "Tweaking things that need tweaking",
              "Planning for what's next",
              "Building your fan club"
            ]}
          />
        </div>
      </Section>
      
      <Section background="primary">
        <SectionHeader
          subtitle="What drives us"
          title="The stuff we actually care about"
          description="These aren't just fancy words on our website—they're the principles that guide everything we do."
          align="center"
        />
        
        <Grid columns={3} gap="xl">
          <GridItem span={1}>
            <FrameworkCard
              icon={<AuthenticConnectionIcon />}
              title="Real Connections"
              description="We help you build relationships that actually matter—the kind where people choose you because they want to, not because they have to."
            />
          </GridItem>
          
          <GridItem span={1}>
            <FrameworkCard
              icon={<StrategicAlignmentIcon />}
              title="Everything Works Together"
              description="No random acts of branding here. Every piece of your brand should work toward the same goal—making your business successful."
            />
          </GridItem>
          
          <GridItem span={1}>
            <FrameworkCard
              icon={<CommunityIntegrationIcon />}
              title="Being Part of Something Bigger"
              description="The best brands don't just sell stuff—they become part of their community's story. We help you earn your place in that narrative."
            />
          </GridItem>
          
          <GridItem span={1}>
            <FrameworkCard
              icon={<ConsistentExperienceIcon />}
              title="Same You, Everywhere"
              description="Whether someone meets you on Instagram, your website, or in person, they should get the same feeling—that's how recognition works."
            />
          </GridItem>
          
          <GridItem span={1}>
            <FrameworkCard
              icon={<MeasurableImpactIcon />}
              title="Results You Can Actually See"
              description="Pretty pictures are nice, but we're here to move numbers. We track what matters so you know this stuff is actually working."
            />
          </GridItem>
          
          <GridItem span={1}>
            <FrameworkCard
              icon={<AdaptiveEvolutionIcon />}
              title="Growing Without Losing Yourself"
              description="Great brands evolve but never lose what made them great in the first place. We help you grow without becoming someone else."
            />
          </GridItem>
        </Grid>
      </Section>
      
      <Section background="light">
        <Grid>
          <GridItem span={6}>
            <div className="reveal-text">
              <h2 className="text-4xl font-bold mb-6 text-dark">We're in this together</h2>
              <p>The best work happens when we're actually working together, not just for you. You know your business better than anyone—we just know how to make it irresistible.</p>
              <p>That means no disappearing for weeks only to emerge with something that misses the mark. We keep you in the loop, ask for your input, and make sure you love where we're headed.</p>
              <p>Think of us as that friend who's really good at design and strategy, but still needs you to tell them what actually matters to your customers.</p>
            </div>
          </GridItem>
          <GridItem span={6}>
            <div className="reveal-text relative h-96 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Collaborative approach" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </GridItem>
        </Grid>
      </Section>
      
      <CTASection
        title="Ready to get started?"
        description="Let's figure out what makes you different and turn that into something people can't ignore."
        buttonText="Let's talk"
        buttonTo="/contact"
        buttonVariant="primaryInverse"
      />
    </>
  );
};

export default Process;
