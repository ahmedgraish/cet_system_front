<script setup lang="ts">
import Header from "@/components/appHeader.vue";
import navBar from "@/components/navBar.vue";
import scheduleIcon from "@/components/icons/IconSchedule.vue";
import settingsIcon from "@/components/icons/IconSittings.vue";
import homeworkIcon from "@/components/icons/homeworkPaper.vue";
import quizIcon from "@/components/icons/checkList.vue";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import type { Student } from "@/stores/student";
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
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import Input from "@/components/ui/input/Input.vue";
import SendIcon from "@/components/icons/sendIcon.vue";

const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: "home" },
    { id: 1, icon: homeworkIcon, link: "subjectsListingPage" },
    { id: 2, icon: quizIcon, link: "quizesPage" },
    { id: 4, icon: settingsIcon, link: "userSettings" },
];
export interface Comment {
    userName: string;
    date: Date;
    comment: string;
}
export interface HomeWork {
    name: string;
    desccription: string;
    attachments: string[];
    comments: Comment[];
    date?: Date;
}

let hoveredIndex = ref(-1);

const student: Student = {
    id: 0,
    name: "م،مصطفى قاباج",
    ref_num: "181130",
    email: "ahmed@gmail.com",
    phone_number: "0924986954",
    image:
        "https://st2.depositphotos.com/3557671/11164/v/950/depositphotos_111644880-stock-illustration-man-avatar-icon-of-vector.jpg",
};

const homeworks = reactive<HomeWork[]>([
    {
        name: "الواجب الأول",
        desccription:
            "واجب الرياضيات حول المعادلات التفاضلية. يتضمن هذا الواجب حل مجموعة من المسائل المتعلقة بالمعادلات التفاضلية الخطية وغير الخطية. يجب على الطلاب تطبيق القوانين والمعادلات التي تم شرحها في الحصص السابقة، مع التركيز على كيفية إيجاد الحلول باستخدام الطرق العددية والتحليلية. ينصح بمراجعة المحاضرات السابقة والاستعانة بالكتاب المدرسي للحصول على أفضل النتائج.",
        attachments: ["attachment1.pdf", "attachment2.png", "attachment1.pdf", "attachment2.png"],
        comments: [
            {
                userName: "أحمد علي",
                date: new Date("2024-08-20"),
                comment: "شرح الواجب كان واضحاً جداً، شكراً.",
            },
            {
                userName: "سارة محمد",
                date: new Date("2024-08-21"),
                comment: "هل يمكن أن توضح السؤال الثالث؟",
            },
        ],
    },
    {
        name: "الواجب الأول",
        desccription:
            "واجب الفيزياء عن الحركة الديناميكية. يتناول هذا الواجب دراسة حركة الأجسام تحت تأثير القوى المختلفة. يتعين على الطلاب تحليل المسائل المتعلقة بالسرعة، والتسارع، والاحتكاك، وكيفية تأثير القوى المتعددة على الحركة. يجب تطبيق النظريات والقوانين الفيزيائية التي تمت مناقشتها في الصف، مع استخدام الرسوم البيانية لتمثيل الحركة بشكل أدق. الواجب يتطلب الدقة في الحسابات وإظهار جميع خطوات الحل.",
        attachments: ["attachment1.pdf", "attachment2.png", "attachment1.pdf", "attachment2.png"],
        comments: [
            {
                userName: "يوسف خالد",
                date: new Date("2024-08-22"),
                comment: "هل سيتم مناقشة هذا الواجب في الحصة القادمة؟",
            },
            {
                userName: "ليلى أحمد",
                date: new Date("2024-08-23"),
                comment: "واجهت صعوبة في حل المسألة الثانية.",
            },
        ],
    },
    {
        name: "الواجب الأول",
        desccription:
            "واجب اللغة العربية حول تحليل النصوص الأدبية. يركز هذا الواجب على قراءة وفهم النصوص الأدبية القديمة والحديثة، ومن ثم تحليلها من حيث البنية، والمضمون، واللغة المستخدمة. يجب على الطلاب كتابة تقرير مفصل يوضح فهمهم للنصوص وأسلوب الكاتب في التعبير عن الأفكار والمشاعر. كما يتعين عليهم تقديم نقد بناء ومناقشة التأثير الأدبي للنصوص المختارة. ينصح بالاستعانة بالمصادر الإضافية لتعميق التحليل.",
        attachments: ["attachment1.pdf", "attachment2.png", "attachment1.pdf"],
        comments: [
            {
                userName: "مريم حسين",
                date: new Date("2024-08-24"),
                comment: "النص كان صعباً بعض الشيء، لكنني تمكنت من حله.",
            },
            {
                userName: "علي حسن",
                date: new Date("2024-08-24"),
                comment: "هل يمكن أن ترسل الملاحظات التي تمت مناقشتها في الفصل؟",
            },
        ],
        date: new Date("2024-10-25"),
    },
]);

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
let addComment = (homeWorkIndex: number) => {
    if (newComment.value.length > 0) {
        console.log(newComment.value);
        homeworks[homeWorkIndex].comments.push({
            userName: student.name,
            date: new Date(),
            comment: newComment.value,
        });
        newComment.value = "";
        commentInput.value = document.getElementById('commentInput')
        commentInput.value?.scrollIntoView({ behavior: 'smooth' })
    }
};

const fileInput = ref<HTMLInputElement | null>(null);

const uploadFile = () => {
    fileInput.value?.click();
};

let uploadedFiles = reactive<File[]>([])

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.[0];
    if (selectedFile) {
        uploadedFiles.push(selectedFile)
    }
};

onMounted(() => { });
</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <Header class="absolute hidden md:block top-0 h-16 w-full bg-white drop-shadow z-10">
            <UserBunner :name="student.name" :image="student.image" />
        </Header>
        <navBar :list="navItems" />
        <main
            class="relative w-full h-full  md:w-[95vw] md:h-[92dvh] flex flex-col items-center justify-start overflow-auto"
            v-auto-animate>
            <div class="w-[95%] md:w-5/6 h-fit pb-24 flex flex-col items-center ">
                <div id="subjectBunner"
                    class="relative flex flex-col justify-center gap-2 p-5 md:p-10 items-end w-full h-36 min-h-[140px] md:h-40 md:min-h-[150px] border-b border-gray-600 mt-5 md:mt-10 font-Somar text-curious-blue-950">
                    <div class="w-full flex items-center justify-between md:justify-end">
                        <Drawer>
                            <DrawerTrigger class="md:hidden px-5 py-1 rounded-xl border text-curious-blue-400">اضافة
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle class="flex items-center justify-center">
                                        <span class="text-curious-blue-950 text-2xl font-bold">
                                            عملك
                                        </span>
                                    </DrawerTitle>
                                    <DrawerDescription>اضف الملفات الخاصة بك</DrawerDescription>
                                </DrawerHeader>

                                <div v-if="uploadedFiles.length > 0">
                                    <span :key="index" v-for="file, index in uploadedFiles"
                                        class="flex flex-row-reverse items-center justify-end h-16 w-[85%]  m-3 text-lg font-semibold text-gray-500 border rounded-md text-wrap text-center">
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
                                        <span @click="uploadFile"
                                            class="flex  items-center justify-center w-[90%] h-10 py-2 rounded-md bg-transparent text-curious-blue-400 border border-gray-400 hover:cursor-pointer transition-all delay-75 hover:bg-gray-100">اضافة
                                            عمل</span>
                                        <input ref="fileInput" @change="handleFileChange" type="file" class="hidden" />
                                        <span @click="''"
                                            class="flex items-center justify-center w-[90%] py-2 rounded-md bg-curious-blue-400 hover:cursor-pointer transition-all delay-75 hover:bg-curious-blue-500">تسليم</span>
                                    </div>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                        <h1 class="text-3xl md:text-5xl select-none font-bold">
                            {{ homeworks[2].name }}
                        </h1>
                    </div>
                    <span class="text-gray-500 mt-2 select-none">
                        <span>{{ student.name }}</span>
                    </span>
                    <span class="flex items-center text-gray-500 select-none">اساسيات برمجة</span>
                    <span class="absolute bottom-1 left-5">
                        {{ formatDateToArabic(homeworks[2].date) }}
                        <span class="inline-block ml-1">
                            ,{{
                                homeworks[2].date
                                    ?.toLocaleDateString("en", {
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
                            عملك
                        </span>
                        <div v-if="uploadedFiles.length > 0">
                            <span :key="index" v-for="file, index in uploadedFiles"
                                class="flex items-center justify-center h-14 w-full px-2 gap-2 mt-3 text-lg font-semibold text-gray-500 border rounded-md text-wrap text-center">
                                <span class="text-curious-blue-900 text-sm w-2/3">
                                    {{ file.name }}</span>
                                <component :is="iconType(file.name)" class="h-full self-end w-1/3 border-r" />
                            </span>
                        </div>
                        <span v-else class="my-10 text-lg text-gray-500">
                            لم يتم التسليم بعد
                        </span>

                        <div
                            class="flex flex-col items-center gap-3 justify-center mt-3 w-full text-curious-blue-50 font-semibold">
                            <span @click="uploadFile"
                                class="flex  items-center justify-center w-full h-10 py-2 rounded-md bg-transparent text-curious-blue-400 border border-gray-400 hover:cursor-pointer transition-all delay-75 hover:bg-gray-100">اضافة
                                عمل</span>
                            <input ref="fileInput" @change="handleFileChange" type="file" class="hidden" />
                            <span @click="''"
                                class="flex items-center justify-center w-full py-2 rounded-md bg-curious-blue-400 hover:cursor-pointer transition-all delay-75 hover:bg-curious-blue-500">تسليم</span>
                        </div>
                    </CardHeader>
                </Card>
                <div id="homeWorkDescription" dir="rtl"
                    class="flex justify-center w-[95%] md:w-3/4 h-fit md:self-start font-Somar md:pr-10 mt-9">
                    <p class="text-curious-blue-950">
                        {{ homeworks[0].desccription }}
                        <br class="md:hidden" /><span
                            class="md:hidden font-Somar font-bold text-curious-blue-950">....</span>
                    </p>
                </div>
                <dir id="attachmentContainer"
                    class="flex flex-wrap items-center justify-start gap-2 pl-0 w-full md:w-3/4 self-start h-fit min-h-[80px] my-10 font-Somar select-none">
                    <div :key="index" v-for="(attachment, index) in homeworks[2].attachments" id="attachment" dir="rtl"
                        @mouseenter="hoveredIndex = index" @mouseleave="hoveredIndex = -1" :class="hoveredIndex === index
                            ? 'bg-zinc-50 cursor-pointer shadow-sm transition-all duration-200'
                            : ''
                            " class="flex items-center gap-3 justify-end h-16 w-fit md:w-1/4 pr-3 border rounded-md">
                        <span :class="hoveredIndex === index ? 'text-curious-blue-400' : ''"
                            class="text-curious-blue-900 underline-offset-2">
                            {{ attachment }}</span>
                        <component :is="iconType(attachment)" class="h-full w-1/3 border-r" />
                    </div>
                </dir>
                <div class=" w-full md:w-3/4 self-start mt-5 flex flex-col items-center p-0 h-fit font-Somar">
                    <div class="p-6 pb-0 flex items-center justify-end border-t border-gray-300 w-full mb-5">
                        <div class="text-gray-500 mb-4">التعليقات</div>
                    </div>
                    <div dir="rtl" :key="index" v-for="comment, index in homeworks[0].comments"
                        class="flex flex-col items-start w-[90%] h-fit py-3 rounded-md border mt-2">
                        <div class="flex items-center gap-1 mr-1">
                            <Avatar>
                                <AvatarImage :src="student.image" />
                            </Avatar>
                            <span class="text-xs">{{ student.name }}</span>
                            <span class="text-xs text-gray-400 mr-3">{{ formatDateToArabic(comment.date)
                                }}</span>
                        </div>
                        <span class="text-xs mr-10 text-gray-800">
                            {{ comment.comment }}
                        </span>
                    </div>
                    <div class="w-full flex items-center justify-around p-6 pt-0 mt-5">
                        <Avatar class="hidden md:visible">
                            <AvatarImage :src="student.image" />
                        </Avatar>
                        <Input id="commentInput" @keydown.enter="addComment(0)" v-model="newComment" dir="rtl"
                            class="rounded-full" placeholder="اكتب تعليقك" />
                        <Button @click="addComment(0)"
                            class=" flex items-center justify-center h-full w-8 rounded-full p-2 hover:bg-gray-100">
                            <SendIcon />
                        </Button>
                    </div>
                </div>
                <!-- <Card :key="homeWorkIndex" v-for="homeWork, homeWorkIndex in homeworks"
                    :id="'homeWorkCard' + homeworks.indexOf(homeWork)"
                    class="relative flex flex-col items-end transition-all delay-100 justify-start w-[98%]  min-h-[55vh] min-w-[95%] md:w-3/4 md:min-w-[800px] md:self-start mt-10 shadow-none text-wrap">
                    <CardHeader
                        class="w-full flex flex-row items-center justify-end gap-2 font-Somar text-curious-blue-950 select-none">
                        <span>{{ student.name }}</span>
                        <Avatar>
                            <AvatarImage :src="student.image" />
                        </Avatar>
                    </CardHeader>
                    <CardDescription dir="rtl"
                        class="flex justify-end w-[90%] h-1/3 self-center font-Somar md:pr-10 overflow-hidden md:overflow-auto select-none">
                        <p class="text-curious-blue-950">
                            {{ homeWork.desccription }}
                            <br class="md:hidden" /><span
                                class="md:hidden font-Somar font-bold text-curious-blue-950">....</span>
                        </p>
                    </CardDescription>
                    <CardDescription
                        class="flex flex-wrap items-start justify-end gap-10 pr-10 w-full h-fit min-h-[80px] mb-5 font-Somar">
                        <div :key="homeWork.attachments.indexOf(attachment)" v-for="attachment in homeWork.attachments"
                            id="attachment" dir="rtl"
                            @mouseenter="hoveredIndex = homeWork.attachments.indexOf(attachment)"
                            @mouseleave="hoveredIndex = -1" :class="hoveredIndex === homeWork.attachments.indexOf(attachment)
                                ? 'bg-zinc-50 cursor-pointer shadow-sm transition-all duration-200'
                                : ''
                                " class="hidden md:flex items-center gap-3 justify-end h-16 w-1/4 border rounded-md">
                            <span :class="hoveredIndex === homeWork.attachments.indexOf(attachment)
                                ? 'text-curious-blue-400'
                                : ''
                                " class="text-curious-blue-900 underline-offset-2">
                                {{ attachment }}</span>
                            <component :is="iconType(attachment)" class="h-full w-1/4 border-r" />
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
                            <DialogTrigger as-child>
                                <span
                                    class="flex gap-1 justify-start text-xs w-fit h-fit pl-6 pr-2 py-2 rounded-3xl text-gray-500 hover:bg-gray-100 hover:cursor-pointer"
                                    dir="rtl">
                                    <PeopleIcon />
                                    {{ homeWork.comments.length }}
                                    تعليق
                                </span>
                            </DialogTrigger>
                            <DialogContent
                                class="sm:max-w-[65vw] grid-rows-[auto_minmax(0,1fr)_auto] flex flex-col items-center p-0 max-h-[80dvh] overflow-auto font-Somar">
                                <DialogHeader class="p-6 pb-0 flex items-center justify-center">
                                    <DialogTitle class="text-gray-500">التعليقات</DialogTitle>
                                </DialogHeader>
                                <div dir="rtl" :key="index" v-for="comment, index in homeWork.comments"
                                    class="flex flex-col items-start w-[90%] h-fit py-3 rounded-md border mt-2">
                                    <div class="flex items-center gap-1 mr-1">
                                        <Avatar>
                                            <AvatarImage :src="student.image" />
                                        </Avatar>
                                        <span class="text-xs">{{ student.name }}</span>
                                        <span class="text-xs text-gray-400 mr-3">{{ formatDateToArabic(comment.date)
                                            }}</span>
                                    </div>
                                    <span class="text-xs mr-10 text-gray-800">
                                        {{ comment.comment }}
                                    </span>
                                </div>
                                <DialogFooter class="w-full flex items-center justify-around p-6 pt-0 mt-5">
                                    <Avatar>
                                        <AvatarImage :src="student.image" />
                                    </Avatar>
                                    <Input v-model="newComment" dir="rtl" class="rounded-full"
                                        placeholder="اكتب تعليقك" />
                                    <Button @click="addComment(homeWorkIndex)"
                                        class=" flex items-center justify-center h-full w-8 rounded-full p-2 hover:bg-gray-100">
                                        <SendIcon />
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog> -->
                <!-- <div id="commentsWrapper" class=" w-full h-full bg-black">
                        </div>
                        <div id="commentsWrapper" class=" w-full h-full bg-slate-700">
                        </div> -->
                <!-- <Collapsible :open="!isOpen" dir="rtl" class="w-[90%] py-3">
                            <CollapsibleTrigger @click="isOpen = !isOpen; handleCardHieght(homeWork.comments.length)"
                                class="flex gap-1 justify-start text-xs w-fit h-fit pl-6 pr-2 py-2 rounded-3xl text-gray-500 hover:bg-gray-100 hover:cursor-pointer"
                                dir="rtl">
                                <PeopleIcon />
                                {{ homeWork.comments.length }}
                                تعليق
                            </CollapsibleTrigger>
                            <CollapsibleContent :key="index" v-for="comment, index in homeWork.comments"
                                class="text-wrap">
                                <div class="flex flex-col items-start w-full h-fit py-3 rounded-md border mt-2">
                                    <div class="flex items-center gap-1 mr-1">
                                        <Avatar>
                                            <AvatarImage :src="student.image" />
                                        </Avatar>
                                        <span class="text-xs">{{ student.name }}</span>
                                        <span class="text-xs text-gray-400 mr-3">{{ formatDateToArabic(comment.date)
                                            }}</span>
                                    </div>
                                    <span class="text-xs mr-10">
                                        {{ comment.comment }}
                                    </span>
                                </div>
                            </CollapsibleContent>

                        </Collapsible> -->
                <!-- </CardFooter> -->
                <!-- </Card> -->
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
