<script setup lang="ts">
import Header from '@/components/appHeader.vue';
import navBar from '@/components/navBar.vue';
import scheduleIcon from '@/components/icons/IconSchedule.vue'
import settingsIcon from '@/components/icons/IconSittings.vue'
import homeworkIcon from '@/components/icons/homeworkPaper.vue';
import quizIcon from '@/components/icons/checkList.vue';
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { onMounted, ref } from 'vue';
import UserBunner from '@/components/userBunner.vue';
import QuizCard from '@/components/quizCard.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { navItem } from '@/components/navBar.vue';
import { useStudentStore } from '@/stores/student';
import LoadingScreen from '@/components/loadingScreen.vue';


const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: 'home' },
    { id: 2, icon: homeworkIcon, link: 'subjectsListingPage' },
    { id: 1, icon: quizIcon, link: 'quizesPage' },
    { id: 4, icon: settingsIcon, link: 'userSettings' }
]

let activeTab = ref(1)

const studentStore = useStudentStore()
const getStudentQuizes = async () => {
    await studentStore.getStudentQuizes()
}

onMounted(() => {
    getStudentQuizes()

})



</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <Header class="absolute hidden md:block top-0 h-16 w-full bg-white drop-shadow z-10">
            <UserBunner :name="studentStore.studentInfo.name" :image="studentStore.studentInfo.image" />
        </Header>
        <navBar :list="navItems" />
        <LoadingScreen v-if="studentStore.isLoading" />

        <main class="relative w-full h-full md:w-[95vw] md:h-[92vh] flex items-center justify-center overflow-hidden"
            v-auto-animate>
            <Tabs default-value="dueQuizes" class="w-full h-full  flex flex-col items-center mt-16 overflow-auto">
                <TabsList class="w-5/6 md:w-2/4">
                    <TabsTrigger @click="activeTab = 2" value="completedQuizes">
                        الاختبارات السابقة
                    </TabsTrigger>
                    <TabsTrigger @click="activeTab = 1" value="dueQuizes" class="">
                        الاختبارات القادمة
                    </TabsTrigger>

                </TabsList>
                <TabsContent v-if="activeTab === 1" value="dueQuizes"
                    class="w-full h-full flex flex-col md:flex-row md:flex-wrap items-center md:items-start pb-20 p-10 md:p-12 mb-20 md:mb-1 justify-start md:justify-end gap-10 overflow-auto">
                    <QuizCard :key="index" v-for="quizInfo, index in studentStore.studentQuizes"
                        :quizCardInfo="quizInfo" :due="true" />

                </TabsContent>
                <TabsContent v-if="activeTab === 2" value="completedQuizes"
                    class="w-full h-full flex flex-col md:flex-row md:flex-wrap md:flex items-center md:items-start pb-20 p-10 md:p-12 mb-20 md:mb-1 justify-start md:justify-end gap-10 overflow-auto">
                    <QuizCard :key="index" v-for="quizInfo, index in studentStore.studentQuizes"
                        :quizCardInfo="quizInfo" :due="false" />
                </TabsContent>
            </Tabs>

        </main>
    </div>
</template>

<style></style>
