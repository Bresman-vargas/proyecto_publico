import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="center h-screen">
      <div className="flex flex-col items-center gap-4 bg-bg-sec p-4 rounded-md">
        <img className="rounded-2xl" src="https://i.pinimg.com/originals/8d/bf/df/8dbfdfd079d1f2b59dfa7f44dfc1bb91.gif" alt="" />
        <h1 className="bg-linear-to-r from-accent to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent">404</h1>
        <p className="text-txt-sec">Page not found</p>

        <Link className="bg-accent w-full center text-bg py-2 rounded-md" to='home'>Para la home</Link>
      </div>
    </main>
  );
}
