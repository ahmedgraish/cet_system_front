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

import { useStudentStore } from '@/stores/student';
import DataTable from '@/components/dataTable.vue';
import RadioGroup from '@/components/ui/radio-group/RadioGroup.vue';
import RadioGroupItem from '@/components/ui/radio-group/RadioGroupItem.vue';
import Label from '@/components/ui/label/Label.vue';
import { ArrowUpIcon, CheckIcon, Cross2Icon } from '@radix-icons/vue';
import { ref } from 'vue';
import Card from '@/components/ui/card/Card.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardFooter from '@/components/ui/card/CardFooter.vue';
import Avatar from '@/components/ui/avatar/Avatar.vue';
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue';
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';

const studentStore = useStudentStore()
const navItems: navItem[] = [
    { id: 1, icon: scheduleIcon, link: 'teacherHome' },
    { id: 2, icon: homeworkIcon, link: 'teacherSubjects' },
    { id: 3, icon: quizIcon, link: 'teacherQuizzes' },
    { id: 4, icon: settingsIcon, link: 'userSettings' }
]

const students = ref([
    { ref: '181130', name: 'احمد محمد اقريش', status: false },
    { ref: '181131', name: 'محمد علي الزهراني', status: false },
    { ref: '181132', name: 'خالد احمد القحطاني', status: false },
    { ref: '181133', name: 'سعيد عبدالله الدوسري', status: false },
    { ref: '181134', name: 'عبدالرحمن صالح المالكي', status: false },
    { ref: '181135', name: 'علي فهد الشمري', status: false },
    { ref: '181136', name: 'فارس عبدالله الشهري', status: false },
    { ref: '181137', name: 'يوسف محمد العتيبي', status: false },
    { ref: '181138', name: 'ماجد ناصر الجهني', status: false },
    { ref: '181139', name: 'سلمان عبدالعزيز الغامدي', status: false },
    { ref: '181140', name: 'بندر احمد المطيري', status: false },
    { ref: '181141', name: 'طلال سعد السهلي', status: false },
    { ref: '181142', name: 'حسين عبدالله السبيعي', status: false },
    { ref: '181143', name: 'عبدالله محمد العبدلي', status: false },
    { ref: '181144', name: 'سلطان سعيد القرني', status: false },
    { ref: '181145', name: 'مازن فهد الدوسري', status: false },
    { ref: '181146', name: 'تركي خالد العجمي', status: false },
    { ref: '181147', name: 'فيصل علي الحربي', status: false },
    { ref: '181148', name: 'ياسر فهد البقمي', status: false },
    { ref: '181149', name: 'عبدالملك ناصر السالم', status: false }
]);

const updateStudentStatus = (index: number, status: boolean) => {
    students.value[index].status = status;
    console.log('Student: ', students.value[index].name,);
    console.log(students.value);


};
const scrollTop = () => {
    document.getElementById('subjectBunner')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <Header class="absolute hidden md:block top-0 h-16 w-full bg-white drop-shadow z-10">
            <UserBunner :name="studentStore.studentInfo.name" :image="studentStore.studentInfo.image" />
        </Header>
        <navBar :list="navItems" />
        <div id="toTop" @click="scrollTop" style="animation: bounceUp 0.8s ease-in-out infinite"
            class="fixed flex items-center justify-center z-30 bottom-20 right-2 md:right-24 md:bottom-10 rounded-full w-16 h-16 border-2 bg-gray-50 hover:cursor-pointer hover:bg-gray-100">
            <ArrowUpIcon class="scale-150 text-gray-500" />
        </div>
        <main class="relative w-full h-full md:w-[95vw] md:h-[92vh] flex items-start justify-center overflow-auto"
            v-auto-animate>
            <div v-if="studentStore.studentHomeWorks.length > 0"
                class="w-[95%] md:w-5/6 h-fit pb-24 flex flex-col items-center">
                <div id="subjectBunner"
                    class="relative flex flex-col justify-end gap-2 p-5 md:p-10 items-end w-full h-36 min-h-[140px] md:h-36 md:min-h-[200px] rounded-xl bg-gradient-to-r from-cyan-500 to-curious-blue-400 mt-5 md:mt-10 font-Somar text-curious-blue-50">
                    <h1 class="text-3xl md:text-5xl select-none font-bold">الالكترونية</h1>
                    <span class="flex items-center select-none">كلية التقنية الالكترونية</span>
                    <Button type="button"
                        class="absolute left-5 px-10 py-2 lg:px-24 md:py-4 font-Somar rounded-lg text-curious-blue-900 bg-white ">
                        تسجيل
                    </Button>
                </div>
                <div dir="rtl" class="w-full h-fit flex flex-wrap gap-10 md:gap-3 items-center mt-10 justify-around">
                    <Card :key="index" v-for="(student, index) in students"
                        class="w-[80%] min-w-[200px] md:w-fit md:min-w-[250px] font-Somar">
                        <CardHeader class="items-center gap-5">
                            <Avatar size="lg">
                                <AvatarImage :src="studentStore.studentInfo.image" alt="pic" />
                                <AvatarFallback>pic</AvatarFallback>
                            </Avatar>
                            <CardTitle class="flex text-center gap-2 text-lg font-normal text-gray-600">
                                <span>{{ student.name }}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardDescription class="flex justify-center">
                            <span> رقم قيد الطالب : {{ student.ref }}</span>
                        </CardDescription>
                        <CardFooter class="items-center justify-center mt-10 ">
                            <RadioGroup dir="rtl" default-value="option-two"
                                class="w-1/2 h-full flex items-center justify-center">
                                <div class="flex items-center space-x-2">
                                    <RadioGroupItem @click="updateStudentStatus(index, true)" id="true"
                                        :class="student.status ? 'border-green-500 text-green-500' : ''"
                                        class="w-12 h-12 text-center hover:border-green-500 hover:text-green-500">
                                        <CheckIcon />
                                    </RadioGroupItem>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <RadioGroupItem @click="updateStudentStatus(index, false)" id="option-two"
                                        value="option-two" :class="!student.status ? 'border-red-500 text-red-500' : ''"
                                        class="w-12 h-12 text-center hover:border-red-500 hover:text-red-500">
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
