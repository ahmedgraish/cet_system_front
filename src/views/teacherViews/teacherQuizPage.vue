<script setup lang="ts">
import Header from '@/components/appHeader.vue';
import navBar from '@/components/navBar.vue';
import scheduleIcon from '@/components/icons/IconSchedule.vue'
import settingsIcon from '@/components/icons/IconSittings.vue'
import homeworkIcon from '@/components/icons/homeworkPaper.vue';
import quizIcon from '@/components/icons/checkList.vue';
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { computed, onMounted, ref } from 'vue';
import UserBunner from '@/components/userBunner.vue';
import QuizCard from '@/components/quizCard.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { navItem } from '@/components/navBar.vue';
import { useStudentStore } from '@/stores/student';
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
import InfinteLoader from '@/components/infinteLoader.vue';
import TagsInput from '@/components/ui/tags-input/TagsInput.vue';
import TagsInputItem from '@/components/ui/tags-input/TagsInputItem.vue';
import TagsInputItemText from '@/components/ui/tags-input/TagsInputItemText.vue';
import TagsInputItemDelete from '@/components/ui/tags-input/TagsInputItemDelete.vue';
import TagsInputInput from '@/components/ui/tags-input/TagsInputInput.vue';
import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import FormDescription from '@/components/ui/form/FormDescription.vue';
import { MinusIcon, PlusIcon } from '@radix-icons/vue';
import type { addNewQuiz, Group, Question } from '@/repository/interfaces'
import { toast } from '@/components/ui/toast';
import TeacherQuizCard from '@/components/teacherComponants/teacherQuizCard.vue';
import { useTeacherStore } from '@/stores/teacher';
import { watch } from 'vue';
import LoadingScreen from '@/components/loadingScreen.vue';
import Dialog from '@/components/ui/dialog/Dialog.vue';
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue';
import DialogContent from '@/components/ui/dialog/DialogContent.vue';
import ErrorIcon from '@/components/icons/errorIcon.vue';
import SuccessIcon from '@/components/icons/successIcon.vue';
import { isAxiosError } from 'axios';


const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: 'teacherHome' },
    { id: 2, icon: homeworkIcon, link: 'teacherSubjects' },
    { id: 1, icon: quizIcon, link: 'teacherQuizzes' },
    { id: 4, icon: settingsIcon, link: 'teacherInfo' }
]

let activeTab = ref(1)

const teacherStore = useTeacherStore()

const getQuizes = async () => {
    await teacherStore.getTeacherQuizes()
}



const subjects = teacherStore.teacherSubjects

let questions = ref<Question[]>([{
    id: 1,
    question: '',
    options: ['', '', '', ''],
    answer_index: ''
}])

const addNewQuestionTemp = () => {
    const newId = questions.value[questions.value.length - 1].id + 1
    questions.value.push({
        id: newId,
        question: '',
        options: ['', '', '', ''],
        answer_index: ''
    })
}
const removeQuestionTemp = (id: number) => {
    if (questions.value.length > 1) {
        questions.value = questions.value.filter(qs => qs.id !== id)
    } else {
        toast({
            title: '!! عذرا',
            description: 'لايمكن ان يكون اختبار منغير اسئلة',
            variant: 'destructive',
            duration: 3000
        });
    }
}

let date = ref<Date>()
const assignDate = (d: string) => {
    date.value = new Date(d)
    console.log(date.value);

}

let groups: Group[] = []
const getGroups = async (subjectId: number) => {
    groups = await teacherStore.getSubjectGroups(subjectId)
}


const createTagObjects = (groupsArr: Group[]) => {
    return groupsArr.map(data => ({
        value: data.name,
        label: data.name
    }));
};

const getSubjects = async () => {
    await teacherStore.getTeacherSubjects()
}
const selectedSubject = ref('');
interface TagsObj {
    value: string
    label: string
}
const TagGroups = ref<TagsObj[]>()
watch(selectedSubject, async () => {
    const subject = teacherStore.teacherSubjects.find(sub => sub.name === selectedSubject.value)
    if (subject) {
        await getGroups(subject.id)
        TagGroups.value = createTagObjects(groups)
        console.log(TagGroups.value);
    }

})


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


const formSchema = toTypedSchema(z.object({
    name: z.string({ required_error: "عنوان الاختبار مطلوب" }),
    subject: z.string({ required_error: "المادة مطلوبة" }),
    duration: z.number({ required_error: "مدة الاختبار مطلوبة" }).min(0, { message: 'يرجى ادخال مدة صحيحة' }),
    startTime: z.string({ required_error: "وقت البداية مطلوب" }),
    note: z.string().optional(),
    // answer: z.number({ required_error: "الجواب الصحيح مطلوب", invalid_type_error: "الجواب الصحيح مطلوب" }).min(1, { message: 'اكبر من 1' }).max(4, { message: 'اصغر من 4' })
}))

const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
        startTime: '13:00'
    }

})


const convertToLaravelDateString = (date: Date, time: string): string => {
    // Split the time string into hours and minutes
    const [hours, minutes] = time.split(':').map(Number);

    // Set the hours and minutes of the provided date
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0); // Set seconds to 0 for consistency

    // Convert the date to Laravel-compatible format (Y-m-d H:i:s)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
const addMinutesToTime = (timeStr: string, duration: number) => {
    let [hours, minutes] = timeStr.split(':').map(Number);

    minutes += duration;

    // Calculate overflow into hours if minutes exceed 60
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60; // Remaining minutes after hour adjustment

    // Format the time as HH:MM with leading zeros if needed
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
};

let message = ref('')
const onSubmit = handleSubmit(async (values) => {
    const newQuiz: addNewQuiz = {
        start_time: convertToLaravelDateString(date.value!, values.startTime),
        end_time: convertToLaravelDateString(date.value!, addMinutesToTime(values.startTime, values.duration)),
        group_ids: modelValue.value.map(Number),
        name: values.name,
        note: values.note!,
        subject_id: teacherStore.teacherSubjects.find(sub => sub.name === values.subject)?.id!,
        questions: questions.value.map(question => ({ ...question, options: question.options.filter(option => !!option) }))

    }



    try {
        const res = await teacherStore.addNewQuiz(newQuiz)
        message.value = res?.data.message
        if (res?.status && res?.status >= 200 && res?.status < 300) {
            document.getElementById('successMessage')?.click()
        }
    } catch (error) {
        if (isAxiosError(error)) {
            message.value = error.response?.data.errors
            document.getElementById('errorMessage')?.click()
        }

    }

})
getQuizes()
getSubjects()

onMounted(async () => {
    // setInterval(() => {
    //     console.log(questions.value);

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
        <LoadingScreen v-if="teacherStore.isLoading" />
        <Dialog>
            <DialogTrigger id="errorMessage"></DialogTrigger>
            <DialogContent
                class="flex flex-col items-center justify-start w-60 h-60 rounded-2xl data-[state=open]:animate-open-up">
                <ErrorIcon class="scale-75 rounded-xl" />
                <span class="font-Somar text-xl text-crimson-800 text-center">..حدث خطأ<br> {{ message }}
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
        <main
            class="relative w-full h-full md:w-[95vw] md:h-[92vh] flex items-center justify-center overflow-hidden font-Somar"
            v-auto-animate>
            <Tabs default-value="completedQuizes" class="w-full h-full  flex flex-col items-center mt-16 overflow-auto">
                <TabsList class="w-5/6 md:w-2/4">
                    <TabsTrigger @click="activeTab = 2" value="addQuiz">
                        اضافة اختبار
                    </TabsTrigger>
                    <TabsTrigger @click="activeTab = 1" value="completedQuizes" class="">
                        الاختبارات
                    </TabsTrigger>

                </TabsList>
                <TabsContent v-if="activeTab === 1" value="completedQuizes"
                    class="w-full h-full flex flex-col md:flex-row md:flex-wrap items-center md:items-start pb-20 p-10 md:p-12 mb-20 md:mb-1 justify-start md:justify-end gap-10 overflow-auto">
                    <TeacherQuizCard :key="index" v-for="quizInfo, index in teacherStore.teacherQuizes"
                        :quizCardInfo="quizInfo" />
                </TabsContent>
                <TabsContent v-if="activeTab === 2" value="addQuiz"
                    class="w-full h-full flex flex-col md:flex-row md:flex-wrap md:flex items-center md:items-start pb-28 p-10 md:p-12 mb-28 md:mb-10 justify-start md:justify-end gap-10 overflow-auto">
                    <div id="addQuiz" class="w-full h-full">
                        <form dir="rtl"
                            class="flex flex-wrap gap-10 justify-around items-center w-full h-full min-h-[90dvh] pb-16  font-Somar"
                            @submit="onSubmit">

                            <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
                                <FormItem class="w-full min-w-16 md:w-1/2">
                                    <FormLabel>الاسم</FormLabel>
                                    <FormControl>
                                        <Input class="py-7 md:py-7" dir="rtl" type="text" placeholder="عنوان الاختبار"
                                            v-bind="componentField" />
                                    </FormControl>
                                    <FormMessage />

                                </FormItem>
                            </FormField>
                            <div
                                class="w-full flex flex-col md:flex-row justify-center py-7 gap-y-7 md:py-0 md:gap-y-0 md:justify-around">

                                <FormField v-slot="{ componentField }" name="subject" :validate-on-blur="!isFieldDirty">
                                    <FormItem class="w-full md:w-1/3">
                                        <FormLabel>المادة الدراسية</FormLabel>
                                        <Select dir="rtl" v-bind="componentField" v-model="selectedSubject">
                                            <FormControl>
                                                <SelectTrigger class="py-7">
                                                    <SelectValue class="text-gray-500 "
                                                        placeholder="أختر المادة المراد انشاء اختبار لها" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem :key="index" :value="subject.name"
                                                        v-for="subject, index in subjects">
                                                        {{ subject.name }}
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>

                                </FormField>
                                <FormField name="groups">
                                    <FormItem class="w-full md:w-1/3">
                                        <FormLabel>المجموعات</FormLabel>
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

                            <div class="w-full flex flex-col md:flex-row justify-around gap-y-7 md:py-0 md:gap-y-0 ">

                                <FormField v-slot="{ componentField }" name="startTime"
                                    :validate-on-blur="!isFieldDirty">
                                    <FormItem class="w-full min-w-16 md:w-1/3">
                                        <FormLabel>وقت البداية</FormLabel>
                                        <FormControl>
                                            <Input class="py-7 md:py-7" dir="rtl" type="text"
                                                placeholder="وقت البداية بصيغة 24" v-bind="componentField" />
                                        </FormControl>
                                        <FormMessage />
                                        <FormDescription>
                                            اضف الوقت بصيغة 24 ساعة
                                        </FormDescription>
                                    </FormItem>
                                </FormField>
                                <FormField v-slot="{ componentField }" name="duration"
                                    :validate-on-blur="!isFieldDirty">
                                    <FormItem class="w-full min-w-16 md:w-1/3">
                                        <FormLabel>مدة الاختبار</FormLabel>
                                        <FormControl>
                                            <Input class="py-7 md:py-7" dir="rtl" type="number"
                                                placeholder="مدة الاختبار بالدقائق" v-bind="componentField" />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>
                                </FormField>

                            </div>
                            <FormDatePicker :phone="true" title="تاريخ الاختبار" @date="h => assignDate(h)"
                                name="picker" />
                            <FormField v-slot="{ componentField }" name="note" :validate-on-blur="!isFieldDirty">
                                <FormItem class="w-full min-w-16 md:w-1/3">
                                    <FormLabel>ملاحظات</FormLabel>
                                    <FormControl>
                                        <Input class="py-7 md:py-7" dir="rtl" type="text"
                                            placeholder="اضف اي ملاحظات للطلبة" v-bind="componentField" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>

                            <div :key="question.id" v-for="question in questions"
                                class="relative w-full md:w-[80%]  flex-col justify-center  items-center mt-12  py-7 border rounded-xl gap-y-7  md:gap-y-0 ">
                                <span id="label" class="absolute right-0 -top-8"> سؤال-{{ question.id }} </span>
                                <div
                                    class="absolute left-0 -top-10 md:-left-12 md:top-0 h-full w-fit flex md:flex-col items-start justify-center gap-1 md:items-center ">
                                    <Button type="button" @click="addNewQuestionTemp"
                                        class=" bg-curious-blue-200 hover:bg-curious-blue-300 hover:cursor-pointer w-fit h-fit p-2 md:p-3 rounded-full">
                                        <PlusIcon />
                                    </Button>
                                    <Button type="button" @click="removeQuestionTemp(question.id)"
                                        class=" bg-red-200 hover:bg-red-300 hover:cursor-pointer w-fit h-fit p-2 md:p-3 rounded-full">
                                        <MinusIcon />
                                    </Button>

                                </div>
                                <div id="question" class="w-full flex  justify-around">
                                    <FormField name="question" :validate-on-blur="!isFieldDirty">
                                        <FormItem class="min-w-16 w-[85%]">
                                            <FormLabel>السؤال</FormLabel>
                                            <FormControl>
                                                <Input class="py-7 md:py-7" dir="rtl" type="text"
                                                    placeholder="صيغة السؤال" v-model="question.question" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>
                                </div>
                                <div id="options"
                                    class="w-[85%] md:w-full flex gap-5 md:gap-0 flex-wrap justify-end mt-5 md:justify-evenly">
                                    <FormField name="option1" :validate-on-blur="!isFieldDirty">
                                        <FormItem class="min-w-16 w-[90%] md:w-[40%]">
                                            <FormLabel>اجابة 1</FormLabel>
                                            <FormControl>
                                                <Input class="py-7 md:py-7" dir="rtl" type="text" placeholder="الجواب"
                                                    v-model="question.options[0]" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>
                                    <FormField name="option2" :validate-on-blur="!isFieldDirty">
                                        <FormItem class="min-w-16 w-[90%] md:w-[40%]">
                                            <FormLabel>اجابة 2</FormLabel>
                                            <FormControl>
                                                <Input class="py-7 md:py-7" dir="rtl" type="text" placeholder="الجواب"
                                                    v-model="question.options[1]" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>
                                    <FormField name="option3" :validate-on-blur="!isFieldDirty">
                                        <FormItem class="min-w-16 w-[90%] md:w-[40%] mt-3">
                                            <FormLabel>اجابة 3</FormLabel>
                                            <FormControl>
                                                <Input class="py-7 md:py-7" dir="rtl" type="text" placeholder="الجواب"
                                                    v-model="question.options[2]" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>
                                    <FormField name="option4" :validate-on-blur="!isFieldDirty">
                                        <FormItem class="min-w-16 w-[90%] md:w-[40%] mt-3">
                                            <FormLabel>اجابة 4</FormLabel>
                                            <FormControl>
                                                <Input class="py-7 md:py-7" dir="rtl" type="text" placeholder="الجواب"
                                                    v-model="question.options[3]" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>
                                    <FormField name="answer" :validate-on-blur="!isFieldDirty">
                                        <FormItem class="min-w-16 w-[90%] md:w-[40%] mt-5">
                                            <FormLabel>الاجابة الصحيحة</FormLabel>
                                            <FormControl>
                                                <Input class="py-7 md:py-7" dir="rtl" type="number" placeholder="الجواب"
                                                    v-model="question.answer_index" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>
                                </div>

                            </div>
                            <div class="pt-7 ">
                                <Button type="submit"
                                    class="px-32 py-3 lg:px-64 md:py-4 font-Somar rounded-lg text-curious-blue-50 bg-curious-blue-950 ">
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
