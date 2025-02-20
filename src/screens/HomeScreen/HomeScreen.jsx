import "./index.scss"
import { FaPlus } from "react-icons/fa";
import Logo from "/public/CodeVista-logo.png"
import { RightComponent } from "./RightScreen/RightComponent";
import { Modal } from "../../Providers/Modals/Modal";
import { CreatePlaygroundModal } from "../../Providers/Modals/CreatePlaygroundModal";
import { useContext } from "react";
import { ModalContext } from "../../Providers/ModalProvider";
export const HomeScreen = ()=>{
    const modalFeatures = useContext(ModalContext);
    const OpenCreatePlaygroundModal = ()=>{
        modalFeatures.openModal('CREATE_PLAYGROUND');
    }
    return(
    <div className="home-container">
        <div className="left-container">
            <div className="items-container">
            <img src={Logo}/>
            <h1>CodeVista</h1>
            <h2>Code.Compile.Debug.</h2>
            <button onClick={OpenCreatePlaygroundModal}><FaPlus/> Create Playground</button>
            </div>
        </div>
        <RightComponent/>
        <Modal/>
    </div>
    )
    
}