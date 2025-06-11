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
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Travel } from '@/shared/types/domain'
import { DatePicker } from '@/shared/components/ui/custom/DatePicker'

const travelSchema = z.object({
  name: z.string().min(1, 'Le nom est obligatoire'),
  target_amount: z.string().transform((val) => parseFloat(val)),
  start_date: z.date({
    required_error: 'La date de début est obligatoire',
  }),
  end_date: z.date({
    required_error: 'La date de fin est obligatoire',
  }),
  categories: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        color: z.string(),
        emoji: z.string(),
      }),
    )
    .optional(),
})

export type TravelFormValues = z.infer<typeof travelSchema>

const toUtcDate = (date: Date) => {
  const localDate = new Date(date)
  return new Date(
    Date.UTC(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate(),
    ),
  )
}

export default function TravelForm<
  T extends Partial<Omit<Travel, 'id'>> | Omit<Travel, 'id'>,
>({
  initialData,
  onSubmitAction,
}: {
  initialData?: Partial<Omit<Travel, 'id'>>
  onSubmitAction: (values: T) => void
}) {
  const form = useForm<TravelFormValues>({
    resolver: zodResolver(travelSchema),
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
                  placeholder="20"
                  {...field}
                  onFocus={(event) => event.target.select()}
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
