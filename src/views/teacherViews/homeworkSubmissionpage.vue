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
import { useRoute } from "vue-router";
import DataTable from "@/components/dataTable.vue";
import { useTeacherStore } from "@/stores/teacher";
import type { homeworkSubmission } from "@/repository/interfaces";


const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: "teacherHome" },
    { id: 1, icon: homeworkIcon, link: "teacherSubjects" },
    { id: 2, icon: quizIcon, link: "teacherQuizzes" },
    { id: 4, icon: settingsIcon, link: "userSettings" },
];

const route = useRoute()
const teacherStore = useTeacherStore()
let hoveredIndex = ref(-1);

// const students = ref([
//     { ref: '181130', name: 'احمد محمد اقريش', status: false },
//     { ref: '181131', name: 'محمد علي الزهراني', status: false },
//     { ref: '181132', name: 'خالد احمد القحطاني', status: false },
//     { ref: '181133', name: 'سعيد عبدالله الدوسري', status: false },
//     { ref: '181134', name: 'عبدالرحمن صالح المالكي', status: false },
//     { ref: '181135', name: 'علي فهد الشمري', status: false },
//     { ref: '181136', name: 'فارس عبدالله الشهري', status: false },
//     { ref: '181137', name: 'يوسف محمد العتيبي', status: false },
//     { ref: '181138', name: 'ماجد ناصر الجهني', status: false },
//     { ref: '181139', name: 'سلمان عبدالعزيز الغامدي', status: false },
//     { ref: '181140', name: 'بندر احمد المطيري', status: false },
//     { ref: '181141', name: 'طلال سعد السهلي', status: false },
//     { ref: '181142', name: 'حسين عبدالله السبيعي', status: false },
//     { ref: '181143', name: 'عبدالله محمد العبدلي', status: false },
//     { ref: '181144', name: 'سلطان سعيد القرني', status: false },
//     { ref: '181145', name: 'مازن فهد الدوسري', status: false },
//     { ref: '181146', name: 'تركي خالد العجمي', status: false },
//     { ref: '181147', name: 'فيصل علي الحربي', status: false },
//     { ref: '181148', name: 'ياسر فهد البقمي', status: false },
//     { ref: '181149', name: 'عبدالملك ناصر السالم', status: false }
// ]);
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

const transHomeWork = teacherStore.groupHomeWorks.find(hw => hw.id === Number(route.params.homeworkId))

let submssions = ref<homeworkSubmission[]>([])
const getHomeworkSubmssions = async () => {
    submssions.value = await teacherStore.getHomeworkSubmssions(Number(route.params.homeworkId), Number(route.params.groupId))
}
onMounted(async () => {
    await getHomeworkSubmssions()
    console.log(submssions.value);

});
</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <Header class="absolute hidden md:block top-0 h-16 w-full bg-white drop-shadow z-10">
            <UserBunner :name="teacherStore.teacherInfo.name" :image="teacherStore.teacherInfo.image" />
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
                            {{ transHomeWork?.name }}
                        </h1>
                    </div>
                    <span class="text-gray-500 mt-2 select-none">
                        <span>{{ teacherStore.teacherInfo.name }}</span>
                    </span>
                    <span class="flex items-center text-gray-500 select-none">{{
                        teacherStore.homeworkGroups.find(hw => hw.group_id === Number(route.params.groupId))?.name
                        }}</span>
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
                    class="flex justify-start w-[95%] md:w-full h-fit md:self-start font-Somar md:pr-10 mt-9">
                    <p class="text-curious-blue-950">
                        {{ transHomeWork?.description }}
                        <br class="md:hidden" /><span
                            class="md:hidden font-Somar font-bold text-curious-blue-950">....</span>
                    </p>
                </div>
                <dir id="attachmentContainer"
                    class="flex flex-wrap items-center justify-start gap-2 pl-0 w-full md:w-full self-start h-fit min-h-[80px] my-10 font-Somar select-none">

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
                <div class="w-full border"></div>
                <span class="font-Somar text-curious-blue-900 font-medium text-4xl m-10">التسليمات</span>
                <DataTable class="w-full mt-3 ">
                    <template #header>
                        <h1 class="w-1/6 self-start h-full pr-3">رقم قيد الطالب</h1>
                        <h1 class="w-2/6">اسم الطالب</h1>
                        <h1 class="w-3/6 text-center">الملحقات</h1>
                    </template>
                    <template #row>
                        <div :key="index" v-for="student, index in submssions"
                            class="w-full flex min-h-16 items-center pr-3 py-3">
                            <h1 class="w-1/6">{{ student.ref_number }}</h1>
                            <h1 class="w-2/6">{{ student.name }}</h1>
                            <div class="w-3/6 h-fit flex  flex-wrap justify-end pl-3">
                                <div :key="index" v-for="(attachment, index) in student.attachments" id="attachment"
                                    @mouseenter="hoveredIndex = index" @mouseleave="hoveredIndex = -1" :class="hoveredIndex === index
                                        ? 'bg-zinc-50 cursor-pointer shadow-sm transition-all duration-200'
                                        : ''
                                        "
                                    class=" flex items-center  gap-3 justify-end h-[85%] bg-white w-fit md:w-fit pr-3 border rounded-md">
                                    <a dir="rtl" :href="attachment.url" target="_blank"
                                        class=" flex items-center gap-3 justify-end h-16 w-fit md:w-fit">
                                        <span :class="hoveredIndex === index ? 'text-curious-blue-400' : ''"
                                            class="text-curious-blue-900 underline-offset-2 w-full">
                                            {{ attachment.name }}</span>
                                        <component :is="iconType(attachment.name)" class="h-full w-1/3 border-r" />
                                    </a>

                                </div>
                            </div>
                        </div>
                    </template>
                </DataTable>
            </div>
        </main>
    </div>
</template>

<style></style>
