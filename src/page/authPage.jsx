import React, { useEffect, useState } from 'react';
import { Mail, Lock, User, Calendar, BookOpen, Eye, EyeOff, ArrowRight, Turtle, CheckCircle, AlertCircle, Loader, Book } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../util/authApi';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-toastify';

export default function AuthPages() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'teacher',
    subject:''
  });
  const {user,setUser,isLoggedIn,setIsLoggedIn} = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [isDisabled, SetIsDisabled] = useState(false)

  useEffect(()=>{
    if(isLoggedIn){
      toast.success("You're already logged In")
      setTimeout(() => {        
        navigate("/")
      }, 1000);
    }
  },[])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
    SetIsDisabled(true)
    setLoading(true)
    try{
      const res = await api.post("/auth/login",{
        email:formData.email,
        password:formData.password
      })
      console.log(res);
      if(res.status == 200){
        
        const response = await api.get("/auth/me",{
          headers:{
            "Authorization":`Bearer ${res.data.token}`
          }
        })
        // console.log("UserDetails:",response)
        setUser({
          id:response.data.id,
          name:response.data.username,
          email:response.data.email,
          token:res.data.token,
          created_at:response.data.created_at,
          role:response.data.role,
          subject:response.data?.subject,
          profile_url:response.data?.profile_url
        })
        setMessage('Login successfull');
        setMessageType('success');
        setIsLoggedIn(true)
        
        navigate("/")
      }else{
        setMessage('Login failed');
        setMessageType('error');
      }
      
    }catch(err){
      console.log(err)
      
      setMessage('Something went wrong');
      setMessageType('error');
    }
    setLoading(false)
    SetIsDisabled(false)
  }

  const handleRegister = async (e)=>{
    e.preventDefault()
    SetIsDisabled(true)
    if(formData.password != formData.confirmPassword){
      setMessage('Please enter same password');
      setMessageType('error');
    }
    setLoading(true)
    try{
      const res = await api.post("/auth/register",{
        username:formData.name,
        email:formData.email,
        password:formData.confirmPassword,
        role:formData.role,
        subject:formData.subject
      })
      // console.log(res);
      if(res.status == 200){     
      setMessage('Register successfull');
      setMessageType('success');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'teacher',
        subject:''
      })
      setIsLogin(true)
      }else{
        setMessage('Something went wrong');
        setMessageType('error');
      }
      
    }catch(err){
      console.log(err)
      setMessage('Check your credentials');
      setMessageType('error');
    }
    setLoading(false)
    SetIsDisabled(false)

  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center">
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-500/20 p-8">
          <div className="flex bg-slate-800/50 rounded-full p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className="text-gray-400">
              {isLogin
                ? 'Login to continue creating amazing quizzes'
                : 'Join thousands of educators worldwide'}
            </p>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-xl border ${
                messageType === 'success'
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              } flex items-start space-x-3`}
            >
              {messageType === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm ${
                  messageType === 'success' ? 'text-green-300' : 'text-red-300'
                }`}
              >
                {message}
              </p>
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <div className="relative">
                  <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type='text'
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="eg: Maths"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-12 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 cursor-pointer" /> : <Eye className="w-5 h-5 cursor-pointer" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type='password'
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-700 cursor-pointer bg-slate-800/50 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-gray-400 cursor-pointer">Remember me</span>
                </label>
                <Link to="/auth/forget-password" className="text-sm text-blue-400 cursor-pointer hover:text-blue-300 transition-colors">
                  Forgot Password?
                </Link>
              </div>
            )}

            {!isLogin && (
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 rounded border-slate-700 bg-slate-800/50 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-400">
                  I agree to the{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 ">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300">
                    Privacy Policy
                  </a>
                </span>
              </label>
            )}

            { isLogin ? (
            <>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white font-semibold py-3 cursor-pointer rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center group"
              disabled={isDisabled}
            >
              {loading?(
                <>
                
                <Loader className="w-5 h-5 animate-spin" />
                </>
              )
              :<>
              Login
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
              }
            </button>
            </>):(
            <>
            <button
              onClick={handleRegister}
              className="w-full bg-blue-600 text-white font-semibold py-3 cursor-pointer rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center group"
              disabled={isDisabled}
            >
              {loading?(
                <>
                
                  <Loader className="w-5 h-5 animate-spin" />
                </>
              )
              :'Create Account'}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            </>)
              
            }
          </div>

          <p className="text-center text-gray-400 mt-6 text-sm">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 hover:text-blue-300 cursor-pointer font-semibold transition-colors"
            >
              {isLogin ? 'Register now' : 'Login here'}
            </button>
          </p>
        </div>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Protected by reCAPTCHA and subject to the Google{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Terms of Service
          </a>
          .
        </p>
      </div>
    </div>
  );
}