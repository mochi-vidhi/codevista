import { useContext } from "react";
import "./createPlaygroundModal.scss"
import { IoCloseSharp } from "react-icons/io5";
import { ModalContext } from "../ModalProvider";
export const CreatePlaygroundModal = ()=>{
    const modalFeatures = useContext(ModalContext);
    const closeModal = ()=>{
        modalFeatures.closeModal();
    }
    
    return (
        <div className="modal-container">
            <form className="modal-body">
                <span className="close" onClick={closeModal}><IoCloseSharp className="closeIcon"/></span>
                <h1>Create New Playground</h1>
                <div className="item" >
                    <label>Enter folder Name</label>
                    <input/>
                </div>
                <div className="item">
                    <label>Enter card Name</label>
                    <input/>
                </div>
                <div className="item">
                    <select>
                        <option value="cpp">CPP</option>
                        <option value="java">java</option>
                        <option value="javascript">javascript</option>
                        <option value="python">python</option>
                    </select>

                    <button>
                        Create Playground
                    </button>
                </div>

            </form>
        </div>
    )
}