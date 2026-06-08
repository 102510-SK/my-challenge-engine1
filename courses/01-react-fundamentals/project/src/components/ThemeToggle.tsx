import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button id="theme-toggle" onClick={toggleTheme} style={{ marginBottom: '1rem', padding: '6px 12px', cursor: 'pointer' }}>
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  )
}