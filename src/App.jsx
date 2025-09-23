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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-4xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
            🎤 Text to Speech
          </h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg font-medium">
            Type your message and let the AI speak it for you
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20">
          {/* Text Area */}
          <div className="mb-4 sm:mb-6">
            <label htmlFor="text-input" className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
              Enter your text:
            </label>
            <textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something amazing to hear it spoken..."
              rows={4}
              className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gradient-to-r from-purple-300 to-pink-300 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 resize-none transition-all duration-300 text-gray-700 placeholder-gray-400 text-sm sm:text-base shadow-inner"
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
              }}
            />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-1 sm:gap-0">
              <span className="text-xs sm:text-sm text-gray-500 font-medium">
                {text.length} characters
              </span>
              {text.length > 0 && (
                <span className="text-xs sm:text-sm text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
                  ✨ Ready to speak
                </span>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={speak}
              disabled={!text.trim()}
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 transform hover:scale-105 active:scale-95 ${
                isSpeaking
                  ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
                  : text.trim()
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSpeaking ? (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Stop Speaking</span>
                  <span className="sm:hidden">Stop</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.793a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Speak Text</span>
                  <span className="sm:hidden">Speak</span>
                </>
              )}
            </button>
            
            <button
              onClick={() => setText("")}
              className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-gray-600 hover:text-gray-800 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 transition-all duration-300 border-2 border-gray-300 hover:border-gray-400 transform hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Clear Text</span>
              <span className="sm:hidden">Clear</span>
            </button>
          </div>

          {/* Features */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gradient-to-r from-purple-200 to-pink-200">
            <h3 className="text-sm sm:text-base font-bold text-gray-700 mb-3 sm:mb-4">✨ Features:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-lg">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Real-time speech synthesis</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 p-2 rounded-lg">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse animation-delay-1000"></div>
                <span className="font-medium">Stop/start control</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded-lg">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse animation-delay-2000"></div>
                <span className="font-medium">Character counter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-white/80 text-xs sm:text-sm font-medium drop-shadow">
            Powered by Web Speech API
          </p>
        </div>
      </div>
    </div>
  );
}