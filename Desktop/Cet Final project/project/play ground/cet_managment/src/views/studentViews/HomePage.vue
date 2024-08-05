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
interface navItem {
    id?: number,
    icon?: Object,
    link?: String
}
const navItems: navItem[] = [
    { id: 1, icon: scheduleIcon, link: 'schedule' },
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
</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <Header class="absolute hidden md:block top-0 h-16 w-full bg-white drop-shadow ">
            <UserBunner />
        </Header>
        <navBar :list="navItems" />
        <OrganicShape class="absolute -top-32 -left-20 md:hidden" />

        <main class=" w-full h-[85vh] md:w-[95vw] md:h-[92vh] flex flex-col items-end -z-10" v-auto-animate>
            <h2 v-if="greet" style="animation: slideIn 0.5s ease-in-out forwards"
                class="font-Somar text-nowrap text-curious-blue-800 text-lg md:text-3xl mt-24 mr-5 md:mt-14 md:mr-10">
                💫 مرحبا احمد محمد اقريش
            </h2>
            <h2 v-if="!greet" style="animation: slideIn 0.5s ease-in-out forwards"
                class="font-Somar md:hidden text-nowrap text-curious-blue-800 text-lg md:text-3xl mt-24 mr-5 md:mt-14 md:mr-10">
                💫 مرحبا احمد محمد اقريش
            </h2>
            <schedule v-if="!greet" class="mr-5 mt-20 md:mt-16 md:mr-10 overflow-auto" />
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
