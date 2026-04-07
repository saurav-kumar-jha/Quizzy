import { useState, useEffect } from 'react';
import { Users, FileText, MessageSquare, Lightbulb, BarChart3, Menu, X, Search, Download, Eye, Lock, BookOpen, Calendar, CheckCircle, XCircle, Star, Mail, Trash2, Award,} from 'lucide-react';
import api from '../util/authApi';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch admin data
  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // Replace with your actual API call
      const response = await api.get("/test/all") ;
      console.log(response);
      
      const data = await response.data;
      console.log("data: ",data)
      setAdminData(data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'quizzes', label: 'Quizzes', icon: <FileText className="w-5 h-5" /> },
    { id: 'students', label: 'Students', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Star className="w-5 h-5" /> },
    { id: 'suggestions', label: 'Suggestions', icon: <Lightbulb className="w-5 h-5" /> },
    { id: 'experiences', label: 'Experiences', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'contacts', label: 'Contacts', icon: <Mail className="w-5 h-5" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading admin data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900/80 backdrop-blur-xl border-r border-blue-500/20 transition-all duration-300 fixed h-full z-20`}>
        {/* Logo */}
        <div className="p-6 border-b border-blue-500/20 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Header */}
        <div className="bg-slate-900/80 backdrop-blur-xl border-b border-blue-500/20 p-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h1>
              <p className="text-gray-400 mt-1">Manage and monitor your application data</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-64 bg-slate-800/50 border border-slate-700 text-white rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'overview' && <OverviewTab data={adminData} />}
          {activeTab === 'users' && <UsersTab users={adminData?.user || []} />}
          {activeTab === 'quizzes' && <QuizzesTab quizzes={adminData?.quiz || []} />}
          {activeTab === 'students' && <StudentsTab students={adminData?.student || []} />}
          {activeTab === 'testimonials' && <TestimonialsTab testimonials={adminData?.testimonials || []} />}
          {activeTab === 'suggestions' && <SuggestionsTab suggestions={adminData?.suggestion || []} />}
          {activeTab === 'experiences' && <ExperiencesTab experiences={adminData?.experiences || []} />}
          {activeTab === 'contacts' && <ContactsTab contacts={adminData?.contact || []} />}
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ data }) => {
  const stats = [
    { label: 'Total Users', value: data?.user?.length || 0, icon: <Users className="w-8 h-8" />, color: 'blue' },
    { label: 'Total Quizzes', value: data?.quiz?.length || 0, icon: <FileText className="w-8 h-8" />, color: 'green' },
    { label: 'Total Students', value: data?.student?.length || 0, icon: <BookOpen className="w-8 h-8" />, color: 'purple' },
    { label: 'Testimonials', value: data?.testimonials?.length || 0, icon: <Star className="w-8 h-8" />, color: 'yellow' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-16 h-16 bg-${stat.color}-600/20 rounded-xl flex items-center justify-center text-${stat.color}-400`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {data?.quiz?.slice(0, 5).map((quiz, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{quiz.name}</p>
                  <p className="text-gray-400 text-sm">{new Date(quiz.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                quiz.close ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
              }`}>
                {quiz.close ? 'Closed' : 'Active'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Users Tab Component
const UsersTab = ({ users }) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800/50 border-b border-slate-700">
            <tr>
              <th className="text-left text-gray-400 font-semibold p-4">Name</th>
              <th className="text-left text-gray-400 font-semibold p-4">Email</th>
              <th className="text-left text-gray-400 font-semibold p-4">Role</th>
              <th className="text-left text-gray-400 font-semibold p-4">Subject</th>
              <th className="text-left text-gray-400 font-semibold p-4">Joined</th>
              <th className="text-left text-gray-400 font-semibold p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    {user.profile_url ? (
                      <img src={user.profile_url} alt={user.username} className="w-10 h-10 rounded-full" />
                    ) : (
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-white font-medium">{user.username}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-300">{user.email}</td>
                <td className="p-4">
                  <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-gray-300">{user.subject || 'N/A'}</td>
                <td className="p-4 text-gray-400 text-sm">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Quizzes Tab Component
export const QuizzesTab = ({ quizzes }) => {
  return (
    <div className="space-y-4">
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-white">{quiz.name}</h3>
                {quiz.lock && (
                  <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded-md text-xs font-semibold border border-blue-500/30 flex items-center space-x-1">
                    <Lock className="w-3 h-3" />
                    <span>Protected</span>
                  </span>
                )}
              </div>
              <p className="text-gray-400 mb-3">{quiz.desc}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(quiz.created_at).toLocaleDateString()}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{quiz.questions.length} questions</span>
                </span>
                <span>Duration: {quiz.valid_till} min</span>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              quiz.close ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'
            }`}>
              {quiz.close ? 'Inactive' : 'Active'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700">
            <div className="bg-slate-800/50 rounded-xl p-3">
              <p className="text-gray-400 text-xs mb-1">Required Fields</p>
              <div className="flex flex-wrap gap-1">
                {quiz.reqName && <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">Name</span>}
                {quiz.reqEmail && <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">Email</span>}
                {quiz.reqRoll && <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">Roll</span>}
              </div>
            </div>
            {quiz.password && (
              <div className="bg-slate-800/50 rounded-xl p-3">
                <p className="text-gray-400 text-xs mb-1">Password</p>
                <p className="text-white font-mono text-sm">{quiz.password}</p>
              </div>
            )}
          </div>

          {/* Questions Preview */}
          {quiz.questions.length > 0 && (
            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2">Questions Preview:</p>
              <div className="space-y-2">
                {quiz.questions.slice(0, 2).map((q, idx) => (
                  <div key={q.id} className="bg-slate-800/30 rounded-lg p-3 text-sm">
                    <p className="text-white font-medium">Q{idx + 1}. {q.title}</p>
                    <p className="text-green-400 text-xs mt-1">Answer: {q.correctAnswer}</p>
                  </div>
                ))}
                {quiz.questions.length > 2 && (
                  <p className="text-gray-500 text-xs">+{quiz.questions.length - 2} more questions</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Students Tab Component
export const StudentsTab = ({ students }) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800/50 border-b border-slate-700">
            <tr>
              <th className="text-left text-gray-400 font-semibold p-4">Name</th>
              <th className="text-left text-gray-400 font-semibold p-4">Email</th>
              <th className="text-left text-gray-400 font-semibold p-4">Roll No</th>
              <th className="text-left text-gray-400 font-semibold p-4">Score</th>
              <th className="text-left text-gray-400 font-semibold p-4">Total Questions</th>
              <th className="text-left text-gray-400 font-semibold p-4">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-medium">{student.name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-300">{student.email || 'N/A'}</td>
                <td className="p-4 text-gray-300">{student.roll || 'N/A'}</td>
                <td className="p-4">
                  <span className="text-2xl font-bold text-blue-400">{student.score}</span>
                </td>
                <td className="p-4 text-gray-300">{student.total_questions}</td>
                <td className="p-4 text-gray-400 text-sm">
                  {new Date(student.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Testimonials Tab Component
export const TestimonialsTab = ({ testimonials }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-6">
          <div className="flex items-center space-x-1 mb-3">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-gray-300 italic mb-4">"{testimonial.testimonial}"</p>
          <div className="flex items-center space-x-3 pt-4 border-t border-slate-700">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {testimonial.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-white font-semibold">{testimonial.name}</div>
              <div className="text-gray-400 text-sm">{testimonial.role}</div>
              {testimonial.organization && (
                <div className="text-gray-500 text-xs">{testimonial.organization}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Suggestions Tab Component
export const SuggestionsTab = ({ suggestions }) => {
  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{suggestion.name}</h3>
                <p className="text-gray-400 text-sm">{suggestion.email}</p>
              </div>
            </div>
            <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold capitalize">
              {suggestion.category}
            </span>
          </div>
          <p className="text-gray-300 leading-relaxed">{suggestion.suggestion}</p>
        </div>
      ))}
    </div>
  );
};

// Experiences Tab Component
export const ExperiencesTab = ({ experiences }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {experiences.map((experience) => (
        <div key={experience.id} className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{experience.nameOrEmail}</h3>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(experience.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">{experience.message}</p>
        </div>
      ))}
    </div>
  );
};

// Contacts Tab Component
export const ContactsTab = ({ contacts }) => {
  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div key={contact.id} className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{contact.name}</h3>
                <p className="text-gray-400 text-sm">{contact.email}</p>
                {contact.phone && (
                  <p className="text-gray-500 text-xs">{contact.phone}</p>
                )}
              </div>
            </div>
            <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold capitalize">
              {contact.reason}
            </span>
          </div>
          <p className="text-gray-300 leading-relaxed">{contact.message}</p>
        </div>
      ))}
    </div>
  );
};

// Continue in next file...
export default AdminDashboard;