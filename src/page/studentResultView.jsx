import React from 'react';
import { 
  CheckCircle, XCircle, Award, TrendingUp, 
  ArrowLeft, BarChart3, Target, Book
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function StudentResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get result data from navigation state or props
  const resultData = location.state?.resultData || {
    studentName: "Student",
    score: "0/0",
    percentage: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    details: [],
    snapshot: []
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadgeColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500/20 text-green-300 border-green-500/30';
    if (percentage >= 60) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    return 'bg-red-500/20 text-red-300 border-red-500/30';
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-20 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Result Header */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-500/20 p-8 mb-6">
          <div className="text-center mb-6">
            <div className={`w-24 h-24 mx-auto bg-gradient-to-r ${
              resultData.percentage >= 60 ? 'from-green-500 to-emerald-500' : 'from-red-500 to-rose-500'
            } rounded-full flex items-center justify-center mb-4 shadow-lg`}>
              {resultData.percentage >= 60 ? (
                <CheckCircle className="w-12 h-12 text-white" />
              ) : (
                <XCircle className="w-12 h-12 text-white" />
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Quiz Result
            </h1>
            <p className="text-xl text-gray-400">
              {resultData.studentName}
            </p>
          </div>

          {/* Score Summary */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-900/20 rounded-2xl p-6 border border-blue-500/20 text-center">
              <div className="text-gray-400 text-sm mb-2">Your Score</div>
              <div className={`text-4xl font-bold ${getScoreColor(resultData.percentage)}`}>
                {resultData.percentage}%
              </div>
            </div>

            <div className="bg-blue-900/20 rounded-2xl p-6 border border-blue-500/20 text-center">
              <div className="text-gray-400 text-sm mb-2">Questions</div>
              <div className="text-3xl font-bold text-white">
                {resultData.score}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20 text-center">
              <div className="text-gray-400 text-sm mb-2">Correct</div>
              <div className="text-3xl font-bold text-green-400">
                {resultData.correctAnswers}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-2xl p-6 border border-red-500/20 text-center">
              <div className="text-gray-400 text-sm mb-2">Wrong</div>
              <div className="text-3xl font-bold text-red-400">
                {resultData.totalQuestions - resultData.correctAnswers}
              </div>
            </div>
          </div>

          {/* Performance Badge */}
          <div className="text-center">
            <span className={`px-6 py-3 rounded-full text-lg font-semibold border ${getScoreBadgeColor(resultData.percentage)}`}>
              {resultData.percentage >= 80 ? 'Excellent! 🎉' : 
               resultData.percentage >= 60 ? 'Good Job! 👍' : 
               'Keep Practicing! 💪'}
            </span>
          </div>
        </div>

        {/* Detailed Answers */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
            <Book className="w-6 h-6" />
            <span>Answer Review</span>
          </h2>

          <div className="space-y-4">
            {(resultData.details || resultData.snapshot || []).map((answer, index) => (
              <div
                key={answer.questionId}
                className={`rounded-2xl p-6 border ${
                  answer.isCorrect
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex-1">
                    Q{index + 1}. {answer.question}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {answer.isCorrect ? (
                      <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-300 font-semibold text-sm">Correct</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 bg-red-500/20 px-3 py-1 rounded-full">
                        <XCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-300 font-semibold text-sm">Wrong</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Your Answer */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                    <div className="text-gray-400 text-sm mb-1">Your Answer:</div>
                    <div className={`font-semibold ${
                      answer.isCorrect ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {answer.givenAnswer || 'Not answered'}
                    </div>
                  </div>

                  {/* Correct Answer (only show if wrong) */}
                  {!answer.isCorrect && (
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-green-500/30">
                      <div className="text-gray-400 text-sm mb-1">Correct Answer:</div>
                      <div className="text-green-300 font-semibold">
                        {answer.correctAnswer}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <BarChart3 className="w-6 h-6" />
            <span>Performance Summary</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {resultData.totalQuestions}
              </div>
              <div className="text-gray-400 text-sm">Total Questions</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">
                {resultData.correctAnswers}
              </div>
              <div className="text-gray-400 text-sm">Correct Answers</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className={`text-2xl font-bold mb-1 ${getScoreColor(resultData.percentage)}`}>
                {resultData.percentage}%
              </div>
              <div className="text-gray-400 text-sm">Accuracy</div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="mt-8 p-6 bg-blue-900/20 rounded-xl border border-blue-500/20">
            <p className="text-center text-gray-300">
              {resultData.percentage >= 80 
                ? "Outstanding performance! You've mastered this topic. Keep up the excellent work!"
                : resultData.percentage >= 60
                ? "Good effort! Review the incorrect answers to improve further."
                : "Don't worry, practice makes perfect! Review the answers and try again."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          {/* <button
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Back to Home
          </button> */}
          <button
            onClick={() => window.print()}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
          >
            Print Result
          </button>
        </div>
      </div>
    </div>
  );
}