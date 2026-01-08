import React from 'react'

function StudentDetails() {
    const [StudentDetail, setStudentDetail] = useState([])
    const [LoadingStudentDetail, setLoadingStudentDetail] = useState(true)

    const fetchStudentDetail = async (studentId) => {
        setLoadingStudentDetail(true);
        try {
          // Find student from existing results data
          const student = results.find(s => s.id === studentId);
          
          if (student) {
            setStudentDetail(student);
          }
        } catch (error) {
          console.error('Error fetching student details:', error);
          alert('Failed to fetch student details');
        } finally {
          setLoadingStudentDetail(false);
        }
      };
  return (
    <>
    {/* Student Detail Modal */}
{showStudentDetail && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-slate-900 rounded-3xl shadow-2xl border border-purple-500/20 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Student Details</h3>
        <button
          onClick={closeStudentDetail}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {loadingStudentDetail ? (
        <div className="text-center py-12">
          <Loader className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading student details...</p>
        </div>
      ) : studentDetail ? (
        <div className="space-y-6">
          {/* Student Info Card */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {studentDetail.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-white">{studentDetail.name}</h4>
                <p className="text-gray-400">{studentDetail.email}</p>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-bold ${getScoreColor(studentDetail.score)}`}>
                  {studentDetail.score}%
                </div>
                <div className="text-gray-400 text-sm">Score</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-gray-400 text-sm mb-1">Roll Number</div>
                <div className="text-white font-semibold">{studentDetail.roll}</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-gray-400 text-sm mb-1">Total Questions</div>
                <div className="text-white font-semibold">{studentDetail.total_questions}</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-gray-400 text-sm mb-1">Submitted At</div>
                <div className="text-white font-semibold text-xs">{formatDate(studentDetail.created_at)}</div>
              </div>
            </div>
          </div>

          {/* Answers Section */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Answer Details</h4>
            <div className="space-y-4">
              {studentDetail.answers && studentDetail.answers.length > 0 ? (
                studentDetail.answers.map((answer, index) => (
                  <div 
                    key={answer.questionId} 
                    className={`rounded-2xl p-6 border ${
                      answer.isCorrect 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-red-500/10 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h5 className="text-lg font-semibold text-white flex-1">
                        Q{index + 1}. {answer.question}
                      </h5>
                      <div className="flex items-center space-x-2">
                        {answer.isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-400" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-gray-400 text-sm mb-1">Student's Answer:</div>
                        <div className={`font-semibold ${
                          answer.isCorrect ? 'text-green-300' : 'text-red-300'
                        }`}>
                          {answer.givenAnswer}
                        </div>
                      </div>

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
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No answers found
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-gray-400 text-sm mb-1">Correct</div>
                <div className="text-2xl font-bold text-green-400">
                  {studentDetail.answers ? studentDetail.answers.filter(a => a.isCorrect).length : 0}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Wrong</div>
                <div className="text-2xl font-bold text-red-400">
                  {studentDetail.answers ? studentDetail.answers.filter(a => !a.isCorrect).length : 0}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Accuracy</div>
                <div className={`text-2xl font-bold ${getScoreColor(studentDetail.score)}`}>
                  {studentDetail.score}%
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No data available</p>
        </div>
      )}
    </div>
  </div>
)}

    </>
  )
}

export default StudentDetails