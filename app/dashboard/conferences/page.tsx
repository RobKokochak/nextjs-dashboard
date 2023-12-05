import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { ConferencesTable, InvoicesTable } from '@/app/ui/invoices/conferences-table';
import { CreateInvoice, SubmitPaper } from '@/app/ui/invoices/buttons';

import { ConferencesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchConferencesPages, fetchInvoicesPages } from '@/app/lib/data';
 
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

  //const totalPages = await fetchConferencesPages(query);
 
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