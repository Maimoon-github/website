import { CoreService } from '@/services/core.service';
import { AboutService } from '@/services/about.service';
import Container from '@/components/layout/Container';
import { BioSection, StatsGrid, SpecSection, SkillsVisualization, ExperienceTimeline } from '@/components/about';
import { DynamicPageContent, PageHeader } from '@/components/shared/data-display';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const [
    { data: profile },
    { data: skills },
    { data: experiences },
    { data: header }
  ] = await Promise.all([
    CoreService.getProfile(),
    CoreService.getSkills(),
    AboutService.getExperience(),
    CoreService.getPageHeader('about')
  ]);

  return (
    <Container className="pt-24 pb-20">
      <PageHeader 
        badge={header?.badge || "Personnel Profile"}
        title={header?.title || "IDENTITY"}
        highlightedWord={header?.highlighted_word || "CORE"}
        description={header?.description || "Technical profile and cognitive capabilities of the architect specializing in Agentic AI Engineering."}
      />
      <BioSection profile={profile} />
      <StatsGrid profile={profile} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
        <SpecSection />
        <SkillsVisualization skills={skills || []} />
      </div>

      <ExperienceTimeline experiences={experiences || []} />

      <DynamicPageContent page="about" />
    </Container>
  );
}
