export const metadata = {title: 'Home | The Dugout'}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 items-start">
        <section className="flex-1">
          <h1 className="text-3xl font-semibold mb-4">Welcome to The Dugout</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Hello World!</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">This area is a good place for intro text, links, or a brief description of the project.</p>
        </section>

        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
            <iframe
              title="Discord Widget"
              src="https://discord.com/widget?id=1330080534667333653&theme=dark"
              width="100%"
              height="500"
              allowtransparency="true"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            />
          </div>
        </aside>
      </div>
    </main>
  );
}
