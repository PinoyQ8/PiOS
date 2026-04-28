import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="z-10 max-w-5xl w-full items-center justify-center flex flex-col gap-8 text-center">
        
        {/* The Title */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-yellow-500 pb-2">
          BAZAAR DAO
        </h1>
        
        {/* The Status Subtitle */}
        <p className="text-xl text-gray-400 border-b border-gray-800 pb-6 tracking-widest uppercase">
          [ Sovereign Mesh Online ]
        </p>

        {/* The Control Panel */}
        <div className="flex flex-col sm:flex-row gap-6 mt-8 w-full max-w-lg mx-auto">
          
          <Link href="/academy" className="flex-1 px-6 py-4 rounded-sm bg-purple-900/20 border border-purple-500/50 text-purple-400 hover:bg-purple-600/30 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 uppercase tracking-wider text-sm font-bold flex items-center justify-center text-center">
            Vanguard Academy
          </Link>

          <button className="flex-1 px-6 py-4 rounded-sm bg-yellow-900/20 border border-yellow-500/50 text-yellow-400 hover:bg-yellow-600/30 hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-300 uppercase tracking-wider text-sm font-bold">
            Vault Protocol
          </button>
          
        </div>

        {/* System Diagnostics */}
        <div className="mt-24 text-gray-700 text-xs flex flex-col items-center gap-2">
          <p>STATUS: LOCALHOST SECURE</p>
          <p>PROTOCOL: 22.1 [RUST/WASM READY]</p>
        </div>

      </div>
    </main>
  );
}