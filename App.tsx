
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import ChatBuddy from './components/ChatBuddy';
import LookChooseGame from './components/LookChooseGame';
import { LessonCard, VocabularyItem } from './types';

const LESSONS: LessonCard[] = [
  { id: 'alphabet', title: 'ABC Letters', image: 'https://picsum.photos/seed/abc/300/200', color: 'bg-pink-400', path: 'alphabet' },
  { id: 'animals', title: 'Animal Friends', image: 'https://picsum.photos/seed/lion/300/200', color: 'bg-blue-400', path: 'animals' },
  { id: 'quiz', title: 'Look & Choose', image: 'https://picsum.photos/seed/quiz/300/200', color: 'bg-indigo-400', path: 'quiz' },
  { id: 'colors', title: 'Magic Colors', image: 'https://picsum.photos/seed/colors/300/200', color: 'bg-green-400', path: 'colors' },
  { id: 'chat', title: 'Talk to Sunny', image: 'https://picsum.photos/seed/sun/300/200', color: 'bg-yellow-400', path: 'chat' },
];

const ANIMAL_VOCAB: VocabularyItem[] = [
  { word: 'Lion', translation: '狮子', image: '🦁', pronunciation: 'Lie-un' },
  { word: 'Elephant', translation: '大象', image: '🐘', pronunciation: 'El-e-fant' },
  { word: 'Monkey', translation: '猴子', image: '🐒', pronunciation: 'Mun-key' },
  { word: 'Tiger', translation: '老虎', image: '🐯', pronunciation: 'Tie-ger' },
  { word: 'Cat', translation: '小猫', image: '🐱', pronunciation: 'Kat' },
  { word: 'Dog', translation: '小狗', image: '🐶', pronunciation: 'Dog' },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type ViewState = 'home' | 'alphabet' | 'animals' | 'colors' | 'chat' | 'quiz';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 px-4 max-w-6xl mx-auto">
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center mb-6">
              <h1 className="text-4xl font-bold text-orange-600 mb-2">Welcome, Friend! 👋</h1>
              <p className="text-xl text-gray-600">Pick an adventure and let's play!</p>
            </div>
            {LESSONS.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentView(lesson.path as ViewState)}
                className={`${lesson.color} p-6 rounded-[2rem] text-white shadow-xl hover:scale-105 transition-transform flex flex-col items-center gap-4 group`}
              >
                <div className="w-full relative overflow-hidden rounded-2xl h-40">
                    <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover shadow-md border-4 border-white/50 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="text-3xl font-bold">{lesson.title}</span>
                <span className="bg-white/20 px-4 py-1 rounded-full text-sm group-hover:bg-white/30 font-bold">Start Now →</span>
              </button>
            ))}
          </div>
        );

      case 'quiz':
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
             <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-indigo-600">Look & Choose 🧐</h2>
              <button onClick={() => setCurrentView('home')} className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-500 font-bold hover:bg-gray-50 transition-colors">← Back</button>
            </div>
            <LookChooseGame onFinish={() => setCurrentView('home')} />
          </div>
        );

      case 'alphabet':
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-pink-600">A B C Letters 🔠</h2>
              <button onClick={() => setCurrentView('home')} className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-500 font-bold hover:bg-gray-50 transition-colors">← Back</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {ALPHABET.map((char) => (
                <div key={char} className="bg-white border-4 border-pink-100 p-8 rounded-3xl text-center shadow-lg hover:bg-pink-50 cursor-pointer transform hover:scale-110 transition-all">
                  <span className="text-5xl font-bold text-pink-500">{char}</span>
                  <p className="mt-2 text-pink-300 font-bold uppercase">{char.toLowerCase()}{char.toLowerCase()}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'animals':
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
             <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-blue-600">Animal Friends 🦒</h2>
              <button onClick={() => setCurrentView('home')} className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-500 font-bold hover:bg-gray-50 transition-colors">← Back</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {ANIMAL_VOCAB.map((item) => (
                <div key={item.word} className="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center gap-2 border-4 border-blue-100 hover:rotate-2 transition-transform">
                  <span className="text-8xl">{item.image}</span>
                  <h3 className="text-3xl font-bold text-blue-600">{item.word}</h3>
                  <p className="text-xl text-gray-400 font-medium">{item.translation}</p>
                  <div className="bg-blue-50 px-4 py-1 rounded-full text-blue-400 font-bold mt-2">
                    {item.pronunciation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'colors':
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-green-600">Magic Colors 🌈</h2>
              <button onClick={() => setCurrentView('home')} className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-500 font-bold hover:bg-gray-50 transition-colors">← Back</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { name: 'Red', hex: 'bg-red-500', icon: '🍎' },
                { name: 'Blue', hex: 'bg-blue-500', icon: '🌊' },
                { name: 'Yellow', hex: 'bg-yellow-400', icon: '⭐' },
                { name: 'Green', hex: 'bg-green-500', icon: '🌳' },
                { name: 'Purple', hex: 'bg-purple-500', icon: '🍇' },
                { name: 'Orange', hex: 'bg-orange-500', icon: '🥕' },
              ].map(color => (
                <div key={color.name} className={`${color.hex} h-40 rounded-[2.5rem] shadow-2xl flex items-center justify-center gap-4 text-white hover:scale-105 transition-transform border-8 border-white`}>
                  <span className="text-6xl">{color.icon}</span>
                  <span className="text-5xl font-extrabold drop-shadow-lg">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="max-w-2xl mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-yellow-600">Sunny's Chat Corner 💬</h2>
              <button onClick={() => setCurrentView('home')} className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-500 font-bold hover:bg-gray-50 transition-colors">← Back</button>
            </div>
            <ChatBuddy />
            <p className="mt-6 text-center text-gray-500 italic">
              "Try saying: Hello! / What is your name? / I like cats!"
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <NavBar onHome={() => setCurrentView('home')} />
      <main>
        {renderContent()}
      </main>
      
      {/* Floating Action Button (Only on Home) */}
      {currentView === 'home' && (
        <button 
          onClick={() => setCurrentView('chat')}
          className="fixed bottom-8 right-8 bg-yellow-400 w-20 h-20 rounded-full shadow-2xl flex items-center justify-center text-4xl animate-bounce border-4 border-white z-50 hover:scale-110 active:scale-95 transition-all"
        >
          ☀️
        </button>
      )}
    </div>
  );
};

export default App;
