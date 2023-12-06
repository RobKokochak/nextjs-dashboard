import { SubmitPaperForm } from '@/app/ui/conferences/create-form';
import Breadcrumbs from '@/app/ui/conferences/breadcrumbs';
import { getConferences } from '@/app/lib/data';
 
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
      <SubmitPaperForm conferences={conferences} />
    </main>
  );
}