import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { actionsApi} from "../../api/actions.api"
import { CreateAction } from "../../components/CreateAction"
import type { ActionItem } from "../../types/types"
import { 
  Search, Filter, Pencil, Trash2, Eye, 
  ChevronLeft, ChevronRight, Loader2, AlertCircle, ChevronsLeft, ChevronsRight, ChevronsUpDown
} from "lucide-react"

export const BakanesActions = () => {
    const { token } = useAuth()
  
    // Estados de Datos
    const [actions, setActions] = useState<ActionItem[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalElements, setTotalElements] = useState(0)
  
    // Estados de UI
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [pageSize, setPageSize] = useState(10)
    const [showModal, setShowModal] = useState(false)

    // Cargar datos
    const fetchActions = async () => {
        if (!token) return
        setLoading(true)
        setError(null)

        try {
            const response = await actionsApi.getActions(token, page, pageSize)

            const list = response.data.data || []
            const pages = response.data.totalPages || 0
            const total = response.data.totalElements || 0

            setActions(list)
            setTotalPages(pages)
            setTotalElements(total)

        } catch (err) {
            //console.error(err)
        setError("No se pudieron cargar las acciones. Verifica tu conexión.")
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchActions()
    }, [page, token, pageSize])

    // Helper para formatear fecha
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: 'numeric', month: 'short', day: 'numeric'
        })
    }

    //Refrescar lista tras crear nueva acción
    const handleCreateSuccess = () => {
        fetchActions()
    }

    return (
        <div className="w-full p-8 bg-white min-h-screen">
        
            <h1 className="text-[32px] font-bold text-black mb-6 tracking-tight font-archivo">
                Listado de Acciones
            </h1>

            {/* BUSQUEDA Y FILTROS */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-blue-600" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Buscar acciones..." 
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <button className="flex items-center gap-2 text-sm font-bold text-[#1E1B4D] hover:text-blue-800">
                        <Filter size={16} strokeWidth={2.5} />
                        Filtros
                    </button>
                </div>
                <button className="bg-[#1E1B4D] text-white text-sm font-medium px-6 py-2.5 rounded hover:bg-[#2a2666] transition shadow-sm"
                onClick={() => setShowModal(true)}>
                    Crear tipo de acción
                </button>
            </div>

            {/* Formulario Creacion de Acción */}
            {showModal && (
                <CreateAction
                    isOpen={showModal} 
                    onClose={() => setShowModal(false)} 
                    onSuccess={handleCreateSuccess}
                />
            )}
            
            {/* TABLA DE DATOS */}
            <div className="border border-gray-200 rounded-sm overflow-hidden">
                
                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center h-64 bg-gray-50">
                        <Loader2 className="animate-spin text-blue-900" size={40} />
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="flex justify-center items-center h-64 bg-red-50 text-red-600 gap-2">
                        <AlertCircle /> {error}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && actions.length === 0 && (
                    <div className="flex justify-center items-center h-64 bg-gray-50 text-gray-500">
                        No hay acciones disponibles.
                    </div>
                )}

                {/* TABLA DE DATOS */}
                {!loading && !error && actions.length > 0 && (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase tracking-wide">
                            <tr>
                                <th className="px-4 py-3 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center justify-between group">
                                        <span>Nombre de la acción</span>
                                        <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-600" />
                                    </div>
                                </th>

                                <th className="px-4 py-3 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center justify-between group">
                                        <span>Icono de la acción</span>
                                        <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-600" />
                                    </div>
                                </th>

                                <th className="px-4 py-3 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center justify-between group">
                                        <span>Estado</span>
                                        <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-600" />
                                    </div>
                                </th>

                                <th className="px-4 py-3 border border-gray-200 w-1/4 cursor-pointer hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center justify-between group">
                                        <span>Descripción</span>
                                        <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-600" />
                                    </div>
                                </th>

                                <th className="px-4 py-3 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center justify-between group">
                                        <span>Fecha de creación</span>
                                        <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-600" />
                                    </div>
                                </th>

                                <th className="px-4 py-3 border border-gray-200 text-center bg-gray-50">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700 bg-white">
                            {actions.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                                    
                                    {/* Nombre */}
                                    <td className="px-6 py-4 font-bold text-gray-800">
                                        {item.name}
                                    </td>

                                    {/* Icono  */}
                                    <td className="px-6 py-4">
                                        <div 
                                            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-100 shadow-sm overflow-hidden"
                                            style={{ backgroundColor: item.color || '#f3f4f6' }}
                                        >
                                            <img 
                                                src={item.icon} 
                                                alt={item.name} 
                                                className="w-6 h-6 object-contain mix-blend-multiply" 
                                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                            />
                                        </div>
                                    </td>

                                    {/* Estado */}
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center justify-center px-3 py-1 h-[28px] w-[118px] rounded-l text-xs font-bold uppercase border
                                            ${item.status === 1 
                                                ? "bg-green-100 text-green-700 border-green-200" 
                                                : "bg-gray-100 text-gray-600 border-gray-200"
                                            }`}>
                                            {item.status === 1 ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>

                                    {/* Descripción (Truncada) */}
                                    <td className="px-6 py-4 text-gray-600 truncate max-w-xs" title={item.description}>
                                        {item.description}
                                    </td>

                                    {/* Fecha */}
                                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                        {formatDate(item.createdAt)}
                                    </td>

                                    {/* Acciones */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3 text-gray-400">
                                            <button className="hover:text-blue-900 transition-colors"><Pencil size={18} /></button>
                                            <button className="hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                                            <button className="hover:text-blue-600 transition-colors"><Eye size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* PAGINACIÓN FOOTER */}
                {!loading && !error && (
                    <div className="flex items-center justify-center gap-6 px-4 py-3 border-t text-sm text-gray-600 select-none">
                        
                        <span>Resultados por página</span>
                        <select 
                            className="border rounded px-2 py-1 outline-none focus:border-blue-500"
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value))
                                setPage(1)
                            }}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                        </select>
                        <span>
                            {totalElements === 0 ? 0 : (page - 1) * pageSize + 1} 
                            {' - '} 
                            {Math.min(page * pageSize, totalElements)} 
                            {' de '} 
                            {totalElements}
                        </span>

                        <span 
                            onClick={() => setPage(1)}
                            className={`cursor-pointer font-bold text-lg ${page === 1 ? 'text-gray-300 pointer-events-none' : 'hover:text-black'}`}
                            title="Primera página"
                        >
                            <ChevronsLeft size={16} />
                        </span>

                        <span 
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className={`cursor-pointer font-bold text-lg ${page === 1 ? 'text-gray-300 pointer-events-none' : 'hover:text-black'}`}
                            title="Página anterior"
                        >
                            <ChevronLeft size={16} />
                        </span>

                        <span 
                            onClick={() => setPage(p => p + 1)}
                            className={`cursor-pointer font-bold text-lg ${page >= totalPages ? 'text-gray-300 pointer-events-none' : 'hover:text-black'}`}
                            title="Página siguiente"
                        >
                            <ChevronRight size={16} />
                        </span>

                        <span 
                            onClick={() => setPage(totalPages)}
                            className={`cursor-pointer font-bold text-lg ${page >= totalPages ? 'text-gray-300 pointer-events-none' : 'hover:text-black'}`}
                            title="Última página"
                        >
                            <ChevronsRight size={16} />
                        </span>

                    </div>
                )}
            </div>
        </div>
    )
}