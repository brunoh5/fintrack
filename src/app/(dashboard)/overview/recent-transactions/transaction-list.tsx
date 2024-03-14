'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchUsersTransactions } from '@/app/api/fetch-users-transactions'

import { Transaction } from './components/transaction'
import { TransactionListSkeleton } from './transaction-list-skeleton'

export function TransactionsList() {
	const { data: transactions, isLoading } = useQuery({
		queryKey: ['users', 'transactions'],
		queryFn: async () =>
			await fetchUsersTransactions({
				query: 'limit=5',
			}),
	})

	return (
		<div className="flex flex-1 flex-col divide-y divide-[#F3F3F3] pb-2">
			{isLoading ? (
				<TransactionListSkeleton />
			) : transactions?.length === 0 ? (
				<p>Nenhuma transação cadastrada no momento</p>
			) : (
				transactions?.map((transaction, index) => (
					<Transaction key={index} transaction={transaction} />
				))
			)}
		</div>
	)
}
