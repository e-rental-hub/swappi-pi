import React, { SetStateAction } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

interface PopupProps {
  children: React.ReactNode;
  header: string;
  toggle: boolean; 
  setToggle: React.Dispatch<SetStateAction<boolean>>
  useMask?: boolean;
  hideReset?: boolean
}

function Popup({ children, header, toggle, setToggle, useMask, hideReset=false }: PopupProps) {

  return (
    <>
    <div className={`absolute top-0 left-0 w-full h-full z-0 bg-background text-foreground  opacity-75 ${
        toggle ? '' : 'hidden'
        }`}
        onClick={()=>{useMask && setToggle(false)}}
    ></div>
    
    <div
        className={`h-[calc(100vh-150px)] fixed bottom-0 left-1/2 bg-background text-foreground transform -translate-x-1/2 w-full md:mx-auto rounded-t-3xl px-6 pb-6 ease-linear transition-transform z-10 overflow-y-auto ${
          toggle ? 'translate-y-0' : 'translate-y-full'
        }`}
    >
        <div className="sticky top-0 pt-6">
            <div className="h-px bg-[#234F68] w-16 mx-auto mb-4"></div>
            <div className="flex items-center justify-between">
                <p className="font-[Raleway] font-bold">{header}</p>
                { !hideReset && <button className="px-4 py-2 rounded-full bg-[#234F68] bg-background text-foreground text-sm">reset</button>}
            </div>
        </div>
      {children}
    </div>
    </>
  );
}

export default Popup;