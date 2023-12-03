import LogoIcon from '@/app/ui/logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <main id="viewport" className="min-h-screen flex p-6">
      <div id="left-col" className="flex-1">
        <h2 id="title" className="mb-20 mr-5 text-3xl text-white">
          Conference Paper Review System
        </h2>
        <div id="signin-title&card" className="m-10">
          <h2 id="signin-title" className="mb-20 text-3xl text-white">
            Sign in
          </h2>
          <div className="mt-8 space-y-14 p-5 rounded-xl max-w-md bg-dark-color">
            <p className={`text-xl md:text-3xl md:leading-normal`}>
              Welcome to the Conference Paper Review System.
            </p>
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div id="right-col" className="flex-1">
        <div id="logo-card" className="p-5 h-full w-full flex flex-1 flex-col justify-between space-y-8 bg-dark-color rounded-xl">
          <div id="logo-image">
            <LogoIcon width={36} />
          </div>
          <div id="banner" className="py-12">
            <h2 className="pb-3 text-5xl">Conference Paper Review System</h2>
            <p className="text-m">Sign in with your credentials to get started.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
