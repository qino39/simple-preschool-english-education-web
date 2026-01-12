
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBuddy: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I am Sunny! ☀️ Want to learn some English with me? What's your name?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await geminiService.sendMessage(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-[500px] border-4 border-yellow-200">
      <div className="bg-yellow-400 p-4 text-white flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-inner">☀️</div>
        <div>
          <h3 className="font-bold">Sunny the Buddy</h3>
          <p className="text-xs">Always Happy to Help!</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-orange-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-lg ${
              msg.role === 'user' 
                ? 'bg-orange-500 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 shadow-sm border border-yellow-100 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl shadow-sm italic text-gray-400 animate-pulse">
              Sunny is thinking... 💭
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-yellow-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type here..."
          className="flex-1 bg-yellow-50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-yellow-400 text-white px-6 py-2 rounded-full font-bold hover:bg-yellow-500 transition-colors disabled:opacity-50"
        >
          Go!
        </button>
      </div>
    </div>
  );
};

export default ChatBuddy;
