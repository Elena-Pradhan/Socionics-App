import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const questions = [
  {
    question: "Do you prefer to plan everything or go with the flow?",
    options: ["Plan everything", "Go with the flow"],
  },
  {
    question: "Do you rely more on facts or intuition?",
    options: ["Facts", "Intuition"],
  },
  {
    question: "Are you energized by social interaction or solitude?",
    options: ["Social interaction", "Solitude"],
  },
  {
    question: "Do you make decisions based on logic or feelings?",
    options: ["Logic", "Feelings"],
  },
];

export default function SocioMatchApp() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: "", bio: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setStep(questions.length);
    }
  };

  const handleSubmit = () => {
    // A basic logic to mock personality typing
    let type = "LII";
    if (answers.includes("Go with the flow")) type = "IEE";
    if (answers.includes("Social interaction")) type = "EIE";
    if (answers.includes("Feelings")) type = "EII";
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <motion.h1 className="text-2xl font-bold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>SocioMatch Personality Quiz</motion.h1>

      {!submitted ? (
        <Card className="p-4 mb-4">
          <CardContent>
            {step < questions.length ? (
              <div>
                <p className="text-lg font-medium mb-2">{questions[step].question}</p>
                <div className="grid gap-2">
                  {questions[step].options.map((opt, idx) => (
                    <Button key={idx} onClick={() => handleAnswer(opt)}>{opt}</Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-3">
                <Input
                  placeholder="Enter your name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                />
                <Textarea
                  placeholder="Tell us about yourself"
                  value={userInfo.bio}
                  onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
                />
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="p-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Thank you, {userInfo.name}!</h2>
            <p className="mb-2">Based on your answers, your preliminary socionics type is <strong>{answers.includes("Go with the flow") ? (answers.includes("Social interaction") ? "IEE" : "IEI") : "LII"}</strong>.</p>
            <p className="text-sm text-muted-foreground">We'll use this to find compatible matches for you. Stay tuned!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
