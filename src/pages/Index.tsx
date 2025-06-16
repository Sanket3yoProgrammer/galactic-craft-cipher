
import { useState, useEffect } from 'react';
import { ArrowRightLeft, Github, Sparkles } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import CopyButton from '../components/CopyButton';
import { convertToSGA, convertToEnglish, isValidSGA } from '../utils/sgaConverter';
import { useToast } from '../hooks/use-toast';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [mode, setMode] = useState<'toSGA' | 'toEnglish'>('toSGA');
  const { toast } = useToast();

  const handleConvert = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to convert",
        variant: "destructive"
      });
      return;
    }

    setIsConverting(true);
    
    // Simulate typing animation delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let result = '';
    if (mode === 'toSGA') {
      result = convertToSGA(inputText);
    } else {
      result = convertToEnglish(inputText);
    }
    
    // Animate typing effect
    setOutputText('');
    for (let i = 0; i <= result.length; i++) {
      setTimeout(() => {
        setOutputText(result.slice(0, i));
        if (i === result.length) setIsConverting(false);
      }, i * 30);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'toSGA' ? 'toEnglish' : 'toSGA');
    setInputText(outputText);
    setOutputText(inputText);
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
  };

  // Auto-detect and suggest mode change
  useEffect(() => {
    if (inputText && mode === 'toSGA' && isValidSGA(inputText)) {
      toast({
        title: "SGA Detected!",
        description: "It looks like you entered SGA text. Switch to SGA → English mode?",
      });
    }
  }, [inputText, mode, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-green-400 relative overflow-hidden">
      <ParticleBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 text-center border-b border-green-500/20">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="text-green-400" size={24} />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              SGA CONVERTER
            </h1>
            <Sparkles className="text-green-400" size={24} />
          </div>
          <p className="text-green-400/80 text-sm md:text-base font-mono">
            ⟨ MINECRAFT STANDARD GALACTIC ALPHABET TRANSLATOR ⟩
          </p>
        </header>

        {/* Converter Interface */}
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl mx-auto">
            {/* Mode Toggle */}
            <div className="flex justify-center mb-8">
              <button
                onClick={toggleMode}
                className="group flex items-center gap-3 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 
                         border border-green-500/30 hover:border-green-400/50 rounded-lg 
                         transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span className="font-mono text-green-400">
                  {mode === 'toSGA' ? 'ENGLISH → SGA' : 'SGA → ENGLISH'}
                </span>
                <ArrowRightLeft 
                  className="text-green-400 group-hover:rotate-180 transition-transform duration-300" 
                  size={18} 
                />
              </button>
            </div>

            {/* Converter Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-mono text-green-400">
                    {mode === 'toSGA' ? '⟨ ENGLISH INPUT ⟩' : '⟨ SGA INPUT ⟩'}
                  </h2>
                  <CopyButton text={inputText} />
                </div>
                
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={mode === 'toSGA' ? 'Enter English text...' : 'Enter SGA text...'}
                    className="w-full h-40 p-4 bg-gray-900/50 border border-green-500/30 
                             rounded-lg text-green-400 placeholder-green-400/50 
                             focus:border-green-400/70 focus:outline-none focus:ring-2 
                             focus:ring-green-400/20 resize-none font-mono text-lg
                             backdrop-blur-sm transition-all duration-200"
                    style={{ fontFamily: mode === 'toSGA' ? 'monospace' : 'monospace' }}
                  />
                  
                  {/* Character count */}
                  <div className="absolute bottom-2 right-2 text-xs text-green-400/60 font-mono">
                    {inputText.length} chars
                  </div>
                </div>
              </div>

              {/* Output Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-mono text-green-400">
                    {mode === 'toSGA' ? '⟨ SGA OUTPUT ⟩' : '⟨ ENGLISH OUTPUT ⟩'}
                  </h2>
                  <CopyButton text={outputText} />
                </div>
                
                <div className="relative">
                  <div className="w-full h-40 p-4 bg-gray-900/80 border border-green-500/30 
                                rounded-lg text-green-400 font-mono text-lg backdrop-blur-sm
                                overflow-auto whitespace-pre-wrap">
                    {isConverting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full" />
                        <span className="text-green-400/70">Converting...</span>
                      </div>
                    ) : (
                      <span className={outputText ? 'text-green-400' : 'text-green-400/40'}>
                        {outputText || 'Converted text will appear here...'}
                      </span>
                    )}
                    
                    {/* Typing cursor */}
                    {isConverting && (
                      <span className="animate-pulse text-green-400">▋</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                onClick={handleConvert}
                disabled={isConverting || !inputText.trim()}
                className="group flex items-center gap-2 px-8 py-3 bg-green-600/20 hover:bg-green-600/30 
                         border border-green-500/50 hover:border-green-400 rounded-lg 
                         text-green-400 font-mono font-bold transition-all duration-200 
                         hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                         disabled:hover:scale-100 shadow-lg hover:shadow-green-400/20"
              >
                <Sparkles className="group-hover:animate-spin" size={18} />
                {isConverting ? 'CONVERTING...' : 'CONVERT'}
              </button>
              
              <button
                onClick={clearAll}
                className="px-6 py-3 bg-gray-800/50 hover:bg-red-600/20 
                         border border-gray-600/50 hover:border-red-500/50 rounded-lg 
                         text-gray-400 hover:text-red-400 font-mono transition-all duration-200 
                         hover:scale-105 active:scale-95"
              >
                CLEAR ALL
              </button>
            </div>

            {/* Info Panel */}
            <div className="mt-8 p-4 bg-gray-900/30 border border-green-500/20 rounded-lg backdrop-blur-sm">
              <p className="text-green-400/70 text-sm font-mono text-center">
                💡 TIP: The Standard Galactic Alphabet is used in Minecraft's enchanting table interface
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 border-t border-green-500/20 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-green-400/80 font-mono text-sm">
              ⟨ MADE BY SANKETYOPROGRAMMER ⟩
            </p>
            <a
              href="https://github.com/Sanket3YoProgrammer"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-gray-800/50 
                       hover:bg-gray-700/50 border border-green-500/30 
                       hover:border-green-400/50 rounded-lg transition-all duration-200 
                       hover:scale-105 active:scale-95"
            >
              <Github className="text-green-400 group-hover:text-white transition-colors" size={16} />
              <span className="text-green-400 font-mono text-sm">GITHUB</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
