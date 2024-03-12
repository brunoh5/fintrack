'use client'

import { useQuery } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { apiBackend } from '@/lib/axios-backend'
import { TransactionProps } from '@/types'

import { Transaction } from './components/transaction'
import { TransactionListSkeleton } from './transaction-list-skeleton'

export function TransactionsList() {
	const { data: transactions, isLoading } = useQuery<TransactionProps[]>({
		queryKey: ['recent-transactions'],
		queryFn: async () => {
			const session = await getSession()

			const response = await apiBackend.get('/users/transactions', {
				headers: { Authorization: `Bearer ${session?.access_token}` },
			})

			return response.data.transactions
		},
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
