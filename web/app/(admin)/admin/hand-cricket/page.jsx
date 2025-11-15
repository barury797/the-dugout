import PlayerForm from './playerForm';
import TeamForm from './teamForm';

export const metadata = { title: 'Hand Cricket Admin | The Dugout' };

export default async function HandCricketAdminPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-6xl flex flex-col gap-6 items-start">
        <section className="w-full">
          <h1 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Hand Cricket Admin</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Welcome to the Hand Cricket administration page. Here you can manage players and teams.</p>
        </section>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PlayerForm />
          <TeamForm />
        </div>
      </div>
    </main>
  );
}