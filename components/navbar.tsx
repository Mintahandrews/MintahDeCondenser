import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-6 lg:left-8 right-6 lg:right-8 py-6 lg:pt-8 pb-0 z-30">
      <div className="w-full border border-gray-200 p-3 lg:p-4 max-w-5xl bg-gray-50/90 backdrop-blur-lg sm:grid flex justify-between sm:grid-cols-3 items-center mx-auto rounded-2xl">
        <Link href={"/"} className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🎬</span>
            <div>
              <p className="font-semibold sm:text-xl bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
                Mintah De Condenser
              </p>
              <p className="text-xs text-gray-500">by CodeMintah</p>
            </div>
          </div>
        </Link>

        <div className="sm:flex gap-4 items-center justify-center">
          <Link
            href="/docs"
            className="text-sm text-gray-500 hover:text-gray-900 hidden sm:block"
          >
            Documentation
          </Link>
        </div>

        <div className="flex justify-end items-center">
          <Link
            href={"/video"}
            className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 rounded-lg text-white/90 relative px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950 flex-shrink-0 hover:from-zinc-600 hover:to-zinc-900"
          >
            Compress Video
          </Link>
        </div>
      </div>
    </nav>
  );
};
