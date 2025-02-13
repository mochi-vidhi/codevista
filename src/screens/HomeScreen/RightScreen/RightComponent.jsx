import { FaPlus } from "react-icons/fa";
import "./right.scss";
import { FaFolder } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

export const RightComponent = ()=>{
    return (
        <div className="right-container">
            <div className="header">
                <h1><span className="my">My</span> Playground</h1>
                <button className="add-Folder">
                    <span><FaPlus/></span>
                    <span>New Folder</span>
                </button>
            </div>
            <div className="folder-container">
                <div className="folder-header">
                    <div className="folder-header-item">
                         <span style={{color:"#ffca29"}}><FaFolder /></span>
                         <span>{"DSA"}</span>
                    </div>
                    <div className="folder-header-item">
                      <span><MdDelete className="icons"/></span>
                      <span><FiEdit className="icons" /></span>
                      <button className="newPBtn">
                      <span ><FaPlus/></span>
                      <span>New Playground</span>
                      </button>
                    </div>
                </div>
                <div className="cards-container"></div>
            </div>
        </div>
    )
}