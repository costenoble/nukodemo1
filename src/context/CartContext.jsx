import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'nuko-cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function cartReducer(state, action) {
  let next
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.product.id)
      if (existing) {
        next = state.map(i =>
          i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
        )
      } else {
        next = [...state, { ...action.product, qty: 1 }]
      }
      break
    }
    case 'REMOVE':
      next = state.filter(i => i.id !== action.id)
      break
    case 'UPDATE_QTY':
      if (action.qty <= 0) {
        next = state.filter(i => i.id !== action.id)
      } else {
        next = state.map(i =>
          i.id === action.id ? { ...i, qty: action.qty } : i
        )
      }
      break
    case 'CLEAR':
      next = []
      break
    default:
      return state
  }
  saveCart(next)
  return next
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, null, loadCart)

  useEffect(() => {
    saveCart(items)
  }, [items])

  const addItem = (product) => dispatch({ type: 'ADD', product })
  const removeItem = (id) => dispatch({ type: 'REMOVE', id })
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = items.reduce((sum, i) => sum + (i.price || 0) * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
