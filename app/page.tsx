import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
      <Link href="/chat" className="text-3xl font-bold ">
        Go to chatt? &#8594;
      </Link>

      <p className="opacity-60 text-sm">Instructions in the README.md</p>
    </div>
  );
}
