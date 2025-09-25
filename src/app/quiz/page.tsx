
'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
    answer: "Blue Whale",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    answer: "William Shakespeare",
  },
  {
    question: "What is the chemical symbol for Gold?",
    options: ["Au", "Ag", "Go", "Gd"],
    answer: "Au",
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
        setIsCorrect(false);
    }

    setTimeout(() => {
        setIsCorrect(null);
        setSelectedOption('');
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption('');
    setScore(0);
    setShowResult(false);
  };
  
  const getOptionClass = (option: string) => {
    if (isCorrect === null) return '';
    if (option === questions[currentQuestion].answer) return 'bg-green-200 border-green-400';
    if (option === selectedOption) return 'bg-red-200 border-red-400';
    return '';
  }


  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <BrainCircuit className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Quiz</h2>
        </div>

        <Card className="max-w-2xl mx-auto">
          {showResult ? (
            <>
              <CardHeader>
                <CardTitle>Quiz Results</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-2xl">
                  You scored {score} out of {questions.length}
                </p>
                <Button onClick={handleRestart}>Try Again</Button>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Question {currentQuestion + 1}/{questions.length}</CardTitle>
                <CardDescription className="text-lg pt-2">{questions[currentQuestion].question}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedOption} onValueChange={setSelectedOption} disabled={isCorrect !== null}>
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${getOptionClass(option)}`}>
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <Button onClick={handleNext} disabled={!selectedOption || isCorrect !== null}>
                  {isCorrect !== null ? (isCorrect ? 'Correct!' : 'Incorrect') : 'Submit'}
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}
