'use client'

import { useQuery } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { api } from '@/lib/axios'
import { TransactionProps } from '@/types'

import { Transaction } from './components/transaction'

export function Expenses() {
	const { data: transactions } = useQuery<TransactionProps[]>({
		queryKey: ['recent-transactions', 'expenses'],
		queryFn: async () => {
			const session = await getSession()

			const response = await api.get('/users/transactions?type=sent', {
				headers: { Authorization: `Bearer ${session?.user}` },
			})

			return response.data.transactions
		},
	})

	return (
		<div className="flex flex-1 flex-col divide-y divide-[#F3F3F3] pb-2">
			{transactions?.map((transaction) => (
				<Transaction key={transaction.id} transaction={transaction} />
			))}
		</div>
	)
}
