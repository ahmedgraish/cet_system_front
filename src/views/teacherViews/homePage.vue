<script setup lang="ts">
import Header from '@/components/appHeader.vue';
import navBar from '@/components/navBar.vue';
import scheduleIcon from '@/components/icons/IconSchedule.vue'
import settingsIcon from '@/components/icons/IconSittings.vue'
import homeworkIcon from '@/components/icons/homeworkPaper.vue';
import quizIcon from '@/components/icons/checkList.vue';
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { onMounted, reactive, ref } from 'vue';
import UserBunner from '@/components/userBunner.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { navItem } from '@/components/navBar.vue';
import LectureCard from '@/components/teacherComponants/lectureCard.vue';
import { useForm } from 'vee-validate'
import Input from '@/components/ui/input/Input.vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import Button from '@/components/ui/button/Button.vue'
import { useStudentStore } from '@/stores/student';
import FormDatePicker from '@/components/formDatePicker.vue';
import { Checkbox } from '@/components/ui/checkbox'
import InfinteLoader from '@/components/infinteLoader.vue';

const studentStore = useStudentStore()
const navItems: navItem[] = [
    { id: 1, icon: scheduleIcon, link: 'teacherHome' },
    { id: 2, icon: homeworkIcon, link: 'teacherSubjects' },
    { id: 3, icon: quizIcon, link: 'teacherQuizzes' },
    { id: 4, icon: settingsIcon, link: 'userSettings' }
]

const subjects = ['كهريائية', 'رياضة', 'انجليزي', 'برمجة']
const groups = ['1', '2', '3', '4']
const time = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
let activeTab = ref(1)

let date = ref<Date>()
const assignDate = (d: string) => {
    date.value = new Date(d)
    console.log(date.value);

}
const formSchema = toTypedSchema(z.object({
    mobile: z.boolean().optional(),
    subject: z.string({ required_error: "المادة مطلوبة" }),
    group: z.string({ required_error: "المجموعة مطلوبة" }),
    startTime: z.string({ required_error: "وقت البداية مطلوب" }),
    duration: z.string({ required_error: "مدة المحاضرة مطلوبة" }),
    classroom: z.string({ required_error: "مكان المحاضرة مطلوب" }),
}))

const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: formSchema,
})
const onSubmit = handleSubmit(async (values) => {
    console.log(values);

})

onMounted(() => {

})



</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <Header class="absolute hidden md:block top-0 h-16 w-full bg-white drop-shadow z-10">
            <UserBunner :name="studentStore.studentInfo.name" :image="studentStore.studentInfo.image" />
        </Header>
        <navBar :list="navItems" />

        <main class="relative w-full h-full md:w-[95vw] md:h-[92vh] flex items-center justify-center overflow-hidden"
            v-auto-animate>
            <Tabs default-value="dueQuizes" class="w-full h-full  flex flex-col items-center mt-16 overflow-auto">
                <TabsList class="w-5/6 md:w-2/4">
                    <TabsTrigger @click="activeTab = 2" value="completedQuizes">
                        اضافة محاضرة
                    </TabsTrigger>
                    <TabsTrigger @click="activeTab = 1" value="dueQuizes" class="">
                        محاضراتك
                    </TabsTrigger>

                </TabsList>
                <TabsContent v-if="activeTab === 1" value="dueQuizes"
                    class="w-full h-full flex flex-col md:flex-row md:flex-wrap items-center md:items-start pb-20 p-10 md:p-12 mb-20 md:mb-1 justify-start md:justify-end gap-10 overflow-auto">
                    <LectureCard class="w-5/6 h-1/4 min-w-[330px] min-h-[200px] md:w-1/5 md:h-1/3 md:min-w-[350px]" />
                </TabsContent>
                <TabsContent v-if="activeTab === 2" value="completedQuizes"
                    class="w-full h-full flex flex-col md:flex-row md:flex-wrap md:flex items-center md:items-start pb-28 p-10 md:p-12 mb-28 md:mb-1 justify-start md:justify-end gap-10 overflow-auto">
                    <div id="createLecture" class="w-full h-full">
                        <form dir="rtl"
                            class="flex  flex-wrap justify-around items-center w-full h-full min-h-[90dvh] pb-16  font-Somar"
                            @submit="onSubmit">
                            <div class="w-full flex  justify-start">
                                <FormField v-slot="{ value, handleChange }" type="checkbox" name="mobile">
                                    <FormItem
                                        class="flex flex-row items-end gap-x-3 w-fit space-y-0 rounded-md border p-4 shadow">
                                        <FormControl>
                                            <Checkbox :checked="value" @update:checked="handleChange" />
                                        </FormControl>
                                        <div class="space-y-1 leading-none">
                                            <FormLabel>محضارة لمرة واحدة</FormLabel>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                </FormField>
                            </div>
                            <div
                                class="w-full flex flex-col md:flex-row justify-center py-7 gap-y-7 md:py-0 md:gap-y-0 md:justify-around">
                                <FormField v-slot="{ componentField }" name="subject" :validate-on-blur="!isFieldDirty">
                                    <FormItem class="w-full md:w-1/3">
                                        <FormLabel>المادة الدراسية</FormLabel>
                                        <Select dir="rtl" v-bind="componentField">
                                            <FormControl>
                                                <SelectTrigger class="py-7">
                                                    <SelectValue class="text-gray-500 "
                                                        placeholder="أختر المادة المراد انشاء محاضرة لها" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem :key="index" :value="item"
                                                        v-for="item, index in subjects">
                                                        {{ item }}
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>

                                </FormField>
                                <FormField v-slot="{ componentField }" name="group" :validate-on-blur="!isFieldDirty">
                                    <FormItem class="w-full md:w-1/3">
                                        <FormLabel>المجموعة</FormLabel>
                                        <Select dir="rtl" v-bind="componentField">
                                            <FormControl>
                                                <SelectTrigger class="py-7">
                                                    <SelectValue class="text-gray-500 " placeholder="المجموعة" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem :key="index" :value="group"
                                                        v-for="group, index in groups">
                                                        {{ group }}
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                </FormField>

                            </div>

                            <FormField v-slot="{ componentField }" name="startTime" :validate-on-blur="!isFieldDirty">
                                <FormItem class="w-full md:w-1/3">
                                    <FormLabel>وقت البداية</FormLabel>
                                    <Select dir="rtl" v-bind="componentField">
                                        <FormControl>
                                            <SelectTrigger class="py-7">
                                                <SelectValue class="text-gray-500 " placeholder="وقت البداية" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem :key="index" :value="times" v-for="times, index in time">
                                                    {{ times }}
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ componentField }" name="duration" :validate-on-blur="!isFieldDirty">
                                <FormItem class="w-full md:w-1/3 mt-7">
                                    <FormLabel>المدة</FormLabel>
                                    <Select dir="rtl" v-bind="componentField">
                                        <FormControl>
                                            <SelectTrigger class="py-7">
                                                <SelectValue class="text-gray-500 " placeholder="مدة المحاضرة" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem :key="index" :value="group" v-for="group, index in groups">
                                                    {{ group }}
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            </FormField>


                            <div class="w-full flex md:flex-row justify-around py-7 gap-y-7 md:py-0 md:gap-y-0 ">
                                <FormDatePicker title="تاريخ المحاضرة" @date="h => assignDate(h)" name="picker" />

                                <FormField v-slot="{ componentField }" name="classroom"
                                    :validate-on-blur="!isFieldDirty">
                                    <FormItem class="w-fit min-w-16 md:w-1/3">
                                        <FormLabel>القاعة</FormLabel>
                                        <Select dir="rtl" v-bind="componentField">
                                            <FormControl>
                                                <div class="flex relative">
                                                    <SelectTrigger class="py-7">
                                                        <SelectValue class="text-gray-500 "
                                                            placeholder="مكان المحاضرة" />
                                                    </SelectTrigger>
                                                    <InfinteLoader v-if="false"
                                                        class="absolute  h-full left-2 bg-white" />
                                                </div>

                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem :key="index" :value="group"
                                                        v-for="group, index in groups">
                                                        {{ group }}
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                </FormField>
                            </div>
                            <div class="pt-7 ">
                                <Button type="submit"
                                    class="px-40 py-3 lg:px-32 md:py-4 font-Somar rounded-lg text-curious-blue-50 bg-curious-blue-950 ">
                                    اضافة
                                </Button>
                            </div>
                        </form>
                    </div>
                </TabsContent>
            </Tabs>

        </main>
    </div>
</template>

<style></style>
