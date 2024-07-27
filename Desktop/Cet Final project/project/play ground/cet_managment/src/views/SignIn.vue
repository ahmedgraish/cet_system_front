<script setup lang="ts">
import BgAnimation from '@/components/icons/bgAnimation.vue';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { vAutoAnimate } from '@formkit/auto-animate/vue'

import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import Input from '@/components/ui/input'
import toast from '@/components/ui/toast'

const formSchema = toTypedSchema(z.object({
    username: z.string().min(2).max(50),
}))

const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
    toast({
        title: 'You submitted the following values:',
        description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
    })
})
</script>

<template>
    <div id="wrapper" class="relative h-screen w-screen flex items-center justify-center">
        <BgAnimation />
        <Card class="absolute font-Somar bg-curious-blue-50 flex flex-col items-center justify-center">
            <CardHeader>
                <CardTitle>تسجيل الدخول</CardTitle>
                <CardDescription>أدخل بيانات تسجيل الدخول الخاصة بك</CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit="onSubmit">
                    <FormField v-slot="{ componentField }" name="username">
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="shadcn" v-bind="componentField" />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                Card Footer
            </CardFooter>
        </Card>
    </div>
</template>

<style></style>
