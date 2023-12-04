import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { fetchUpcomingConferences } from '@/app/lib/data';

export default async function UpcomingConferences() {
  const latestConferences = await fetchUpcomingConferences();
  
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>
        Upcoming Conferences
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-dark-color p-4">
        <div className=" px-6">
          {latestConferences.map((conference, i) => {
            return (
              <div
                key={conference.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {conference.name}
                    </p>
                    <p className="text-sm text-gray-300 sm:block">
                      Submission deadline: {conference.end_date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric' })}
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
