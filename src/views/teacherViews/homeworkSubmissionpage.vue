<script setup lang="ts">
import Header from "@/components/appHeader.vue";
import navBar from "@/components/navBar.vue";
import scheduleIcon from "@/components/icons/IconSchedule.vue";
import settingsIcon from "@/components/icons/IconSittings.vue";
import homeworkIcon from "@/components/icons/homeworkPaper.vue";
import quizIcon from "@/components/icons/checkList.vue";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { useStudentStore } from "@/stores/student";
import UserBunner from "@/components/userBunner.vue";
import type { navItem } from "@/components/navBar.vue";
import pdfIcon from "@/components/icons/pdfIcon.vue";
import docIcon from "@/components/icons/docIcon.vue";
import imageIcon from "@/components/icons/imageIcon.vue";
import { onMounted, ref } from "vue";
import type { Comment as cm } from "@/repository/interfaces";
import { useRoute } from "vue-router";


const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: "home" },
    { id: 1, icon: homeworkIcon, link: "subjectsListingPage" },
    { id: 2, icon: quizIcon, link: "quizesPage" },
    { id: 4, icon: settingsIcon, link: "userSettings" },
];

const route = useRoute()
const studentStore = useStudentStore()
let hoveredIndex = ref(-1);


let iconType = (name: string) => {
    let extention: string[] = name.split(".");
    switch (extention[1].toLocaleLowerCase()) {
        case "pdf":
            return pdfIcon;
        case "png":
            return imageIcon;
        case "jpeg":
            return imageIcon;
        case "jpg":
            return imageIcon;
        default:
            return docIcon;
    }
};


function formatDateToArabic(date: Date | undefined) {
    const monthsArabic = [
        "يناير",
        "فبراير",
        "مارس",
        "ابريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
    ];
    if (date) {
        const day = date.getDate(); // Extract the day (e.g., 2)
        const month = monthsArabic[date.getMonth()]; // Get the month name in Arabic

        return `${day}-${month}`;
    } else return "undefined";
}


const transHomeWork = studentStore.studentHomeWorks.find(hw => hw.id === Number(route.params.homeworkId))

onMounted(() => {

});
</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <Header class="absolute hidden md:block top-0 h-16 w-full bg-white drop-shadow z-10">
            <UserBunner :name="studentStore.studentInfo.name" :image="studentStore.studentInfo.image" />
        </Header>
        <navBar :list="navItems" />
        <LoadingScreen v-if="studentStore.isLoading" />
        <main
            class="relative w-full h-full  md:w-[95vw] md:h-[92dvh] flex flex-col items-center justify-start overflow-auto"
            v-auto-animate>
            <div class="w-[95%] md:w-5/6 h-fit pb-24 flex flex-col items-center ">
                <div id="subjectBunner"
                    class="relative flex flex-col justify-center gap-2 p-5 md:p-10 items-end w-full h-36 min-h-[140px] md:h-40 md:min-h-[150px] border-b border-gray-600 mt-5 md:mt-10 font-Somar text-curious-blue-950">
                    <div class="w-full flex items-center justify-between md:justify-end">

                        <h1 class="text-3xl md:text-5xl select-none font-bold">
                            {{ transHomeWork?.name }}
                        </h1>
                    </div>
                    <span class="text-gray-500 mt-2 select-none">
                        <span>{{ studentStore.studentInfo.name }}</span>
                    </span>
                    <span class="flex items-center text-gray-500 select-none">اساسيات برمجة</span>
                    <span class="absolute bottom-1 left-5">
                        {{ formatDateToArabic(new Date(transHomeWork!.date)) }}
                        <span class="inline-block ml-1">
                            ,{{
                                new Date(transHomeWork!.date).toLocaleDateString("en", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })
                                    .split(",")[1]
                            }}
                        </span>
                    </span>

                </div>
                <div id="homeWorkDescription" dir="rtl"
                    class="flex justify-start w-[95%] md:w-3/4 h-fit md:self-start font-Somar md:pr-10 mt-9">
                    <p class="text-curious-blue-950">
                        {{ transHomeWork?.description }}
                        <br class="md:hidden" /><span
                            class="md:hidden font-Somar font-bold text-curious-blue-950">....</span>
                    </p>
                </div>
                <dir id="attachmentContainer"
                    class="flex flex-wrap items-center justify-start gap-2 pl-0 w-full md:w-3/4 self-start h-fit min-h-[80px] my-10 font-Somar select-none">

                    <div :key="index" v-for="(attachment, index) in transHomeWork?.attachments" id="attachment"
                        @mouseenter="hoveredIndex = index" @mouseleave="hoveredIndex = -1" :class="hoveredIndex === index
                            ? 'bg-zinc-50 cursor-pointer shadow-sm transition-all duration-200'
                            : ''
                            " class="flex items-center gap-3 justify-end h-16 w-fit md:w-fit pr-3 border rounded-md">
                        <a dir="rtl" :href="attachment.url" target="_blank"
                            class=" flex items-center gap-3 justify-end h-16 w-fit md:w-fit">
                            <span :class="hoveredIndex === index ? 'text-curious-blue-400' : ''"
                                class="text-curious-blue-900 underline-offset-2 w-full">
                                {{ attachment.name }}</span>
                            <component :is="iconType(attachment.name)" class="h-full w-1/3 border-r" />
                        </a>

                    </div>
                </dir>
            </div>
        </main>
    </div>
</template>

<style></style>
