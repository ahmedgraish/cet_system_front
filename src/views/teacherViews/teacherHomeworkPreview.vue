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
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import Avatar from "@/components/ui/avatar/Avatar.vue";
import AvatarImage from "@/components/ui/avatar/AvatarImage.vue";
import pdfIcon from "@/components/icons/pdfIcon.vue";
import docIcon from "@/components/icons/docIcon.vue";
import imageIcon from "@/components/icons/imageIcon.vue";
import { onMounted, reactive, ref } from "vue";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import Input from "@/components/ui/input/Input.vue";
import SendIcon from "@/components/icons/sendIcon.vue";
import type { Comment as cm } from "@/repository/interfaces";
import { useRoute } from "vue-router";
import router from "@/router";


const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: "teacherHome" },
    { id: 1, icon: homeworkIcon, link: "teacherSubjects" },
    { id: 2, icon: quizIcon, link: "teacherQuizzes" },
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
let newComment = ref("");
let commentInput = ref<HTMLElement | null>()
let addComment = async (homeWorkId: number) => {
    if (newComment.value.length > 0) {
        console.log(newComment.value);
        const typedComment: cm = {
            user_name: studentStore.studentInfo.name,
            created_at: new Date().toISOString(),
            content: newComment.value
        }
        studentStore.studentHomeWorks.find(hw => hw.id === homeWorkId)?.comments.push({
            user_name: studentStore.studentInfo.name,
            created_at: new Date().toISOString(),
            content: newComment.value,
        });
        await studentStore.addNewComment(homeWorkId, typedComment)
        newComment.value = "";
        commentInput.value = document.getElementById('commentInput')
        commentInput.value?.scrollIntoView({ behavior: 'smooth' })
    }
};



let uploadedFiles = reactive<File[]>([])

const getStudentsSubmitions = async () => {
    router.push({ name: 'homeworksubmissionpage' })
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
                        <Drawer>
                            <DrawerTrigger class="md:hidden px-5 py-1 rounded-xl border text-curious-blue-400">عرض
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle class="flex items-center justify-center">
                                        <span class="text-curious-blue-950 text-2xl font-bold">
                                            تسليمات الطلبة
                                        </span>
                                    </DrawerTitle>
                                    <DrawerDescription>عرض تسليمات الطلبة</DrawerDescription>
                                </DrawerHeader>

                                <div v-if="uploadedFiles.length > 0">
                                    <span :key="index" v-for="file, index in uploadedFiles"
                                        class="flex flex-row-reverse items-center justify-end h-16 w-[85%]  m-3 text-lg font-semibold text-gray-500 border rounded-md text-wrap text-center overflow-hidden">
                                        <span class="text-curious-blue-900 text-sm w-2/3">
                                            {{ file.name }}</span>
                                        <component :is="iconType(file.name)" class="h-full self-end w-fit border-r" />
                                    </span>
                                </div>
                                <span v-else class="my-10 w-full text-lg text-gray-500 text-center">
                                    لم يتم التسليم بعد
                                </span>
                                <DrawerFooter>
                                    <div
                                        class="flex flex-col items-center gap-3 justify-center mt-3 w-full text-curious-blue-50 font-semibold">


                                        <span @click="getStudentsSubmitions()"
                                            class="flex items-center justify-center w-[90%] py-2 rounded-md bg-curious-blue-400 hover:cursor-pointer transition-all delay-75 hover:bg-curious-blue-500">عرض
                                            التسليمات</span>
                                    </div>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
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
                <!-- style="animation: bounce 3s ease-in-out infinite" -->
                <Card
                    class="hidden absolute right-[5vw] top-1/3 mt-9 md:flex justify-end w-[20%] h-auto min-h-[200px] text-sm font-Somar shadow-md">
                    <CardHeader dir="rtl" class="w-full h-full flex flex-col items-center justify-between">
                        <span class="flex items-center text-curious-blue-950 text-2xl font-bold self-start">
                            تسليمات الطلبة
                        </span>


                        <span class="my-10 text-lg text-gray-500">
                            لم يتم التسليم بعد
                        </span>

                        <div class="flex flex-col items-center gap-3 justify-center mt-3 w-full text-curious-blue-50 ">

                            <span @click="getStudentsSubmitions()"
                                class="flex items-center justify-center w-full py-2 rounded-md bg-curious-blue-400 hover:cursor-pointer transition-all delay-75 hover:bg-curious-blue-500">عرض
                                تسليمات الطلبة</span>
                        </div>
                    </CardHeader>
                </Card>
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
                <div class=" w-full md:w-3/4 self-start mt-5 flex flex-col items-center p-0 h-fit font-Somar">
                    <div class="p-6 pb-0 flex items-center justify-end border-t border-gray-300 w-full mb-5">
                        <div class="text-gray-500 mb-4">التعليقات</div>
                    </div>
                    <div dir="rtl" :key="index" v-for="comment, index in transHomeWork?.comments"
                        class="flex flex-col items-start w-[90%] h-fit py-3 rounded-md border mt-2">
                        <div class="flex items-center gap-1 mr-1">
                            <Avatar>
                                <AvatarImage :src="studentStore.studentInfo.image" />
                            </Avatar>
                            <span class="text-xs">{{ studentStore.studentInfo.name }}</span>
                            <span class="text-xs text-gray-400 mr-3">{{ formatDateToArabic(new Date(comment.created_at))
                                }}</span>
                        </div>
                        <span class="text-xs mr-10 text-gray-800">
                            {{ comment.content }}
                        </span>
                    </div>
                    <div class="w-full flex items-center justify-around p-6 pt-0 mt-5">
                        <Avatar class="hidden md:visible">
                            <AvatarImage :src="studentStore.studentInfo.image" />
                        </Avatar>
                        <Input id="commentInput" @keydown.enter="addComment(Number(route.params.homeworkId))"
                            v-model="newComment" dir="rtl" class="rounded-full" placeholder="اكتب تعليقك" />
                        <Button @click="addComment(Number(route.params.homeworkId))"
                            class=" flex items-center justify-center h-full w-8 rounded-full p-2 hover:bg-gray-100">
                            <SendIcon />
                        </Button>
                    </div>
                </div>

            </div>
        </main>
    </div>
</template>

<style>
@keyframes bounce {
    0% {
        transform: translateY(0);
        transform: rotate(0deg);
    }

    50% {
        transform: translateY(-3%);
        transform: rotate(3deg);
    }

    75% {
        transform: translateY(-3%);
        transform: rotate(-3deg);
    }

    100% {
        transform: translateY(0);
        transform: rotate(0deg);
    }
}
</style>
