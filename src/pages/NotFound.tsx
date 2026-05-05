import { Link } from 'react-router'

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-neutral-950 px-6 text-center">
      <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-neutral-300">
        The URL you entered does not exist. Please return to the homepage.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-md border border-white bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
      >
        Back to home
      </Link>
    </main>
  )
}
