import { Menu } from 'lucide-react'
import Logo from '../assets/logo.svg'

interface HeaderProps {
  onMenuClick: () => void;
}
function Header({ onMenuClick }: HeaderProps) {


  return (
    <>
       <header className="w-full top-0 sticky z-99 flex items-center p-4 md:p-8 h-16 md:h-18 border-b bg-white border-(--borderColor)">
            <div className="flex gap-4 md:gap-6 items-center">
                <button onClick={onMenuClick} className="relative flex items-center justify-center cursor-pointer before:content-['']  before:absolute  before:m-auto before:flex before:items-center before:justify-center before:w-0 before:h-0 before:rounded-full before:bg-zinc-300 before:z-[-1] hover:before:w-8 hover:before:h-8"> 
                    <Menu size={20}/>
                </button>
                {/* <img src={Logo} className="font-bold text-lg md:text-xl"> stockflix </img> */}
                <img src={Logo} className='w-8 md:w-10 ' alt="logo" />
            </div>
       </header>
    </>
  )
}

export default Header