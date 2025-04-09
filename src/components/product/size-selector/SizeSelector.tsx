import type { Size } from '@/interfaces';
import clsx from 'clsx';


interface Props {
  selectedSize?: Size
  availableSizes: Size[]
  onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({ availableSizes, selectedSize, onSizeChanged }: Props) => {
  return (
    <div className='mt-4'>
      <h3 className='text-sm font-medium'>Available sizes</h3>

      {
        availableSizes.map(size => (
          <button
            key={size}
            onClick={() => onSizeChanged(size)}
            className={
              clsx('font-medium mr-3 my-2 sm:mr-5 p-2 hover:font-bold transition-all bg-neutral-200 hover:bg-blue-600 hover:text-white dark:bg-neutral-700 dark:hover:bg-blue-700 w-12 rounded flex-wrap',
                {
                  'bg-sky-800 dark:bg-sky-800 text-white': size === selectedSize
                })
            }>
            <span className='text-sm sm:text-base'>{size}</span>
          </button>
        ))
      }
    </div>
  )
}