
const API_URL = "https://dev.api.bekindnetwork.com/api/v1";

export interface ActionItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  status: number;
  createdAt: string;
}
export interface ActionsResponse {
  data: {
    data: ActionItem[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  }
}

export const actionsApi = {
  getActions: async (token: string, pageNumber: number = 1, pageSize: number = 10): Promise<ActionsResponse> => {
  
    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    const response = await fetch(`${API_URL}/actions/admin-list?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Error al cargar las acciones");
    }

    const data: ActionsResponse = await response.json();
    return data
  },
};