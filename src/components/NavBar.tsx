import logo from "../assets/Logo-blanco.png"

export const NavBar = () => {
  return (
    <nav 
      className='
        sticky top-0 z-10 
        flex items-center justify-between 
        w-full h-[65px] 
        py-4 px-9 
        bg-[#1E1B4D] text-white shadow-md
      '
    >
      {/* Lado Izquierdo */}
      <ul className='flex items-center gap-4'>
        <li className='font-semibold text-lg'>
          <img src={logo} alt="Logo" />
        </li>
      </ul>

      {/* Lado Derecho */}
      <ul className='flex items-center gap-4'>    
        <li className='flex items-center cursor-pointer'>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-yellow-300 flex items-center justify-center text-black font-semibold">
              U
            </div>
          </div>
        </li>
      </ul>
    </nav>
  )
}