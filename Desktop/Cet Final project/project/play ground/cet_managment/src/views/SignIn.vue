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

import Button from '@/components/ui/button/Button.vue'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import Input from '@/components/ui/input/Input.vue'

const formSchema = toTypedSchema(z.object({
    username: z.string()
        .length(6, { message: "رقم القيد يجب أن يكون 6 أرقام بالضبط" }),

    password: z.string()
        .min(6, { message: "كلمة المرور يجب ان تتكون من 6 احرف على الاقل" })
        .max(50, { message: "كلمة المرور يجب أن لا تزيد عن 50 حرف" }),
}))

const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
    console.log(values)

})
</script>

<template>
    <div id="wrapper" class="relative h-screen w-screen flex items-center justify-center">
        <BgAnimation />
        <Card class="absolute w-4/5 md:w-1/3 font-Somar  bg-curious-blue-50">
            <CardHeader class="flex-col items-center justify-between mt-3">
                <CardTitle>تسجيل الدخول</CardTitle>
                <CardDescription class="mt-3">أدخل بيانات تسجيل الدخول الخاصة بك</CardDescription>
            </CardHeader>
            <CardContent>
                <form dir="rtl" class="flex flex-col items-center  w-full  pb-10 space-y-6" @submit="onSubmit">
                    <FormField v-slot="{ componentField }" name="username" :validate-on-blur="!isFieldDirty">
                        <FormItem class="w-5/6" v-auto-animate>
                            <FormLabel>اسم المستخدم</FormLabel>
                            <FormControl>
                                <Input class="py-5 md:py-6" dir="rtl" type="text" placeholder="رقم القيد"
                                    v-bind="componentField" />
                            </FormControl>
                            <FormMessage message="يرجى إدخال اسم المستخدم" />
                        </FormItem>

                    </FormField>

                    <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
                        <FormItem class="w-5/6" v-auto-animate>
                            <FormLabel>كلمة المرور</FormLabel>
                            <FormControl>
                                <Input class="py-5 md:py-6" dir="rtl" type="password" placeholder="كلمة المرور"
                                    v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    </FormField>
                    <div class="pt-7">
                        <Button type="submit"
                            class="px-20 py-3 lg:px-32 md:py-4 font-Somar rounded-lg text-curious-blue-50 bg-curious-blue-950 ">
                            دخول
                        </Button>
                    </div>

                </form>
            </CardContent>
        </Card>
    </div>
</template>

<style></style>
