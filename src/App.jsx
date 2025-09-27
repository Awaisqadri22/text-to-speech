import React, { useState, useEffect } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [selectedAccent, setSelectedAccent] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Auto-select first available voice
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0]);
      }
    };
    
    loadVoices();
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [selectedVoice]);

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
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  // Helper function to categorize voices
  const getVoiceGender = (voiceName) => {
    const name = voiceName.toLowerCase();
    const femaleNames = ['female', 'woman', 'samantha', 'victoria', 'alex', 'karen', 'moira', 'tessa', 'fiona', 'kate', 'susan'];
    const maleNames = ['male', 'man', 'daniel', 'thomas', 'oliver', 'fred', 'albert', 'ralph', 'bruce'];
    
    if (femaleNames.some(n => name.includes(n))) return 'Female';
    if (maleNames.some(n => name.includes(n))) return 'Male';
    return 'Unknown';
  };

  // Helper function to get accent/region from language code
  const getAccent = (lang) => {
    const accents = {
      'en-US': 'American',
      'en-GB': 'British',
      'en-AU': 'Australian',
      'en-CA': 'Canadian',
      'en-IN': 'Indian',
      'en-IE': 'Irish',
      'en-ZA': 'South African',
      'es-ES': 'Spanish',
      'es-MX': 'Mexican',
      'fr-FR': 'French',
      'fr-CA': 'Canadian French',
      'de-DE': 'German',
      'it-IT': 'Italian',
      'pt-BR': 'Brazilian',
      'ja-JP': 'Japanese',
      'ko-KR': 'Korean',
      'zh-CN': 'Chinese (Mandarin)',
      'ru-RU': 'Russian',
      'ar-SA': 'Arabic',
      'hi-IN': 'Hindi',
      'nl-NL': 'Dutch',
      'sv-SE': 'Swedish',
      'no-NO': 'Norwegian',
      'da-DK': 'Danish',
      'fi-FI': 'Finnish'
    };
    return accents[lang] || lang;
  };

  // Group voices by accent/language
  const groupedVoices = voices.reduce((acc, voice) => {
    const accent = getAccent(voice.lang);
    if (!acc[accent]) acc[accent] = [];
    acc[accent].push(voice);
    return acc;
  }, {});

  // Get unique accents for filter
  const availableAccents = Object.keys(groupedVoices).sort();

  // Filter voices based on selected criteria
  const filteredVoices = voices.filter(voice => {
    const accent = getAccent(voice.lang);
    const gender = getVoiceGender(voice.name);
    
    const accentMatch = selectedAccent === 'All' || accent === selectedAccent;
    const genderMatch = selectedGender === 'All' || gender === selectedGender;
    
    return accentMatch && genderMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🎙️</div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Text to Speech
          </h1>
          <p className="text-gray-300 text-sm">
            Transform your words into speech
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20">
          {/* Accent and Gender Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Accent Filter */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                🌍 Accent/Language
              </label>
              <select
                value={selectedAccent}
                onChange={(e) => {
                  setSelectedAccent(e.target.value);
                  // Reset voice selection when filter changes
                  setSelectedVoice(null);
                }}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white text-sm"
              >
                <option value="All" className="bg-gray-800 text-white">All Accents</option>
                {availableAccents.map((accent) => (
                  <option key={accent} value={accent} className="bg-gray-800 text-white">
                    {accent} ({groupedVoices[accent].length})
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                👤 Gender
              </label>
              <select
                value={selectedGender}
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                  // Reset voice selection when filter changes
                  setSelectedVoice(null);
                }}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white text-sm"
              >
                <option value="All" className="bg-gray-800 text-white">All Genders</option>
                <option value="Female" className="bg-gray-800 text-white">Female</option>
                <option value="Male" className="bg-gray-800 text-white">Male</option>
                <option value="Unknown" className="bg-gray-800 text-white">Unknown</option>
              </select>
            </div>
          </div>

          {/* Voice Selection */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-3">
              🎤 Voice Selection ({filteredVoices.length} available)
            </label>
            <select
              value={selectedVoice?.name || ''}
              onChange={(e) => {
                const voice = voices.find(v => v.name === e.target.value);
                setSelectedVoice(voice);
              }}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white text-sm"
              disabled={filteredVoices.length === 0}
            >
              {filteredVoices.length === 0 ? (
                <option className="bg-gray-800 text-white">No voices match your criteria</option>
              ) : (
                <>
                  <option value="" className="bg-gray-800 text-white">Select a voice...</option>
                  {filteredVoices.map((voice, index) => (
                    <option key={index} value={voice.name} className="bg-gray-800 text-white">
                      {voice.name} ({getVoiceGender(voice.name)}) - {getAccent(voice.lang)}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          {/* Quick Accent Shortcuts */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-3">
              🌟 Popular Accents
            </label>
            <div className="flex flex-wrap gap-2">
              {['American', 'British', 'Australian', 'Indian', 'Irish'].map((accent) => (
                groupedVoices[accent] && (
                  <button
                    key={accent}
                    onClick={() => {
                      setSelectedAccent(accent);
                      setSelectedVoice(null);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      selectedAccent === accent
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/20 text-gray-300 hover:bg-white/30 hover:text-white'
                    }`}
                  >
                    {accent} ({groupedVoices[accent].length})
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Voice Controls */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Rate Control */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Speed: {rate.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Pitch Control */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Pitch: {pitch.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Text Area */}
          <div className="mb-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to speak..."
              rows={4}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none transition-all duration-200 text-white placeholder-gray-400 text-sm"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400">
                {text.length} characters
              </span>
              {text.trim() && (
                <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                  Ready
                </span>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={speak}
              disabled={!text.trim() || !selectedVoice}
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                isSpeaking
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : text.trim() && selectedVoice
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isSpeaking ? (
                <>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  Stop
                </>
              ) : (
                <>
                  <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                  Speak
                </>
              )}
            </button>
            
            <button
              onClick={() => setText("")}
              className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-200 border border-white/30 hover:border-white/50 rounded-lg"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs">
            Powered by Web Speech API • {voices.length} voices • {availableAccents.length} accents
          </p>
          {selectedVoice && (
            <p className="text-purple-300 text-xs mt-1">
              Selected: {selectedVoice.name} ({getAccent(selectedVoice.lang)})
            </p>
          )}
        </div>
      </div>
      
      {/* Custom CSS for sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #a855f7;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #a855f7;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .slider::-webkit-slider-track {
          background: rgba(255,255,255,0.2);
          border-radius: 5px;
        }
        
        .slider::-moz-range-track {
          background: rgba(255,255,255,0.2);
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}