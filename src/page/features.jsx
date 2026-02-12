import React, { useState } from 'react';
import { 
  Shield, Users, PlusCircle, CheckCircle, Link2, 
  Globe, Zap, BarChart3, Database, Smile,
  Clock, Award, Lock, Share2, BookOpen, Target,
  TrendingUp, FileText, Bell, Download, MessageSquare,
  Settings, Eye, Edit3, Trash2, Copy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate()

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "User Authentication",
      description: "Secure login system for both teachers and students with role-based access control",
      category: "security",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <PlusCircle className="w-8 h-8" />,
      title: "Quiz Creation",
      description: "Teachers can easily create quizzes with custom questions, duration, and settings",
      category: "teacher",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Multiple Choice Questions",
      description: "Support for 4-6 answer options with flexible question formats",
      category: "quiz",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Automatic Evaluation",
      description: "Instant answer checking and automatic grading system for quick results",
      category: "quiz",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Link2 className="w-8 h-8" />,
      title: "Unique Quiz Links",
      description: "Generate shareable links for each quiz with copy and social media sharing",
      category: "teacher",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Online Quiz Attempts",
      description: "Students can take quizzes anywhere, anytime with internet connection",
      category: "student",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Real-time Results",
      description: "Instant score calculation and feedback as soon as quiz is submitted",
      category: "student",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Performance Analytics",
      description: "Detailed insights into student performance with graphs and statistics",
      category: "teacher",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Secure Data Storage",
      description: "All quiz data and student information stored securely in encrypted database",
      category: "security",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Smile className="w-8 h-8" />,
      title: "User-Friendly Interface",
      description: "Clean, modern, and intuitive design for seamless user experience",
      category: "general",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Track student progress over time with comprehensive performance reports",
      category: "teacher",
      gradient: "from-amber-500 to-yellow-500"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Quiz Status Control",
      description: "Teachers can open or close quizzes to control student access",
      category: "teacher",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Question Management",
      description: "Add, edit, or delete questions even after quiz creation",
      category: "teacher",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Export Results",
      description: "Download student results as CSV for record keeping and analysis",
      category: "teacher",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Timer Functionality",
      description: "Set time limits for quizzes with auto-submit when time expires",
      category: "quiz",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Detailed Answer Review",
      description: "View each student's answers with correct/incorrect indicators",
      category: "teacher",
      gradient: "from-pink-500 to-purple-500"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Social Media Sharing",
      description: "Share quiz links directly on Facebook, Twitter, and other platforms",
      category: "general",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Score Calculation",
      description: "Automatic percentage calculation based on correct answers",
      category: "quiz",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Feedback System",
      description: "Students and teachers can provide feedback and suggestions",
      category: "general",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Profile Management",
      description: "Users can update their profile information and preferences",
      category: "general",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Features', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'teacher', name: 'For Teachers', icon: <Users className="w-4 h-4" /> },
    { id: 'student', name: 'For Students', icon: <Award className="w-4 h-4" /> },
    { id: 'quiz', name: 'Quiz Features', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'general', name: 'General', icon: <Settings className="w-4 h-4" /> }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(f => f.category === activeCategory);

    return (
      <div className="min-h-screen bg-slate-900  p-4 md:p-8">
        <div className="max-w-7xl mx-auto pt-20">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-blue-900/30 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold border border-blue-500/30">
                Powerful Features
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Everything You Need to
              <span className="text-blue-400"> Succeed</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Quizzy provides a comprehensive suite of features designed to make online assessments simple, efficient, and engaging for both teachers and students.
            </p>
          </div>
  
          {/* Category Filter */}
          <div className="mb-12">
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-2">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
  
          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-900/80 cursor-pointer backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-6 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
  
          {/* Key Highlights Section */}
          <div className="bg-blue-900/20 rounded-3xl border border-blue-500/20 p-8 md:p-12 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Why Choose Quizzy?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-400 mb-2">
                  100%
                </div>
                <p className="text-gray-300">Free Forever</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-400 mb-2">
                  24/7
                </div>
                <p className="text-gray-300">Available Access</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-400 mb-2">
                  ∞
                </div>
                <p className="text-gray-300">Unlimited Quizzes</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-400 mb-2">
                  <Zap className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-300">Instant Results</p>
              </div>
            </div>
          </div>
  
          {/* Core Features Showcase */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Core Capabilities
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-3">
                  <Users className="w-8 h-8 text-blue-400" />
                  <span>For Teachers</span>
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Create unlimited quizzes with custom questions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Generate unique shareable links instantly</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>View detailed student performance analytics</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Export results to CSV for records</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Control quiz access with open/close status</span>
                  </li>
                </ul>
              </div>
  
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-3">
                  <Award className="w-8 h-8 text-blue-400" />
                  <span>For Students</span>
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Take quizzes from anywhere, anytime</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Get instant results upon submission</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>User-friendly interface for smooth experience</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Timed quizzes with countdown timer</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Clear answer submission and review</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          {/* CTA Section */}
          <div className="text-center bg-blue-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of educators who are already using Quizzy to create engaging assessments
            </p>
            <button onClick={()=>navigate("/dashboard?tab=create")} className="bg-white cursor-pointer text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Create Your First Quiz Now
            </button>
          </div>
        </div>
      </div>
    );
}