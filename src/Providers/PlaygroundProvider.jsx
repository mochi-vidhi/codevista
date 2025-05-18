// import { useAuth } from "@clerk/clerk-react";
import { createContext,useContext, useEffect, useState } from "react";
import {v4} from 'uuid';
export const PlaygroundContext = createContext();
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/components/loginScreen/firebase";
import { useAuth } from "@/context/AuthContext";

const initialData = [
    {
        id:v4(),
        title:'Bootstrap',
        files:[
            {
               id:v4(),
               title:'index',
               language:'cpp',
               code:`cout<<"Hello world";`,
            }
        ]
        
    },
    {
        id:v4(),
        title:'Frontend',
        files:[
            {
               id:v4(),
               title:'test',
               language:'javascript',
               code:`console.log("Hello Frontend")`,
            }
        ]
        
    }
]

export const defaultCodes = {
    ['cpp']:`
      #include <iostream>
        int main() {
        // Write C++ code here
          std::cout << "Hello world";
         return 0;
        } `,
    ['javascript']:`console.log("hello World")`,
    ['python']:`print("hello python")`,
    ['java']:`
         class Main {
            public static void main(String[] args) {
            System.out.println("Hello java");
           }
        }`
}
export const PlaygroundProvider = ({children})=>{
    const {currentUser} = useAuth();
    const userId = currentUser?.uid || currentUser?.id;
    const [folders, setFolders] = useState([]);
    
    useEffect(() => {
        console.log("Current User:", currentUser); // 🔍 Add this to debug
      }, [currentUser]);
      const getUserDocRef = () => {
        if (!currentUser) {
          console.error("User ID is undefined in getUserDocRef");
          return null;
        }
        return doc(db, "Users", userId);
      };
      
    // const [folders,setFolders] = useState(()=>{
    //     try {
    //         const localData = localStorage.getItem('data');
    //         return localData ? JSON.parse(localData) : initialData;
    //     } catch (error) {
    //         console.error("Error parsing localStorage data:", error);
    //         return initialData;
    //     }
    // });
    const fetchFoldersFromFirebase = async (userId) => {
        const userDocRef = getUserDocRef(userId);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          return docSnapshot.data().folders || [];
        }
        return [];
      };
      

      const saveFoldersToFirebase = async (userId, foldersData) => {
        const userDocRef = getUserDocRef(userId);
        if (!userDocRef) return;
      
        try {
          await setDoc(userDocRef, { folders: foldersData }, { merge: true });
        } catch (error) {
          console.error("Error saving folders to Firebase:", error);
        }
      };
      

    const createNewPlayground = async(newPlayground)=>{
        const {fileName,folderName,language} = newPlayground;

        const newFolders = [...folders];
        newFolders.push({
            id:v4(),
            title:folderName,
            files:[{
                id:v4(),
                title:fileName,
                code:defaultCodes[language],
                language
            }]
        })
        // localStorage.setItem('data',JSON.stringify(newFolders));
        await saveFoldersToFirebase(currentUser.id, newFolders);
        setFolders(newFolders);
    }

    const  createNewFolder = async(folderName)=>{
        if (!currentUser?.uid) {
            console.error("User is not authenticated");
            return;
        }
        const newFolders = {
            id:v4(),
            title:folderName,
            files:[]
        }
        const allFolders = [...folders,newFolders]
        // localStorage.setItem('data',JSON.stringify(allFolders));
        await saveFoldersToFirebase(currentUser.uid, allFolders);
        setFolders(allFolders);
     }

     const deleteFolder =(id)=>{
        // array id like 234 344 566
        //  delete id 234 if false then delete
      const updatedFolderList = folders.filter((folderItem)=>{
               return folderItem.id !== id;
         })
         localStorage.setItem('data',JSON.stringify(updatedFolderList));
         setFolders(updatedFolderList);
     }

     const editFolderTitle = async(newFolderName,id)=>{
        const updatedFolderList = folders.map((folderItem)=>{
            return folderItem.id === id 
            ? { ...folderItem, title: newFolderName } : folderItem;
         })
        //  localStorage.setItem('data',JSON.stringify(updatedFolderList));
        await saveFoldersToFirebase(currentUser.id, updatedFolderList);
        setFolders(updatedFolderList);
     }

     const editFileTitle = async(newFileName,folderId,fileId)=>{
        const copiedFolders = [...folders];  
        for(let i = 0;i<copiedFolders.length;i++){
             if(folderId === copiedFolders[i].id){
                  const files = copiedFolders[i].files
                  for(let j = 0;j<files.length;j++){
                    if(files[j].id === fileId){
                        files[j].title = newFileName;
                        break;
                    }
                  }
                  break;
             }
         }
        //  localStorage.setItem('data',JSON.stringify(copiedFolders));
        await saveFoldersToFirebase(currentUser.id,copiedFolders );
        setFolders(copiedFolders);
     }
     const deleteFile = async(folderId,fileId)=>{
        const copiedFolders = [...folders]
        for(let i = 0;i<copiedFolders.length;i++){
            if(copiedFolders[i].id===folderId){
                const files = [...copiedFolders[i].files];
                copiedFolders[i].files = files.filter((file)=>{
                    return file.id !== fileId;
                })
                break;
            }
        }
        // localStorage.setItem('data',JSON.stringify(copiedFolders));
        await saveFoldersToFirebase(currentUser.id, copiedFolders);
        setFolders(copiedFolders);
     }
     const createPlayground = async(folderId,file)=>{
         const copiedFolders = [...folders];
         for(let i = 0;i<copiedFolders.length;i++){
            if(copiedFolders[i].id === folderId){
                copiedFolders[i].files.push(file);
                break;  
            }
         }
        //  localStorage.setItem('data',JSON.stringify(copiedFolders));
        await saveFoldersToFirebase(currentUser.id, copiedFolders);
         setFolders(copiedFolders);
     }

     const getDefaultCode = (fileId,folderId)=>{
        for(let i = 0;i<folders.length;i++){
            if(folders[i].id === folderId){
                for(let j=0; j<folders[i].files.length;j++){
                    const currentFile  = folders[i].files[j];
                    if(fileId === currentFile.id){
                         return currentFile.code;
                     }
                }
            }
        }
     }

     const updateLanguage = async(fileId,folderId,language)=>{
        const newFolders = [...folders]
        for(let i = 0;i<newFolders.length;i++){
            if(newFolders[i].id === folderId){
                for(let j=0; j<newFolders[i].files.length;j++){
                    const currentFile  = newFolders[i].files[j];
                    if(fileId === currentFile.id){
                         newFolders[i].files[j].code = defaultCodes[language]
                         newFolders[i].files[j].language = language
                     }
                }
            }
        }
        // localStorage.setItem('data',JSON.stringify(newFolders));
        await saveFoldersToFirebase(currentUser.id, newFolders);
        setFolders(newFolders)
     }
     
    //  const savePlayground = (folderId, cardId, newCode, newLanguage) => {
    //     setFolders((oldState) => {
    //         const newState = { ...oldState };
    //         newState[folderId].playgrounds[cardId].code = newCode;
    //         newState[folderId].playgrounds[cardId].language = newLanguage;
    //         return newState;
    //     })
    // }

     
    
     const getLanguage = (fileId,folderId)=>{
        for(let i = 0;i<folders.length;i++){
            if(folders[i].id === folderId){
                for(let j=0; j<folders[i].files.length;j++){
                    const currentFile  = folders[i].files[j];
                    if(fileId === currentFile.id){
                         return currentFile.language;
                     }
                }
            }
        }
     }

     const saveCode = async(fileId, folderId, newCode) => {
        const updatedFolders = [...folders];
      
        for (let i = 0; i < updatedFolders.length; i++) {
          if (updatedFolders[i].id === folderId) {
            const files = updatedFolders[i].files;
            for (let j = 0; j < files.length; j++) {
              if (files[j].id === fileId) {
                files[j].code = newCode; 
              }
            }
          }
        }
      
        
        // localStorage.setItem("data", JSON.stringify(updatedFolders));
        await saveFoldersToFirebase(currentUser.id, updatedFolders);
     
        setFolders(updatedFolders);
      };
      
      
    //  useEffect(()=>{
    //     if(!localStorage.getItem('data')){
    //         localStorage.setItem('data',JSON.stringify(folders));
    //     }
    //  },[])


    useEffect(() => {
        const loadData = async () => {
          if (currentUser?.uid) {
            const firebaseFolders = await fetchFoldersFromFirebase(currentUser.uid);
            if (firebaseFolders.length > 0) {
              setFolders(firebaseFolders);
            } else {
              setFolders(initialData);
              await saveFoldersToFirebase(currentUser.uid, initialData);
            }
          }
        };
        loadData();
      }, [currentUser?.id]);
    
     const playGroundFeatures = {
          folders,
          createNewPlayground,
          createNewFolder,
          deleteFolder,
          editFolderTitle,
          editFileTitle,
          deleteFile,
          createPlayground,
          getDefaultCode,
          getLanguage,
          updateLanguage,
          saveCode
          
     }

     
    return( 
      <PlaygroundContext.Provider value={playGroundFeatures}>
          {children}
      </PlaygroundContext.Provider>     
    ); 
}