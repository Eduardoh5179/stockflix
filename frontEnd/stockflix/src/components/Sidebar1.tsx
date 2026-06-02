import { Home, History, LogOut, Boxes, SquareSplitVertical, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { logout } = useAuth();

  const handleLogout = () => {

    try {
      logout();
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <aside className={`h-full w-64 bg-(--sideBarBackground) fixed text-gray-100 flex flex-col border-r transition-all duration-400 dark:bg-(--bgDarkColor) border-white/10 top-0 ${isOpen ? "w-64" : "w-0 -translate-x-full"} z-60`}>
      {/* <div className="p-6 text-xl font-bold border-b border-white/10">
        Stock<span className="text-blue-500">Flix</span>
      </div> */}

      <nav className="flex-1 p-4 mt-18 overflow-y-auto custom-scrollbar">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white group">
              <span className="text-gray-400 "><Home size={18} /></span>
              <span className="font-semibold">Dashboard</span>
            </Link>
            <Link to="/Products" className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white group">
              <span className="text-gray-400 "><Boxes size={18} /></span>
              <span className="font-semibold">Products</span>
            </Link>
            <Link to="/History" className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white group">
              <span className="text-gray-400 "><History size={18} /></span>
              <span className="font-semibold">Histórico</span>
            </Link>
            <Link to="/Sectors" className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white group">
              <span className="text-gray-400 "><SquareSplitVertical size={18} /></span>
              <span className="font-semibold">Setores</span>
            </Link>
            <Link to="/Users" className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white group">
              <span className="text-gray-400 "><UserRound size={18} /></span>
              <span className="font-semibold">Usuários</span>
            </Link>
          </li>
        </ul>
      </nav>


      <div className="p-4 border-t border-white/10 dark:bg-(--bgDarkColor)">
        <button onClick={handleLogout} className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer">
          <LogOut size={18} />
          <span className="font-semibold">Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;