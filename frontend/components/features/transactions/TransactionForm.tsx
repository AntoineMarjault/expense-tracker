'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DatePicker } from '@/components/ui/custom/DatePicker'
import { TransactionCreate, TransactionUpdate } from '@/types/api'
import { useCategoryIndex } from '@/hooks/categories'
import { ReactNode, useState } from 'react'

const DEFAULT_CATEGORY_ID = 6 // Divers

const formSchema = z.object({
  amount: z
    .number({
      required_error: 'Amount is required.',
    })
    .positive({
      message: 'Amount must be a positive number.',
    }),
  name: z.string({
    required_error: 'Name is required.',
  }),
  category_id: z
    .number({
      required_error: 'Category is required.',
    })
    .int(),
  date: z.date({
    required_error: 'Date is required.',
  }),
  currency: z.literal('EUR').default('EUR'),
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
  defaultValues?: {
    amount: number
    name: string
    category_id: number
    date: string
  }
  onSubmitAction: (values: T) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { data: categories = [] } = useCategoryIndex()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: defaultValues?.amount ?? 0,
      name: defaultValues?.name ?? '',
      category_id: defaultValues?.category_id ?? DEFAULT_CATEGORY_ID,
      date: defaultValues?.date ? new Date(defaultValues.date) : new Date(),
      currency: 'EUR',
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    const localDate = new Date(values.date)
    const utcDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate()
      )
    )

    onSubmitAction({
      ...values,
      date: utcDate.toISOString(),
    } as T)
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
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montant</FormLabel>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="100"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  onFocus={() => field.onChange('')}
                  className="pr-6"
                />
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  €
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
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
        {children}
      </form>
    </Form>
  )
}
