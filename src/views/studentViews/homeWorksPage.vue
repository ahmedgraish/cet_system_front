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
import CardDescription from "@/components/ui/card/CardDescription.vue";
import AvatarImage from "@/components/ui/avatar/AvatarImage.vue";
import CardFooter from "@/components/ui/card/CardFooter.vue";
import pdfIcon from "@/components/icons/pdfIcon.vue";
import docIcon from "@/components/icons/docIcon.vue";
import imageIcon from "@/components/icons/imageIcon.vue";
import { onMounted, ref } from "vue";
import PaperClipIcon from "@/components/icons/paperClipIcon.vue";
import PeopleIcon from "@/components/icons/peopleIcon.vue";
import ClockIcon from "@/components/icons/clockIcon.vue";
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import Input from "@/components/ui/input/Input.vue";
import SendIcon from "@/components/icons/sendIcon.vue";
import router from "@/router";
import { useRoute } from "vue-router";
import type { HomeWork, Comment as cm } from "@/repository/interfaces";
import NothingIcon from "@/components/icons/nothingIcon.vue";
import LoadingScreen from "@/components/loadingScreen.vue";

const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: "home" },
    { id: 1, icon: homeworkIcon, link: "subjectsListingPage" },
    { id: 2, icon: quizIcon, link: "quizesPage" },
    { id: 4, icon: settingsIcon, link: "studentInfo" },
];

const studentStore = useStudentStore()
const route = useRoute()
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

let dueCard = ref<HTMLElement | null>();

let nearestDueDate = (arr: HomeWork[]): Date | null => {
    let nearestDate: Date | null = null;
    let smallestDiff = Infinity;
    const now = new Date().getTime();
    let formattedDate;

    arr.forEach((homework, index) => {
        if (homework.date) {
            const diff = Math.abs(new Date(homework.date).getTime() - now);
            if (diff < smallestDiff) {
                smallestDiff = diff;
                nearestDate = new Date(homework.date);
                formattedDate = nearestDate.toLocaleDateString("Ar", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                });
                dueCard.value = document.getElementById("homeWorkCard" + index);

            }
        }
    });

    nearestDate;
    if (formattedDate) {
        return formattedDate;
    } else {
        return null;
    }
};
function formatDateToArabic(date: Date) {
    const monthsArabic = [
        'يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    const day = date.getDate(); // Extract the day (e.g., 2)
    const month = monthsArabic[date.getMonth()]; // Get the month name in Arabic

    return `${day}-${month}`; // Combine day and month
}
let newComment = ref('')
let commentInput = ref<HTMLElement | null>()
commentInput.value = document.getElementById('commentInput')

let addComment = async (homeWorkIndex: number) => {
    if (newComment.value.length > 0) {
        const typedComment: cm = {
            name: studentStore.studentInfo.name,
            image: studentStore.studentInfo.image,
            created_at: new Date().toISOString(),
            content: newComment.value
        }
        studentStore.studentHomeWorks[homeWorkIndex].comments.push({
            name: studentStore.studentInfo.name,
            image: studentStore.studentInfo.image,
            created_at: new Date().toISOString(),
            content: newComment.value

        })
        await studentStore.addNewComment(studentStore.studentHomeWorks[homeWorkIndex].id, typedComment)
        console.log(studentStore.studentHomeWorks[homeWorkIndex].comments);

        newComment.value = ''
        commentInput.value?.scrollIntoView({ behavior: 'smooth' })
    }
}

const getHomeWorks = async () => {
    await studentStore.getSubjectHomeWorks(Number(route.params.subjectId))
}

onMounted(async () => {
    await getHomeWorks()

});
</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <Header class="absolute hidden md:block top-0 h-16 w-full bg-white drop-shadow z-10">
            <UserBunner :name="studentStore.studentInfo.name" :image="studentStore.studentInfo.image"
                link="studentInfo" />
        </Header>
        <navBar :list="navItems" />
        <LoadingScreen v-if="studentStore.isLoading" />
        <main
            class="relative w-full h-full bg-slate-50 md:w-[95vw] md:h-[92dvh] flex flex-col items-center justify-start overflow-auto"
            v-auto-animate>
            <div v-if="studentStore.studentHomeWorks.length > 0"
                class="w-[95%] md:w-5/6 h-fit pb-24 flex flex-col items-center">
                <div id="subjectBunner"
                    class="flex flex-col justify-end gap-2 p-5 md:p-10 items-end w-full h-36 min-h-[140px] md:h-64 md:min-h-[250px] rounded-xl bg-gradient-to-r from-cyan-500 to-curious-blue-400 mt-5 md:mt-10 font-Somar text-curious-blue-50">
                    <h1 class="text-3xl md:text-5xl select-none font-bold">{{
                        studentStore.studentSubjects.find(sbj => sbj.id === Number(route.params.subjectId))?.name }}
                    </h1>
                    <span class="flex items-center select-none">كلية التقنية الالكترونية</span>
                </div>
                <Card style="animation: bounce 3s ease-in-out infinite"
                    class="hidden absolute right-[5vw] top-1/2 mt-9 md:flex justify-end w-[18%] h-1/4 text-sm font-Somar shadow-none">
                    <CardHeader dir="rtl" class="w-full h-full flex flex-col items-center justify-around">
                        <span class="flex items-center text-curious-blue-950 text-lg">
                            أقرب موعد تسليم
                        </span>
                        <span class="flex items-center gap-2 mt-3 text-lg font-semibold text-gray-500">
                            <ClockIcon color="#6b7280" />
                            {{ nearestDueDate(studentStore.studentHomeWorks) }}
                        </span>

                        <span @click="dueCard?.scrollIntoView({ behavior: 'smooth' })"
                            class="flex items-center font-semibold mt-3 text-curious-blue-900 px-2 py-1 rounded-xl hover:bg-gray-100 hover:cursor-pointer transition-all delay-75 hover:text-curious-blue-400">مشاهدة</span>
                    </CardHeader>
                </Card>
                <Card :key="homeWorkIndex" v-for="(homeWork, homeWorkIndex) in studentStore.studentHomeWorks"
                    @click="router.push({ name: 'homeWorkPreviewPage', params: { homeworkId: homeWork.id } })"
                    :id="'homeWorkCard' + homeWorkIndex"
                    class="relative flex flex-col items-end transition-all delay-100 justify-start w-[98%]  min-h-[55vh] min-w-[95%] md:w-3/4 md:min-w-[800px] md:self-start mt-10 shadow-none text-wrap hover:bg-gray-50 hover:cursor-pointer">
                    <CardHeader
                        class="w-full flex flex-row items-center justify-end gap-2 font-Somar text-curious-blue-950 select-none">
                        <span>{{ studentStore.studentInfo.name }}</span>
                        <Avatar>
                            <AvatarImage :src="studentStore.studentInfo.image" />
                        </Avatar>
                    </CardHeader>
                    <CardDescription dir="rtl"
                        class="flex justify-start w-[90%] h-1/3 self-center font-Somar md:pr-10 overflow-hidden md:overflow-auto select-none">
                        <p class="text-curious-blue-950">
                            {{ homeWork.description }}
                            <br class="md:hidden" /><span
                                class="md:hidden font-Somar font-bold text-curious-blue-950">....</span>
                        </p>
                    </CardDescription>
                    <CardDescription
                        class="flex flex-wrap items-start justify-end gap-10 pr-10 w-full h-fit min-h-[80px] mb-5 font-Somar">
                        <div :key="index" v-for="attachment, index in homeWork.attachments" id="attachment" dir="rtl"
                            @mouseenter="hoveredIndex = index" @mouseleave="hoveredIndex = -1" :class="hoveredIndex === index
                                ? 'bg-white cursor-pointer shadow-sm transition-all duration-200'
                                : ''
                                " class="hidden md:flex items-center gap-3 justify-end h-16 w-1/4 border rounded-md">
                            <span :class="hoveredIndex === index
                                ? 'text-curious-blue-400'
                                : ''
                                " class="text-curious-blue-900 underline-offset-2">
                                {{ attachment.name }}</span>
                            <component :is="iconType(attachment.name)" class="h-full w-1/4 border-r" />
                        </div>
                        <div dir="rtl"
                            class="md:hidden flex w-full items-center text-gray-500 gap-1 h-full select-none">
                            <PaperClipIcon color="#6b7280" class="w-3" />
                            <span>{{ homeWork.attachments.length }}</span>
                            <span>مرفقات</span>
                        </div>
                    </CardDescription>
                    <CardFooter
                        class="absolute bottom-0 flex items-center gap-2 p-0 pr-6 justify-end w-full h-fit min-h-14 border-t border-gray-300 font-Somar select-none">

                        <Dialog class="">
                            <DialogTrigger @click.stop="''" as-child>
                                <span
                                    class="flex gap-1 justify-start text-xs w-fit h-fit pl-6 pr-2 py-2 rounded-3xl text-gray-500 hover:bg-gray-100 hover:cursor-pointer"
                                    dir="rtl">
                                    <PeopleIcon />
                                    {{ homeWork.comments.length }}
                                    تعليق
                                </span>
                            </DialogTrigger>
                            <DialogContent
                                class="rounded-xl w-[85vw] md:max-w-[50vw] grid-rows-[auto_minmax(0,1fr)_auto] flex flex-col items-center p-0 max-h-[80dvh] overflow-auto font-Somar">
                                <DialogHeader class="p-6 pb-0 flex items-center justify-center">
                                    <DialogTitle class="text-gray-500">التعليقات</DialogTitle>
                                </DialogHeader>
                                <div dir="rtl" :key="index" v-for="comment, index in homeWork.comments"
                                    class="flex flex-col items-start w-[90%] h-fit py-3 rounded-md border mt-2">
                                    <div class="flex items-center gap-1 mr-1">
                                        <Avatar>
                                            <AvatarImage :src="comment.image!" />
                                        </Avatar>
                                        <span class="text-xs">{{ comment.name }}</span>
                                        <span class="text-xs text-gray-400 mr-3">{{
                                            formatDateToArabic(new Date(comment.created_at))
                                            }}</span>
                                    </div>
                                    <span class="text-xs mr-10 text-gray-800">
                                        {{ comment.content }}
                                    </span>
                                </div>
                                <DialogFooter
                                    class="w-full flex flex-row items-center justify-around gap-2 p-6 pt-0 mt-5">
                                    <Avatar class="hidden md:visible">
                                        <AvatarImage :src="studentStore.studentInfo.image" />
                                    </Avatar>
                                    <Input id="commentInput" @keydown.enter="addComment(homeWorkIndex)"
                                        v-model="newComment" dir="rtl" class="rounded-full" placeholder="اكتب تعليقك" />
                                    <Button @click="addComment(homeWorkIndex)"
                                        class=" flex items-center justify-center rounded-full p-3  bg-gray-200 hover:bg-gray-300">
                                        <SendIcon />
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            </div>
            <div v-else class="w-[95%] md:w-5/6 h-fit pb-24 flex flex-col items-center">
                <div id="subjectBunner"
                    class="flex flex-col justify-end gap-2 p-5 md:p-10 items-end w-full h-36 min-h-[140px] md:h-64 md:min-h-[250px] rounded-xl bg-gradient-to-r from-cyan-500 to-curious-blue-400 mt-5 md:mt-10 font-Somar text-curious-blue-50">
                    <h1 class="text-3xl md:text-5xl select-none font-bold">{{
                        studentStore.studentSubjects.find(sbj => sbj.id === Number(route.params.subjectId))?.name }}
                    </h1>
                    <span class="flex items-center select-none">كلية التقنية الالكترونية</span>
                </div>
                <div
                    class="relative flex gap-5 md:border border-curious-blue-600  items-center transition-all  justify-center w-full h-64 mt-10">
                    <NothingIcon />
                    <span class="font-Somar text-curious-blue-900 text-3xl select-none">
                        لا توجد واجبات حالياً
                    </span>
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
