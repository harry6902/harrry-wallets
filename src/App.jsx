import { useState } from 'react'
import './App.css'
import Header from '../Components/Header';
import { Wallet } from '../Components/Wallet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [isDark,setIsDark] =useState(false);
  return (
  
    <div className={`${isDark ? "dark" : "light"}`}>
      <div className='min-h-screen bg-primary text-black dark:bg-primary-dark dark:text-white  '>
       <div className='mx-0 xl:mx-[25vw]'>
       <Header isDark={isDark} setIsDark={setIsDark} />
       <Wallet isDark={isDark} />
       </div>
   </div>
   <ToastContainer />
   </div>
 
  )
}

export default App
