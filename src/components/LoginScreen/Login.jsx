import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignWithGoogle } from "./signWithGoogle";
export const Login = () =>{
   const [input,setInput] = useState({
     email:"",
     password:""
   });
   const navigate = useNavigate();
   const auth = getAuth();

   const handleInput = (e)=>{
    const {name,value} = e.target
      setInput((prev)=>({
        ...prev,
        [name]:value
      }));
   }
   const handleSubmit = async(e)=>{
      e.preventDefault();
      try{
         await signInWithEmailAndPassword(auth,input.email,input.password);
         navigate("/HomeScreen");
      }
      catch(error){
         console.error("Login Error: ",error.message);
         alert("Login Failed. Check Your Credentials")
      }
   }
    return (
        <div className="min-h-screen bg-black text-white flex">
            <div className="w-full md:w-1/2 flex flex-col  justify-center px-8 md:px-20 py-10">
             <div className="flex justify-center items-center">
               <img src="/CodeVista-logo.png" alt="logo" className="pl-2 w-50 h-50"/>
             </div>
            <h1 className="text-3xl font-bold text-blue-500 mb-6">CodeVista</h1>
            <h2 className="text-2xl font-bold mb-6 text-amber-500">Welcome to CodeVista - </h2>
            <p className="text-xl mb-6  text-amber-500">Your Coding Playground !</p>
            <p className="text-sm mb-8 text-gray-400">Sign in to Continue building your code magic.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                   type="email"
                   className="w-full px-4 py-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:border-blue-500"
                   name="email"
                   placeholder='Email Address'
                   value={input.email}
                   onChange={handleInput} 
                  />       
                  <input
                   type="password"
                   className="w-full px-4 py-2 border border-gray-500 rounded bg-black text-white focus:outline-none focus:border-blue-500"
                   placeholder="password"
                   name="password"
                   value={input.password}
                   onChange={handleInput}
                  />
               <div className="flex space-x-4 mt-4">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow">
                    Submit
                  </button>
                  <button 
                    type="button" 
                    onClick={()=>navigate("/Ragister")}
                    className="border border-blue-600 text-amber-400 px-6 py-2 rounded hover:bg-amber-500 hover:text-white transition"
                    >
                    Sign Up 
                  </button>
               </div> 

               <SignWithGoogle/> 
           </form>
           </div>
           <div className="hidden md:flex w-1/2 bg-white justify-center items-center">
              <img src="/image.png" alt="Coding Girl Illustration" className="w-3/4 h-auto"/>
           </div>
        </div>
    )
}