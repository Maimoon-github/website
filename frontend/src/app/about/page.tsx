import { CoreService } from '@/services/core.service';
import Container from '@/components/layout/Container';
import { BioSection, StatsGrid, SpecSection } from '@/components/about';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const { data: profile } = await CoreService.getProfile();

  return (
    <Container className="pt-32 pb-24">
      <BioSection profile={profile} />
      <StatsGrid profile={profile} />
      <SpecSection />
    </Container>
  );
}
