import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';

import { fetchSubmittedPapers } from '@/app/lib/data';

export async function SubmittedPapers() {
  const submittedPapers = await fetchSubmittedPapers();
  
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>
        Submitted Papers
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-dark-color p-4">
        <div className=" px-6">
          {submittedPapers.map((paper, i) => {
            return (
              <div
                key={paper.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center w-full">
                  <div className="w-full">
                    <div className='flex justify-between'>
                    <p className="truncate text-sm font-semibold">
                      {paper.paper_title}
                    </p>
                    <p className="text-sm text-gray-300 sm:block">
                      Submitted: {paper.submission_date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                    </div>
                    <p className="text-sm text-gray-300 sm:block">
                      Conference: {paper.conference_id}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-sm text-gray-400">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}

export async function AssignedPapers() {
  const latestPapers = await fetchSubmittedPapers();
  
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>
        Assigned Papers
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-dark-color p-4">
        <div className=" px-6">
          {latestPapers.map((paper, i) => {
            return (
              <div
                key={paper.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={paper.image_url}
                    alt={`${paper.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {paper.name}
                    </p>
                    <p className="hidden text-sm text-gray-300 sm:block">
                      {paper.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`truncate text-sm font-medium md:text-base`}
                >
                  {paper.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-sm text-gray-400">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
