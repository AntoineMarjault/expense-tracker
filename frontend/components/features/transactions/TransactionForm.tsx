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
import { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { BiX } from 'react-icons/bi'

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
        })
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
  currency: z.literal('EUR').default('EUR'),
  tags: z.array(z.string()).default([]),
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
    tags: string[]
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
      tags: defaultValues?.tags ?? [],
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
                  onChange={(event) => {
                    const value = event.target.value
                    field.onChange(value === '' ? '' : Number(value))
                  }}
                  onFocus={(event) => event.target.select()}
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
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                        <button
                          type="button"
                          className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          onClick={() =>
                            field.onChange(field.value.filter((t) => t !== tag))
                          }
                        >
                          <BiX className="h-3 w-3" />
                          <span className="sr-only">Supprimer {tag}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="Ajouter un tag..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                          e.preventDefault()
                          const newTag = e.currentTarget.value.trim()
                          if (newTag && !field.value.includes(newTag)) {
                            field.onChange([...field.value, newTag])
                            e.currentTarget.value = ''
                          }
                        }
                      }}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      Appuyer sur Entrée ↵
                    </span>
                  </div>
                </div>
              </FormControl>
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
