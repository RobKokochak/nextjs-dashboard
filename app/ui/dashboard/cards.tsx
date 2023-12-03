import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';

import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  role: BanknotesIcon,
  conferences: UserGroupIcon,
  assigned: ClockIcon,
  papers: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="User Role" value={totalPaidInvoices} type="role" />
      <Card title="Submitted Papers" value={numberOfInvoices} type="papers" />
      <Card title="Assigned Papers" value={totalPendingInvoices} type="assigned" />
      <Card title="Upcoming Conferences" value={numberOfCustomers} type="conferences" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'papers' | 'conferences' | 'assigned' | 'role';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-dark-color p-2 shadow-sm">
      <div className="flex p-3">
        {Icon ? <Icon className="h-5 w-5 text-sky-100" /> : null}
        <h3 className="ml-2 text-xs font-medium">{title}</h3>
      </div>
      <p
        className={`truncate rounded-xl bg-slate-800 px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
