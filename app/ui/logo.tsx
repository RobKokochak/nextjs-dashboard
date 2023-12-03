import { CubeIcon } from '@heroicons/react/24/outline';

export default function LogoIcon({ width }: { width: number }) {
  return (
    <div className={`flex text-gray-300`}>
      <CubeIcon className={`h-${width} w-${width}`} />
    </div>
  );
}
