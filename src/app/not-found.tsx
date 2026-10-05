import Link from "next/link";
//pagekno kuco na thakle

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="font-display text-8xl font-bold text-accent">404</h1>
      <h2 className="font-display text-2xl uppercase mt-2">Page Not Found</h2>
      <p className="text-gray-400 my-4">The page you are looking for does not exist.</p>
      <Link href="/" className="inline-block bg-accent text-black font-bold px-5 py-2 rounded">
        Back to Home
      </Link>
    </div>
  );
}
