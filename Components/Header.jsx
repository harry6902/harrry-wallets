


import React from 'react'

const Header = ({isDark,setIsDark}) => {
  return (
    <div className='flex justify-between items-center pt-5 '>
    <div className='text-3xl font-bold'>
      Harrry's Wallet
    </div>
     
  <div className='cursor-pointer' onClick={()=>{setIsDark(!isDark)}}>
   {
    isDark && <div className='flex justify-center items-center gap-1'> <svg width="40" height="20" viewBox="0 0 45 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="45" height="24" rx="12" fill="white" stroke="black"/>
    <circle cx="33" cy="12" r="9" fill="black"/>
  </svg>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

<circle cx="12" cy="12" r="5" fill="white"/>


<line x1="12" y1="1" x2="12" y2="4" stroke="white" stroke-width="2"/>
<line x1="12" y1="20" x2="12" y2="23" stroke="white" stroke-width="2"/>

<line x1="1" y1="12" x2="4" y2="12" stroke="white" stroke-width="2"/>
<line x1="20" y1="12" x2="23" y2="12" stroke="white" stroke-width="2"/>

<line x1="4.5" y1="4.5" x2="6.5" y2="6.5" stroke="white" stroke-width="2"/>
<line x1="17.5" y1="17.5" x2="19.5" y2="19.5" stroke="white" stroke-width="2"/>

<line x1="17.5" y1="6.5" x2="19.5" y2="4.5" stroke="white" stroke-width="2"/>
<line x1="4.5" y1="19.5" x2="6.5" y2="17.5" stroke="white" stroke-width="2"/>
</svg>

  </div>
  
   }
   {
    !isDark && <div className='flex justify-center items-center gap-1'><svg width="40" height="20" viewBox="0 0 45 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="45" height="24" rx="12" fill="black"/>
    <circle cx="12" cy="12" r="9" fill="white"/>
  </svg>
  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
  d="M21 12.8C20.2 13.1 19.3 13.3 18.4 13.3C14.6 13.3 11.5 10.2 11.5 6.4C11.5 5.5 11.7 4.6 12 3.8C8.5 4.8 6 8 6 11.8C6 16.4 9.6 20 14.2 20C18 20 21.2 17.5 22.2 14C21.8 14.2 21.4 14.4 21 14.5V12.8Z"
  fill="black"
/>
</svg>


  </div>
  
   }

  </div>

  </div> 
  )
}

export default Header
