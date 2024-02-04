import React, { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [charAllowed, setAllowedChar] = useState(false);
  const [digitAllowed, setAllowedDigit] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(charAllowed) str += "!@#$%^&*()_-+={}~`[]'";
    if(digitAllowed) str += "1234567890";
    for(let i = 1; i <= length; i++) {
      let charIdx = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(charIdx);
    }
    setPassword(pass);
    
  },[length,digitAllowed,charAllowed,setPassword])

  useEffect(() => {
    generatePassword()
  },[length,digitAllowed,charAllowed,generatePassword])

const copyPassword = useCallback(() => {
  setIsClicked(true);
  setTimeout(() => {
    setIsClicked(false);
  }, 200);
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
    toast("Copied");
},[password])

  return (
    <>
      <div className='w-full h-screen bg-black flex flex-col  justify-center items-center'>
          <div className='flex flex-col items-center bg-slate-700 max-w-xl h-44 rounded-xl shadow-lg p-4'>
            <h2 className='text-black font-bold text-2xl mb-4'>Password Generator</h2>
            <div className='text-white'>
              <input 
                type="text"
                placeholder='Password'
                value={password}
                readOnly
                className='w-96 px-2 py-1 rounded-lg outline-none text-black font-semibold' 
                ref={passwordRef}
              />
              <button
              onClick={copyPassword}
              className={`clickable-button ${isClicked ? 'clicked' : ''}`}
              >Copy</button>
            </div>

            <div className='flex px-4 py-2 gap-4'>
            <div className=''>
            <input 
              type="range"
              min={8}
              max={30}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className='cursor-pointer'
            />
            <label className='mx-2 text-white font-semibold' >Length: {length}</label>
          </div>
      
          <div >
              <input 
                type="checkbox"
                defaultChecked={digitAllowed}
                id='numberInput'
                onChange={() => setAllowedDigit((prev) => !prev)}
              />
              <label className='mx-2 text-white font-semibold' htmlFor="numberInput">Numbers</label>
          </div>

              <div>
                  <input 
                    type="checkbox"
                    defaultChecked={charAllowed}
                    id='charInput'
                  onChange={() => setAllowedChar((prev) => !prev)}
                  />
                  <label className='mx-2 text-white font-semibold' htmlFor="charInput">Characters</label>
              </div>
            
            </div>
            
          </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition: Bounce
      />
    </>
  )
}

export default App
