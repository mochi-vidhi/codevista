import { CiImport, CiExport } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { useContext, useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { PlaygroundContext } from "@/Providers/PlaygroundProvider";

const editorOptions = {
  fontSize: 18,
  wordWrap: "on",
};

const fileExtensionMapping = {
  cpp: "cpp",
  javascript: "js",
  python: "py",
  java: "java",
};

export const EditorContainer = ({ fileId, folderId, runCode }) => {
  const { getDefaultCode, getLanguage, updateLanguage, saveCode } =
    useContext(PlaygroundContext);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [code, setCode] = useState(() => {return getDefaultCode(fileId, folderId)});
  const [language, setLanguage] = useState(() => getLanguage(fileId, folderId));
  const [theme, setTheme] = useState("vs-dark");
  const codeRef = useRef(code);


  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [cardTitle, setCardTitle] = useState("Edit card title");

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const onChnageCode = (newCode) => {
    setCode(newCode);
    codeRef.current = newCode;
  };

  const allowedExtensions = [".java", ".cpp", ".js", ".py"];

const onUploadCode = (event) => {
  const file = event.target.files[0];

  if (file) {
    const extension = file.name.slice(file.name.lastIndexOf("."));
    if (!allowedExtensions.includes(extension)) {
      alert("Please upload a valid code file (.java, .cpp, .js, .py)");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = function (e) {
      const importedCode = e.target.result;
      setCode(importedCode);
      codeRef.current = importedCode;
    };
  } else {
    alert("No file selected");
  }
};


  const exportCode = () => {
    const codeValue = codeRef.current?.trim();

    if (!codeValue) {
      alert("Please type some code in the editor before exporting");
      return;
    }

    const codeBlob = new Blob([codeValue], { type: "text/plain" });
    const downloadUrl = URL.createObjectURL(codeBlob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `code.${fileExtensionMapping[language]}`;
    link.click();
  };

  const onChangeLanguage = (e) => {
    updateLanguage(fileId, folderId, e.target.value);
    setCode(getDefaultCode(fileId, folderId));
    setLanguage(e.target.value);
  };

  const onChangeTheme = (e) => {
    setTheme(e.currentTarget.value);
  };

  const onSaveCode = () => {
    saveCode(fileId, folderId, code);
    alert("Code saved successfully");
  };

  const onRunCode = () => {
    runCode({ code: codeRef.current, language });
  };

  
  const toggleEditTitle = () => {
    setIsEditingTitle(!isEditingTitle);
  };

  const handleTitleChange = (e) => {
    setCardTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    // Optional: Save title to backend/localStorage
  };

  return (
    <div
      className={`flex ${
        isFullScreen ? "fixed top-0 left-0 w-screen h-screen z-50" : "h-screen w-full"
      } overflow-hidden`}
    >
      {/* Code Editor */}
      <div className="flex-1 bg-[#1e1e1e] flex flex-col p-4">
        <div className="flex items-center justify-between mb-3">
          {/* Editable Title */}
          <div className="flex items-center gap-2 text-m font-semibold text-white tracking-wide">
            {isEditingTitle ? (
              <input
                className="bg-transparent border-b border-white text-white focus:outline-none"
                type="text"
                value={cardTitle}
                autoFocus
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleTitleBlur();
                }}
              />
            ) : (
              <>
                {cardTitle}
                <span className="text-m cursor-pointer" onClick={toggleEditTitle}>
                  <FiEdit />
                </span>
              </>
            )}
          </div>

          {/* Buttons Section */}
          <div className="ml-2 flex items-center gap-2 w-full">
            {/* Import Code Button */}
            <label className="flex items-center gap-3 border border-white px-2 py-1 hover:bg-white hover:text-black  rounded">
              <input type="file" style={{ display: "none" }} onChange={onUploadCode} />
              <CiImport size={18} /> Import
            </label>

            {/* Export Code Button */}
            <button
              className="flex items-center gap-1 text-white border border-white px-2 py-1 rounded hover:bg-white hover:text-black text-sm"
              onClick={exportCode}
            >
              <CiExport size={18} /> Export
            </button>

            {/* Full Screen Button */}
            <button
              className="flex items-center gap-1 text-white border border-white px-2 py-1 rounded hover:bg-white hover:text-black text-sm"
              onClick={toggleFullScreen}
            >
              {isFullScreen ? <MdFullscreenExit size={18} /> : <MdFullscreen size={18} />}
              {isFullScreen ? "Exit Full" : "Full Screen"}
            </button>

            {/* Save Button */}
            <button
              className="bg-blue-500 px-4 py-1 rounded-full hover:bg-blue-600 text-white text-sm font-medium"
              onClick={onSaveCode}
            >
              Save code
            </button>

            {/* Language Selector */}
            <select
              className="bg-white text-black px-2 py-1 rounded-md text-sm"
              onChange={onChangeLanguage}
              value={language}
            >
              <option value="cpp">cpp</option>
              <option value="java">java</option>
              <option value="python">python</option>
              <option value="javascript">javascript</option>
            </select>

            {/* Theme Selector */}
            <select
              onChange={onChangeTheme}
              value={theme}
              className="bg-white text-black px-2 py-1 rounded-md text-sm"
            >
              <option value="vs-dark">EditorDark</option>
              <option value="vs-light">EditorLight</option>
            </select>

            <div className="ml-auto">
              <button
                className="bg-green-500 px-4 py-1 rounded-full hover:bg-green-600 text-white text-sm font-medium"
                onClick={onRunCode}
              >
                Run Code
              </button>
            </div>
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="bg-black text-white rounded-md p-4 flex-1 overflow-auto">
          <Editor
            className="w-full h-full"
            language={language}
            options={editorOptions}
            theme={theme}
            onChange={onChnageCode}
            value={code}
          />
        </div>
      </div>
    </div>
  );
};
