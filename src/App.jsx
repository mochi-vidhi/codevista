import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PlaygroundProvider } from "./Providers/PlaygroundProvider.jsx";
import { ModalProvider } from "./Providers/ModalProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomeScreen } from "./screens/HomeScreen/HomeScreen.jsx";
import { PlaygroundScreen } from "./screens/PlaygroundScreen/PlaygroundScreen.jsx";
import { Login } from "./components/LoginScreen/Login.jsx";
import { Ragister } from "./components/LoginScreen/Ragister.jsx";
import { LandingScreen } from "./components/LandingScreen/LandingScreen.jsx";
import { AuthProvider } from "@/context/AuthContext";

function App() {
  return (
    <AuthProvider>
    <PlaygroundProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingScreen/>}/>
            <Route path="/HomeScreen" element={<HomeScreen />} />
            <Route path="/LoginScreen" element={<Login />} />
            <Route path="/Ragister" element={<Ragister />} />
            <Route path="/HomeScreen" element={<HomeScreen />} />
            <Route path="/PlaygroundScreen/:fileId/:id" element={<PlaygroundScreen />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
    </AuthProvider>
  );
}

export default App;
