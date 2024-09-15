<script setup lang="ts">
import BgAnimation from '@/components/icons/bgAnimation.vue';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { vAutoAnimate } from '@formkit/auto-animate/vue'

import Button from '@/components/ui/button/Button.vue'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import Input from '@/components/ui/input/Input.vue'
import { onMounted, reactive } from 'vue';
import type { AuthData } from '@/repository/interfaces';
import { isAxiosError } from 'axios';
import LoadingScreen from '@/components/loadingScreen.vue';
import router from '@/router';
import Dialog from '@/components/ui/dialog/Dialog.vue';
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue';
import DialogContent from '@/components/ui/dialog/DialogContent.vue';
import ErrorIcon from '@/components/icons/errorIcon.vue';
import { useTeacherStore } from '@/stores/teacher';


const teacherStore = useTeacherStore()

const formSchema = toTypedSchema(z.object({
    username: z.string({ required_error: "اسم المستخدم مطلوب" })
        .email({ message: "رقم القيد يجب أن يكون 6 أرقام بالضبط" }),

    password: z.string({ required_error: "كلمة المرور مطلوب" })
        .min(6, { message: "كلمة المرور يجب ان تتكون من 6 احرف على الاقل" })
        .max(50, { message: "كلمة المرور يجب أن لا تزيد عن 50 حرف" }),
}))

const { isFieldDirty, handleSubmit } = useForm({
    initialValues: {
        username: 'raheemdehom123@gmail.com',
        password: 'password'
    },
    validationSchema: formSchema,
})
const onSubmit = handleSubmit(async (values) => {
    let authValues = reactive<AuthData>({
        email: values.username,
        password: values.password
    })
    try {
        const res = await teacherStore.authTeacher(authValues)
        if (res?.status === 200) {
            router.push({ name: 'teacherHome' })
        }
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 401) {
                document.getElementById('loginMessage')?.click()
            } else {
                document.getElementById('errorMessage')?.click()
            }
        }

    }

})
onMounted(() => {

})
</script>

<template>
    <div id="wrapper" class="relative h-screen w-screen flex items-center justify-center">
        <BgAnimation />
        <LoadingScreen v-if="teacherStore.isLoading" />
        <Dialog>
            <DialogTrigger id="errorMessage"></DialogTrigger>
            <DialogContent
                class="flex flex-col items-center justify-start w-60 h-60 rounded-2xl data-[state=open]:animate-open-up">
                <ErrorIcon class="scale-75 rounded-xl" />
                <span class="font-Somar text-xl text-crimson-800 text-center">حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى
                    لاحقاً</span>
            </DialogContent>
        </Dialog>
        <Dialog>
            <DialogTrigger id="loginMessage"></DialogTrigger>
            <DialogContent
                class="flex flex-col items-center justify-start w-60 h-60 rounded-2xl data-[state=open]:animate-open-up">
                <ErrorIcon class="scale-75 rounded-xl" />
                <span class="font-Somar text-xl text-crimson-800">البيانات غير صحيحة</span>
            </DialogContent>
        </Dialog>
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

<style>
@keyframes fade {
    0% {
        opacity: 0;
        transform: translateY(-3%)
    }

    50% {
        opacity: 0.5;
        transform: translateY(-1%)
    }

    100% {
        opacity: 1;
        transform: translateY(0)
    }
}
</style>
