import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../util/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { id: "", username: "", email: "", token: "", created_at: "", role: "", subject: "", profile_url:"" };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("user");
  });
  const [Isloading, setLoading] = useState(true)
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    duration: '',
    reqName:true,
    reqEmail:true,
    reqRoll:true,
    questions: []
  });
  const [previousQuizzes, setPreviousQuizzes] = useState([]);

  //set user data or remove data
  useEffect(() => {
    if (user && user.token) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    }
  }, [user]);

  //Validating Token 
  const validateToken = async () => {
    if (!user?.token) {
      setLoading(false)
      return;
    }

    try {
      const res = await api.get(`/test/validate`, {
        "headers": {
          "Authorization": `Bearer ${user.token}`
        }
      })
      if (res.status == 200) {
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.log(error)
      if (error.response?.status == 401) {
        logout()
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    validateToken()
  }, [])

  //fetch Quizz
  useEffect(() => {

    if(Isloading)return;
    if (!user?.token || !user?.id) return;

    const fetchQuizz = async ()=>{
      try {
        const res = await api.get(`/auth/${user.id}`,{
          headers:{
            "Authorization":`Bearer ${user.token}`
          }
        })
        console.log(res.data[0].quiz)
        const quiz = res.data[0]?.quiz || []
        setPreviousQuizzes(quiz)
        setQuizData(prev => ({
          ...prev,
          questions: quiz.questions && quiz.questions.length > 0 
            ? quiz.questions 
            : prev.questions
        }));
      } catch (error) {
        console.error("Error:",error.message) 
      }
    }
    fetchQuizz()
    
  }, [Isloading, user.id, user.token])

  //logout the user 
  const logout = () => {
    setUser({ id: "", username: "", email: "", token: "", created_at: "", role: "" });
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  //update user
  const updateUser = async ()=>{
    setLoading(true)
    const res = await api.get("/auth/me",{
      "headers":{
        "Authorization": `Bearer ${user.token}`
      }
    })

    setUser({
      id:res.data.id,
      name:res.data.username,
      email:res.data.email,
      token:user.token,
      created_at:res.data.created_at,
      role:res.data.role,
      subject:res.data?.subject,
      profile_url:res.data?.profile_url
    })

    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, logout, Isloading, updateUser, quizData, previousQuizzes, setQuizData, setPreviousQuizzes }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
