
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

const CopyButton = ({ text, className = '' }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text.trim()) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`group relative p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 
                 border border-green-500/20 hover:border-green-400/40 
                 transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
      disabled={!text.trim()}
    >
      <div className="relative flex items-center justify-center w-5 h-5">
        <Copy 
          className={`absolute transition-all duration-200 ${
            copied ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          } ${!text.trim() ? 'text-gray-600' : 'text-green-400 group-hover:text-green-300'}`} 
          size={16} 
        />
        <Check 
          className={`absolute transition-all duration-200 ${
            copied ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          } text-green-300`} 
          size={16} 
        />
      </div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-lg bg-green-400/20 blur-sm transition-opacity duration-200 ${
        copied ? 'opacity-100' : 'opacity-0'
      }`} />
    </button>
  );
};

export default CopyButton;
