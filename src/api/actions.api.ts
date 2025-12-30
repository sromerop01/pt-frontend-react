
import type { ActionsResponse } from "../types/types"

const API_URL = "https://dev.api.bekindnetwork.com/api/v1"

export const actionsApi = {
  getActions: async (token: string, pageNumber: number = 1, pageSize: number = 10): Promise<ActionsResponse> => {
  
    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    })

    const response = await fetch(`${API_URL}/actions/admin-list?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })

    if (!response.ok) {
      throw new Error("Error al cargar las acciones")
    }

    const data: ActionsResponse = await response.json()
    return data
  },

  createAction: async (token: string, actionData: FormData): Promise<void> => {
    const response = await fetch(`${API_URL}/actions/admin-add`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: actionData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Error al crear la acción")
    }
    
    return
  },
}