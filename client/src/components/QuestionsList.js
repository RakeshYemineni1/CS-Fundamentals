import React, { useState } from 'react';

const QuestionsList = ({ questions }) => {
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  const toggleQuestion = (index) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  return (
    <ul className="questions-list">
      {questions.map((question, index) => (
        <li key={index} className="question-item" onClick={() => toggleQuestion(index)}>
          <div className="question-text">
            Q{index + 1}: {question.question}
          </div>
          <div className={`answer ${expandedQuestions.has(index) ? '' : 'hidden'}`}>
            <strong>Answer:</strong> {question.answer}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default QuestionsList;