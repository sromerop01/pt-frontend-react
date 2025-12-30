import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/Logo-color-bg.png";
import { 
  House, ChartSpline, Users, BadgeDollarSign, 
  Store, CircleStar, SquareMousePointer, Package2,
  LogOut
} from "lucide-react";



const menuItems = [
  { label: "Home", icon: House, path: "/" },
  { label: "Impacto Social", icon: ChartSpline, path: "/social-impact" },
  { label: "Comunidad", icon: Users, path: "/community" },
  { label: "Sponsors", icon: BadgeDollarSign, path: "/sponsors" },
  { label: "Marketplace", icon: Store, path: "/marketplace" },
  { label: "Bakanes", icon: CircleStar, path: "/bakanes" },
  { label: "Contenidos", icon: SquareMousePointer, path: "/content" },
  { label: "Categorias de acciones", icon: Package2, path: "/categories-actions" },
];

export const Sidebar = () => {

  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-white h-[calc(100vh-65px)] border-r border-gray-200 flex flex-col fixed left-0 top-[65px] overflow-y-auto">
      
      {/* Logo */}
      <img src={Logo} alt="Logo BeKind" />

      {/* Navegación */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  relative flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors duration-200
                  ${isActive 
                    ? "bg-teal-50 text-slate-800 border-l-4 border-teal-500"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                  }
                `}
              >
                
                <item.icon size={20} strokeWidth={1.5} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer con Cerrar Sesión */}
      <div className="p-4 mt-auto mb-4">
        <button className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors w-full"
          onClick={logout}>
            <LogOut size={20} />
            <span>Cerrar sesión</span>
        </button>
      </div>

    </aside>
  );
};