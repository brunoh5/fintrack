'use client'

import { useQuery } from '@tanstack/react-query'
import {
	ArrowDown,
	ArrowUp,
	Car,
	Clapperboard,
	Home,
	LayoutDashboard,
	ShoppingBag,
	Utensils,
} from 'lucide-react'
import { getSession } from 'next-auth/react'

import { fetchExpenses } from '@/app/api/fetch-expenses'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function ExpenseBreakdown() {
	const { data: expenses } = useQuery({
		queryKey: ['expenses'],
		queryFn: async () => {
			const session = await getSession()

			return fetchExpenses({ session })
		},
	})

	console.log(expenses?.FOOD)

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<h2 className="text-[22px]">Gastos do mês</h2>
					<span className="self-end font-medium text-muted-foreground">
						*Comparado ao mês anterior
					</span>
				</div>
			</CardHeader>
			<CardContent className="flex w-full flex-col gap-x-10 gap-y-6 rounded-lg lg:grid lg:grid-cols-3">
				<div className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2">
					<div className="flex h-14 w-12 items-center rounded-lg p-2">
						<Home />
					</div>
					<div className="flex items-center gap-4">
						<div className="flex flex-col">
							<span className="text-xs text-gray-500">Moradia</span>
							<p className="font-semibold">
								{expenses?.HOME &&
									expenses?.HOME.transactions[0].total.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})}
							</p>
							<div className="flex items-center gap-2">
								<span className="text-xs text-muted-foreground">
									{expenses?.HOME && expenses?.HOME.diffBetweenMonth}%
								</span>
								{expenses?.HOME && expenses?.HOME.diffBetweenMonth > 0 && (
									<ArrowUp className="text-primary" size={16} />
								)}

								{expenses?.HOME && expenses?.HOME.diffBetweenMonth < 0 && (
									<ArrowDown className="text-primary" size={16} />
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2">
					<div className="flex h-14 w-12 items-center rounded-lg p-2">
						<Utensils />
					</div>
					<div className="flex items-center gap-4">
						<div className="flex flex-col">
							<span className="text-xs text-gray-500">Alimentação</span>
							<p className="font-semibold">
								{expenses?.FOOD &&
									expenses?.FOOD.transactions[0].total.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})}
							</p>
							<div className="flex items-center gap-2">
								<span className="text-xs text-muted-foreground">
									{expenses?.FOOD && expenses?.FOOD.diffBetweenMonth}%
								</span>
								{expenses?.FOOD && expenses?.FOOD.diffBetweenMonth > 0 && (
									<ArrowUp className="text-primary" size={16} />
								)}

								{expenses?.FOOD && expenses?.FOOD.diffBetweenMonth < 0 && (
									<ArrowDown className="text-primary" size={16} />
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2">
					<div className="flex h-14 w-12 items-center rounded-lg p-2">
						<Car />
					</div>
					<div className="flex items-center gap-4">
						<div className="flex flex-col">
							<span className="text-xs text-gray-500">Moradia</span>
							<p className="font-semibold">
								{expenses?.TRANSPORT &&
									expenses?.TRANSPORT.transactions[0].total.toLocaleString(
										'pt-BR',
										{
											style: 'currency',
											currency: 'BRL',
										},
									)}
							</p>
							<div className="flex items-center gap-2">
								<span className="text-xs text-muted-foreground">
									{expenses?.TRANSPORT && expenses?.TRANSPORT.diffBetweenMonth}%
								</span>
								{expenses?.TRANSPORT &&
									expenses?.TRANSPORT.diffBetweenMonth > 0 && (
										<ArrowUp className="text-primary" size={16} />
									)}

								{expenses?.TRANSPORT &&
									expenses?.TRANSPORT.diffBetweenMonth < 0 && (
										<ArrowDown className="text-primary" size={16} />
									)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2">
					<div className="flex h-14 w-12 items-center rounded-lg p-2">
						<Clapperboard />
					</div>
					<div className="flex items-center gap-4">
						<div className="flex flex-col">
							<span className="text-xs text-gray-500">Entretenimento</span>
							<p className="font-semibold">
								{expenses?.ENTERTAINMENT &&
									expenses?.ENTERTAINMENT.transactions[0].total.toLocaleString(
										'pt-BR',
										{
											style: 'currency',
											currency: 'BRL',
										},
									)}
							</p>
							<div className="flex items-center gap-2">
								<span className="text-xs text-muted-foreground">
									{expenses?.ENTERTAINMENT &&
										expenses?.ENTERTAINMENT.diffBetweenMonth}
									%
								</span>
								{expenses?.ENTERTAINMENT &&
									expenses?.ENTERTAINMENT.diffBetweenMonth > 0 && (
										<ArrowUp className="text-primary" size={16} />
									)}

								{expenses?.ENTERTAINMENT &&
									expenses?.ENTERTAINMENT.diffBetweenMonth < 0 && (
										<ArrowDown className="text-primary" size={16} />
									)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2">
					<div className="flex h-14 w-12 items-center rounded-lg p-2">
						<ShoppingBag />
					</div>
					<div className="flex items-center gap-4">
						<div className="flex flex-col">
							<span className="text-xs text-gray-500">Compras</span>
							<p className="font-semibold">
								{expenses?.SHOPPING &&
									expenses?.SHOPPING.transactions[0].total.toLocaleString(
										'pt-BR',
										{
											style: 'currency',
											currency: 'BRL',
										},
									)}
							</p>
							<div className="flex items-center gap-2">
								<span className="text-xs text-muted-foreground">
									{expenses?.SHOPPING && expenses?.SHOPPING.diffBetweenMonth}%
								</span>
								{expenses?.SHOPPING &&
									expenses?.SHOPPING.diffBetweenMonth > 0 && (
										<ArrowUp className="text-primary" size={16} />
									)}

								{expenses?.SHOPPING &&
									expenses?.SHOPPING.diffBetweenMonth < 0 && (
										<ArrowDown className="text-primary" size={16} />
									)}
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-[3rem_1fr_1.5rem] items-center px-4 py-2">
					<div className="flex h-14 w-12 items-center rounded-lg p-2">
						<LayoutDashboard />
					</div>
					<div className="flex items-center gap-4">
						<div className="flex flex-col">
							<span className="text-xs text-gray-500">Outros</span>
							<p className="font-semibold">
								{expenses?.OTHERS &&
									expenses?.OTHERS.transactions[0].total.toLocaleString(
										'pt-BR',
										{
											style: 'currency',
											currency: 'BRL',
										},
									)}
							</p>
							<div className="flex items-center gap-2">
								<span className="text-xs text-muted-foreground">
									{expenses?.OTHERS && expenses?.OTHERS.diffBetweenMonth}%
								</span>
								{expenses?.OTHERS && expenses?.OTHERS.diffBetweenMonth > 0 && (
									<ArrowUp className="text-primary" size={16} />
								)}

								{expenses?.OTHERS && expenses?.OTHERS.diffBetweenMonth < 0 && (
									<ArrowDown className="text-primary" size={16} />
								)}
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
