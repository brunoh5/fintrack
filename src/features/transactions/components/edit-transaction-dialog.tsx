import { Loader2 } from 'lucide-react'
import { z } from 'zod'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

import { useEditTransaction } from '../api/use-edit-transaction'
import { useGetTransaction } from '../api/use-get-transaction'
import { useOpenTransaction } from '../hooks/use-open-transaction'
import { formSchema, TransactionForm } from './transaction-form'

type FormValues = z.infer<typeof formSchema>

export function EditTransactionDialog() {
	const { isOpen, onClose, id } = useOpenTransaction()

	const { data: transactionResponse, isLoading } = useGetTransaction(id)
	const editMutation = useEditTransaction(id)

	const isPending = editMutation.isPending

	function onSubmit(values: FormValues) {
		editMutation.mutate(
			{
				...values,
				amount: Number(values.amount),
			},
			{
				onSuccess: () => {
					onClose()
				},
			},
		)
	}

	const defaultValues: FormValues = transactionResponse?.transaction
		? {
				shopName: transactionResponse.transaction.shopName,
				accountId: transactionResponse.transaction.accountId,
				amount: String(transactionResponse.transaction.amountInCents),
				category: transactionResponse.transaction.category,
				name: transactionResponse.transaction.name,
				payment_method: transactionResponse.transaction.payment_method,
				transaction_type: transactionResponse.transaction.transaction_type,
				created_at: new Date(transactionResponse.transaction.created_at),
			}
		: {
				shopName: '',
				accountId: '',
				amount: '',
				category: 'OTHERS',
				name: '',
				payment_method: 'MONEY',
				transaction_type: 'DEBIT',
				created_at: new Date(),
			}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar Transação</DialogTitle>
				</DialogHeader>
				{isLoading ? (
					<div className="absolute inset-0 flex items-center justify-center">
						<Loader2 className="size-4 animate-spin" />
					</div>
				) : (
					<TransactionForm
						id={id}
						onSubmit={onSubmit}
						disabled={isPending}
						defaultValues={defaultValues}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}