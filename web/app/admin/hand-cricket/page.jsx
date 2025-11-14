import { PlayerForm } from './playerForms';

export const metadata = { title: 'Hand Cricket Admin | The Dugout' };

export default async function HandCricketAdminPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-4xl flex flex-col gap-6 items-start">
        <section className="w-full">
          <h1 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Hand Cricket Admin</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Welcome to the Hand Cricket administration page. Here you can manage players, view statistics, and oversee ongoing matches.</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">This area is reserved for administrators to configure and monitor the Hand Cricket game.</p>
        </section>

        <PlayerForm />
      </div>
    </main>
  );
}