'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Budget } from '@/types/domain'
import { DatePicker } from '@/components/ui/custom/DatePicker'

const budgetSchema = z.object({
  name: z.string().min(1, 'Le nom est obligatoire'),
  target_amount: z.string().transform((val) => parseFloat(val)),
  start_date: z.date({
    required_error: 'La date de début est obligatoire',
  }),
  end_date: z.date({
    required_error: 'La date de fin est obligatoire',
  }),
})

export type BudgetFormValues = z.infer<typeof budgetSchema>

const toUtcDate = (date: Date) => {
  const localDate = new Date(date)
  return new Date(
    Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate())
  )
}

export default function BudgetForm<
  T extends Partial<Omit<Budget, 'id'>> | Omit<Budget, 'id'>,
>({
  initialData,
  onSubmitAction,
}: {
  initialData?: Partial<Omit<Budget, 'id'>>
  onSubmitAction: (values: T) => void
}) {
  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      name: initialData?.name || '',
      target_amount: initialData?.target_amount,
      start_date: initialData?.start_date
        ? new Date(initialData.start_date)
        : new Date(),
      end_date: initialData?.end_date
        ? new Date(initialData.end_date)
        : new Date(),
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    onSubmitAction({
      ...values,
      start_date: toUtcDate(values.start_date).toISOString(),
      end_date: toUtcDate(values.end_date).toISOString(),
    } as T)
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Roadtrip van" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="target_amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DatePicker form={form} name="start_date" label="Date de début" />
        <DatePicker form={form} name="end_date" label="Date de fin" />
        <Button type="submit" className="w-full">
          {initialData ? 'Modifier' : 'Créer'}
        </Button>
      </form>
    </Form>
  )
}
