import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5"

interface Props {
  paid: boolean
  withBg?: boolean
}

export const PaymentStatus = ({ paid, withBg = false }: Props) => {
  return (
    <div className={clsx(
      "flex justify-center items-center w-full",
      {
        "bg-red-200 p-2 rounded": !paid && withBg,
        "bg-green-200 p-2 rounded": paid && withBg
      }
    )}>
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