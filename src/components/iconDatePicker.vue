<script setup lang="ts">
import { computed, h, onMounted, ref, watch } from 'vue'
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { toDate } from 'radix-vue/date'
import { CalendarIcon } from '@radix-icons/vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const emit = defineEmits(['date'])

const df = new DateFormatter('en-US', {
    dateStyle: 'long',
})

const formSchema = toTypedSchema(z.object({
    dob: z.string().optional(),
}))

const placeholder = ref()

const { handleSubmit, setFieldValue, values } = useForm({
    validationSchema: formSchema,
})

const value = computed({
    get: () => values.dob ? parseDate(values.dob) : undefined,
    set: val => val,
})

const dateValue = (dateObj: any) => {
    if (!dateObj || !dateObj.year || !dateObj.month || !dateObj.day) {
        return '';
    }

    const day = dateObj.day
    const month = dateObj.month
    const year = dateObj.year
    return `${year}-${month}-${day}`;
}
watch(value, () => {
    emit('date', dateValue(value.value))
})
</script>

<template>
    <FormField name="dob">
        <FormItem class="w-fit  ">
            <Popover dir="rtl">
                <PopoverTrigger as-child
                    class="flex items-center justify-center w-fit  bg-slate-100 px-2 py-2 rounded-full hover:bg-slate-300 text-curious-blue-900">
                    <FormControl>
                        <Button variant="" :class="cn(
                            'w-full  text-center font-normal',
                            !value && 'text-muted-foreground',
                        )">
                            <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                        </Button>
                        <input hidden>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                    <Calendar v-model:placeholder="placeholder" v-model="value" calendar-label="وقت المحاضرة"
                        initial-focus :min-value="today(getLocalTimeZone())" :max-value="new CalendarDate(2100, 12, 31)"
                        @update:model-value="(v) => {
                            if (v) {
                                setFieldValue('dob', v.toString())
                            }
                            else {
                                setFieldValue('dob', undefined)
                            }
                        }" />
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    </FormField>
</template>