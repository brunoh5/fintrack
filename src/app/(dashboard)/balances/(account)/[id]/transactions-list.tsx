'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { getSession } from 'next-auth/react'

import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { apiBackend } from '@/lib/axios-backend'
import { TransactionProps } from '@/types'

const transactionType = {
	sent: 'Enviada',
	received: 'Recebida',
}

const paymentMethods = {
	money: 'Dinheiro',
	PIX: 'Pix',
	credit_card: 'Cartão de credito',
	debit_card: 'Cartão de debito',
	bank_check: 'Cheque Bancário',
	bank_transfer: 'Transferência Bancária',
}

type Type = keyof typeof transactionType
type Method = keyof typeof paymentMethods

export function TransactionsList({ accountId }: { accountId: string }) {
	const { data: transactions } = useQuery<TransactionProps[]>({
		queryKey: [accountId, 'transactions'],
		queryFn: async () => {
			const session = await getSession()

			const response = await apiBackend.get(`/transactions/${accountId}/all`, {
				headers: {
					Authorization: `Bearer ${session?.access_token}`,
				},
			})

			return response.data.transactions
		},
	})

	return (
		<TableBody>
			{transactions?.map((transaction, index) => (
				<TableRow key={index}>
					<TableCell className="text-left">
						{format(transaction.created_at, 'dd MMM, yyyy')}
					</TableCell>
					<TableCell className="text-center">
						{transactionType[transaction.transaction_type as Type]}
					</TableCell>
					<TableCell className="text-center">
						{paymentMethods[transaction.payment_method as Method]}
					</TableCell>
					<TableCell className="text-center font-bold">
						{new Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						}).format(transaction.amount)}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}
