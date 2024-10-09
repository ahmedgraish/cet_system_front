<script setup lang="ts">
import navBar from '@/components/navBar.vue';
import scheduleIcon from '@/components/icons/IconSchedule.vue'
import settingsIcon from '@/components/icons/IconSittings.vue'
import homeworkIcon from '@/components/icons/homeworkPaper.vue';
import quizIcon from '@/components/icons/checkList.vue';
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardFooter from '@/components/ui/card/CardFooter.vue';
import Button from '@/components/ui/button/Button.vue'
import { onMounted } from 'vue';
import ArrowRight from '@/components/icons/arrowRight.vue';
import type { navItem } from '@/components/navBar.vue';
import { useStudentStore } from '@/stores/student';
import { useRoute } from 'vue-router';
import LoadingScreen from '@/components/loadingScreen.vue';

const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: 'home' },
    { id: 2, icon: homeworkIcon, link: 'subjectsListingPage' },
    { id: 1, icon: quizIcon, link: 'quizesPage' },
    { id: 4, icon: settingsIcon, link: 'studentInfo' }
]
const route = useRoute()
const studentStore = useStudentStore()
const quizData = studentStore.studentQuizes.find(quiz => quiz.id === Number(route.params.quizId))?.questions;

const getScore = async () => {
    studentStore.studentResult(Number(route.params.quizId))
}

onMounted(async () => {
    await getScore()
})
</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <navBar :list="navItems" />
        <LoadingScreen v-if="studentStore.isLoading" />
        <main
            class="w-full h-full md:w-[95vw] md:h-[92vh] flex flex-col md:flex-row md:flex-wrap items-center pb-20 md:p-12 justify-center md:justify-evenly gap-10 overflow-auto"
            v-auto-animate>

            <Card id="scroreCard"
                class=" relative w-5/6 h-fit min-w-[320px] min-h-[400px] md:w-2/5 md:h-full md:max-h-[500px] font-Somar text-curious-blue-900 text-right transition-all">
                <CardContent class="relative h-full flex flex-col items-center justify-between ">
                    <CardHeader class="pr-0 flex flex-row items-center gap-2 justify-center tex t-wrap text-center">
                        <h1 class="text-xl md:text-2xl select-none">النتيجة النهائية
                        </h1>
                    </CardHeader>
                    <div class="w-[95%] md:w-[80%]  flex items-center justify-center text-7xl font-Somar font-semibold"
                        v-auto-animate>
                        {{ quizData!.length }} \ {{ studentStore.studentAnswers?.score }}
                    </div>
                    <CardFooter class="w-full flex items-center justify-center mt-10">

                        <router-Link :to="{ name: 'quizResults', params: { quizId: Number(route.params.quizId) } }">
                            <Button type="button"
                                class=" flex items-center gap-3 px-3 py-3 md:py-4 font-Somar rounded-lg text-curious-blue-50 bg-curious-blue-900 ">
                                <ArrowRight color="#f3f7fc" class="rotate-180" />
                                عرض الاجابات
                            </Button>
                        </router-Link>

                    </CardFooter>
                </CardContent>
            </Card>
        </main>
    </div>
</template>
