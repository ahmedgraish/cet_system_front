<script setup lang="ts">
import Header from '@/components/appHeader.vue';
import navBar from '@/components/navBar.vue';
import scheduleIcon from '@/components/icons/IconSchedule.vue'
import settingsIcon from '@/components/icons/IconSittings.vue'
import homeworkIcon from '@/components/icons/homeworkPaper.vue';
import quizIcon from '@/components/icons/checkList.vue';
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { onMounted, ref } from 'vue';
import type { Student } from '@/stores/student';
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


const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: 'home' },
    { id: 2, icon: homeworkIcon, link: 'homeworks' },
    { id: 4, icon: quizIcon, link: 'quizes' },
    { id: 1, icon: settingsIcon, link: 'settings' }
]

const student: Student = {
    id: 0,
    name: 'احمد محمد اقريش',
    ref_num: '181130',
    email: 'ahmed@gmail.com',
    phone_number: '0924986954',
    image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
}

const formSchema = toTypedSchema(z.object({
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


onMounted(() => {
})



</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <navBar :list="navItems" />
        <main
            class="w-full h-full md:w-[95vw] md:h-[92vh] flex flex-col items-center justify-start gap-10 pb-20 pt-10 md:pt-0 overflow-auto"
            v-auto-animate>
            <Avatar size="lg">
                <AvatarImage :src="student.image" alt="pic" />
                <AvatarFallback>pic</AvatarFallback>
            </Avatar>
            <form dir="rtl" class="flex flex-col items-center  w-full  pb-10 space-y-6" @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="username">
                    <FormItem class="w-5/6 max-w-[600px]" v-auto-animate>
                        <FormLabel class="font-medium text-curious-blue-900">رقم القيد</FormLabel>
                        <FormControl>
                            <Input class="py-6 md:py-6" dir="rtl" type="text" :placeholder="student.ref_num"
                                v-bind="componentField" disabled />
                        </FormControl>
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
                    <FormItem class="w-5/6 max-w-[600px]" v-auto-animate>
                        <FormLabel class="font-medium text-curious-blue-900">كلمة المرور</FormLabel>
                        <FormControl>
                            <Input class="py-6 md:py-6" dir="rtl" type="password" placeholder="كلمة المرور"
                                v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="fullname" :validate-on-blur="!isFieldDirty">
                    <FormItem class="w-5/6 max-w-[600px]" v-auto-animate>
                        <FormLabel class="font-medium text-curious-blue-900">الاسم</FormLabel>
                        <FormControl>
                            <Input class="py-6 md:py-6" dir="rtl" type="text" :placeholder="student.name"
                                v-bind="componentField" />
                        </FormControl>
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
                    <FormItem class="w-5/6 max-w-[600px]" v-auto-animate>
                        <FormLabel class="font-medium text-curious-blue-900">البريد الالكتروني</FormLabel>
                        <FormControl>
                            <Input class="py-6 md:py-6" dir="rtl" type="email" :placeholder="student.email"
                                v-bind="componentField" />
                        </FormControl>
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="phone_number" :validate-on-blur="!isFieldDirty">
                    <FormItem class="w-5/6 max-w-[600px]" v-auto-animate>
                        <FormLabel class="font-medium text-curious-blue-900">رقم الهاتف</FormLabel>
                        <FormControl>
                            <Input class="py-6 md:py-6" dir="rtl" type="number" :placeholder="student.phone_number"
                                v-bind="componentField" />
                        </FormControl>
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
