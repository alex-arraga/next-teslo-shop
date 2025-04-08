import Link from "next/link"

interface Props {
  title: string,
  href: string,
  icon: React.ReactNode
  closeMenu: () => void;
}

export const SidebarOption = ({ href, icon, title, closeMenu }: Props) => {
  return (
    <Link
      href={href}
      onClick={closeMenu}
      className="flex items-center mb-4 sm:mb-6 p-2 hover:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-slate-600 shadow-lg rounded transition-all"
    >
      {icon}
      <span className="ml-2 sm:ml-3 text-sm md:text-base">{title}</span>
    </Link>
  )
}