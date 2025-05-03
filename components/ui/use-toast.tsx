"use client"

import * as React from "react"
import { createContext, useContext, useState } from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
  duration?: number
}

type Toast = ToastProps & {
  id: string
}

type ToastContextType = {
  toasts: Toast[]
  addToast: (props: ToastProps) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = React.useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, ...props }

    setToasts((prev) => [...prev, newToast])

    if (props.duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        removeToast(id)
      }, props.duration || 3000)
    }
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-md shadow-lg animate-in slide-in-from-right-full ${
              toast.variant === "destructive"
                ? "bg-red-500 text-white"
                : toast.variant === "success"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            {toast.description && <div className="text-sm mt-1">{toast.description}</div>}
            <button
              onClick={() => removeToast(toast.id)}
              className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-200/20"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Create toast functions that require the context to be passed
export const toast = {
  default: (props: Omit<ToastProps, "variant">, context: ToastContextType) => {
    context.addToast({ ...props, variant: "default" })
  },
  destructive: (props: Omit<ToastProps, "variant">, context: ToastContextType) => {
    context.addToast({ ...props, variant: "destructive" })
  },
  success: (props: Omit<ToastProps, "variant">, context: ToastContextType) => {
    context.addToast({ ...props, variant: "success" })
  },
}