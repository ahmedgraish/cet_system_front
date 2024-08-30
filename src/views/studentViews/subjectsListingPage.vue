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
import UserBunner from '@/components/userBunner.vue';
import subjectCard from '@/components/subjectCard.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { navItem } from '@/components/navBar.vue';
import type { QuizCardInfo } from '@/components/quizCard.vue';


const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: 'home' },
    { id: 1, icon: homeworkIcon, link: 'subjects' },
    { id: 2, icon: quizIcon, link: 'quizes' },
    { id: 4, icon: settingsIcon, link: 'settings' }
]

const student: Student = {
    id: 0,
    name: 'احمد محمد اقريش',
    ref_num: '181130',
    email: 'ahmed@gmail.com',
    phone_number: '0924986954',
    image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
}

const subjectCardData = [
    {
        name: 'هيكلة بيانات', // Physics Exam
        day: 'الخميس', // Thursday
        date: new Date('2024-08-1'),
    },
    {
        name: 'برمجة صفحات ويب', // Chemistry Exam
        day: 'السبت', // Saturday
        date: new Date('2024-08-18'),
    },
    {
        name: 'رياضة 2', // History Exam
        day: 'الأثنين', // Monday
        date: new Date('2024-08-10'),
    },
]

onMounted(() => {
})

</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <Header class="absolute hidden md:block top-0 h-16 w-full bg-white drop-shadow z-10">
            <UserBunner :name="student.name" :image="student.image" />
        </Header>
        <navBar :list="navItems" />
        <main
            class="relative w-full h-full md:w-[95vw] md:h-[92vh] flex flex-col md:flex-row md:flex-wrap items-center justify-center md:items-start pb-24 pt-20 md:p-12 md:mb-1 gap-10 overflow-auto "
            v-auto-animate>
            <subjectCard :key="subjectCardData.indexOf(cardInfo)" v-for="cardInfo in subjectCardData"
                :subjectCardInfo="cardInfo" />
            <subjectCard :key="subjectCardData.indexOf(cardInfo)" v-for="cardInfo in subjectCardData"
                :subjectCardInfo="cardInfo" />
            <subjectCard :key="subjectCardData.indexOf(cardInfo)" v-for="cardInfo in subjectCardData"
                :subjectCardInfo="cardInfo" />
        </main>
    </div>
</template>

<style></style>
