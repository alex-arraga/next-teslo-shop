import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, className, subtitle }: Props) => {
  return (
    <>
      <h1 className={`${titleFont.className} font-bold my-6 text-2xl sm:text-4xl ${className}`}>
        {title}
      </h1>

      {subtitle && (
        <h3>{subtitle}</h3>
      )}
    </>
  )
}