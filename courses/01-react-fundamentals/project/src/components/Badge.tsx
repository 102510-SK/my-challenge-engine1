interface BadgeProps {
  children: React.ReactNode
  variant?: 'tag' | 'category' | 'priority'
}

export default function Badge({ children, variant = 'tag' }: BadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    tag: { padding: '2px 6px', background: '#e0e0e0', borderRadius: '4px', fontSize: '0.8rem', marginRight: '4px' },
    category: { padding: '2px 8px', background: '#bbdefb', borderRadius: '4px', fontSize: '0.8rem', marginRight: '4px' },
    priority: { padding: '2px 8px', background: '#fff9c4', borderRadius: '4px', fontSize: '0.8rem', marginRight: '4px' },
  }
  return <span style={styles[variant]}>{children}</span>
}
