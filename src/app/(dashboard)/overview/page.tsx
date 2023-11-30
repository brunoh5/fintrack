import { Header } from '@/components/ui/header'
import { UpcomingBill } from '@/components/upcoming-bill'
import { Suspense } from 'react'
import { ExpenseBreakdown } from './expense-breakdown'
import { MonthlyGoal } from './monthly-goal'
import { RecentTransaction } from './recent-transaction'
import { Statistics } from './statistics'
import { TotalBalance } from './total-balance'

export default function Dashboard() {
  return (
    <div className="flex w-screen flex-col">
      <Header hasName />
      <main className="relative flex flex-col gap-8  pb-8 pl-6 pr-8 pt-4">
        <div className="flex items-center justify-between gap-6">
          {/* Top Content */}
          <Suspense>
            <TotalBalance />
          </Suspense>
          <Suspense>
            <MonthlyGoal />
          </Suspense>
          <Suspense>
            <UpcomingBill />
          </Suspense>
        </div>

        <div className="flex justify-between gap-6">
          {/* Bottom Content */}
          <Suspense>
            <RecentTransaction />
          </Suspense>

          <div className="flex flex-1 flex-col gap-8">
            <Suspense>
              <Statistics />
            </Suspense>
            <Suspense>
              <ExpenseBreakdown />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
