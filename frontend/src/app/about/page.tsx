import { CoreService } from '@/services/core.service';
import Container from '@/components/layout/Container';
import { BioSection, StatsGrid, SpecSection, SkillsVisualization } from '@/components/about';
import { DynamicPageContent } from '@/components/shared/data-display';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const [
    { data: profile },
    { data: skills }
  ] = await Promise.all([
    CoreService.getProfile(),
    CoreService.getSkills()
  ]);

  return (
    <Container className="pt-32 pb-24">
      <BioSection profile={profile} />
      <StatsGrid profile={profile} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-24">
        <SpecSection />
        <SkillsVisualization skills={skills || []} />
      </div>

      <DynamicPageContent page="about" />
    </Container>
  );
}
