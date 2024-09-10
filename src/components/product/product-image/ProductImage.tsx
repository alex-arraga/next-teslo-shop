import Image from "next/image"

interface Props {
  src?: string,
  alt: string,
  width: number,
  height: number,
  priority?: boolean,
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style'],
}

export const ProductImage = ({
  alt,
  height,
  priority = false,
  width,
  className,
  src,
  style
}: Props) => {

  const customSrc = (src) ? src.startsWith('http') ? src
    : `/products/${src}`
    : '/imgs/placeholder.jpg';

  return (
    <Image
      priority={priority}
      src={customSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  )
}