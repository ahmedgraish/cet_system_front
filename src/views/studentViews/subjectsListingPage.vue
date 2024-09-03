<script setup lang="ts">
import Header from '@/components/appHeader.vue';
import navBar from '@/components/navBar.vue';
import scheduleIcon from '@/components/icons/IconSchedule.vue'
import settingsIcon from '@/components/icons/IconSittings.vue'
import homeworkIcon from '@/components/icons/homeworkPaper.vue';
import quizIcon from '@/components/icons/checkList.vue';
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { onMounted, ref } from 'vue';
import { useStudentStore } from '@/stores/student';
import UserBunner from '@/components/userBunner.vue';
import subjectCard from '@/components/subjectCard.vue';
import type { navItem } from '@/components/navBar.vue';
import type { Student } from '@/repository/interfaces';


const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: 'home' },
    { id: 1, icon: homeworkIcon, link: 'subjectsListingPage' },
    { id: 2, icon: quizIcon, link: 'quizesPage' },
    { id: 4, icon: settingsIcon, link: 'userSettings' }
]

const student: Student = {
    id: 0,
    name: 'احمد محمد اقريش',
    ref_num: '181130',
    email: 'ahmed@gmail.com',
    phone_number: '0924986954',
    image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
}

const studentStore = useStudentStore()
const getSubject = async () => {
    await studentStore.getStudentSubjects()
}
onMounted(async () => {
    await getSubject()
})
</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <Header class="absolute hidden md:block top-0 h-16 w-full bg-white drop-shadow z-10">
            <UserBunner :name="student.name" :image="student.image" />
        </Header>
        <navBar :list="navItems" />
        <LoadingScreen v-if="studentStore.isLoading" />
        <main
            class="relative w-full h-full md:w-[95vw] md:h-[92vh] flex flex-col md:flex-row md:flex-wrap items-center justify-center md:justify-end  md:items-start pb-24 pt-80 md:p-12 md:mb-1 gap-10 overflow-auto "
            v-auto-animate>
            <subjectCard :key="index" v-for="cardInfo, index in studentStore.studentSubjects"
                :subjectCardInfo="cardInfo" class="" />
        </main>
    </div>
</template>

<style></style>
