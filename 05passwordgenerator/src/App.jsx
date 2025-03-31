import { useState ,useCallback,useEffect,useRef} from 'react'


function App() {
  const [length,setLength]=useState(8)
  const [num,setNum]=useState(false)
  const[char,setChar]=useState(false)
  const [password,setPassword]=useState("")

  //useRef hook
  const passwordRef=useRef(null)
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num)str+="0123456789"
    if(char)str+="!@#$%^&*"
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1) 
      pass+=str.charAt(char)  
     }
     setPassword(pass)
  },[length,num,char,setPassword])  

  const copytoclip=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password)
  },[password])

 useEffect(()=>{passwordGenerator()},[length,num,char,passwordGenerator])

  return (
    <>
    <h1 className=" text-4xl px-80 py-10 text-center text-white font-bold underline">
      Password Generator
    </h1>
    <div className='w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 my-8 test-orange-500 bg-gray-700'>
      <div className='flex shadow rounded lg overflow-hidden mb-4'>
        <input
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly 
        ref={passwordRef}
        />
        <button 
        onClick={copytoclip}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
          copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex-items-center gap-x-1'>
          <input 
          type="range" 
          min={8}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label className='text-white px-3 py-0.5'>length:{length}</label>
        </div>

        <div className='flex-items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={num}
          id="numberInput"

          onChange={()=>{setNum((prev)=>!prev);

          }}
          />
          <label className='text-white px-3 py-0.5'>Numbers</label>
        </div>

        <div className='flex-items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={char}
          id="numberInput"

          onChange={()=>{setChar((prev)=>!prev);

          }}
          />
          <label className='text-white px-3 py-0.5'>Characters</label>
        </div>
      </div>
    </div>

      
    </>
  )
}

export default App
