<script setup lang="ts">
import Header from "@/components/appHeader.vue";
import navBar from "@/components/navBar.vue";
import scheduleIcon from "@/components/icons/IconSchedule.vue";
import settingsIcon from "@/components/icons/IconSittings.vue";
import homeworkIcon from "@/components/icons/homeworkPaper.vue";
import quizIcon from "@/components/icons/checkList.vue";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import UserBunner from "@/components/userBunner.vue";
import type { navItem } from "@/components/navBar.vue";
import pdfIcon from "@/components/icons/pdfIcon.vue";
import docIcon from "@/components/icons/docIcon.vue";
import imageIcon from "@/components/icons/imageIcon.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import DataTable from "@/components/dataTable.vue";
import { useTeacherStore } from "@/stores/teacher";
import type { QuizScoreTemp, StudentScoresTemp } from "@/repository/interfaces";
import LoadingScreen from "@/components/loadingScreen.vue";


const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: "teacherHome" },
    { id: 2, icon: homeworkIcon, link: "teacherSubjects" },
    { id: 1, icon: quizIcon, link: "teacherQuizzes" },
    { id: 4, icon: settingsIcon, link: "teacherInfo" },
];

const route = useRoute()
const teacherStore = useTeacherStore()


let studentScores = ref<QuizScoreTemp>()
const getStudentsScores = async () => {
    studentScores.value = await teacherStore.getQuizScores(Number(route.params.quizId))
}

onMounted(async () => {
    await getStudentsScores()
});
</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <Header class="absolute hidden md:block top-0 h-16 w-full bg-white drop-shadow z-10">
            <UserBunner :name="teacherStore.teacherInfo.name" :image="teacherStore.teacherInfo.image"
                link="teacherInfo" />
        </Header>
        <navBar :list="navItems" />
        <LoadingScreen v-if="teacherStore.isLoading" />
        <main
            class="relative w-full h-full  md:w-[95vw] md:h-[92dvh] flex flex-col items-center justify-start overflow-auto"
            v-auto-animate>
            <div class="w-[95%] md:w-5/6 h-fit pb-24 flex flex-col items-center ">
                <div id="subjectBunner"
                    class="relative flex flex-col justify-center gap-2 p-5 md:p-10 items-end w-full h-36 min-h-[140px] md:h-40 md:min-h-[150px] border-b border-gray-600 mt-5 md:mt-10 font-Somar text-curious-blue-950">
                    <div class="w-full flex items-center justify-end ">

                        <h1 class="text-3xl md:text-5xl select-none font-bold">
                            {{ teacherStore.teacherQuizes.find(qz =>
                                qz.id === Number(route.params.quizId))?.name }}
                        </h1>
                    </div>
                    <span class="text-gray-500 mt-2 select-none">
                        <span>{{ teacherStore.teacherInfo.name }}</span>
                    </span>
                    <span class="flex items-center text-gray-500 select-none">{{ teacherStore.teacherQuizes.find(qz =>
                        qz.id === Number(route.params.quizId))?.subject_name }}</span>
                </div>
                <div class="w-full border"></div>
                <span class="font-Somar text-curious-blue-900 font-medium text-4xl m-10">النتائج</span>
                <DataTable class="w-full mt-3 ">
                    <template #header>
                        <h1 class="w-1/6 text-center h-full pr-3">رقم قيد الطالب</h1>
                        <h1 class="w-3/6 text-center">اسم الطالب</h1>
                        <h1 class="w-1/6 text-center">المجموعة</h1>
                        <h1 class="w-1/6 text-center">الدرجة</h1>
                    </template>
                    <template #row>
                        <router-link :key="index" v-for="student, index in studentScores?.answers"
                            :to="{ name: 'teacherQuizResultPreview', params: { studentId: student.user_id, quizId: Number(route.params.quizId) } }">
                            <div
                                class="w-full flex min-h-16 items-center pr-3 text-center hover:bg-curious-blue-50 hover:cursor-pointer">
                                <h1 class="w-1/6">{{ student.ref_number }}</h1>
                                <h1 class="w-3/6">{{ student.user_name }}</h1>
                                <h1 class="w-1/6">{{ student.group_name }}</h1>
                                <div class="w-1/6 flex  flex-wrap justify-center">
                                    {{ student.correct_answers_count }} \ {{ studentScores?.total }}
                                </div>
                            </div>
                        </router-link>

                    </template>
                </DataTable>
            </div>
        </main>
    </div>
</template>

<style></style>
