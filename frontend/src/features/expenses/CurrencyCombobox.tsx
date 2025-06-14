import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/shared/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'

interface CurrencyComboboxProps {
  currencies: string[]
  value?: string
  onSelect: (value: string) => void
}

const CurrencyCombobox = ({
  currencies,
  value,
  onSelect,
}: CurrencyComboboxProps) => {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const filteredCurrencies = React.useMemo(() => {
    return currencies
      .filter((currency) =>
        currency.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 5)
  }, [currencies, search])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[110px] justify-between"
        >
          {value || 'EUR'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[110px] p-0">
        <Command>
          <CommandInput
            placeholder="Rechercher..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>Aucune devise trouvée</CommandEmpty>
          <CommandGroup>
            {filteredCurrencies.map((currency) => (
              <CommandItem
                key={currency}
                value={currency}
                onSelect={(value) => {
                  onSelect(value)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === currency ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {currency}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CurrencyCombobox
