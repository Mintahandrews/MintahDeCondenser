import Link from "next/link";

const Hero = () => (
  <div className="pt-10 md:pt-20 px-6 lg:px-0">
    <div className="text-gray-600 flex items-center gap-x-1.5 text-2xl border border-gray-200 rounded-full px-3 py-1.5 mx-auto w-fit mb-8">
      <p className="text-sm sm:text-base">✨ Professional Video Compression</p>
    </div>
    <h1 className="text-center text-4xl font-bold md:text-5xl lg:text-7xl lg:font-semibold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
      Mintah De Condenser
    </h1>
    <h2 className="sm:text-lg max-w-2xl mx-auto text-gray-500 text-center mt-9">
      Transform your videos with professional-grade compression. Reduce file sizes by up to <span className="font-semibold text-gray-700">90%</span> while maintaining exceptional quality. Perfect for social media, presentations, and more.
    </h2>
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-10 mb-10">
      <Link
        className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 rounded-lg text-white/90 relative px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950 flex-shrink-0 hover:from-zinc-600 hover:to-zinc-900"
        href={"/video"}
      >
        Start Compressing
      </Link>
      <Link
        className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-2"
        href={"/about"}
      >
        Learn more <span className="text-lg">→</span>
      </Link>
    </div>
    <div className="text-center text-sm text-gray-500 mt-4">
      Secure & Private • Works Offline • No File Size Limits
    </div>
  </div>
);

export default Hero;
