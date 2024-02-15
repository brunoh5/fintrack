'use client'

import { useQuery } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { api } from '@/services/api'
import { AccountProps } from '@/types'

import { BalanceAccountSkeleton } from './balance-account-skeleton'

export function ManageAccount({ accountId }: { accountId: string }) {
	const { data: account, isLoading } = useQuery<AccountProps>({
		queryKey: ['accounts', accountId],
		queryFn: async () => {
			const session = await getSession()

			const response = await api.get(`/accounts/${accountId}`, {
				headers: {
					Authorization: `Bearer ${session?.user}`,
				},
			})

			return response.data.account
		},
	})

	return (
		<>
			{isLoading ? (
				<BalanceAccountSkeleton />
			) : (
				<CardContent className="grid grid-cols-3 gap-x-28 gap-y-10">
					<div>
						<p className="text-muted-foreground">Nome do Banco</p>
						<p className="text-lg font-bold">{account?.bank}</p>
					</div>
					<div>
						<p className="text-muted-foreground">Tipo da conta</p>
						<p className="text-lg font-bold">{account?.type}</p>
					</div>
					<div>
						<p className="text-muted-foreground">Saldo Atual</p>
						<p className="text-lg font-bold">
							{account &&
								new Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(account.balance)}
						</p>
					</div>
					<div>
						<p className="text-muted-foreground">Endereço</p>
						<p className="text-lg font-bold">Park Street Branch</p>
					</div>
					<div>
						<p className="text-muted-foreground">Numero da conta</p>
						<p className="text-lg font-bold">{account?.number}</p>
					</div>
				</CardContent>
			)}
			<CardFooter className="flex items-center gap-4">
				<Button size="lg">Editar Conta</Button>
				<Button size="lg" variant="ghost">
					Remove
				</Button>
			</CardFooter>
		</>
	)
}
