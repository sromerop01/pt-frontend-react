import React, {type ReactNode, useState } from "react"
import type { TabsProps, TabItemProps } from "../types/types"

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0)

  const tabElements = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<TabItemProps> => React.isValidElement(child)
  )

  return (
    <div className="w-full">
      {/* Contenedor de los títulos de las pestañas */}
      <ul className="flex flex-row gap-8 border-b border-gray-200">
        {tabElements.map((child, index) => {
          const isActive = index === activeTab
          
          return (
            <li
              key={index}
              onClick={() => setActiveTab(index)}
              className={`
                relative cursor-pointer pb-2 text-lg transition-all duration-200
                ${isActive ? "text-slate-900 font-bold" : "text-gray-400 font-medium hover:text-gray-600"}
              `}
            >
              {child.props.label}

              {isActive && (
                <div className="absolute bottom-0 left-0 h-[3px] w-full bg-slate-900 rounded-t-md" />
              )}
            </li>
          )
        })}
      </ul>

      {/* Contenido de la pestaña */}
      <div className="py-6">
        {tabElements[activeTab]?.props.children}
      </div>
    </div>
  )
}