import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredConferences } from '@/app/lib/data';

export async function ConferencesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const conferences = await fetchFilteredConferences(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-dark-color p-2 md:pt-0">
          <div className="md:hidden">
            {conferences?.map((conference) => (
              <div
                key={conference.conference_id}
                className="mb-2 w-full rounded-md bg-dark-color p-4"
              >
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(conference.start_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <p>{formatDateToLocal(conference.end_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <p>{formatDateToLocal(conference.submission_deadline)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-200 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Conference
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Start Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  End Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Submission Deadline
                </th>
              </tr>
            </thead>
            <tbody className="bg-dark-color">
              {conferences?.map((conference) => (
                <tr
                  key={conference.conference_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{conference.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex items-center gap-3">
                      <p>{formatDateToLocal(conference.start_date)}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{formatDateToLocal(conference.end_date)}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{formatDateToLocal(conference.submission_deadline)}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
