import { FaPlus, FaFolder } from "react-icons/fa";
import "./right.scss";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Logo from "/public/codVistaRight.png"
import { useContext } from "react";
import { PlaygroundContext } from "../../../Providers/PlaygroundProvider";

export const Folders = ({ folderTitle, cards }) => {
  return (
    <div className="folder-container">
      <div className="folder-header">
        <div className="folder-header-item">
          <span style={{ color: "#ffca29" }}><FaFolder /></span>
          <span>{folderTitle}</span>
        </div>
        <div className="folder-header-item">
          <span><MdDelete className="icons" /></span>
          <span><FiEdit className="icons" /></span>
          <button className="newPBtn">
            <span ><FaPlus /></span>
            <span>New Playground</span>
          </button>
        </div>
      </div>
      <div className="cards-container">
        {cards?.map((file, index) => {
          return (
            <div className="card" key={index}>
              <img src={Logo} />
              <div className="title-container">
                <span>{file?.title}</span>
                <span>Language:{file?.language}</span>
              </div>
              <div className="card-item">
                <span><MdDelete className="icons" /></span>
                <span><FiEdit className="icons" /></span>
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}



export const RightComponent = () => {
  const folders = useContext(PlaygroundContext);
  //  console.log(folders);
  return (
    <div className="right-container">
      <div className="header">
        <h1><span className="my">My</span> Playground</h1>
        <button className="add-Folder">
          <span><FaPlus /></span>
          <span>New Folder</span>
        </button>
      </div>
      {
         folders?.map((folder,index)=>{
             return (
                <Folders folderTitle={folder?.title} cards={folder?.files} key={index} />
             )
         }) 
      }
      
    </div>
  )
}