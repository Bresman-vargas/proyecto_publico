import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="center h-screen">
      <div className="flex flex-col items-center gap-4 bg-bg-sec p-4 rounded-md">
        <img
          className="rounded-2xl"
          src="https://c.tenor.com/MYZgsN2TDJAAAAAC/tenor.gif"
          alt=""
        />
        <h1 className="bg-linear-to-r from-accent to-accent/50 bg-clip-text text-7xl font-extrabold text-transparent">
          404
        </h1>
        <p className="text-txt-sec">Page not found</p>

        <Link
          className="bg-accent w-full center text-bg py-2 rounded-md"
          to="/home"
        >
          Go to home
        </Link>
      </div>
    </main>
  );
}
