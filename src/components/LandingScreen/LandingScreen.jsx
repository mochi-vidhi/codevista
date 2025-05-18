import React from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const LandingScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <header className="flex justify-between items-center px-6 py-4 shadow">
        <div className="flex items-center gap-2">
          <img src="/codVistaRight.png" alt="CodeVista Logo" className="h-10 w-10" />
          <h1 className="text-3xl font-bold text-pink-600">CodeVista</h1>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800" type="button" 
                onClick={()=>navigate("/LoginScreen")}
         >
          Login
        </button>
      </header>

      
      <main className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-10 py-20 bg-white">
        
        <div className="flex justify-center">
          <img src="/coding1.svg" alt="Learning Illustration" className="w-full max-w-md" />
        </div>

        
        <div>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 mb-4">
            A New Way to Learn
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            💻 Code Without Limits
             Write, debug, and execute code instantly in our powerful browser-based editor.
           🚀 Real-time Feedback - See results as you type with live output preview.
           🛠 Multi-Language Support - Switch between Python, JavaScript, Java, and more.
           🌎 Cloud-Based & Accessible - No setup needed—code anywhere, anytime.
            <br />
            🚀 <span className="text-purple-600 font-semibold">Grow faster. Learn smarter.</span>
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full text-lg hover:from-purple-700 hover:to-pink-600 transition duration-300" type="button" 
                    onClick={()=>navigate("/Ragister")}>
            Get Started
          </button>
        </div>
      </main>
  
      <section className="">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#111827" fill-opacity="1" d="M0,160L48,138.7C96,117,192,75,288,85.3C384,96,480,160,576,165.3C672,171,768,117,864,117.3C960,117,1056,171,1152,170.7C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
      </section>


  <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-10 py-20 bg-gray-900 -mt-1">
  <div>
    <h2 className="text-4xl font-extrabold text-blue-500 mb-4">
      Collaborate. Share. Grow.
    </h2>
    <p className="text-lg text-white">
      At <span className="text-pink-600 font-semibold">CodeVista</span>, you're not just coding — you're part of a passionate developer community.
      Join interactive coding rooms, pair-program with peers, and explore open discussions. It's not just learning, it's growing together. 🚀
    </p>
  </div>

  <div className="flex justify-center">
    <img
      src="/coding3.svg"
      alt="Collaboration or Community"
      className="w-full max-w-md"
    />
  </div>
</section>

      <section className="bg-gray-900 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-amber-600 mb-14">Why Choose CodeVista?</h3>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
              <h4 className="text-xl font-bold mb-2">🚀 Real-time Coding & Collaboration</h4>
              <p className="text-sm">Code with 3700+ examples and join a vibrant dev community. Share and learn together in real-time.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
              <h4 className="text-xl font-bold mb-2">🌐 Multi-language Support</h4>
              <p className="text-sm">Write, run, and debug Java, Python, C++, and more — all inside your browser with zero setup.</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
              <h4 className="text-xl font-bold mb-2">🎓 Perfect for Learners & Devs</h4>
              <p className="text-sm">Interactive lessons, coding challenges, and real-world projects make learning fun and effective.</p>
            </div>
          </div>
        </div>
      </section>

      
      <footer className="bg-gray-900 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p>&copy; {new Date().getFullYear()} CodeVista. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-pink-400">Privacy Policy</a>
            <a href="#" className="hover:text-pink-400">Terms of Service</a>
            <a href="#" className="hover:text-pink-400">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
