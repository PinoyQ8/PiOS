"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const QUESTIONS = [
  { question: "What is the core consensus algorithm used by Pi Network?", options: ["Proof of Work (PoW)", "Stellar Consensus Protocol (SCP)", "Proof of Stake (PoS)", "Delegated Proof of Stake (DPoS)"], correct: 1 },
  { question: "What is the mandatory Treasury contribution rate in the Bazaar DAO?", options: ["10%", "15%", "20%", "25%"], correct: 2 },
  { question: "True or False: The Vanguard Academy is optional for DAO participation.", options: ["True", "False"], correct: 1 },
  { question: "Where are the absolute laws of the Bazaar DAO enforced?", options: ["On-chain via Soroban Smart Contracts", "In a central SQL database", "By Discord Moderators", "On a local Node.js server"], correct: 0 },
  { question: "What is the penalty under the 1-Strike Vanish Protocol?", options: ["A temporary suspension", "A small Pi fine", "Permanent exile from the MESH", "A warning email"], correct: 2 },
  { question: "True or False: Pi Network relies on energy-intensive mining rings.", options: ["True", "False"], correct: 1 },
  { question: "Who holds the ultimate authority over the DAO's treasury?", options: ["The Founders", "The Pi Core Team", "The Community via on-chain voting", "The Lead Developer"], correct: 2 },
  { question: "Once compiled, what format does the Rust smart contract take?", options: [".exe", ".wasm (WebAssembly)", ".js", ".json"], correct: 1 },
  { question: "What is required to prove a citizen's identity uniquely on the network?", options: ["An email address", "A Pi Wallet Public Key", "A username and password", "A physical ID card"], correct: 1 },
  { question: "If a merchant sells goods off-chain to avoid the 20% mandate, what happens?", options: ["Nothing", "They are warned", "They trigger the Vanish Protocol", "Their fees increase"], correct: 2 },
];

export default function Academy() {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // --- DIAGNOSTIC LOGGING ---
  useEffect(() => {
    console.log(`[STATE UPDATE] Step: ${currentStep} | Score: ${score} | Finished: ${isFinished}`);
  }, [currentStep, score, isFinished]);

  const handleAnswer = (selectedIndex: number) => {
    console.log(`[USER INPUT] Selected Option: ${selectedIndex}`);
    
    // ARMORED STATE: Using functional updates (prev => prev + 1) prevents race conditions 
    // when a user spams the button faster than React can batch the updates.
    if (selectedIndex === QUESTIONS[currentStep].correct) {
      setScore((prev) => prev + 1);
    }

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  // --- THE CHAOS ENGINE ---
  const runChaosTest = () => {
    console.warn("⚠️ [ CHAOS ENGINE INITIATED: SPAMMING UI ]");
    let localStep = currentStep;
    
    const stressInterval = setInterval(() => {
      if (localStep >= QUESTIONS.length - 1) {
        clearInterval(stressInterval);
        console.warn("✅ [ CHAOS ENGINE TERMINATED: LIMIT REACHED ]");
        return;
      }
      
      // Simulate a random physical button click every 30 milliseconds
      const randomClick = Math.floor(Math.random() * 4);
      const btn = document.getElementById(`btn-option-${randomClick}`);
      if (btn) btn.click();
      
      localStep++;
    }, 30); 
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24 bg-black text-gray-200 font-mono">
      <div className="w-full max-w-4xl flex flex-col gap-8 z-10">
        
        <Link href="/" className="text-purple-500 hover:text-purple-400 text-sm tracking-widest uppercase mb-8 inline-block w-fit transition-colors">
          &lt; Return to Mesh
        </Link>

        <div className="border-b border-purple-500/30 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter text-purple-400 uppercase">Vanguard Academy</h1>
            <p className="text-sm text-gray-500 mt-2 tracking-widest">[ PROTOCOL: 10-QUESTION GATEKEEPER ]</p>
          </div>
          
          {/* Developer Chaos Button */}
          {!isFinished && (
            <button onClick={runChaosTest} className="text-xs bg-red-900/30 text-red-500 border border-red-500/50 px-3 py-1 hover:bg-red-600/50 transition-all uppercase tracking-widest">
              [ Init Chaos Test ]
            </button>
          )}
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-sm min-h-100 flex flex-col items-center justify-center relative overflow-hidden">
          {!isFinished ? (
            <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-purple-400 text-sm mb-4 tracking-widest">QUESTION {currentStep + 1} OF 10</p>
              <h2 className="text-2xl font-semibold mb-8 text-white">{QUESTIONS[currentStep].question}</h2>
              
              <div className="flex flex-col gap-4">
                {QUESTIONS[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    id={`btn-option-${index}`}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left px-6 py-4 border border-zinc-700 bg-zinc-800/50 hover:bg-purple-900/40 hover:border-purple-500/50 transition-all text-zinc-300 hover:text-white rounded-sm uppercase text-sm tracking-wide"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center animate-in zoom-in duration-500">
              <h2 className="text-4xl font-bold mb-4 text-white uppercase tracking-widest">Protocol Complete</h2>
              <p className="text-xl text-zinc-400 mb-8">
                Final Score: <span className={score >= 8 ? "text-green-500" : "text-red-500"}>{score} / 10</span>
              </p>
              <button 
                onClick={() => {setCurrentStep(0); setScore(0); setIsFinished(false); console.clear();}}
                className="mt-6 px-6 py-2 border border-purple-500/50 hover:bg-purple-900/40 text-purple-400 text-sm uppercase tracking-widest transition-all"
              >
                Reboot Protocol
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}