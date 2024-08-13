<script setup lang="ts">
import Header from '@/components/appHeader.vue';
import navBar from '@/components/navBar.vue';
import schedule from '@/components/studentSchedule.vue';
import scheduleIcon from '@/components/icons/IconSchedule.vue'
import settingsIcon from '@/components/icons/IconSittings.vue'
import homeworkIcon from '@/components/icons/homeworkPaper.vue';
import quizIcon from '@/components/icons/checkList.vue';
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { onMounted, ref } from 'vue';
import OrganicShape from '@/components/icons/organicShape.vue';
import UserBunner from '@/components/userBunner.vue';
import type { Student } from '@/stores/student';
import type { LectureInfo } from '@/components/studentSchedule.vue';
import type { navItem } from '@/components/navBar.vue';

const navItems: navItem[] = [
    { id: 1, icon: scheduleIcon, link: 'home' },
    { id: 2, icon: homeworkIcon, link: 'homeworks' },
    { id: 3, icon: quizIcon, link: 'quizes' },
    { id: 4, icon: settingsIcon, link: 'settings' }
]

let greet = ref(true)
const greeting = () => {
    setTimeout(() => {
        greet.value = false
    }, 1000);
}

onMounted(() => {
    greeting()
})


const student: Student = {
    id: 0,
    name: 'احمد محمد اقريش',
    ref_num: '181130',
    email: 'ahmed@gmail.com',
    phone_number: '0924986954',
    image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
}

const lectures: LectureInfo = [{
    subName: 'هندسة برمجيات',
    startTime: '08:00',
    endTime: '12:00',
    dayOfWeek: '1',
    absenceRatio: '20'
}, {
    subName: 'رياضة',
    startTime: '08:00',
    endTime: '11:00',
    dayOfWeek: '3',
    absenceRatio: '12'
}, {
    subName: 'احصاء',
    startTime: '12:00',
    endTime: '15:00',
    dayOfWeek: '2',
    absenceRatio: '0'
}]

</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <Header class="absolute hidden md:block top-0 h-16 w-full bg-white drop-shadow ">
            <UserBunner :name="student.name" :image="student.image" />
        </Header>
        <navBar :list="navItems" />
        <OrganicShape class="absolute -top-32 -left-20 md:hidden" />

        <main class=" w-full h-[85vh] md:w-[95vw] md:h-[92vh] flex flex-col items-end " v-auto-animate>
            <h2 v-if="greet" style="animation: slideIn 0.5s ease-in-out forwards"
                class="font-Somar text-nowrap text-curious-blue-800 text-lg md:text-3xl mt-24 mr-5 md:mt-14 md:mr-10">
                💫 مرحبا {{ student.name }}
            </h2>
            <h2 v-if="!greet" style="animation: slideIn 0.5s ease-in-out forwards"
                class="font-Somar md:hidden text-nowrap text-curious-blue-800 text-lg md:text-3xl mt-28 mr-5 md:mt-14 md:mr-10">
                💫 مرحبا {{ student.name }}
            </h2>
            <schedule :lectures="lectures" v-if="!greet" class="mr-5 mt-14 md:mt-16 md:mr-10 overflow-auto" />
        </main>
    </div>
</template>

<style>
@keyframes slideIn {
    0% {
        transform: translateX(10%);
    }

    100% {
        transform: translateX(0);
    }
}
</style>
