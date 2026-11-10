import { useEffect } from 'react';
import assets from '../assets/assets';


const ThemeToggleBtn = ({theme, setTheme}) => {
    useEffect(()=> {
        const preferDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches; // this returns a boolean value
        setTheme(theme || (preferDarkMode ? 'dark' : 'light'))
    }, [])

    useEffect(()=>{
        if(theme === 'dark'){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    }, [theme])
    return (
        <div>
            <button>
                {theme == 'dark'? ( <img onClick={()=> setTheme('light')} src={assets.sun_icon} alt="" className='size-8 p-1.5 border border-gray-500 rounded-full' /> ) : ( <img onClick={()=> setTheme('dark')} src={assets.moon_icon} alt="" className='size-8 p-1.5 border border-gray-500 rounded-full' />) }
            </button>
        </div>
    );
};


export default ThemeToggleBtn;