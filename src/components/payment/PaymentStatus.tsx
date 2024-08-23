import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5"

interface Props {
  paid: boolean
}

export const PaymentStatus = ({ paid }: Props) => {
  return (
    <div className="flex justify-center items-center w-full">
      <IoCardOutline className={
        clsx({
          "text-red-800": !paid,
          "text-green-800": paid
        })}
      />
      <span className={
        clsx(
          'mx-2',
          {
            "text-red-800": !paid,
            "text-green-800": paid
          }
        )}
      >
        {paid ? 'Pagada' : 'No pagada'}
      </span>
    </div>
  )
}