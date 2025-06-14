import * as React from 'react'
import { BiSortAlt2, BiCheck } from 'react-icons/bi'
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
import { Country } from '@/shared/types/domain'

interface CountryComboboxProps {
  countries: Country[]
  value?: string
  onSelect: (value: string) => void
}

const CountryCombobox = ({
  countries,
  value,
  onSelect,
}: CountryComboboxProps) => {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const selectedCountry = countries.find((country) => country.code === value)

  const filteredCountries = countries
    .filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="flex items-center">
            {selectedCountry && (
              <span className="mr-2">{selectedCountry.flag}</span>
            )}
            {selectedCountry?.name ?? 'Sélectionner un pays'}
          </span>
          <BiSortAlt2 className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Rechercher un pays..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandEmpty>Aucun pays trouvé.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {filteredCountries.map((country) => (
              <CommandItem
                key={country.code}
                value={country.name}
                onSelect={() => {
                  onSelect(country.code)
                  setOpen(false)
                }}
              >
                <span className="mr-2">{country.flag}</span>
                {country.name}
                <BiCheck
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === country.code ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CountryCombobox
