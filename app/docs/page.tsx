export default function Documentation() {
  return (
    <div className="max-w-4xl mx-auto pt-32 px-6 lg:px-0 pb-20">
      <div className="space-y-12">
        {/* Introduction Section */}
        <section>
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
            Mintah De Condenser Documentation
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-4">
              Mintah De Condenser is a professional-grade video compression tool
              designed for content creators, developers, and anyone who needs
              efficient video compression without compromising quality.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Core Features
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-900">
                Advanced Compression
              </h3>
              <p className="text-gray-600">
                Utilizes FFmpeg with optimized settings for maximum compression
                while maintaining video quality. Supports multiple quality
                presets and formats.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-900">
                Social Media Optimization
              </h3>
              <p className="text-gray-600">
                Built-in presets for Twitter (2:20 minutes) and WhatsApp Status
                (30 seconds) with platform-specific optimizations.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-900">
                Format Support
              </h3>
              <p className="text-gray-600">
                Comprehensive format support including MP4, MOV, MKV, AVI, WebM,
                M4V, 3GP, and WMV.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-900">
                Privacy First
              </h3>
              <p className="text-gray-600">
                All processing happens locally in your browser. No video data is
                ever sent to external servers.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Technical Details
          </h2>
          <div className="prose prose-gray max-w-none">
            <h3 className="text-xl font-semibold mb-3">Technology Stack</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Frontend:</strong> Next.js 14, React, TypeScript,
                Tailwind CSS
              </li>
              <li>
                <strong>Video Processing:</strong> FFmpeg.wasm for browser-based
                video manipulation
              </li>
              <li>
                <strong>UI Components:</strong> Framer Motion for animations,
                Shadcn/ui for components
              </li>
              <li>
                <strong>State Management:</strong> React Hooks with TypeScript
                for type safety
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">
              Performance Features
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Efficient chunked video processing to handle large files</li>
              <li>Optimized FFmpeg commands for faster compression</li>
              <li>Progressive loading and processing feedback</li>
              <li>Automatic quality adjustment based on input video</li>
            </ul>
          </div>
        </section>

        {/* Developer Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            About the Developer
          </h2>
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Andrews Mintah
                </h3>
                <p className="text-gray-600">
                  A passionate software engineer specializing in web development
                  and multimedia processing. With expertise in React,
                  TypeScript, and video processing technologies,{" "}
                  <strong>Mintah</strong> created{" "}
                  <strong>Mintah De Condenser</strong> to solve the common
                  challenge of video compression while maintaining quality.
                </p>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <strong>Specializations:</strong>
                  </p>
                  <ul className="list-disc pl-6 text-gray-600">
                    <li>Full-stack Web Development</li>
                    <li>Video Processing & Optimization</li>
                    <li>React & Next.js Applications</li>
                    <li>Performance Optimization</li>
                    <li>UI/UX Design</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <p className="text-gray-600">
                    Connect with codemintah and stay updated with the latest
                    developments:
                  </p>
                  <div className="flex gap-4 mt-4">
                    <a
                      href="https://github.com/mintahandrews"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://buymeacoffee.com/codemintah"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Buy Me a Coffee
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Getting Started
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-3 text-gray-900">
                Quick Start Guide
              </h3>
              <ol className="list-decimal pl-6 space-y-3 text-gray-600">
                <li>Click the "Compress Video" button in the navigation bar</li>
                <li>
                  Upload your video file (supported formats: MP4, MOV, MKV,
                  etc.)
                </li>
                <li>
                  Choose your compression settings:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Select quality level (High, Medium, Low)</li>
                    <li>Choose output format</li>
                    <li>Enable/disable audio</li>
                    <li>Use platform-specific optimizations if needed</li>
                  </ul>
                </li>
                <li>
                  Click "Start Compression" and wait for the process to complete
                </li>
                <li>Download your compressed video</li>
              </ol>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-3 text-gray-900">
                Tips for Best Results
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>
                  Use "High" quality for important content where quality is
                  crucial
                </li>
                <li>
                  Choose "Medium" for the best balance of quality and file size
                </li>
                <li>
                  Select "Low" for maximum compression when file size is
                  priority
                </li>
                <li>
                  Remove audio if it's not needed to reduce file size further
                </li>
                <li>
                  Use platform-specific optimizations when targeting specific
                  platforms
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12">
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Ready to Start Compressing?
            </h2>
            <p className="mb-6">
              Experience professional-grade video compression with Mintah De
              Condenser.
            </p>
            <a
              href="/video"
              className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Compressing Now
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
