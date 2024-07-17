import type { Size } from '@/interfaces';
import clsx from 'clsx';


interface Props {
  selectedSize: Size
  availableSizes: Size[]
}

export const SizeSelector = ({ availableSizes, selectedSize }: Props) => {
  return (
    <div className='mb-6'>
      <h3 className='font-bold mb-4'>Tallas disponibles</h3>

      {
        availableSizes.map(size => (
          <button className={
            clsx('font-medium pr-5 hover:font-bold hover:text-blue-700 transition-all',
              {
                'underline': size === selectedSize
              })
          }>
            <span>{size}</span>
          </button>
        ))
      }
    </div>
  )
}