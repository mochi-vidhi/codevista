import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import {auth, db} from "./firebase"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
export const SignWithGoogle = ()=>{
    const navigate = useNavigate();
    const googleLogin = ()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider).then(async(result)=>{
            console.log(result);
            const user = auth.currentUser;
            if(user){
                await setDoc(doc(db,"Users",user.uid),{
                        email:user.email,
                        firstName:user.displayName,
                        photo:user.photoURL,
                        lastName:"",
                        folders: []
                    });
                toast.success("User Logged in Successfully",{
                    position:"top-center"
                })
                
                    navigate("/HomeScreen");

            }
        })
    }
    
    return(
        <div className="mt-6 text-center">
           <p className="text-m text-gray-300 mb-2">-- Or Continue With --</p>
           <div className="flex justify-center space-x-4 text-sm" onClick={googleLogin}>
              <img src="/google-signin.png" className="h-20 w-60 cursor-pointer"/>
           </div>
        </div>
    )
}