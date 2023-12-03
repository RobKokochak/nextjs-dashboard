import LoginForm from '@/app/ui/login-form';
import LogoIcon from '../ui/logo';

export default function LoginPage() {
  return (
    <main className="flex flex-col md:h-screen p-6">
      <div className='flex justify-between mb-20'>
        <h2 id="title" className="text-3xl text-white">
          Conference Paper Review System
        </h2>
        <LogoIcon width={12} />
      </div>
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <LoginForm />
      </div>
    </main>
  );
}