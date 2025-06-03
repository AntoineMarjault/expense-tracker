import { TravelStatistics } from '@/types/domain'
import { useCountryIndex } from '@/hooks/countries'
import TravelDetailCard from '@/components/features/travels/TravelDetailCard'
import { Skeleton } from '@/components/ui/skeleton'
import { formatAmount } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

interface TravelSpendingPerCountryProps {
  statistics: TravelStatistics
}

export const TravelSpendingPerCountrySkeleton = () => (
  <TravelDetailCard title="Moy. par jour par pays">
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  </TravelDetailCard>
)

const TravelSpendingPerCountry = ({
  statistics,
}: TravelSpendingPerCountryProps) => {
  const { data: countries = [] } = useCountryIndex()

  if (!statistics.average_daily_spending_per_country) {
    return null
  }

  const spendingEntries = Object.entries(
    statistics.average_daily_spending_per_country
  )
    .filter(([code]) => code !== 'null')
    .sort(([, a], [, b]) => b - a)

  const maxAmount = spendingEntries[0]?.[1] || 0

  return (
    <TravelDetailCard title="Moy. par jour par pays">
      <div className="space-y-4">
        {spendingEntries.map(([code, amount]) => {
          const country = countries.find((c) => c.code === code)
          const percentage = (amount / maxAmount) * 100
          const daysSpent = statistics.days_per_country[code]

          return (
            <div key={code} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{country?.flag}</span>
                  <div className="font-medium">
                    {country?.name || code}{' '}
                    <span className="text-sm text-muted-foreground">
                      - {daysSpent} jours
                    </span>
                  </div>
                </div>
                <span className="font-mono">{formatAmount(amount)}€</span>
              </div>
              <Progress value={percentage} className="h-1" />
            </div>
          )
        })}
      </div>
    </TravelDetailCard>
  )
}

export default TravelSpendingPerCountry
