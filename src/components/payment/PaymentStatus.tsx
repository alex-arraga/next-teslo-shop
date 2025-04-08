import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5"

interface Props {
  paid: boolean
  withBg?: boolean
  colorTxtPayed?: string
  colorTxtNotPayed?: string
}

export const PaymentStatus = ({ paid, withBg = false, colorTxtNotPayed, colorTxtPayed }: Props) => {
  const baseColorTxtPayed = (paid && colorTxtPayed ? colorTxtPayed : "text-green-800");
  const baseColorTxtNotPayed = (!paid && colorTxtNotPayed ? colorTxtNotPayed : "text-red-800");

  return (
    <div
      className={clsx(
        "flex justify-center items-center w-full",
        {
          "bg-red-200 dark:bg-red-400 p-2 rounded": !paid && withBg,
          "bg-green-200 dark:bg-green-400 dark:text-green-700 p-2 rounded": paid && withBg,
        }
      )}
    >
      <IoCardOutline className={clsx(paid ? baseColorTxtPayed : baseColorTxtNotPayed)} />
      <span className={clsx("mx-2", paid ? baseColorTxtPayed : baseColorTxtNotPayed)}>
        {paid ? "Pagada" : "No pagada"}
      </span>
    </div>
  );
};
