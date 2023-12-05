import { Form } from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchUpcomingConferences, getConferences } from '@/app/lib/data';
 
export default async function Page() {
  const conferences = await getConferences();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Conferences', href: '/dashboard/conferences' },
          {
            label: 'Submit Paper',
            href: '/dashboard/conferences/submit',
            active: true,
          },
        ]}
      />
      <Form conferences={conferences} />
    </main>
  );
}