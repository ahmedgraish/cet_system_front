<script setup lang="ts">
import Header from '@/components/appHeader.vue';
import navBar from '@/components/navBar.vue';
import scheduleIcon from '@/components/icons/IconSchedule.vue'
import settingsIcon from '@/components/icons/IconSittings.vue'
import homeworkIcon from '@/components/icons/homeworkPaper.vue';
import quizIcon from '@/components/icons/checkList.vue';
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import UserBunner from '@/components/userBunner.vue';
import type { navItem } from '@/components/navBar.vue';
import RadioGroup from '@/components/ui/radio-group/RadioGroup.vue';
import RadioGroupItem from '@/components/ui/radio-group/RadioGroupItem.vue';
import { ArrowUpIcon, CheckIcon, Cross2Icon } from '@radix-icons/vue';
import { onMounted, ref } from 'vue';
import Card from '@/components/ui/card/Card.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardFooter from '@/components/ui/card/CardFooter.vue';
import Avatar from '@/components/ui/avatar/Avatar.vue';
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue';
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import { useTeacherStore } from '@/stores/teacher';
import { useRoute } from 'vue-router';
import type { Attendence, AttendenceList, User } from '@/repository/interfaces';
import LoadingScreen from '@/components/loadingScreen.vue';
import Dialog from '@/components/ui/dialog/Dialog.vue';
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue';
import DialogContent from '@/components/ui/dialog/DialogContent.vue';
import SuccessIcon from '@/components/icons/successIcon.vue';
import ErrorIcon from '@/components/icons/errorIcon.vue';
import { isAxiosError } from 'axios';

const navItems: navItem[] = [
    { id: 1, icon: scheduleIcon, link: 'teacherHome' },
    { id: 2, icon: homeworkIcon, link: 'teacherSubjects' },
    { id: 3, icon: quizIcon, link: 'teacherQuizzes' },
    { id: 4, icon: settingsIcon, link: 'teacherInfo' }
]

const route = useRoute()

const teacherStore = useTeacherStore()
let students = ref<User[]>([])
const getStudents = async () => {
    students.value = await teacherStore.getLectureStudents(Number(route.params.lectureId))
}




let attendence = ref<Attendence[]>([])

const updateStudentStatus = (index: number, status: boolean) => {
    const existingStudent = attendence.value.find(st => st.user_id === students.value[index].id);
    if (existingStudent) {
        existingStudent.status = status ? 1 : 2; // Update the status if the student is found
    } else {
        attendence.value.push({
            user_id: students.value[index].id,
            status: status ? 1 : 2  // Add a new entry if the student is not found
        });
    }
    console.log(attendence.value);

};
let attendenceList = ref<AttendenceList>()
let message = ref('')
const submitAttendence = async () => {
    attendenceList.value = {
        date: new Date().toISOString(),
        attendance: attendence.value
    }

    try {
        const res = await teacherStore.submitAttendence(attendenceList.value, Number(route.params.lectureId))
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

}
const scrollTop = () => {
    document.getElementById('subjectBunner')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(async () => {
    await getStudents()

})
</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <Header class="absolute hidden md:block top-0 h-16 w-full bg-white drop-shadow z-10">
            <UserBunner :name="teacherStore.teacherInfo.name" :image="teacherStore.teacherInfo.image"
                link="teacherInfo" />
        </Header>
        <navBar :list="navItems" />
        <div id="toTop" @click="scrollTop" style="animation: bounceUp 0.8s ease-in-out infinite"
            class="fixed flex items-center justify-center z-30 bottom-20 right-2 md:right-24 md:bottom-10 rounded-full w-16 h-16 border-2 bg-gray-50 hover:cursor-pointer hover:bg-gray-100">
            <ArrowUpIcon class="scale-150 text-gray-500" />
        </div>
        <LoadingScreen v-if="teacherStore.isLoading" />
        <Dialog>
            <DialogTrigger id="errorMessage"></DialogTrigger>
            <DialogContent
                class="flex flex-col items-center justify-start w-60 h-60 rounded-2xl data-[state=open]:animate-open-up">
                <ErrorIcon class="scale-75 rounded-xl" />
                <span class="font-Somar text-xl text-crimson-800 text-center">..حدث خطأ<br> يرجى التاكد من البيانات
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
        <main class="relative w-full h-full md:w-[95vw] md:h-[92vh] flex items-start justify-center overflow-auto"
            v-auto-animate>
            <div class="w-[95%] md:w-5/6 h-fit pb-24 flex flex-col items-center">
                <div id="subjectBunner"
                    class="relative flex flex-col justify-end gap-2 p-5 md:p-10 items-end w-full h-36 min-h-[140px] md:h-36 md:min-h-[200px] rounded-xl bg-gradient-to-r from-cyan-500 to-curious-blue-400 mt-5 md:mt-10 font-Somar text-curious-blue-50">
                    <h1 class="text-3xl md:text-5xl select-none font-bold">
                        {{ teacherStore.teacherLectures.find(lec => lec.id ===
                            Number(route.params.lectureId))?.subject_name }}
                    </h1>
                    <span class="flex items-center select-none">كلية التقنية الالكترونية</span>
                    <Button @click="submitAttendence()" type="button"
                        class="absolute left-5 px-10 py-2 lg:px-24 md:py-4 font-Somar rounded-lg text-curious-blue-900 bg-white ">
                        تسجيل
                    </Button>
                </div>
                <div v-if="!teacherStore.isLoading" dir="rtl"
                    class="w-full h-fit flex flex-wrap gap-10 md:gap-3 items-center mt-10 justify-around">
                    <Card :key="index" v-for="(student, index) in students"
                        class="w-[80%] min-w-[200px] md:w-fit md:min-w-[250px] font-Somar">
                        <CardHeader class="items-center gap-5">
                            <Avatar size="lg">
                                <AvatarImage :src="teacherStore.teacherInfo.image" alt="pic" />
                                <AvatarFallback>pic</AvatarFallback>
                            </Avatar>
                            <CardTitle class="flex text-center gap-2 text-lg font-normal text-gray-600">
                                <span>{{ student.name }}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardDescription class="flex justify-center">
                            <span> رقم قيد الطالب : {{ student.ref_number }}</span>
                        </CardDescription>
                        <CardFooter class="items-center justify-center mt-10 ">
                            <RadioGroup dir="rtl" default-value=""
                                class="w-1/2 h-full flex items-center justify-center">
                                <div class="flex items-center space-x-2">
                                    <RadioGroupItem @click="updateStudentStatus(index, true)" id="true"
                                        class="w-12 h-12 text-center border-gray-400 hover:border-green-500 hover:text-green-500"
                                        :class="attendence.find(st => st.user_id === student.id)?.status === 1 ? 'border-green-500 text-green-500' : 'border-gray-500'">
                                        <CheckIcon />
                                    </RadioGroupItem>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <RadioGroupItem @click="updateStudentStatus(index, false)" id="option-two"
                                        value="option-two"
                                        class="w-12 h-12 text-center border-gray-400  hover:border-red-500 hover:text-red-500"
                                        :class="attendence.find(st => st.user_id === student.id)?.status === 2 ? 'border-red-500 text-red-500' : 'border-gray-500'">
                                        <Cross2Icon />
                                    </RadioGroupItem>
                                </div>
                            </RadioGroup>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </main>
    </div>
</template>

<style>
@keyframes bounceUp {
    0% {
        transition: all 0.2s ease-in-out;
        transform: translateY(0);
    }

    50% {
        transition: all 0.2s ease-in-out;

        transform: translateY(-5%);
    }

    100% {
        transition: all 0.2s ease-in-out;

        transform: translateY(0);
    }


}
</style>
