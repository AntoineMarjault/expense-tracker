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
import { useTagIndex } from '@/hooks/tags'
import { useCategoryIndex } from '@/hooks/categories'
import { useState } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { BiCheck } from 'react-icons/bi'
import { cn } from '@/lib/utils'

const budgetSchema = z.object({
  name: z.string().min(1, 'Le nom est obligatoire'),
  target_amount: z.string().transform((val) => parseFloat(val)),
  start_date: z.date({
    required_error: 'La date de début est obligatoire',
  }),
  end_date: z.date({
    required_error: 'La date de fin est obligatoire',
  }),
  tags: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .optional(),
  categories: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        color: z.string(),
        emoji: z.string(),
      })
    )
    .optional(),
})

export type BudgetFormValues = z.infer<typeof budgetSchema>

const toUtcDate = (date: Date) => {
  const localDate = new Date(date)
  return new Date(
    Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate())
  )
}

//todo: extract the tags and categories multiselect into a dedicated component

export default function BudgetForm<
  T extends Partial<Omit<Budget, 'id'>> | Omit<Budget, 'id'>,
>({
  initialData,
  onSubmitAction,
}: {
  initialData?: Partial<Omit<Budget, 'id'>>
  onSubmitAction: (values: T) => void
}) {
  const { data: availableTags, isLoading: isLoadingTags } = useTagIndex()
  const { data: availableCategories, isLoading: isLoadingCategories } =
    useCategoryIndex()
  const [tagsOpen, setTagsOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  console.log({ initialData })

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
      tags: initialData?.tags || [],
      categories: initialData?.categories || [],
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
        <div className="space-y-4 rounded-lg border p-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Filtres de transactions</div>
            <div className="text-sm text-muted-foreground">
              Les transactions seront incluses si elles ont AU MOINS un des tags
              OU une des catégories sélectionnés
            </div>
          </div>
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Popover open={tagsOpen} onOpenChange={setTagsOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        disabled={isLoadingTags}
                      >
                        {isLoadingTags ? (
                          'Chargement...'
                        ) : (field.value || []).length > 0 ? (
                          <div className="flex gap-1 flex-wrap">
                            {(field.value || []).map((tag) => (
                              <Badge variant="secondary" key={tag.id}>
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          'Sélectionner des tags...'
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Rechercher un tag..." />
                        <CommandEmpty>Aucun tag trouvé.</CommandEmpty>
                        <CommandGroup>
                          {isLoadingTags ? (
                            <CommandItem disabled>Chargement...</CommandItem>
                          ) : availableTags?.length === 0 ? (
                            <CommandItem disabled>
                              Aucun tag disponible
                            </CommandItem>
                          ) : (
                            availableTags?.map((tag) => (
                              <CommandItem
                                key={tag.id}
                                onSelect={() => {
                                  const newValue = field.value?.some(
                                    (t) => t.id === tag.id
                                  )
                                    ? field.value.filter((t) => t.id !== tag.id)
                                    : [...(field.value || []), tag]
                                  field.onChange(newValue)
                                }}
                              >
                                <BiCheck
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    field.value?.some((t) => t.id === tag.id)
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {tag.name}
                              </CommandItem>
                            ))
                          )}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm font-medium text-muted-foreground">
              OU
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégories</FormLabel>
                <FormControl>
                  <Popover
                    open={categoriesOpen}
                    onOpenChange={setCategoriesOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        disabled={isLoadingCategories}
                      >
                        {isLoadingCategories ? (
                          'Chargement...'
                        ) : (field.value || []).length > 0 ? (
                          <div className="flex gap-1 flex-wrap">
                            {(field.value || []).map((category) => (
                              <Badge variant="secondary" key={category.id}>
                                {category.emoji} {category.name}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          'Sélectionner des catégories...'
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Rechercher une catégorie..." />
                        <CommandEmpty>Aucune catégorie trouvée.</CommandEmpty>
                        <CommandGroup>
                          {isLoadingCategories ? (
                            <CommandItem disabled>Chargement...</CommandItem>
                          ) : availableCategories?.length === 0 ? (
                            <CommandItem disabled>
                              Aucune catégorie disponible
                            </CommandItem>
                          ) : (
                            availableCategories?.map((category) => (
                              <CommandItem
                                key={category.id}
                                onSelect={() => {
                                  const newValue = field.value?.some(
                                    (c) => c.id === category.id
                                  )
                                    ? field.value.filter(
                                        (c) => c.id !== category.id
                                      )
                                    : [...(field.value || []), category]
                                  field.onChange(newValue)
                                }}
                              >
                                <BiCheck
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    field.value?.some(
                                      (c) => c.id === category.id
                                    )
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {category.emoji} {category.name}
                              </CommandItem>
                            ))
                          )}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          {initialData ? 'Modifier' : 'Créer'}
        </Button>
      </form>
    </Form>
  )
}
