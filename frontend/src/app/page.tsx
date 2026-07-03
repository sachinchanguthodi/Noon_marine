export default function SuspendedPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-900 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-lg w-full">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
          Website Temporarily Suspended
        </h1>

        {/* Divider */}
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-6" />

        {/* Message */}
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10">
          This website is currently unavailable due to an account issue. Please contact your hosting provider to restore access.
        </p>

        {/* Contact Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Hosting Provider</p>
          <p className="text-white font-semibold text-lg mb-1">SK Technology</p>
          <a
            href="https://sktechnology.online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition text-sm font-medium"
          >
            sktechnology.online
          </a>
        </div>

        {/* Footer note */}
        <p className="text-gray-700 text-xs mt-8">
          If you believe this is an error, please contact your account manager.
        </p>
      </div>
    </div>
  );
}
