import React from 'react';
import CodeBlock from './CodeBlock';
import QuestionsList from './QuestionsList';

const TopicContent = ({ topic }) => {
  return (
    <div className="topic-section">
      <h2 className="topic-title">{topic.title}</h2>
      
      <div className="explanation">
        {topic.explanation}
      </div>

      {topic.keyPoints && (
        <div className="key-points">
          <h4>Key Points:</h4>
          <ul>
            {topic.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {topic.codeExamples && topic.codeExamples.length > 0 && (
        <div>
          <h3 className="section-title">Code Examples</h3>
          {topic.codeExamples.map((example, index) => (
            <div key={index}>
              <h4 style={{ margin: '20px 0 10px 0', color: '#bbb' }}>{example.title}</h4>
              <CodeBlock code={example.code} language={example.language} />
            </div>
          ))}
        </div>
      )}

      {topic.questions && topic.questions.length > 0 && (
        <div>
          <h3 className="section-title">Interview Questions ({topic.questions.length})</h3>
          <QuestionsList questions={topic.questions} />
        </div>
      )}
    </div>
  );
};

export default TopicContent;