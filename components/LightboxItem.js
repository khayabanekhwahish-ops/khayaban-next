'use client'

import { useEffect } from 'react'
import { useState } from 'react'
import Icon from './Icon'

export default function LightboxItem({ src, alt, className = 'gallery-item', children }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    document.body.classList.add('no-scroll')
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('no-scroll')
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button type="button" className={className} aria-label={`Open image: ${alt}`} onClick={() => setOpen(true)}>
        {children}
      </button>
      {open && (
        <div className="lightbox" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
          <button aria-label="Close image" onClick={() => setOpen(false)}><Icon name="x" /></button>
          <img src={src} alt={alt} />
        </div>
      )}
    </>
  )
}
