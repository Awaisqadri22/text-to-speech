import React, { useState,useEffect } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Load voices when component mounts
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log("Available voices:", voices);
    };
    
    // Load voices immediately
    loadVoices();
    
    // Also load voices when they become available (some browsers load them asynchronously)
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []); // Empty dependency array - run only once on mount

  const speak = () => {
    if (!window.speechSynthesis) {
      alert("Your browser does not support speech synthesis.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000 animate-float animation-delay-1000"></div>
          <div className="absolute top-40 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow animation-delay-4000 animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse-slow animation-delay-1000 animate-float animation-delay-500"></div>
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-pulse-slow animation-delay-3000 animate-float animation-delay-1500"></div>
        </div>
      
      <div className="relative z-10 max-w-5xl w-full mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text mb-6 drop-shadow-2xl animate-text-glow">
            🎤 Text to Speech
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Transform your words into speech with our advanced AI-powered text-to-speech technology
          </p>
        </div>

        {/* Enhanced Main Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 border border-white/20 hover:border-white/30 transition-all duration-500 hover-lift hover:shadow-glow">
          {/* Enhanced Text Area */}
          <div className="mb-8">
            <label htmlFor="text-input" className="block text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">✍️</span>
              <span>Enter your text:</span>
            </label>
            <div className="relative">
              <textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something amazing to hear it spoken aloud..."
                rows={4}
                className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-purple-400/50 focus:border-purple-400 resize-none transition-all duration-300 text-white placeholder-gray-300 text-base sm:text-lg shadow-inner custom-scrollbar focus-glow"
              />
              <div className="absolute top-2 right-2 text-gray-400">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2">
              <span className="text-sm text-gray-400 font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                {text.length} characters
              </span>
              {text.length > 0 && (
                <span className="text-sm text-green-300 font-bold bg-green-500/20 px-4 py-2 rounded-full border border-green-400/30 flex items-center gap-2 animate-shimmer">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-ping-slow"></span>
                  ✨ Ready to speak
                </span>
              )}
            </div>
          </div>

          {/* Enhanced Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={speak}
              disabled={!text.trim()}
              className={`py-2 px-4 sm:py-2 sm:px-4 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 shadow-md hover-lift ${
                isSpeaking
                  ? "bg-gradient-to-r from-red-500 via-pink-500 to-red-600 hover:from-red-600 hover:via-pink-600 hover:to-red-700 text-white"
                  : text.trim()
                  ? "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white"
                  : "bg-gray-500/50 text-gray-400 cursor-not-allowed border border-gray-600"
              }`}
            >
              {isSpeaking ? (
                <>
                  <svg className="w-2.5 h-2.5 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.793a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                  <span>Speak</span>
                </>
              )}
            </button>
            
            <button
              onClick={() => setText("")}
              className="py-2 px-4 rounded-lg font-medium text-sm text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 border border-white/30 hover:border-white/50 transform hover:scale-105 active:scale-95 shadow-md hover-lift"
            >
              <span>Clear</span>
            </button>
          </div>

          {/* Enhanced Features */}
          <div className="pt-8 border-t border-white/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <span>Features</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-400/30 hover:border-green-400/50 transition-all duration-300 hover-lift">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse-slow"></div>
                <span className="font-semibold text-green-300">Real-time speech synthesis</span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-xl border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 hover-lift">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse-slow animation-delay-1000"></div>
                <span className="font-semibold text-blue-300">Stop/start control</span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 hover-lift">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse-slow animation-delay-2000"></div>
                <span className="font-semibold text-purple-300">Character counter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg font-medium drop-shadow-lg gradient-text">
            Powered by Web Speech API
          </p>
        </div>
      </div>
    </div>
  );
}