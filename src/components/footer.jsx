import { BookOpen } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()
  return (
    
    <footer id="contact" className="bg-slate-950 py-12 px-4 border-t border-blue-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Quizzy</span>
              </div>
              <p className="text-gray-400">
                Making education accessible through free, powerful quiz tools for teachers worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="features" className="text-gray-400 hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="dashboard?tab=create" className="text-gray-400 hover:text-blue-400 transition-colors">Create Quiz</a></li>
                <li><a href="how-it-work" className="text-gray-400 hover:text-blue-400 transition-colors">How It Works</a></li>
                {/* <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Pricing</a></li> */}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Tutorials</a></li>
                {/* <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</a></li> */}
                {/* <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Support</a></li> */}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400"></li>
                <li className="text-gray-400">+91 9934787172</li>
                {/* <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Help Center</a></li> */}
                {/* <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Community</a></li> */}
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-500/20 pt-8 text-center">
            <p className="text-gray-400">
              © 2026 Quizzy. Built with passion for educators. All rights reserved.
            </p>
          </div>
        </div>
    </footer>
  );
}

export default Footer