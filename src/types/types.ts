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
  label: string;
  children: ReactNode;
}

export interface TabsProps {
  children: ReactNode;
}

export interface TabItemProps {
  label: string;
  children: ReactNode;
}