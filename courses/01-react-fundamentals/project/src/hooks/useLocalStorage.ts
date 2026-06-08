import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      if (item !== null) return JSON.parse(item) as T
    } catch {
      // parse error — use initial
    }
    return initialValue
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // storage error — ignore
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage