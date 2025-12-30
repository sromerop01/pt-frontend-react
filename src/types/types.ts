import type { ReactNode } from 'react'

export interface CreateActionProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export interface CreateActionsInputs {
  name: string
  description: string
  icon: FileList
  color: string
  isActive: boolean
}

export type LoginInputs = {
  email: string
  password: string
}

export interface TabProps {
  label: string
  children: ReactNode
}

export interface TabsProps {
  children: ReactNode
}

export interface TabItemProps {
  label: string
  children: ReactNode
}

export interface ActionItem {
  id: string
  name: string
  description: string
  icon: string
  color: string
  status: number
  createdAt: string
}
export interface ActionsResponse {
  data: {
    data: ActionItem[]
    pageNumber: number
    pageSize: number
    totalElements: number
    totalPages: number
  }
}

export interface LoginPayload {
  username: string
  password: string
}
export interface LoginResponse {
  token: string
}

export interface AuthContextType {
  token: string | null
  login: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
}