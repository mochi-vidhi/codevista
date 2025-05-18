import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth,db } from "./firebase"
import { useNavigate } from "react-router-dom";
import {setDoc,doc} from "firebase/firestore";


export const Ragister = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        fname: "",
        lname: ""
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const {email,password} = input
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user);
            if(user){
                await setDoc(doc(db,"Users",user.uid),{
                    email:user.email,
                    firstName:input.fname,
                    lastName:input.lname,
                    photo:""
                });
            }
            setMessage("User Registered Successfully!");
            
        } catch (error) {
            console.error(error);
            if (error.code === "auth/email-already-in-use") {
                setMessage("User already registered. Please login.");
            } else {
                setMessage("Try Again, Registration Failed.");
            }
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-r from-black to-gray-900 text-white">
                    
            <div className="bg-[#0f0f0f] p-10 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-blue-500 text-center mb-2">CodeVista</h2>
                <h3 className="text-xl font-bold text-amber-400 text-center mb-4">Create your account</h3>

                {message && <p className="text-center text-sm mb-4">{message}</p>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block mb-1">First Name</label>
                        <input
                            type="text"
                            name="fname"
                            value={input.fname}
                            onChange={handleInput}
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lname"
                            value={input.lname}
                            onChange={handleInput}
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={handleInput}
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={handleInput}
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="mt-4 bg-blue-600 hover:bg-blue-700 transition-all px-6 py-2 rounded-full text-white font-bold"
                        >
                            Register
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <p>Already Have an Account ?</p>
                        <button 
                           type="button" 
                           onClick={()=>navigate("/LoginScreen")}
                           className="border border-blue-600 text-amber-400 px-6 py-2 rounded hover:bg-amber-500 hover:text-white transition"
                         >
                     Login 
                  </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
