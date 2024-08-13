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
import QuizCard from '@/components/quizCard.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { navItem } from '@/components/navBar.vue';
import type { QuizCardInfo } from '@/components/quizCard.vue';


const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: 'home' },
    { id: 2, icon: homeworkIcon, link: 'homeworks' },
    { id: 1, icon: quizIcon, link: 'quizes' },
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

let activeTab = ref(1)

const quizCardData = [
    {
        quizName: 'امتحان الفيزياء', // Physics Exam
        day: 'الخميس', // Thursday
        date: new Date('2024-08-1'),
        duration: 75,
        note: 'يسمح باستخدام الآلة الحاسبة' // Calculator allowed
    },
    {
        quizName: 'اختبار الكيمياء', // Chemistry Exam
        day: 'السبت', // Saturday
        date: new Date('2024-08-18'),
        duration: 90,
        note: 'لا يسمح بالتعاون' // No collaboration
    },
    {
        quizName: 'امتحان التاريخ', // History Exam
        day: 'الأثنين', // Monday
        date: new Date('2024-08-10'),
        duration: 60,
        note: 'الإجابة على جميع الأسئلة إلزامية' // Answering all questions is mandatory
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
        <main class="relative w-full h-full md:w-[95vw] md:h-[92vh] flex items-center justify-center overflow-hidden"
            v-auto-animate>
            <Tabs default-value="dueQuizes" class="w-full h-full  flex flex-col items-center mt-16 overflow-auto">
                <TabsList class="w-5/6 md:w-2/4">
                    <TabsTrigger @click="activeTab = 2" value="completedQuizes">
                        الاختبارات المنجزة
                    </TabsTrigger>
                    <TabsTrigger @click="activeTab = 1" value="dueQuizes" class="">
                        الاختبارات القادمة
                    </TabsTrigger>
                </TabsList>
                <TabsContent v-if="activeTab === 1" value="dueQuizes"
                    class="w-full h-full flex flex-col md:flex-row md:flex-wrap items-center md:items-start pb-20 p-10 md:p-12 mb-20 md:mb-1 justify-start md:justify-end gap-10 overflow-auto">
                    <QuizCard :key="quizCardData.indexOf(cardInfo)" v-for="cardInfo in quizCardData"
                        :quizCardInfo="cardInfo" :due="true" />
                </TabsContent>
                <TabsContent v-if="activeTab === 2" value="completedQuizes"
                    class="w-full h-full flex flex-col md:flex-row md:flex-wrap items-center md:items-start pb-20 p-10 md:p-12 mb-20 md:mb-1 justify-start md:justify-end gap-10 overflow-auto">
                    <QuizCard :key="quizCardData.indexOf(cardInfo)" v-for="cardInfo in quizCardData"
                        :quizCardInfo="cardInfo" :due="false" />
                </TabsContent>
            </Tabs>

        </main>
    </div>
</template>

<style></style>
