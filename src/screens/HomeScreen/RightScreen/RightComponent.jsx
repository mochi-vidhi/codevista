import { FaPlus, FaFolder } from "react-icons/fa";
// import "./right.scss";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Logo from "/public/codVistaRight.png"
import { useContext } from "react";
import { PlaygroundContext } from "../../../Providers/PlaygroundProvider";
import { ModalContext,modalConstants } from "../../../Providers/ModalProvider";
import { auth } from "@/components/LoginScreen/firebase";
import { useNavigate } from "react-router-dom";

export const Folders = ({ folderTitle, cards ,id}) => {
  const {deleteFolder,deleteFile} = useContext(PlaygroundContext);
  const {openModal,setModalPayLoad} = useContext(ModalContext);
  const navigate = useNavigate();
  const onDeleteFolder = ()=>{
      deleteFolder(id);
  }

  const onEditFolderTitle = () =>{
    setModalPayLoad(id);  
    openModal(modalConstants.UPDATE_FOLDER_TITLE);
  }
  
  const openCreateCardModal = ()=>{
     setModalPayLoad(id);
     openModal(modalConstants.CREATE_CARD);
  }


  return (
    <div className="p-2">
      <div className="flex justify-between py-2 border-b border-[#1e1e1e]">
        <div className="flex items-center gap-5 text-yellow-400">
          <span style={{ color: "#ffca29" }}><FaFolder /></span>
          <span className="text-black">{folderTitle}</span>
        </div>
        <div className="flex items-center gap-5">
          <span><MdDelete className="text-2xl cursor-pointer" onClick={onDeleteFolder} /></span>
          <span><FiEdit className="text-2xl cursor-pointer" onClick={onEditFolderTitle}/></span>
          <button className="flex items-center gap-2 bg-[#6EC207] p-4 rounded-lg border-none cursor-pointer" onClick={openCreateCardModal}>
            <span className="text-[#1e1e1e] font-extrabold text-m"><FaPlus /></span>
            <span className="text-[#1e1e1e] font-extrabold text-m">New Playground</span>
          </button>
        </div>
      </div>
      <div className="px-2 py-3 flex flex-wrap gap-4 justify-between cursor-pointer">
        {cards?.map((file, index) => {
            const onEditFile = ()=>{
               setModalPayLoad({fileId: file.id, folderId:id})
               openModal(modalConstants.UPDATE_FILE_TITLE);
          }
            const onDeleteFile = ()=>{
                deleteFile(id,file.id)
            }
            const navigateToPlaygroundScreen = ()=>{
              // TODO:navigate to next screen by passing fileId and folderId
                 console.log({fileId:file.id,folderId:id});
                 navigate(`/PlaygroundScreen/${file.id}/${id}`);
            }
          return (
            <div className="flex justify-between items-center w-[48%] p-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 outline-white"
             key={index} onClick={navigateToPlaygroundScreen}>
              <img src={Logo} className="w-20" />
              <div className="flex flex-col">
                <span id="file" className="font-bold text-lg border-b-2 border-orange-600">FileName : {file?.title}</span>
                <span>Language:{file?.language}</span>
              </div>
              <div className="flex gap-2">
                <span onClick={onDeleteFile}><MdDelete className="text-2xl cursor-pointer" /></span>
                <span onClick={onEditFile}><FiEdit className="text-2xl cursor-pointer"/></span>
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
  const {folders} = useContext(PlaygroundContext);
  const modalFeatures = useContext(ModalContext);
  const navigate = useNavigate();
  const openCreateNewFolder = ()=>{
     modalFeatures.openModal(modalConstants.CREATE_FOLDER);
  }
  
  async function handleLogout(){
     try{
        await auth.signOut();
        navigate("/");
        console.log("User Logged Out SuccessFylly")
     }catch(error){
         console.error("Error Logging out: ",error.message);
     }
  }
  return (
    <div className="min-h-screen overflow-y-scroll bg-gray-100 ">
    <div className=" bg-white text-[#1e1e1e] px-5 py-3">
      <div className="flex justify-between items-center border-b  border-black ">
        <h1 className="text-3xl font-bold "><span className="font-normal">My</span> Playground</h1>
        <div className="flex gap-2">
        <button className="flex items-center gap-1 border-none text-[#1e1e1e] bg-orange-500 text-lg font-bold p-4 rounded-lg cursor-pointer mb-3" 
        onClick={openCreateNewFolder}>
          <span><FaPlus /></span>
          <span>New Folder</span>
        </button>
        <button
                onClick={handleLogout}
                className="text-black bg-indigo-500 font-bold border border-black p-2 mb-3 rounded hover:bg-black hover:text-white transition"
            >
             Sign Out
            </button>
          </div>
      </div>
      {
         folders?.map((folder,index)=>{
             return (
                <Folders folderTitle={folder?.title} cards={folder?.files} key={index} id={folder?.id} />
             )
         }) 
      }
      
    </div>
    </div>
  )
}