import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Upload, Loader2 } from 'lucide-react'

interface CreateActionProps {
  isOpen?: boolean
  onClose: () => void
}

interface Inputs {
  name: string
  description: string
  icon: FileList
  color: string
  isActive: boolean
}

//paleta de colores permitidos
const PRESET_COLORS = [
  '#EF4444', // Rojo
  '#F97316', // Naranja
  '#F59E0B', // Ámbar
  '#10B981', // Esmeralda
  '#06B6D4', // Cian
  '#3B82F6', // Azul
  '#6366F1', // Índigo
  '#8B5CF6', // Violeta
  '#EC4899', // Rosa
  '#64748B', // Slate
]

export const CreateAction: React.FC<CreateActionProps> = ({ isOpen = true, onClose}) => {

    const {
        register,
        watch,
        setValue,
        handleSubmit, 
        formState: { errors, isValid }, 
    } = useForm<Inputs>({mode: "onChange", })

    const descriptionValue = watch("description") || "";
    const logoFileList = watch("icon");
    const selectedColor = watch("color");
    const [loading, setLoading] = useState(false)

    const onSubmit = ( data: any) => {
        setLoading(true)
        console.log(data)
    }

    if (!isOpen) return null

    return (
        // Overlay fondo oscuro
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

            {/* Contenedor de crear acciones*/}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative">
                
                {/* Header */}
                <div className="flex justify-between items-center p-6 pb-4">
                    <h2 className="text-xl font-bold text-[#1E1B4D]">Crear accion</h2>
                </div>

                {/* Body del Formulario */}
                <div className="p-6 pt-2 space-y-5">
                    
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">
                            Nombre de la accion*
                        </label>
                        <input
                            type="text"
                            placeholder="Escribe el nombre de la buena acción"
                            {...register("name", { required: "El nombre es obligatorio" })}
                            disabled={loading}
                            className={`w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
                            
                        />
                        {errors.name && (
                            <span className="text-xs text-red-500 mt-1">{errors.name.message as string}</span>
                        )}
                    </div>

                    {/* Descripción con contador */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">
                            Descripción de la buena acción*
                        </label>
                        <div className="relative">
                            <textarea
                                maxLength={200}
                                rows={3}
                                placeholder="Agregar descripción"
                                className={`w-full border rounded-lg px-4 py-2.5 resize-none outline-none transition peer
                                    ${errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
                                {...register("description", {
                                    required: "La descripción es obligatoria",
                                    maxLength: { value: 200, message: "Máximo 200 caracteres" }
                                })}
                            ></textarea>
                            
                            {/* Contador de caracteres*/}
                            <div className="text-right text-xs text-gray-500 mt-1">
                                <span className={descriptionValue.length > 180 ? 'text-orange-500 font-bold' : ''}>
                                    {descriptionValue.length}
                                </span>
                                /200
                            </div>
                            
                            {errors.description && (
                                <span className="text-xs text-red-500 absolute -bottom-5 left-0">
                                    {errors.description.message as string}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Logo/Icono */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">
                            Icono*
                        </label>
                        <label className={`flex items-center justify-between w-full border border-gray-300 rounded-lg px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition group ${errors.icon ? "border-red-500 bg-red-50" : "border-gray-300"}`}>

                            <span className={`text-sm truncate ${logoFileList && logoFileList.length > 0 ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                                {logoFileList && logoFileList.length > 0 
                                    ? logoFileList[0].name
                                    : "Carga archivo"
                                }
                            </span>

                            <Upload size={18} className="text-gray-500 group-hover:text-indigo-500 transition"/>

                            <input 
                                type="file" 
                                accept="image/*"
                                className="hidden"
                                {...register("icon", { 
                                    required: "Debes subir un logo o imagen" 
                                })}
                            />
                        </label>

                        {errors.icon && (
                            <span className="text-xs text-red-500 mt-1 block">
                                {errors.icon.message as string}
                            </span>
                        )}

                    </div>

                    {/* Selector de Color */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Color*
                        </label>
                        
                        {/* Contenedor del mapa de colores */}
                        <div className={`flex flex-wrap gap-3 p-2 border rounded-lg transition
                            ${errors.color ? "border-red-500 bg-red-50" : "border-gray-200"}
                        `}>
                            {PRESET_COLORS.map((colorHex) => {
                                
                                const isSelected = selectedColor === colorHex;
                                
                                return (
                                    <button
                                        key={colorHex}
                                        type="button"
                                        
                                        onClick={() => {
                                            setValue("color", colorHex, { 
                                                shouldValidate: true
                                            });
                                        }}
                                        
                                        style={{ backgroundColor: colorHex }}
                                        
                                        className={`w-8 h-8 rounded-full transition-all duration-200 focus:outline-none 
                                            ${isSelected 
                                                ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110 shadow-sm' 
                                                : 'hover:scale-105 hover:shadow-sm ring-1 ring-black/5'
                                            }
                                        `}
                                        aria-label={`Seleccionar color ${colorHex}`}
                                    />
                                );
                            })}
                        </div>

                        <input 
                            type="hidden" 
                            {...register("color", { 
                                required: "Debes seleccionar un color" 
                            })} 
                        />

                        <div className="flex justify-between items-start mt-1 h-5">
                            {/* Muestra el color seleccionado en texto */}
                            {selectedColor && (
                                <p className="text-xs text-gray-500">Seleccionado: {selectedColor}</p>
                            )}
                            
                            {errors.color && (
                                <span className="text-xs text-red-500 ml-auto">
                                    {errors.color.message as string}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Switch Activo */}
                    <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer relative">
                            
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                {...register("isActive")} // <--- ¡Esto es todo lo que necesitas!
                            />

                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer 
                                peer-checked:after:translate-x-full peer-checked:after:border-white 
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                                peer-checked:bg-teal-500"
                            ></div>

                            <span className="ml-3 text-sm font-medium text-gray-700">
                                Activo
                            </span>
                        </label>
                    </div>

                    {/* Footer Botones */}
                    <div className="p-6 pt-2 flex gap-3 border-t border-gray-100 mt-2">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-indigo-900 text-indigo-900 rounded-lg font-medium hover:bg-indigo-50 transition"
                        >
                            Cancelar
                        </button>

                        <button
                            disabled={!isValid || loading}
                            className={`flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-lg font-medium transition text-white
                                ${isValid && !loading
                                    ? 'bg-blue-900 hover:bg-blue-800 text-white cursor-pointer'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }
                            `}>
                            {loading ? <Loader2 className="animate-spin" size={20}/> : "Crear"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}