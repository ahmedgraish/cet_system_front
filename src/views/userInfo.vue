<script setup lang="ts">

import navBar from '@/components/navBar.vue';
import scheduleIcon from '@/components/icons/IconSchedule.vue'
import settingsIcon from '@/components/icons/IconSittings.vue'
import homeworkIcon from '@/components/icons/homeworkPaper.vue';
import quizIcon from '@/components/icons/checkList.vue';
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { onMounted, reactive } from 'vue';
import { useStudentStore } from '@/stores/student';
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import Button from '@/components/ui/button/Button.vue'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import Input from '@/components/ui/input/Input.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { navItem } from '@/components/navBar.vue';
import type { UpdateUser } from '@/repository/interfaces';
import LoadingScreen from '@/components/loadingScreen.vue';
import Dialog from '@/components/ui/dialog/Dialog.vue';
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue';
import DialogContent from '@/components/ui/dialog/DialogContent.vue';
import { isAxiosError } from 'axios';
import SuccessIcon from '@/components/icons/successIcon.vue';
const studentStore = useStudentStore()
const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: 'home' },
    { id: 2, icon: homeworkIcon, link: 'subjectsListingPage' },
    { id: 4, icon: quizIcon, link: 'quizesPage' },
    { id: 1, icon: settingsIcon, link: 'userSettings' }
]

const formSchema = toTypedSchema(
    z.object({
        fullname: z
            .string({ required_error: "يرجى إدخال اسم المستخدم" })
            .min(1, { message: "يرجى إدخال اسم المستخدم" }) // Custom error message for fullname
            .refine((value) => !!value.trim(), { message: "الاسم مطلوب" }),
        email: z
            .string({ required_error: "يرجى إدخال البريد الإلكتروني" })
            .min(1, { message: "يرجى إدخال البريد الإلكتروني" }) // Custom error message for email
            .email({ message: "يرجى إدخال بريد إلكتروني صحيح" }), // Custom error message for invalid email format
        phone_number: z
            .number({
                required_error: "يرجى إدخال رقم الهاتف",
                invalid_type_error: "يجب أن يكون رقم الهاتف مكونًا من أرقام فقط",
            })
            .gt(0, { message: "يجب أن يكون رقم الهاتف أكبر من الصفر" }) // Ensure number is greater than 0
    })
);

const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: formSchema,
})


const onSubmit = handleSubmit(async (values) => {
    const updatedValues: UpdateUser = {
        name: values.fullname,
        email: values.email,
        phone: values.phone_number.toString()
    }
    try {
        const res = await studentStore.updateStudent(updatedValues)
        if (res?.status && res?.status >= 200 && res?.status < 300) {
            document.getElementById('successMessage')?.click()

        }
    } catch (error) {
        if (isAxiosError(error)) {
            document.getElementById('errorMessage')?.click()
        }

    }
})


onMounted(() => {
})



</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <navBar :list="navItems" />
        <LoadingScreen v-if="studentStore.isLoading" />
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
            <DialogTrigger id="successMessage"></DialogTrigger>
            <DialogContent
                class="flex flex-col items-center justify-start w-60 h-60 rounded-2xl data-[state=open]:animate-open-up">
                <SuccessIcon class="scale-75 rounded-xl" />
                <span class="font-Somar text-xl text-green-800 text-center">تم تحديث البيانات بنجاح</span>
            </DialogContent>
        </Dialog>
        <main
            class="w-full h-full md:w-[95vw] md:h-[92vh] flex flex-col items-center justify-start gap-10 pb-20 pt-10 md:pt-0 overflow-auto"
            v-auto-animate>
            <Avatar size="lg">
                <AvatarImage :src="studentStore.studentInfo.image" alt="pic" />
                <AvatarFallback>pic</AvatarFallback>
            </Avatar>
            <form dir="rtl" class="flex flex-col items-center  w-full  pb-10 space-y-6" @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="ref_number">
                    <FormItem class="w-5/6 max-w-[600px]" v-auto-animate>
                        <FormLabel class="font-medium text-curious-blue-900">رقم القيد</FormLabel>
                        <FormControl>
                            <Input class="py-6 md:py-6" dir="rtl" type="text"
                                :placeholder="studentStore.studentInfo.ref_number" v-bind="componentField" disabled />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>


                <FormField v-slot="{ componentField }" name="fullname" :validate-on-blur="!isFieldDirty">
                    <FormItem class="w-5/6 max-w-[600px]" v-auto-animate>
                        <FormLabel class="font-medium text-curious-blue-900">الاسم</FormLabel>
                        <FormControl>
                            <Input class="py-6 md:py-6" dir="rtl" type="text"
                                :placeholder="studentStore.studentInfo.name" v-bind="componentField" />
                        </FormControl>
                        <FormMessage message="يرجى إدخال اسم المستخدم" />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
                    <FormItem class="w-5/6 max-w-[600px]" v-auto-animate>
                        <FormLabel class="font-medium text-curious-blue-900">البريد الالكتروني</FormLabel>
                        <FormControl>
                            <Input class="py-6 md:py-6" dir="rtl" type="email"
                                :placeholder="studentStore.studentInfo.email" v-bind="componentField" />
                        </FormControl>
                        <FormMessage message="يرجى إدخال اسم المستخدم" />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="phone_number" :validate-on-blur="!isFieldDirty">
                    <FormItem class="w-5/6 max-w-[600px]" v-auto-animate>
                        <FormLabel class="font-medium text-curious-blue-900">رقم الهاتف</FormLabel>
                        <FormControl>
                            <Input class="py-6 md:py-6" dir="rtl" type="number"
                                :placeholder="studentStore.studentInfo.phone_number" v-bind="componentField" />
                        </FormControl>
                        <FormMessage message="يرجى إدخال اسم المستخدم" />
                    </FormItem>
                </FormField>

                <div class="pt-7">
                    <Button type="submit"
                        class="px-28 py-3 lg:px-48 md:py-4 font-Somar rounded-lg text-curious-blue-50 bg-curious-blue-900 ">
                        حفظ
                    </Button>
                </div>

            </form>
        </main>
    </div>
</template>

<style></style>
