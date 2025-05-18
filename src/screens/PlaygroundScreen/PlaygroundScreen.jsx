import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import { CiImport, CiExport } from "react-icons/ci";
import { EditorContainer } from "./EditorContainer";
import { makeSubmission } from "./service";

// import { makeSubmission } from "./service";
export const PlaygroundScreen = () => {
  const [showLoader,setShowLoader] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { fileId, id } = params;

  const fileInputRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const onImportCode = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("text")) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (evt) => {
        setInputValue(evt.target.result);
      };
    } else {
      alert('Please import a valid text program file.');
    }
  };

  const onExportOutput = () => {
    if (!outputValue) {
      alert("Output is empty");
      return;
    }
    const blob = new Blob([outputValue], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const callback = ({ apiStatus, data, message }) => {
    if (apiStatus === "loading") {
      setShowLoader(true);
    } else {
      setShowLoader(false);
      if (apiStatus === "error") {
        setOutputValue("Something went wrong");
      } else {
        if (data.status.id === 3) {
          setOutputValue(atob(data.stdout || "") || "No Output");
        } else {
          setOutputValue(atob(data.stderr || "") || "Error Occurred");
        }
      }
    }
  };
  
  const runCode = useCallback(({code,language}) => {
    if (!code) {
      alert("Please write code before running");
      return;
    }
    makeSubmission({ code, language, stdin:inputValue, callback });
  }, [inputValue]);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="relative px-6 py-3 bg-gray-800 shadow-md flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <img src="/CodeVista-logo.png" alt="logo" className="h-15 w-15" />
          <h1 className="text-2xl font-bold">CodeVista</h1>
        </div>
        <button
          className="cursor-pointer absolute right-6 bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
          onClick={() => navigate("/")}
        >
          Sign Out
        </button>
      </div>

      {/* Body Split: Editor + Right Panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Editor */}
        <EditorContainer  fileId={fileId} folderId={id} runCode={runCode}/>

        {/* Right Panel */}
        <div className="w-1/3 bg-white text-black flex flex-col justify-between">
          {/* Input Section */}
          <div>
            <div className="flex justify-between items-center bg-[#EDEDED] p-2 rounded-t-md shadow-sm">
              <span className="font-bold">Input:</span>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <CiImport size={18} />
                <span>Import Input</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={onImportCode}
                  ref={fileInputRef}
                />
              </label>
            </div>
            <textarea
              className="w-full h-80 border border-gray-300 rounded-b-md p-2 mt-0 resize-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your code here..."
            ></textarea>
          </div>

          {/* Output Section */}
          <div className="mt-0">
            <div className="flex justify-between items-center bg-[#EDEDED] p-2 rounded-t-md shadow-sm">
              <span className="font-bold">Output:</span>
              <button
                className="flex items-center gap-2 text-sm"
                onClick={onExportOutput}
              >
                <CiExport size={18} />
                <span>Export Output</span>
              </button>
            </div>
            <textarea
              readOnly
              className="w-full h-32 border border-gray-300 rounded-b-md p-2 bg-white text-black overflow-auto"
              value={outputValue}
              placeholder="Output will appear here..."
            />
          </div>

          {/* Run Button */}
          {/* <div className="flex justify-end p-4">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
              onClick={runCode}
            >
              Run Code
            </button>
          </div> */}

          {showLoader && <div className="flex justify-center items-center h-screen">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        </div>}
        </div>
      </div>
    </div>
  );
};
