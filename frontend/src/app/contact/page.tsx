import Container from '@/components/layout/Container';
import { ContactForm, ContactInfo } from '@/components/contact';
import { PageHeader, DynamicPageContent } from '@/components/shared/data-display';
import { CoreService } from '@/services/core.service';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const { data: header } = await CoreService.getPageHeader('contact');

  return (
    <Container className="pt-32 pb-24">
      <PageHeader 
        badge={header?.badge || "Registry Connection"}
        title={header?.title || "ESTABLISH"}
        highlightedWord={header?.highlighted_word || "SIGNAL"}
        description={header?.description || "Connect with the technical architecture team for inquiries regarding Agentic AI systems and deployments."}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <ContactInfo />
        <ContactForm />
      </div>

      <DynamicPageContent page="contact" />
    </Container>
  );
}
