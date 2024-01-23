'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export interface NavLinkProps extends LinkProps {
	children: ReactNode
}

export function NavLink(props: NavLinkProps) {
	const pathname = usePathname()

	return (
		<Link
			data-current={pathname === props.href}
			className="flex items-center gap-3 rounded px-4 py-3 text-muted-foreground transition-colors hover:bg-white/[0.08] data-[current=true]:bg-primary data-[current=true]:text-muted"
			{...props}
		>
			{props.children}
		</Link>
	)
}