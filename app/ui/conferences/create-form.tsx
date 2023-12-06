import { Conference } from '@/app/lib/definitions';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { submitPaper } from '@/app/lib/actions';

export function SubmitPaperForm({ conferences }: { conferences: Conference[] }) {
  return (
    <form action={submitPaper}>
      <div className="rounded-md bg-dark-color p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="conference" className="mb-2 block text-sm font-medium">
            Choose conference
          </label>
          <div className="relative">
            <select
              id="conference_name"
              name="conference_name"
              className="peer block w-full cursor-pointer rounded-md border bg-transparent border-gray-500 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a conference
              </option>
              {conferences.map((conference) => (
                <option key={conference.conference_id} value={conference.conference_id}>
                  {conference.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Paper Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Paper Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter paper title"
                className="peer block w-full rounded-md border bg-transparent border-gray-500 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
        {/* Paper description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Paper Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Enter paper description"
                className="peer block w-full rounded-md border bg-transparent border-gray-500 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/conferences"
          className="flex h-10 items-center rounded-lg bg-dark-color px-4 text-sm font-medium text-gray-300 transition-colors hover:bg-dark-color-200"
        >
          Cancel
        </Link>
        <Button type="submit">Submit Paper</Button>
      </div>
    </form>
  );
}
