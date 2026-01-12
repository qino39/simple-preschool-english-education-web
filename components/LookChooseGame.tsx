
import React, { useState, useEffect } from 'react';

interface QuizQuestion {
  id: number;
  image: string;
  correctWord: string;
  options: string[];
}

const QUESTIONS: QuizQuestion[] = [
  { id: 1, image: '🍎', correctWord: 'Apple', options: ['Banana', 'Apple', 'Orange'] },
  { id: 2, image: '🐶', correctWord: 'Dog', options: ['Cat', 'Dog', 'Bird'] },
  { id: 3, image: '🚗', correctWord: 'Car', options: ['Bike', 'Plane', 'Car'] },
  { id: 4, image: '🌞', correctWord: 'Sun', options: ['Moon', 'Sun', 'Cloud'] },
  { id: 5, image: '🍦', correctWord: 'Ice Cream', options: ['Cake', 'Candy', 'Ice Cream'] },
  { id: 6, image: '🐘', correctWord: 'Elephant', options: ['Elephant', 'Lion', 'Monkey'] },
];

interface Props {
  onFinish: () => void;
}

const LookChooseGame: React.FC<Props> = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(option);
    const correct = option === currentQuestion.correctWord;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  if (showResult) {
    return (
      <div className="bg-white rounded-[3rem] p-10 shadow-2xl text-center border-8 border-yellow-200">
        <h2 className="text-5xl mb-4">🎉</h2>
        <h3 className="text-3xl font-bold text-orange-600 mb-2">Wonderful Job!</h3>
        <p className="text-xl text-gray-600 mb-6">You got {score} out of {QUESTIONS.length}!</p>
        <button 
          onClick={onFinish}
          className="bg-orange-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-orange-600 transition-colors shadow-lg"
        >
          Back to Map
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-4 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-green-400 h-full transition-all duration-500" 
          style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white rounded-[3rem] p-8 shadow-xl border-4 border-blue-100 flex flex-col items-center">
        <div className="text-9xl mb-10 transform hover:scale-110 transition-transform cursor-default">
          {currentQuestion.image}
        </div>

        <div className="grid grid-cols-1 gap-4 w-full">
          {currentQuestion.options.map((option) => {
            let bgColor = 'bg-blue-50 hover:bg-blue-100 border-blue-200';
            if (selectedOption === option) {
              bgColor = option === currentQuestion.correctWord 
                ? 'bg-green-500 text-white border-green-600 animate-bounce' 
                : 'bg-red-500 text-white border-red-600';
            }

            return (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
                className={`w-full py-5 rounded-3xl text-2xl font-bold border-4 transition-all ${bgColor} ${
                  selectedOption === null ? 'active:scale-95' : ''
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="mt-8 h-8">
          {isCorrect === true && <span className="text-2xl font-bold text-green-500">Correct! 🌟</span>}
          {isCorrect === false && <span className="text-2xl font-bold text-red-500">Oops! Try next time! 💪</span>}
        </div>
      </div>
    </div>
  );
};

export default LookChooseGame;
