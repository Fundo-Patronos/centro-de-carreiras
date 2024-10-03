import Link from "next/link";

export function Button({
  href,
  children,
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-4 py-2 font-semibold rounded-lg transition ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
