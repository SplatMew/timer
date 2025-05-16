import React from "react";


export default function TopBar(){

    const handleClose=()=>{
        window.electron.ipcRenderer.send('close-window');

    };

    const handleMinimize=()=>{
        window.electron.ipcRenderer.send('minimize-window');

    }

    return(
        <div className="rounded-t-xl overflow-hidden bg-blue-400 w-screen h-7 flex justify-between items-center">
            <div className="h-7 flex-grow"
                 style={{WebkitAppRegion:"drag"}}>
            </div>
            <div id="control-buttons" className="flex items-center h-full">
                <button id="minimize-button" 
                    className=" text-stone-200 px-3 h-full flex items-center justify-center hover:bg-blue-300 hover:text-black" 
                    onClick={handleMinimize}>
                        &#128469;
                </button>
                <button 
                    id="close-button"  
                    className= "text-stone-200 px-3 h-full flex items-center justify-center hover:bg-red-700 hover:text-black" 
                    onClick={handleClose}>
                        &#x2715;
                </button>
            </div>
        </div>
    )
}