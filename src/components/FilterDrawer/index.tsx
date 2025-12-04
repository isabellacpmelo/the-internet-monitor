import { useEffect } from 'react'
import { Filters } from '../Filters'
import type { InternetData } from '../../types/filters'
import './style.css'

interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  data: InternetData[]
  onReset: () => void
}

export function FilterDrawer({
  isOpen,
  onClose,
  data,
  onReset,
}: FilterDrawerProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className='filter-drawer-overlay'>
      <div
        className='filter-drawer-backdrop'
        onClick={onClose}
        aria-label='Fechar filtros'
      />

      <div className='filter-drawer'>
        <div className='filter-drawer-header'>
          <h3 className='filter-drawer-title'>
            <i className='bi bi-funnel-fill mr-2' />
            Filtros de Dados
          </h3>
          <div className='filter-drawer-actions'>
            <button
              type='button'
              onClick={onReset}
              className='filter-reset-btn'
              title='Resetar todos os filtros'>
              <i className='bi bi-arrow-counterclockwise' />
              <span>Resetar</span>
            </button>
            <button
              type='button'
              onClick={onClose}
              className='filter-close-btn'
              title='Fechar filtros'>
              <i className='bi bi-x-lg' />
            </button>
          </div>
        </div>

        <div className='filter-drawer-content'>
          <Filters data={data} />
        </div>
      </div>
    </div>
  )
}
