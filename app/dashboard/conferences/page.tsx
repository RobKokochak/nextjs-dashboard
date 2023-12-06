import Pagination from '@/app/ui/conferences/pagination';
import Search from '@/app/ui/search';
import { ConferencesTable } from '@/app/ui/conferences/conferences-table';
import { SubmitPaper } from '@/app/ui/conferences/buttons';

import { ConferencesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
 
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Conferences</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search conferences..." />
        <SubmitPaper />
      </div>
       <Suspense key={query + currentPage} fallback={<ConferencesTableSkeleton />}>
        <ConferencesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={1} />
      </div>
    </div>
  );
}