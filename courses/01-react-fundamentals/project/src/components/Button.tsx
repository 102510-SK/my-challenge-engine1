interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  id?: string
}

export default function Button({ children, onClick, type = 'button', variant = 'primary', disabled, id }: ButtonProps) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: '#4caf50', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
    secondary: { background: '#e0e0e0', color: '#333', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
    danger: { background: '#f44336', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  }
  return (
    <button id={id} type={type} onClick={onClick} disabled={disabled} style={styles[variant]}>
      {children}
    </button>
  )
}