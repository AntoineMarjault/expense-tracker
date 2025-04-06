'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { BiCalendar } from 'react-icons/bi'
import { cn } from '@/lib/utils'
import { PopoverClose } from '@radix-ui/react-popover'
import { TransactionCreate, TransactionUpdate } from '@/types/api'
import { useCategoryIndex } from '@/hooks/categories'
import { ReactNode } from 'react'

const DEFAULT_CATEGORY_ID = 6 // Divers

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

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
    onSubmitAction({
      ...values,
      date: values.date?.toISOString(),
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
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {formatDate(field.value)}
                      <BiCalendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <PopoverClose asChild>
                    <div>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </div>
                  </PopoverClose>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  )
}
