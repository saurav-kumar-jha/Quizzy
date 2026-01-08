import React, { useState } from 'react';
import { Edit, LogOut, List, Users, BookOpen, X, Upload, Loader, Check } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfileSection() {
  const [showEdit, setShowEdit] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [teacherProfile, setTeacherProfile] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@email.com',
    role: 'High School Teacher',
    subject: 'Mathematics & Science',
    joinDate: 'January 2024',
    totalQuizzes: 24,
    totalStudents: 350,
    avatar: 'SJ'
  });

  const [editData, setEditData] = useState({
    name: '',
    subject: '',
    avatar: ''
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleEditClick = () => {
    setEditData({
      name: teacherProfile.name,
      subject: teacherProfile.subject,
      avatar: teacherProfile.avatar
    });
    setAvatarPreview(null);
    setAvatarFile(null);
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
      // Prepare form data for API
      const formData = new FormData();
      formData.append('name', editData.name);
      formData.append('subject', editData.subject);
      
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      // Log data for debugging
      console.log('Updating profile with:', {
        name: editData.name,
        subject: editData.subject,
        hasAvatar: !!avatarFile
      });

      // Replace with your actual API call
      // const response = await api.put('/profile/update', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     'Authorization': `Bearer ${user.token}`
      //   }
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update local state with new data
      setTeacherProfile({
        ...teacherProfile,
        name: editData.name,
        subject: editData.subject,
        avatar: avatarPreview ? editData.name.split(' ').map(n => n[0]).join('').toUpperCase() : teacherProfile.avatar
      });

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

  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
    setShowLogoutConfirm(false);
    
    toast.info('Logged out successfully', {
      position: 'top-right',
      autoClose: 2000,
    });

    // Example: Clear auth data and redirect
    // localStorage.removeItem('token');
    // setIsLoggedIn(false);
    // navigate('/auth');
  };

  return (
    <>
      <ToastContainer />
      
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-purple-500/20 p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {teacherProfile.avatar}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">{teacherProfile.name}</h2>
            <p className="text-gray-400">{teacherProfile.email}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                {teacherProfile.role}
              </span>
              <span className="text-gray-400 text-sm">Joined {teacherProfile.joinDate}</span>
            </div>
          </div>
          <button
            onClick={handleEditClick}
            className="flex items-center cursor-pointer space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all duration-300"
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
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Total Quizzes</span>
              <List className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white">{teacherProfile.totalQuizzes}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Total Students</span>
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white">{teacherProfile.totalStudents}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Subject</span>
              <BookOpen className="w-5 h-5 text-purple-400" />
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
                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-purple-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={teacherProfile.email}
                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-purple-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
              <input
                type="text"
                value={teacherProfile.role}
                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-purple-500"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-3xl shadow-2xl border border-purple-500/20 p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Edit Profile</h3>
              <button
                onClick={() => setShowEdit(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Avatar Section */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Profile Picture</label>
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                    ) : (
                      teacherProfile.avatar
                    )}
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl cursor-pointer transition-all duration-300">
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                <input
                  type="text"
                  value={editData.subject}
                  onChange={(e) => setEditData({...editData, subject: e.target.value})}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="Enter your subject"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleUpdateProfile}
                  disabled={isUpdating}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
                  className="px-6 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
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
          <div className="bg-slate-900 rounded-3xl shadow-2xl border border-purple-500/20 p-8 max-w-md w-full">
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
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}