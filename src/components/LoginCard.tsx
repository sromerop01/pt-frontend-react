import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { authApi } from "../api/auth.api"
import { useAuth } from "../hooks/useAuth"
import type { LoginInputs } from '../types/types'
import Logo from '../assets/Logo-be-kind.png'
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
  
export const LoginCard = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const {
        register, 
        handleSubmit, 
        formState: { errors, isValid }, 
    } = useForm<LoginInputs>({mode: "onChange", })

    const onSubmit = async (data: LoginInputs) => {
      try {
        setLoading(true)
        setError("")

        const response = await authApi.login({
          username: data.email,
          password: data.password,
        })
        
        let token = ""

        if (typeof response === 'string') {
            token = response
        } else if (response?.token) {
            token = response.token
        }

        if (!token) {
          throw new Error("No se recibió un token válido")
        }

        login(token) 
        navigate("/")

      } catch (err: any) {
        const mensaje = err.response?.data?.message || "Usuario y/o contraseña incorrectos"
        setError(mensaje)
      } finally {
        setLoading(false)
      }
    }


    return (
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-[2rem] shadow-xl border border-gray-100 mx-4">
          
          {/* Logo Placeholder */}
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="Be Kind Logo" className="h-12 w-auto" />
          </div>

          <h2 className="text-xl font-semibold text-center text-gray-800 mb-8 leading-tight">
            ¡Empieza a conectar tu comunidad ante buenas acciones!
          </h2>

          {/* Mensaje de error */}
          {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                  <AlertCircle size={18} />
                  <span>{error}</span>
              </div>
          )}

          {/* Formulario de Login */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Campo Correo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico*
              </label>
              <div className="relative">
                <span className={`absolute inset-y-0 left-0 pl-3 flex items-center text-blue-500
                  ${errors.email ? "text-red-500" : "text-blue-500"}`}>
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  placeholder="Ingresar correo"
                  disabled={loading}
                  {...register("email", {
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Correo inválido",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100
                      ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                />
              </div>
              {/* Mensaje error validación */}
              {errors.email && <span className="text-xs text-red-500 ml-1">{errors.email.message}</span>}
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña*
              </label>
              <div className="relative">
                <span className={`absolute inset-y-0 left-0 pl-3 flex items-center
                  ${errors.password ? "text-red-500" : "text-blue-500"}`}>
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  disabled={loading}
                  {...register("password", { required: "La contraseña es obligatoria" })}
                  className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all disabled:bg-gray-100
                    ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-xs text-red-500 ml-1">{errors.password.message}</span>}
            </div>

            <div className="text-center">
              <a href="#" className="text-sm text-blue-900 font-semibold underline underline-offset-4 hover:text-blue-700">
                Recuperar contraseña
              </a>
            </div>

            {/* Botón Ingresar */}
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`
                w-full py-2 rounded-md font-bold transition-colors duration-300 flex justify-center items-center gap-2
                ${isValid && !loading
                  ? 'bg-blue-900 hover:bg-blue-800 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}>
              {loading ? <Loader2 className="animate-spin" size={20}/> : "Ingresar"}
            </button>
          </form>
      </div>
    )
}