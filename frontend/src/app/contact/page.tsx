import Container from '@/components/layout/Container';
import { ContactForm, ContactInfo } from '@/components/contact';

export default function ContactPage() {
  return (
    <Container className="pt-32 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <ContactInfo />
        <ContactForm />
      </div>
    </Container>
  );
}
