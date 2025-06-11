import { Card } from '@/shared/components/ui/card'
import { formatAmount } from '@/lib/utils'

interface TransactionCardProps {
  amount: number
  amountInDefaultCurrency: number
  name: string
  categoryName: string
  categoryEmoji: string
  currency: string
}

const TransactionCard = ({
  amount,
  amountInDefaultCurrency,
  name,
  categoryName,
  categoryEmoji,
  currency,
}: TransactionCardProps) => (
  <Card className="mb-2 cursor-pointer px-6 py-2 transition-all duration-200 hover:shadow-md">
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div className="flex self-center text-2xl">{categoryEmoji}</div>
        <div className="flex flex-col">
          <span className="font-bold">{name}</span>
          <span className="text-xs text-gray-500">{categoryName}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-bold">
          {formatAmount(amountInDefaultCurrency)}€
        </span>
        {currency !== 'EUR' && (
          <span className="text-xs text-gray-500">
            {formatAmount(amount)} {currency}
          </span>
        )}
      </div>
    </div>
  </Card>
)

export default TransactionCard
