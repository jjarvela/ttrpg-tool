import RowWrapper from "./_components/wrappers/RowWrapper";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="bg-primary-soft fixed left-0 top-0 flex w-full justify-center border-b-[1px] border-black50 lg:static lg:w-auto lg:rounded-xl lg:border-none lg:p-4 dark:from-inherit">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
      </div>

      <RowWrapper
        breakPoint="lg"
        className="before:bg-gradient-radial after:bg-gradient-conic relative z-[-1] place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent  before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] sm:before:w-[480px] sm:after:w-[240px] lg:gap-4 before:lg:h-[360px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40"
      >
        <h1>Test</h1>
        <h2>Test</h2>
      </RowWrapper>

      <h1 className="text-accent-gradient">Index page</h1>
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="hover:bg-primary-gradient group rounded-lg px-5 py-4 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch]">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="hover:bg-primary-gradient group rounded-lg px-5 py-4 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch]">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="hover:bg-primary-gradient group rounded-lg px-5 py-4 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch]">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="hover:bg-primary-gradient group rounded-lg px-5 py-4 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch]">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
