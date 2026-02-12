import React, { useState } from 'react';
import { 
  LogIn, PlusCircle, Link2, FileText, CheckCircle, 
  Award, BarChart3, ArrowRight, Users, BookOpen,
  Zap, Shield, Clock, Target, ChevronDown, ChevronUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const navigate = useNavigate()

  const steps = [
    {
      id: "teacher-login",
      number: 1,
      title: "Teacher Login",
      description: "Teachers log in using secure credentials",
      details: "Only authorized teachers can access quiz creation and analytics features.",
      icon: <LogIn className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500",
      role: "teacher"
    },
    {
      id: "quiz-create",
      number: 2,
      title: "Quiz Creation",
      description: "Create quiz with name, description and duration",
      details: "Teachers can define quiz rules, time limits and basic settings.",
      icon: <PlusCircle className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
      role: "teacher"
    },
    {
      id: "add-questions",
      number: 3,
      title: "Add Questions",
      description: "Add MCQs and correct answers",
      details: "Supports 4–6 options per question with instant validation.",
      icon: <PlusCircle className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
      role: "teacher"
    },
    {
      id: "generate-link",
      number: 4,
      title: "Generate Quiz Link",
      description: "System generates a unique quiz link",
      details: "Teachers can instantly share the quiz via any platform.",
      icon: <Link2 className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500",
      role: "teacher"
    },
    {
      id: "student-login",
      number: 1,
      title: "Student Login",
      description: "Students open link and log in",
      details: "Students verify identity before attempting the quiz.",
      icon: <LogIn className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500",
      role: "student"
    },
    {
      id: "attempt-quiz",
      number: 2,
      title: "Quiz Attempt",
      description: "Students attempt quiz within time limit",
      details: "Auto-save, timer, and answer review before submission.",
      icon: <FileText className="w-8 h-8" />,
      gradient: "from-yellow-500 to-orange-500",
      role: "student"
    },
    {
      id: "evaluation",
      number: 3,
      title: "Automatic Evaluation",
      description: "Answers evaluated instantly",
      details: "System checks answers and prepares result instantly.",
      icon: <CheckCircle className="w-8 h-8" />,
      gradient: "from-indigo-500 to-purple-500",
      role: "student"
    },
    {
      id: "result",
      number: 4,
      title: "Result Generation",
      description: "Result generated automatically",
      details: "Marks, percentage, and performance summary shown instantly.",
      icon: <Award className="w-8 h-8" />,
      gradient: "from-pink-500 to-rose-500",
      role: "student"
    },
    {
      id: "analytics",
      number: 5,
      title: "Result Analytics",
      description: "Teachers analyze student performance",
      details: "Student-wise, quiz-wise and question-wise insights.",
      icon: <BarChart3 className="w-8 h-8" />,
      gradient: "from-violet-500 to-purple-500",
      role: "teacher"
    }
  ];
  
  const teacherSteps = steps.filter(s => s.role === 'teacher');
  const studentSteps = steps.filter(s => s.role === 'student');

  const faqs = [
    {
      question: "How long does it take to create a quiz?",
      answer: "Creating a quiz takes just 5-10 minutes! Add your questions, set the correct answers, and you're done. The system handles everything else automatically."
    },
    {
      question: "Can students see correct answers after submission?",
      answer: "Yes, students can view which answers were correct and incorrect after submitting the quiz, helping them learn from their mistakes."
    },
    {
      question: "Is there a limit on the number of quizzes I can create?",
      answer: "No! Quizzy is completely free with unlimited quiz creation. Create as many quizzes as you need for your students."
    },
    {
      question: "How secure is student data?",
      answer: "All data is encrypted and stored securely in our database. We follow industry-standard security practices to protect your information."
    },
    {
      question: "Can I edit a quiz after creating it?",
      answer: "Yes, you can add, edit, or delete questions even after creating the quiz. Changes are reflected immediately."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto pt-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-blue-900/30 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold border border-blue-500/30">
              Simple & Effective Process
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            How Quizzy
            <span className="text-blue-400"> Works</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From creating quizzes to viewing results - everything is automated and easy. Follow these 9 simple steps to get started.
          </p>
        </div>

        {/* Visual Flow Diagram */}
        <div className="mb-16 hidden lg:block">
          <div className="relative">
            {/* Connection Lines */}
            {/* <div className="absolute top-24 left-0 right-0 h-1 bg-blue-600 opacity-20"></div> */}
            
            <div className="grid grid-cols-9 gap-2">
              {steps.map((step, index) => (
                <div key={step.id} className="relative">
                  <button
                    onClick={() => setActiveStep(index)}
                    className={`w-full cursor-pointer transition-all duration-300 ${
                      activeStep === index ? 'transform scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mb-3 shadow-lg ${
                      activeStep === index ? 'ring-4 ring-white/30' : ''
                    }`}>
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-sm mb-1">Step {index+1}</div>
                      <div className="text-gray-400 text-xs line-clamp-2">{step.title}</div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Step Details */}
          <div className="mt-8 bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-8">
            <div className="flex items-start space-x-6">
              <div className={`w-20 h-20 bg-gradient-to-r ${steps[activeStep].gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                <div className="text-white">
                  {steps[activeStep].icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <h3 className="text-2xl font-bold text-white">{steps[activeStep].title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs border ${
                    steps[activeStep].role === 'teacher' 
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      : 'bg-green-500/20 text-green-300 border-green-500/30'
                  }`}>
                    {steps[activeStep].role === 'teacher' ? 'For Teachers' : 'For Students'}
                  </span>
                </div>
                <p className="text-gray-400 text-lg mb-2">{steps[activeStep].description}</p>
                <p className="text-gray-500">{steps[activeStep].details}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Steps - Vertical Timeline */}
        <div className="lg:hidden mb-16">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-600 opacity-20"></div>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.id} className="relative pl-20">
                  <div className={`absolute left-0 w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-blue-400 font-bold">Step {index+1}</span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${
                        step.role === 'teacher'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                          : 'bg-green-500/20 text-green-300 border-green-500/30'
                      }`}>
                        {step.role === 'teacher' ? 'Teacher' : 'Student'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 mb-2">{step.description}</p>
                    <p className="text-gray-500 text-sm">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two Column Process Flow */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Teacher & Student Journey
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Teacher Journey */}
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">For Teachers</h3>
              </div>
              <div className="space-y-4">
                {teacherSteps.map((step) => (
                  <div key={step.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-300 font-bold text-sm">{step.number}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Journey */}
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">For Students</h3>
              </div>
              <div className="space-y-4">
                {studentSteps.map((step) => (
                  <div key={step.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-300 font-bold text-sm">{step.number}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why This Process Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 cursor-pointer to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
              <Zap className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Create and share quizzes in minutes, not hours</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 cursor-pointer to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
              <Shield className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">100% Automated</h3>
              <p className="text-gray-400">No manual grading or result calculation needed</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/10 cursor-pointer to-blue-500/10 rounded-2xl p-6 border border-blue-500/20">
              <Clock className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Instant Results</h3>
              <p className="text-gray-400">Students get feedback immediately after submission</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 cursor-pointer to-red-500/10 rounded-2xl p-6 border border-orange-500/20">
              <Target className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Accurate & Fair</h3>
              <p className="text-gray-400">Consistent evaluation for all students</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-900/80 backdrop-blur-xl cursor-pointer rounded-2xl shadow-xl border border-blue-500/20 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between cursor-pointer p-6 text-left hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-lg font-semibold text-white">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Experience It Yourself?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of educators who have simplified their assessment process with Quizzy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={()=>navigate("/dashboard?tab=create")} className="bg-white text-blue-600 cursor-pointer px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white cursor-pointer text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300">
              Watch Demo Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}