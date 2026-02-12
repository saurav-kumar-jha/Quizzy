import React, { useEffect, useState } from 'react';
import { BookOpen, Plus, List, User, LogOut, BarChart, Share2, Copy, CheckCircle, X, Trash2, Edit, Facebook, Twitter, Linkedin, Mail, Clock, Users, Loader, CircleOff, Circle, Upload, Check, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthProvider';
import api from '../util/authApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "../App.css"

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showCreateQuizOpt, setShowCreateQuizOpt] = useState(true)
  const { user, setUser, isLoggedIn, logout, updateUser, fetchQuizz, Isloading, quizData, previousQuizzes, setQuizData, setPreviousQuizzes } = useAuth();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false);
  const [editData, setEditData] = useState({ name: '', subject: '', avatar: '' });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const tabfromUrl = searchParams.get('tab')
    if (tabfromUrl) {
      setActiveTab(tabfromUrl)
      if (tabfromUrl == 'create') {
        setShowCreateQuiz(true);
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth")
    }
  }, [])

  // console.log(previousQuizzes)

  const teacherProfile = {
    name: user.name,
    email: user.email,
    role: user.role,
    subject: user?.subject || '',
    joinDate: user?.created_at
      ? new Date(user.created_at).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })
      : "Unknown",
    totalQuizzes: previousQuizzes.length > 0 ? previousQuizzes.length : '--',
    totalStudents: '--',
    profile: user?.profile_url,
    avatar: user?.name?.charAt(0).toUpperCase()
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareOnSocial = (platform) => {
    const text = `Check out my new quiz!`;
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedLink)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(generatedLink)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(generatedLink)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(generatedLink)}`
    };
    window.open(urls[platform], '_blank');
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault()
    console.log("quizData:", quizData)

    setLoading(true)
    try {
      const res = await api.post("/quiz/create", {
        name: quizData.title,
        desc: quizData.description,
        validTill: quizData.duration,
        teacherId: user.id,
        reqName: quizData.reqName,
        reqEmail: quizData.reqEmail,
        reqRoll: quizData.reqRoll
      }, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      fetchQuizz()
      setActiveTab("quizzes")
      setSearchParams('tab=quizzes')
      // console.log("res:",res)
      // setUserQuizData(res.data)
      // localStorage.setItem("quizData",JSON.stringify(res.data))
      // setShowAddQuestion(true)
      // setShowCreateQuizOpt(false)

    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleDeleteQuiz = async (id) => {
    try {
      const res = await api.delete(`/quiz/${id}`, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      // console.log(res)
      setPreviousQuizzes((prev) => prev.filter((quiz) => quiz.id !== id))
    } catch (error) {
      // console.log(error)
    }
  }

  const handleGenerateQuizLink = async (id) => {
    try {
      const res = await api.get(`/quiz/generate-link/${id}`, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      // console.log(res)
      setGeneratedLink(res.data);
      setShowShareModal(true);

    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  };

  const handleQuizStatus = async (id) => {
    try {
      const res = await api.put(`/quiz/${id}/close`, {}, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json"
        }
      })
      console.log("close res: ", res)
      setPreviousQuizzes((prev) =>
        prev.map((quiz) =>
          quiz.id === id ? { ...quiz, close: !quiz.close } : quiz
        )
      );
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditClick = () => {
    setEditData({
      name: teacherProfile.name,
      subject: teacherProfile.subject,
      avatar: teacherProfile.profile
    });
    setAvatarPreview(teacherProfile.profile || null);
    setAvatarFile(teacherProfile.profile || null);
    setShowEdit(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setAvatarFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    // Validate inputs
    if (!editData.name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    if (!editData.subject.trim()) {
      toast.error('Subject cannot be empty');
      return;
    }

    setIsUpdating(true);

    try {
      // console.log("avatar file",avatarFile)
      let profile_url = teacherProfile.profile || "";

      if (avatarFile) {
        profile_url = await uploadImg(avatarFile);
      }

      const payload = {
        email: teacherProfile.email,
        username: editData.name,
        profile_url,
        subject: editData.subject
      }

      // console.log("payload:", payload);

      const res = await api.put("/auth/update", payload)
      // console.log("res",res)
      if (res.status == 200) {
        updateUser()
      }

      toast.success('Profile updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setShowEdit(false);
      setAvatarPreview(null);
      setAvatarFile(null);

    } catch (error) {
      console.error('Error updating profile:', error);

      // Handle different error types
      if (error.response) {
        // Server responded with error
        toast.error(error.response.data.message || 'Failed to update profile');
      } else if (error.request) {
        // Request made but no response
        toast.error('Network error. Please check your connection');
      } else {
        // Other errors
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const uploadImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file)
    formData.append("upload_preset", "Quizzy")
    formData.append("folder", "profile_pics")

    const res = await axios.post(import.meta.env.VITE_CLOUD_API_URL, formData)
    // console.log("cloudinary res:", res);

    return res.data?.secure_url;
  }

  const handleRefresh = ()=>{
    setIsRotating(true);
      fetchQuizz(); // your original function

  
    setIsRotating(false);
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-6 sticky top-8">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setSearchParams('tab=profile')
                  }}
                  className={`w-full flex items-center cursor-pointer space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'profile'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-semibold">Profile</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('create');
                    setSearchParams('tab=create')
                    setShowCreateQuiz(true);
                  }}
                  className={`w-full flex items-center cursor-pointer space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'create'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">Create Quiz</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('quizzes');
                    setSearchParams('tab=quizzes')
                  }}
                  className={`w-full flex items-center cursor-pointer space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'quizzes'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                >
                  <List className="w-5 h-5" />
                  <span className="font-semibold">My Quizzes</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('results');
                    setSearchParams('tab=results')
                  }}
                  className={`w-full flex items-center cursor-pointer space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'results'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                >
                  <BarChart className="w-5 h-5" />
                  <span className="font-semibold">Results</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-8">
                  <div className="flex items-center space-x-6 mb-8">
                    {
                      teacherProfile.profile ? (
                        <div className="w-24 h-24 rounded-full overflow-hidden border border-blue-500/30 flex items-center justify-center">
                          <img src={teacherProfile.profile} alt={teacherProfile.name} className='w-full h-full object-cover transition-transform duration-300 hover:scale-105' />
                        </div>
                      ) : (
                        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                          {teacherProfile.avatar}
                        </div>
                      )
                    }

                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2">{teacherProfile.name}</h2>
                      <p className="text-gray-400">{teacherProfile.email}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm">
                          {teacherProfile.role}
                        </span>
                        <span className="text-gray-400 text-sm">Joined {teacherProfile.joinDate}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleEditClick}
                      className="flex items-center cursor-pointer space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-300"
                    >
                      <Edit className="w-5 h-5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      className="flex items-center cursor-pointer space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-300"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Total Quizzes</span>
                        <List className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="text-3xl font-bold text-white">{teacherProfile.totalQuizzes}</div>
                    </div>

                    <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Total Students</span>
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="text-3xl font-bold text-white">{teacherProfile.totalStudents}</div>
                    </div>

                    <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Subject</span>
                        <BookOpen className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="text-lg font-bold text-white">{teacherProfile.subject}</div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-white mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={teacherProfile.name}
                          className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          value={teacherProfile.email}
                          className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                        <input
                          type="text"
                          value={teacherProfile.role}
                          className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Profile Modal */}
            {showEdit && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 py-2 z-50">
                <div className="bg-slate-900 rounded-3xl shadow-2xl border border-blue-500/20 p-8 max-w-2xl w-full">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Edit Profile</h3>
                    <button
                      onClick={() => setShowEdit(false)}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {/* Avatar Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Profile Picture</label>
                      <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                          {avatarPreview ? (
                            <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                          ) : (
                            teacherProfile.avatar
                          )}
                        </div>
                        <div>
                          <label className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer transition-all duration-300">
                            <Upload className="w-5 h-5" />
                            <span>Upload New Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarChange}
                              className="hidden"
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF (max 5MB)</p>
                        </div>
                      </div>
                    </div>

                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email Field (Read-only) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={teacherProfile.email}
                        className="w-full bg-slate-800/30 border border-slate-700 text-gray-500 rounded-xl py-3 px-4 cursor-not-allowed"
                        readOnly
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    {/* Role Field (Read-only) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                      <input
                        type="text"
                        value={teacherProfile.role}
                        className="w-full bg-slate-800/30 border border-slate-700 text-gray-500 rounded-xl py-3 px-4 cursor-not-allowed"
                        readOnly
                      />
                      <p className="text-xs text-gray-500 mt-1">Role cannot be changed</p>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Subject *</label>
                      <input
                        type="text"
                        value={editData.subject}
                        onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Enter your subject"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-2">
                      <button
                        onClick={handleUpdateProfile}
                        disabled={isUpdating}
                        className="flex-1 bg-blue-600 cursor-pointer text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isUpdating ? (
                          <>
                            <Loader className="w-5 h-5 animate-spin" />
                            <span>Updating...</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-5 h-5" />
                            <span>Update Profile</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setShowEdit(false)}
                        disabled={isUpdating}
                        className="px-6 bg-slate-700 cursor-pointer hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-slate-900 rounded-3xl shadow-2xl border border-blue-500/20 p-8 max-w-md w-full">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LogOut className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Logout Confirmation</h3>
                    <p className="text-gray-400">Are you sure you want to logout from your account?</p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowLogoutConfirm(false)}
                      className="flex-1 bg-slate-700 cursor-pointer hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 bg-red-500 hover:bg-red-600 cursor-pointer text-white font-semibold py-3 rounded-xl transition-all duration-300"
                    >
                      Yes, Logout
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'create' && showCreateQuiz && (
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Create New Quiz</h2>
                {showCreateQuizOpt && (
                  <div className="space-y-4 mb-8">
                    {/* Title  */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Quiz Title *</label>
                      <input
                        type="text"
                        value={quizData.title}
                        onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Enter quiz title"
                      />
                    </div>
                    {/* Description  */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                      <textarea
                        value={quizData.description}
                        onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Brief description of the quiz"
                        rows="3"
                      />
                    </div>
                    {/* Duration  */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Duration (minutes)</label>
                      <input
                        type="number"
                        value={quizData.duration}
                        onChange={(e) => setQuizData({ ...quizData, duration: e.target.value })}
                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="30"
                      />
                    </div>
                    {/* Student Details Required */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Student Details Required
                      </label>

                      <div className="space-y-3">

                        {/* Name Toggle */}
                        <div className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3">
                          <span className="text-gray-300">Require Name</span>
                          <button
                            type="button"
                            onClick={() =>
                              setQuizData(prev => ({ ...prev, reqName: !prev.reqName }))
                            }
                            className={`w-12 h-6 flex items-center cursor-pointer rounded-full p-1 transition-all ${quizData.reqName ? 'bg-blue-600' : 'bg-gray-600'
                              }`}
                          >
                            <span
                              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${quizData.reqName ? 'translate-x-6' : 'translate-x-0'
                                }`}
                            />
                          </button>
                        </div>

                        {/* Email Toggle */}
                        <div className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3">
                          <span className="text-gray-300">Require Email</span>
                          <button
                            type="button"
                            onClick={() =>
                              setQuizData(prev => ({ ...prev, reqEmail: !prev.reqEmail }))
                            }
                            className={`w-12 h-6 flex items-center cursor-pointer rounded-full p-1 transition-all ${quizData.reqEmail ? 'bg-blue-600' : 'bg-gray-600'
                              }`}
                          >
                            <span
                              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${quizData.reqEmail ? 'translate-x-6' : 'translate-x-0'
                                }`}
                            />
                          </button>
                        </div>

                        {/* Roll No Toggle */}
                        <div className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3">
                          <span className="text-gray-300">Require Roll Number</span>
                          <button
                            type="button"
                            onClick={() =>
                              setQuizData(prev => ({ ...prev, reqRoll: !prev.reqRoll }))
                            }
                            className={`w-12 h-6 flex items-center cursor-pointer rounded-full p-1 transition-all ${quizData.reqRoll ? 'bg-blue-600' : 'bg-gray-600'
                              }`}
                          >
                            <span
                              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${quizData.reqRoll ? 'translate-x-6' : 'translate-x-0'
                                }`}
                            />
                          </button>
                        </div>

                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      These options control which details students must fill before attempting the quiz.
                    </p>



                    {/* Submit btn  */}
                    <button onClick={handleCreateQuiz} className="w-full bg-blue-600 cursor-pointer flex items-center justify-center hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300">
                      {
                        loading ? (
                          <>
                            <Loader className="w-5 h-5 text-center animate-spin" />
                          </>
                        ) : (
                          'Create Quiz'
                        )
                      }
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'quizzes' && (
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    My Quizzes
                  </h2>

                  {/* Refresh Button */}
                  <button
                    onClick={handleRefresh}
                    title="Refresh quizzes"
                    className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 transition-all duration-300 cursor-pointer "
                  >
                    <RefreshCw className={`w-5 h-5 md:w-6 md:h-6 ${isRotating ? "rotate-twice" : ""}`} />
                  </button>
                </div>
                <div className="space-y-4">
                  {
                    previousQuizzes.length == 0 ? (
                      <>
                        <h1 className='text-xl text-center font-bold text-white'>Create Quizz</h1>
                        <p className='text-sm text-center text-gray-300'>Refresh page if you created quiz before..</p>
                        <button
                          onClick={() => {
                            setActiveTab('create');
                            setShowCreateQuiz(true);
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                        >
                          Create Quizz
                        </button>
                      </>
                    ) : (
                      previousQuizzes.map((quiz) => (
                        <div key={quiz.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2 hover:underline cursor-pointer hover:text-gray-400" onClick={() => navigate(`/quiz/${quiz.id}`)}>{quiz.name}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{new Date(quiz.created_at).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true
                                  })}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>{quiz.students} students</span>
                                </span>
                              </div>
                            </div>
                            <div className="text-right flex justify-center items-center">
                              {/* <div className="text-2xl font-bold text-blue-400">{quiz.avgScore}%</div>
                              <div className="text-sm text-gray-400">Avg Score</div> */}
                              <p className="text-lg text-gray-400 mr-2">Status:</p>
                              {
                                quiz.close ? (
                                  <p className="text-lg mr-4 text-red-400">Inactive</p>
                                ) : (
                                  <p className="text-lg mr-4 text-green-400">Active</p>
                                )
                              }
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <button
                              onClick={() => {
                                handleGenerateQuizLink(quiz.id)
                              }}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                              <Share2 className="w-4 h-4" />
                              <span>Share</span>
                            </button>
                            <button onClick={() => handleQuizStatus(quiz.id)} className="px-4 bg-slate-700 cursor-pointer hover:bg-slate-600 text-white rounded-lg transition-all duration-300">
                              {
                                quiz.close ? (
                                  <>
                                    <CircleOff title='Open the Quiz' />
                                  </>
                                ) : (
                                  <>
                                    <Circle title='Close the Quiz' />
                                  </>
                                )
                              }
                            </button>
                            <button onClick={() => {
                              handleDeleteQuiz(quiz.id)
                            }} className="px-4 bg-red-500/20 hover:bg-red-500/30 cursor-pointer text-red-400 rounded-lg transition-all duration-300">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )))}
                </div>
              </div>
            )}

            {activeTab === 'results' && (
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-500/20 p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Quiz Results & Analytics</h2>
                <div className="space-y-6">
                  {previousQuizzes.map((quiz) => (
                    <div key={quiz.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                      <h3 className="text-xl font-bold text-white mb-4">{quiz.name}</h3>
                      {/* <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/20">
                          <div className="text-gray-400 text-sm mb-1">Total Students</div>
                          <div className="text-2xl font-bold text-white">{quiz.students}</div>
                        </div>
                        <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/20">
                          <div className="text-gray-400 text-sm mb-1">Average Score</div>
                          <div className="text-2xl font-bold text-blue-400">{quiz.avgScore}%</div>
                        </div>
                        <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/20">
                          <div className="text-gray-400 text-sm mb-1">Completion Rate</div>
                          <div className="text-2xl font-bold text-green-400">94%</div>
                        </div>
                      </div> */}
                      <button className="mt-4 w-full cursor-pointer bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition-all duration-300" onClick={() => navigate(`/quiz/${quiz.id}`)} >
                        View Detailed Analytics
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-3xl shadow-2xl border border-blue-500/20 p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Share Quiz</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Quiz Link</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="flex-1 bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 rounded-xl transition-all duration-300 flex items-center space-x-2"
                >
                  {copiedLink ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              {copiedLink && (
                <p className="text-green-400 text-sm mt-2">Link copied to clipboard!</p>
              )}
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Share on Social Media</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => shareOnSocial('facebook')}
                  className="bg-[#1877F2] hover:bg-[#166FE5] text-white cursor-pointer font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => shareOnSocial('twitter')}
                  className="bg-[#1DA1F2] hover:bg-[#1A91DA] text-white cursor-pointer font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </button>
                <button
                  onClick={() => shareOnSocial('linkedin')}
                  className="bg-[#0A66C2] hover:bg-[#095196] text-white cursor-pointer font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </button>
                <button
                  onClick={() => shareOnSocial('email')}
                  className="bg-slate-700 hover:bg-slate-600 text-white cursor-pointer font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </button>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}