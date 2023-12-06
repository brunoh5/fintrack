'use client'

import { TransactionProps } from '@/@types/transaction'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { Transaction } from './components/transaction'

export function TransactionsList() {
	const token = Cookies.get('token')

	const { data: transactions } = useQuery<TransactionProps[]>({
		queryKey: ['recent-transactions'],
		queryFn: async () => {
			const response = await api.get('/users/transactions', {
				headers: { Authorization: `Bearer ${token}` },
			})

			console.log(response.data.transactions)

			return response.data.transactions
		},
		staleTime: 1000 * 60 * 5,
	})

	return (
		<div className="flex flex-1 flex-col divide-y divide-[#F3F3F3] pb-2">
			{transactions?.map((transaction, index) => {
				console.log(transaction)
				return <Transaction key={index} transaction={transaction} />
			})}
		</div>
	)
}