import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { DatePicker } from '@/shared/components/ui/custom/DatePicker'
import { TransactionCreate, TransactionUpdate } from '@/shared/types/api'
import { useCategoryIndex } from '@/shared/hooks/categories'
import { useCountryIndex } from '@/shared/hooks/countries'
import { useCurrencyIndex } from '@/shared/hooks/currencies'
import { ReactNode } from 'react'
import CountryCombobox from './CountryCombobox'
import CurrencyCombobox from './CurrencyCombobox'

const DEFAULT_CATEGORY_ID = 6 // "Divers"

const formSchema = z.object({
  amount: z
    .union([z.number(), z.string().trim()])
    .transform((val) => (val === '' ? undefined : Number(val)))
    .pipe(
      z
        .number({
          required_error: 'Le montant est obligatoire.',
        })
        .positive({
          message: 'Le montant doit être positif.',
        }),
    ),
  name: z.string({
    required_error: 'Le nom est obligatoire.',
  }),
  category_id: z
    .number({
      required_error: 'La catégorie est obligatoire.',
    })
    .int(),
  date: z.date({
    required_error: 'La date est obligatoire.',
  }),
  currency: z
    .string({
      required_error: 'La devise est obligatoire.',
    })
    .default('EUR'),
  country_code: z.string({
    required_error: 'Le pays est obligatoire.',
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function TransactionForm<
  T extends TransactionCreate | TransactionUpdate,
>({
  children,
  defaultValues,
  onSubmitAction,
}: {
  children: ReactNode
  defaultValues: {
    amount?: number
    name?: string
    category_id?: number
    date?: string
    country_code?: string
    currency?: string
  }
  onSubmitAction: (values: T) => void
}) {
  const { data: categories = [] } = useCategoryIndex()
  const { data: countries = [] } = useCountryIndex()
  const { data: currencies = [] } = useCurrencyIndex()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: defaultValues?.amount ?? 0,
      name: defaultValues?.name ?? '',
      category_id: defaultValues?.category_id ?? DEFAULT_CATEGORY_ID,
      date: defaultValues?.date ? new Date(defaultValues.date) : new Date(),
      currency: defaultValues?.currency ?? 'EUR',
      country_code: defaultValues?.country_code,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    onSubmitAction({
      ...values,
      date: values.date?.toISOString(),
    } as unknown as T)
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Restaurant Paris" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Montant</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    {...field}
                    onChange={(event) => {
                      const value = event.target.value
                      field.onChange(value === '' ? '' : Number(value))
                    }}
                    onFocus={(event) => event.target.select()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormControl>
                  <CurrencyCombobox
                    currencies={currencies}
                    value={field.value}
                    onSelect={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.emoji}
                      <span className="ml-2">{category.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DatePicker form={form} name="date" label="Date" />
        <FormField
          control={form.control}
          name="country_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pays</FormLabel>
              <FormControl>
                <CountryCombobox
                  countries={countries}
                  value={field.value}
                  onSelect={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  )
}
