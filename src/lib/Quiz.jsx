import React, { useState, useEffect, useCallback } from 'react';
import Core from './Core';
import {defaultLocale} from './Locale';
import 'bootstrap/dist/css/bootstrap.min.css';

const Quiz = function ({
  quiz, shuffle, showDefaultResult, onComplete, customResultPage, showInstantFeedback, continueTillCorrect,
}) {
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState(quiz.questions);
  const nrOfQuestions = (quiz.nrOfQuestions && quiz.nrOfQuestions < quiz.questions.length) ? quiz.nrOfQuestions : quiz.questions.length;


  const shuffleQuestions = useCallback((q) => {
    for (let i = nrOfQuestions - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [q[i], q[j]] = [q[j], q[i]];
    }
    q.length = nrOfQuestions;
    return q;
  }, []);

  useEffect(() => {
    if (shuffle) {
      setQuestions(shuffleQuestions(quiz.questions));
    } else {
      quiz.questions.length = nrOfQuestions;
      setQuestions(quiz.questions);
    }

    setQuestions(questions.map((question, index) => ({
      ...question,
      questionIndex: index + 1,
    })));
  }, [start]);

  const validateQuiz = (q) => {
    if (!q) {
      console.error('Quiz object is required.');
      return false;
    }

    for (let i = 0; i < questions.length; i += 1) {
      const {
        question, questionType, answerSelectionType, answers, correctAnswer,
      } = questions[i];
      if (!question) {
        console.error("Field 'question' is required.");
        return false;
      }

      if (!questionType) {
        console.error("Field 'questionType' is required.");
        return false;
      }
      if (questionType !== 'text' && questionType !== 'photo') {
        console.error("The value of 'questionType' is either 'text' or 'photo'.");
        return false;
      }

      if (!answers) {
        console.error("Field 'answers' is required.");
        return false;
      }
      if (!Array.isArray(answers)) {
        console.error("Field 'answers' has to be an Array");
        return false;
      }

      if (!correctAnswer) {
        console.error("Field 'correctAnswer' is required.");
        return false;
      }

      let selectType = answerSelectionType;

      if (!answerSelectionType) {
        // Default single to avoid code breaking due to automatic version upgrade
        selectType = answerSelectionType || 'single';
      }

      if (selectType === 'single' && !(typeof selectType === 'string' || selectType instanceof String)) {
        console.error('answerSelectionType is single but expecting String in the field correctAnswer');
        return false;
      }

      if (selectType === 'multiple' && !Array.isArray(correctAnswer)) {
        console.error('answerSelectionType is multiple but expecting Array in the field correctAnswer');
        return false;
      }
    }

    return true;
  };

  if (!validateQuiz(quiz)) {
    return (null);
  }

  const appLocale = {
    ...defaultLocale,
    ...quiz.appLocale,
  };

  return (
    <div className="react-quiz-container jumbotron">
      {!start
          && (
          <div className='react-quiz'>
            <div key={0} className='quiz-header'>
              <h1 key={1} >{quiz.quizTitle}</h1>
            </div>
            <div>{appLocale.landingHeaderText.replace('<questionLength>', nrOfQuestions)}</div>
            {quiz.quizSynopsis
              && (
              <div className="quiz-synopsis">
                {quiz.quizSynopsis}
              </div>
              )}
            <div className="startQuizWrapper">
              <button onClick={() => setStart(true)} className="startQuizBtn btn btn-lg">{appLocale.startQuizBtn}</button>
            </div>
          </div>
          )}

      {start && (
        <Core
          questions={questions}
          showDefaultResult={showDefaultResult}
          onComplete={onComplete}
          customResultPage={customResultPage}
          showInstantFeedback={showInstantFeedback}
          continueTillCorrect={continueTillCorrect}
          appLocale={appLocale}
        />
      )}
    </div>
  );
};
export default Quiz;
