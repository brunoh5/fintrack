import Link from 'next/link'
import { Suspense } from 'react'
import { AccountList } from './account-list'
import { AccountListSkeleton } from './account-list-skeleton'
import { Balance } from './balance'

export type Account = {
	id: string
	type: string
	number: string
	balance: number
}

export function TotalBalance() {
	return (
		<div className="w-full">
			<h2 className="mb-2 text-[22px] text-gray-500">Balanço Geral</h2>
			<div className="flex h-[232px] w-full flex-col gap-3 rounded-lg bg-white px-6 py-5">
				<div className="flex items-center justify-between border-b border-[#F3F3F3] pb-3">
					<Balance />
					<Link href="/balances" className="text-xs text-gray-900">
						Todas as contas
					</Link>
				</div>

				<Suspense fallback={<AccountListSkeleton />}>
					<AccountList />
				</Suspense>
			</div>
		</div>
	)
}
