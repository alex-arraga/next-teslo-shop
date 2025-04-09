import type { Size } from '@/interfaces';
import clsx from 'clsx';


interface Props {
  selectedSize?: Size
  availableSizes: Size[]
  onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({ availableSizes, selectedSize, onSizeChanged }: Props) => {
  return (
    <div className='mb-6'>
      <h3 className='font-bold mb-4'>Tallas disponibles</h3>

      {
        availableSizes.map(size => (
          <button
            key={size}
            onClick={() => onSizeChanged(size)}
            className={
              clsx('font-medium mr-5 p-2 hover:font-bold hover:underline transition-all bg-neutral-200 hover:bg-blue-600 hover:text-white dark:bg-neutral-700 dark:hover:bg-blue-700 w-12 rounded ',
                {
                  'bg-neutral-800 dark:bg-blue-800 transition-all text-white': size === selectedSize
                })
            }>
            <span>{size}</span>
          </button>
        ))
      }
    </div>
  )
}