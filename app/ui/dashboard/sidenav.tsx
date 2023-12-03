import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import LogoIcon from '@/app/ui/logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 rounded-md bg-dark-color p-4"
        href="/"
      >
        <div className="flex text-white">
          <LogoIcon width={16} />
          <p className='pt-2 pl-1'>Conference Paper Review System</p>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-dark-color md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut({redirectTo: 'http://localhost:3000/'});
          }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-dark-color p-3 text-sm font-medium hover:bg-blue-600 hover:text-sky-100 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">
              Sign Out
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
