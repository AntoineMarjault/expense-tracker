import { Card } from '@/components/ui/card'

interface TransactionCardProps {
  amount: number
  name: string
  date: string
  categoryName: string
  categoryEmoji: string
}

const TransactionCard = ({
  amount,
  name,
  date,
  categoryName,
  categoryEmoji,
}: TransactionCardProps) => (
  <Card className="cursor-pointer hover:shadow-md transition-all duration-200 mb-2 px-6 py-2">
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div className="flex self-center text-2xl">{categoryEmoji}</div>
        <div className="flex flex-col">
          <span className="font-bold">{name}</span>
          <span className="text-xs text-gray-500">{categoryName}</span>
        </div>
      </div>
      <span className="font-bold">{amount}€</span>
    </div>
    <p className="mt-2 text-xs text-gray-500">{date}</p>
  </Card>
)

export default TransactionCard
