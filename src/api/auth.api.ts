import type { LoginPayload, LoginResponse } from "../types/types";

const API_URL = "https://dev.apinetbo.bekindnetwork.com/api";

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    
    const response = await fetch(`${API_URL}/Authentication/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw { 
        response: { 
          data: errorData || { message: "Error en la solicitud" },
          status: response.status 
        } 
      };
    }

    const textResponse = await response.text();

    try {
        const jsonResponse = JSON.parse(textResponse);
        if (jsonResponse.token) return jsonResponse;
        return { token: jsonResponse }
    } catch {
        return { token: textResponse }
    }
  },
};