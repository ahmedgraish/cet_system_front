<script setup lang="ts">
import Header from '@/components/appHeader.vue';
import navBar from '@/components/navBar.vue';
import scheduleIcon from '@/components/icons/IconSchedule.vue'
import settingsIcon from '@/components/icons/IconSittings.vue'
import homeworkIcon from '@/components/icons/homeworkPaper.vue';
import quizIcon from '@/components/icons/checkList.vue';
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { onMounted, reactive, ref, watch } from 'vue';
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
import FormDatePicker from '@/components/formDatePicker.vue';
import { Checkbox } from '@/components/ui/checkbox'
import InfinteLoader from '@/components/infinteLoader.vue';
import { useTeacherStore } from '@/stores/teacher';
import type { ClassRoom, classRoomRetreveForm, Group, NewLecture } from '@/repository/interfaces';
import { isAxiosError } from 'axios';
import LoadingScreen from '@/components/loadingScreen.vue';
import Dialog from '@/components/ui/dialog/Dialog.vue';
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue';
import DialogContent from '@/components/ui/dialog/DialogContent.vue';
import ErrorIcon from '@/components/icons/errorIcon.vue';
import SuccessIcon from '@/components/icons/successIcon.vue';
import type { TagsObj } from './teacherQuizPage.vue';
import { computed } from 'vue';
import TagsInput from '@/components/ui/tags-input/TagsInput.vue';
import TagsInputItem from '@/components/ui/tags-input/TagsInputItem.vue';
import TagsInputItemText from '@/components/ui/tags-input/TagsInputItemText.vue';
import TagsInputItemDelete from '@/components/ui/tags-input/TagsInputItemDelete.vue';
import TagsInputInput from '@/components/ui/tags-input/TagsInputInput.vue';
import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import FormDescription from '@/components/ui/form/FormDescription.vue';
import { toast } from '@/components/ui/toast';

const navItems: navItem[] = [
    { id: 1, icon: scheduleIcon, link: 'teacherHome' },
    { id: 2, icon: homeworkIcon, link: 'teacherSubjects' },
    { id: 3, icon: quizIcon, link: 'teacherQuizzes' },
    { id: 4, icon: settingsIcon, link: 'teacherInfo' }
]
const teacherStore = useTeacherStore()
const getTeacherLectures = async () => {
    await teacherStore.getTeacherLectures()
    console.log("lectures", teacherStore.teacherLectures);

}


const time = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
const durations = ['1', '2', '3', '4', '5', '6']
let activeTab = ref(1)




function getCustomDayOfWeek(date: Date): number {
    // Get the day of the week (0 = Sunday, 6 = Saturday)
    const dayOfWeek = date.getDay();

    // Map the days to your custom system (Saturday = 1, Sunday = 2, ..., Friday = 7)
    const customDayMapping = [2, 3, 4, 5, 6, 7, 1]; // Saturday starts at 1
    console.log(customDayMapping);
    return customDayMapping[dayOfWeek];
}


let date = ref<Date>()
const assignDate = (d: string) => {
    date.value = new Date(d)
    console.log(getCustomDayOfWeek(date.value));
}

let groups: Group[] = []

const getGroups = async (subjectId: number) => {
    groups = await teacherStore.getSubjectGroups(subjectId)
}



const getSubjects = async () => {
    await teacherStore.getTeacherSubjects()
}
const selectedSubject = ref('');
// watch(selectedSubject, async () => {
//     const subject = teacherStore.teacherSubjects.find(sub => sub.name === selectedSubject.value)
//     if (subject) {
//         await getGroups(subject.id)
//     }

// })
watch(selectedSubject, async () => {
    const subject = teacherStore.teacherSubjects.find(sub => sub.name === selectedSubject.value)
    if (subject) {
        await getGroups(subject.id)
        TagGroups.value = createTagObjects(groups)
        console.log(TagGroups.value);
    }

})



const createTagObjects = (groupsArr: Group[]) => {
    return groupsArr.map(data => ({
        value: data.name,
        label: data.name
    }));
};

const TagGroups = ref<TagsObj[]>()



// const frameworks = [
//     { value: 'next.js', label: 'Next.js' },
//     { value: 'sveltekit', label: 'SvelteKit' },
//     { value: 'nuxt', label: 'Nuxt' },
//     { value: 'remix', label: 'Remix' },
//     { value: 'astro', label: 'Astro' },
// ]

const modelValue = ref<string[]>([])
const open = ref(false)
const searchTerm = ref('')

const filteredFrameworks = computed(() => TagGroups.value?.filter(i => !modelValue.value.includes(i.label)))




const isDisabled = ref(true)
const selectedStartTime = ref('');
watch(selectedStartTime, () => {
    isDisabled.value = false
})

const duration = ref('');
const endTime = ref('')

function addHoursToTime(time: string, hoursToAdd: string): string {
    const additionalHours = parseInt(hoursToAdd, 10);

    const [hourStr, minuteStr] = time.split(':');

    let hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    hours += additionalHours;

    if (hours >= 24) {
        hours = hours % 24;
    }

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}
watch(duration, () => {
    endTime.value = addHoursToTime(selectedStartTime.value, duration.value)
    console.log(endTime.value);

})

let classRooms: ClassRoom[] = []
const getClassRooms = async (data: classRoomRetreveForm) => {
    classRooms = await teacherStore.getAvialableClassRooms(data)
}

watch(date, async () => {
    const data: classRoomRetreveForm = {
        start_time: selectedStartTime.value,
        end_time: endTime.value,
        day_of_week: getCustomDayOfWeek(date.value as Date)
    }
    if (selectedStartTime.value && endTime.value && date.value) {
        await getClassRooms(data)
    }
})



let newLecture = ref<NewLecture>()

const formSchema = toTypedSchema(z.object({
    mobile: z.boolean().optional(),
    subject: z.string({ required_error: "المادة مطلوبة" }),
    // groups: z.string({ required_error: "المجموعة مطلوبة" }),
    startTime: z.string({ required_error: "وقت البداية مطلوب" }),
    duration: z.string({ required_error: "مدة المحاضرة مطلوبة" }),
    classroom: z.string({ required_error: "مكان المحاضرة مطلوب" }),
}))

const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: formSchema,
})

let message = ref('')
const onSubmit = handleSubmit(async (values) => {
    // console.log(date.value + 'sss');
    let groupIds = ref<number[]>(modelValue.value.map(Number))
    if (groupIds.value.length === 0) {
        toast({
            title: '!! عذرا',
            description: 'يرجى ادخال المجموعات الخاصة بالمحاضرة ',
            variant: 'destructive',
            duration: 2000
        });
        return
    }
    if (date.value?.toString() === 'Invalid Date'!) {
        toast({
            title: '!! عذرا',
            description: 'يرجى ادخال تاريخ للمحاضرة',
            variant: 'destructive',
            duration: 2000
        });
        return
    }
    newLecture.value = {
        start_time: values.startTime,
        duration: Number(values.duration) * 60,
        class_room_id: classRooms.find(cl => cl.name === values.classroom)!.id,
        day_of_week: getCustomDayOfWeek(date.value as Date),
        group_ids: groupIds.value,
        lecture_date: date.value!.toISOString(),
        on_time_lecture: values.mobile!,
        subject_id: teacherStore.teacherSubjects.find(sb => sb.name === values.subject)!.id
    }

    try {
        const res = await teacherStore.addNewLecture(newLecture.value)
        message.value = res?.data.message
        if (res?.status && res?.status >= 200 && res?.status < 300) {
            console.log('in');

            document.getElementById('successMessage')?.click()

        }
    } catch (error) {
        if (isAxiosError(error)) {
            message.value = error.response?.data
            document.getElementById('errorMessage')?.click()
        }

    }
})


onMounted(async () => {
    await getTeacherLectures()
    await getSubjects()
    // setInterval(() => {
    //     console.log(selectedSubject.value);

    // }, 5000);
})



</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <Header class="absolute hidden md:block top-0 h-16 w-full bg-white drop-shadow z-10">
            <UserBunner :name="teacherStore.teacherInfo.name" :image="teacherStore.teacherInfo.image"
                link="teacherInfo" />
        </Header>
        <navBar :list="navItems" />
        <!-- <LoadingScreen v-if="teacherStore.isLoading" /> -->
        <Dialog>
            <DialogTrigger id="errorMessage"></DialogTrigger>
            <DialogContent
                class="flex flex-col items-center justify-start w-60 h-60 rounded-2xl data-[state=open]:animate-open-up">
                <ErrorIcon class="scale-75 rounded-xl" />
                <span class="font-Somar text-xl text-crimson-800 text-center">..حدث خطأ<br> يرجى التاكد من
                    البيانات
                    والمحاولة مرة أخرى
                </span>
            </DialogContent>
        </Dialog>
        <Dialog>
            <DialogTrigger id="successMessage"></DialogTrigger>
            <DialogContent
                class="flex flex-col items-center justify-start w-60 h-60 rounded-2xl data-[state=open]:animate-open-up">
                <SuccessIcon class="scale-75 rounded-xl" />
                <span class="font-Somar text-xl text-green-800 text-center">{{ message }}</span>
            </DialogContent>
        </Dialog>
        <main class="relative w-full h-full md:w-[95vw] md:h-[92vh] flex items-center justify-center overflow-auto"
            v-auto-animate>
            <Tabs default-value="dueQuizes"
                class=" absolute left-0 top-10 w-full flex flex-col items-center overflow-auto ">
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
                    <LectureCard :key="index" v-for="lecture, index in teacherStore.teacherLectures"
                        :lectureInfo="lecture"
                        class="w-5/6 h-1/4 min-w-[330px] min-h-[200px] md:w-1/5 md:h-1/3 md:min-w-[350px]" />
                </TabsContent>
                <TabsContent v-if="activeTab === 2" value="completedQuizes"
                    class="w-full h-full flex flex-col md:flex-row md:flex-wrap md:flex items-center md:items-start pb-28 p-10 md:p-12 mb-0 justify-start md:justify-end gap-10 overflow-auto">
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
                                        <Select dir="rtl" v-bind="componentField" v-model="selectedSubject">
                                            <FormControl>
                                                <SelectTrigger class="py-7">
                                                    <SelectValue class="text-gray-500 "
                                                        placeholder="أختر المادة المراد انشاء محاضرة لها" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem :key="index" :value="subject.name"
                                                        v-for="subject, index in teacherStore.teacherSubjects">
                                                        {{ subject.name }}
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>

                                </FormField>
                                <FormField name="groups" :validate-on-blur="!isFieldDirty">
                                    <FormItem class="w-full md:w-1/3">
                                        <FormLabel>المجموعة</FormLabel>
                                        <FormControl>
                                            <TagsInput dir="rtl" :model-value="modelValue">
                                                <div class="flex gap-2 flex-wrap items-center px-3">
                                                    <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
                                                        <TagsInputItemText />
                                                        <TagsInputItemDelete />
                                                    </TagsInputItem>
                                                </div>
                                                <ComboboxRoot dir="rtl" v-model="modelValue" v-model:open="open"
                                                    v-model:searchTerm="searchTerm" class="w-full">
                                                    <ComboboxAnchor as-child>
                                                        <ComboboxInput class="py-2" placeholder="المجموعات" as-child>
                                                            <TagsInputInput class="w-full px-3"
                                                                :class="modelValue.length > 0 ? 'mt-2' : ''"
                                                                @keydown.enter.prevent />
                                                        </ComboboxInput>
                                                    </ComboboxAnchor>

                                                    <ComboboxPortal>
                                                        <ComboboxContent>
                                                            <CommandList position="popper"
                                                                class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                                                                <CommandEmpty />
                                                                <CommandGroup dir="rtl" class="bg-white">
                                                                    <CommandItem v-for="framework in filteredFrameworks"
                                                                        :key="framework.value" :value="framework.label"
                                                                        @select.prevent="(ev) => {
                                                                            if (typeof ev.detail.value === 'string') {
                                                                                searchTerm = ''
                                                                                modelValue.push(ev.detail.value)
                                                                            }

                                                                            if (filteredFrameworks?.length === 0) {
                                                                                open = false
                                                                            }
                                                                        }">
                                                                        {{ framework.label }}
                                                                    </CommandItem>
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </ComboboxContent>
                                                    </ComboboxPortal>
                                                </ComboboxRoot>
                                            </TagsInput>
                                        </FormControl>
                                        <FormMessage />
                                        <FormDescription>
                                            اضف مجموعة او اكثر
                                        </FormDescription>
                                    </FormItem>
                                </FormField>

                            </div>

                            <FormField v-slot="{ componentField }" name="startTime" :validate-on-blur="!isFieldDirty">
                                <FormItem class="w-full md:w-1/3">
                                    <FormLabel>وقت البداية</FormLabel>
                                    <Select dir="rtl" v-bind="componentField" v-model="selectedStartTime">
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
                                    <Select :disabled="isDisabled" dir="rtl" v-bind="componentField" v-model="duration">
                                        <FormControl>
                                            <SelectTrigger class="py-7">
                                                <SelectValue class="text-gray-500 " placeholder="مدة المحاضرة" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem :key="index" :value="hour" v-for="hour, index in durations">
                                                    {{ hour }}
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            </FormField>


                            <div class="w-full flex md:flex-row justify-around py-7 gap-y-7 md:py-0 md:gap-y-0 ">
                                <FormDatePicker @date="h => assignDate(h)" name="picker" title="تاريخ المحاضرة"
                                    :phone="false" />

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
                                                    <InfinteLoader v-if="teacherStore.isLoading"
                                                        class="absolute  h-full left-2 bg-white" />
                                                </div>

                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem :key="index" :value="classRoom.name"
                                                        v-for="classRoom, index in classRooms">
                                                        {{ classRoom.name }}
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
                                    class="px-40 py-3 lg:px-52 md:py-4 font-Somar rounded-lg text-curious-blue-50 bg-curious-blue-950 ">
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
