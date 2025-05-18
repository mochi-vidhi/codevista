// import "./index.scss"
import { FaPlus } from "react-icons/fa";
import Logo from "/public/CodeVista-logo.png"
import { RightComponent } from "./RightScreen/RightComponent";
import { Modal } from "../../Providers/Modals/Modal";
import { CreatePlaygroundModal } from "../../Providers/Modals/CreatePlaygroundModal";
import { useContext, useEffect, useState } from "react";
import { ModalContext,modalConstants } from "../../Providers/ModalProvider";
import { auth,db } from "./../../components/LoginScreen/firebase"
import {getDoc,doc} from "firebase/firestore";
export const HomeScreen = ()=>{
    const modalFeatures = useContext(ModalContext);
    const [userDetails,setUserDetails] = useState(null);
    const OpenCreatePlaygroundModal = ()=>{
        modalFeatures.openModal(modalConstants.CREATE_PLAYGROUND);
    }
    const fetchUserData = async()=>{
        auth.onAuthStateChanged(async(user)=>{
           if(user){
               const docRef = doc(db,"Users",user.uid);
               const docSnap = await getDoc(docRef);
               if(docSnap.exists()){
                   setUserDetails(docSnap.data());
                   console.log(docSnap.data());
               }else{
                   console.log("No such document!");
               }
           }
           else{
             console.log("User is not logged in")
           }
            
        })
    };
    useEffect(()=>{
        fetchUserData()
    },[])
    return(
    <div className="h-screen grid grid-cols-2 md:grid-cols-[2fr_3fr]">
        <div className="bg-[#1e1e1e] relative flex justify-center items-center">
        
            <div className=" flex flex-col items-center gap-4 text-white">
            <img src={userDetails?.photo} className="w-15 h-15 rounded-full border-4 border-white shadow-lg"/>
            <h1 className="text-3xl font-bold">CodeVista</h1>
            <h2 className="text-xl">Welcome,{userDetails?.firstName || 'Users'} 👋 </h2> 
            <h2 className="text-xl">Code.Compile.Debug.</h2>
            <button 
            onClick={OpenCreatePlaygroundModal}
             className="text-[#1e1e1e] font-semibold text-lg h-[50px] w-[100%] rounded-full bg-white transition duration-1000 hover:shadow-md flex items-center justify-center gap-2"
             >
             <FaPlus/> Create Playground
            </button>
            </div>
        </div>
        <RightComponent/>
        <Modal/>
    </div>
    )
    
}