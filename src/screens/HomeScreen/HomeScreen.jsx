import "./index.scss"
import { FaPlus } from "react-icons/fa";
import { RightComponent } from "./RightScreen/RightComponent";
import Logo from "/public/CodeVista-logo.png"
export const HomeScreen = ()=>{
    return(
    <div className="home-container">
        <div className="left-container">
            <div className="items-container">
            <img src={Logo}/>
            <h1>CodeVista</h1>
            <h2>Code.Compile.Debug.</h2>
            <button><FaPlus/> Create Playground</button>
            </div>
        </div>
        <RightComponent/>
    </div>
    )
    
}