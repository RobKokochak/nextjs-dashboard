import CardWrapper from '@/app/ui/dashboard/cards';
import UpcomingConferences from '@/app/ui/dashboard/latest-conferences';
import {SubmittedPapers, AssignedPapers } from '@/app/ui/dashboard/submitted-papers';
import { Suspense } from 'react';
import { 
  SubmittedPapersSkeleton,
  UpcomingConferencesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

export default async function Page() {
  
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-3xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<UpcomingConferencesSkeleton />}>
          <UpcomingConferences />
        </Suspense>
        <Suspense fallback={<SubmittedPapersSkeleton />}>
          <SubmittedPapers />
        </Suspense>
        <Suspense fallback={<SubmittedPapersSkeleton />}>
          <AssignedPapers />
        </Suspense>
      </div>
    </main>
  );
}