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
import { ref } from 'vue';
import ArrowRight from '@/components/icons/arrowRight.vue';
import router from '@/router';
import type { navItem } from '@/components/navBar.vue';

const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: 'home' },
    { id: 2, icon: homeworkIcon, link: 'homeworks' },
    { id: 1, icon: quizIcon, link: 'quizes' },
    { id: 4, icon: settingsIcon, link: 'settings' }
]

const quizData = [
    {
        question: "ما هو نظام التشغيل؟", // What is an operating system?
        options: ["برنامج يتحكم في الأجهزة", "برنامج لتشغيل الألعاب", "برنامج لتحرير الصور", "برنامج للتصفح"],
        answer: 2
    },
    {
        question: "ما هي وظيفة وحدة المعالجة المركزية ", // What is the function of the Central Processing Unit (CPU)?
        options: ["تخزين البيانات", "إخراج البيانات", "معالجة البيانات", "تحكم في الأجهزة"], // Data storage, Data output, Data processing, Device control
        answer: 0
    },
    {
        question: "ما الفرق بين الذاكرة الرئيسية والذاكرة الثانوية؟", // What is the difference between main memory and secondary memory?
        options: ["الذاكرة الرئيسية أسرع وأغلى من الثانوية", "الذاكرة الثانوية أسرع وأغلى من الرئيسية", "لا يوجد فرق بينهما", "الذاكرة الرئيسية تستخدم لتخزين البرامج فقط"], // Main memory is faster and more expensive than secondary, Secondary memory is faster and more expensive than main, There is no difference between them, Main memory is used only for storing programs
        answer: 0
    },
    {
        question: "اول نظام تشغيل تم اصداره هو نظام ويندوز", // What is the difference between main memory and secondary memory?
        options: ["صح", "خطأ"], // Main memory is faster and more expensive than secondary, Secondary memory is faster and more expensive than main, There is no difference between them, Main memory is used only for storing programs
        answer: 0
    },
]

interface Answer {
    questionId: number
    selectedOption: string
}

let activeQuestion = ref(0)
let clickedAnswer = ref(-1)
let result = 0
let toggleScoreCard = ref(false)
let toggleResultsCard = ref(false)
let answers: Answer[] = []


const NextQuestion = () => {
    if (clickedAnswer.value >= 0 && clickedAnswer.value < quizData[activeQuestion.value].options.length) {
        answers.push({
            questionId: activeQuestion.value,
            selectedOption: quizData[activeQuestion.value].options[clickedAnswer.value],
        });
    }

    activeQuestion.value < quizData.length - 1 ? activeQuestion.value++ : handleResults()
    clickedAnswer.value === quizData[activeQuestion.value].answer ? result++ : null
    console.log(clickedAnswer.value);

    clickedAnswer.value = -1;
};
const handleResults = () => {
    toggleScoreCard.value = true
    activeQuestion.value = 0
    console.log(answers);

}
</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <navBar :list="navItems" />
        <main
            class="w-full h-full md:w-[95vw] md:h-[92vh] flex flex-col md:flex-row md:flex-wrap items-center pb-20 md:p-12 justify-center md:justify-evenly gap-10 overflow-auto"
            v-auto-animate>
            <Card id="questionsCards" v-if="!toggleScoreCard"
                class=" relative w-5/6 h-fit min-w-[320px] min-h-[400px] md:w-2/5 md:h-full md:max-h-[500px] font-Somar text-curious-blue-900 text-right transition-all">
                <CardContent class="relative h-full flex flex-col items-center justify-around ">
                    <CardHeader class="pr-0 flex flex-row items-center gap-2 justify-center text-wrap text-center">
                        <h1 class="text-xl md:text-2xl select-none">{{ quizData[activeQuestion].question }}
                        </h1>
                    </CardHeader>
                    <div class="w-[95%] md:w-[80%]  flex flex-col items-center gap-5 mt-2 font-Somar font-semibold"
                        v-auto-animate>
                        <div id="answer" :key="quizData[activeQuestion].options.indexOf(option)"
                            v-for="option in quizData[activeQuestion].options"
                            @click="clickedAnswer = quizData[activeQuestion].options.indexOf(option)"
                            :class="quizData[activeQuestion].options.indexOf(option) == clickedAnswer ? 'bg-curious-blue-900 text-curious-blue-50' : ''"
                            class="relative flex items-center justify-end w-full h-12 rounded-xl border-2  hover:cursor-pointer hover:bg-curious-blue-900 hover:text-curious-blue-50">
                            <span class="text-sm font-normal mr-5 select-none">{{ option }}</span>
                        </div>
                    </div>
                    <CardFooter class="w-full flex items-center justify-center mt-10">
                        <Button type="button" @click="activeQuestion <= quizData.length - 1 ? NextQuestion() : null"
                            class=" flex items-center gap-3 px-3 py-3 md:py-4 font-Somar rounded-lg text-curious-blue-50 bg-curious-blue-900 ">
                            <ArrowRight color="#f3f7fc" class="rotate-180" />
                            {{ activeQuestion == quizData.length - 1 ? 'تسليم' : 'التالي' }}
                        </Button>
                    </CardFooter>
                </CardContent>
            </Card>
            <Card id="scroreCard" v-if="(toggleScoreCard && !toggleResultsCard)"
                class=" relative w-5/6 h-fit min-w-[320px] min-h-[400px] md:w-2/5 md:h-full md:max-h-[500px] font-Somar text-curious-blue-900 text-right transition-all">
                <CardContent class="relative h-full flex flex-col items-center justify-between ">
                    <CardHeader class="pr-0 flex flex-row items-center gap-2 justify-center text-wrap text-center">
                        <h1 class="text-xl md:text-2xl select-none">النتيجة النهائية
                        </h1>
                    </CardHeader>
                    <div class="w-[95%] md:w-[80%]  flex items-center justify-center text-7xl font-Somar font-semibold"
                        v-auto-animate>
                        {{ quizData.length }} \ {{ result }}
                    </div>
                    <CardFooter class="w-full flex items-center justify-center mt-10">
                        <Button type="button" @click="toggleResultsCard = !toggleResultsCard"
                            class=" flex items-center gap-3 px-3 py-3 md:py-4 font-Somar rounded-lg text-curious-blue-50 bg-curious-blue-900 ">
                            <ArrowRight color="#f3f7fc" class="rotate-180" />
                            عرض الاجابات
                        </Button>
                    </CardFooter>
                </CardContent>
            </Card>
            <Card id="resultsCards" v-if="toggleResultsCard"
                class=" relative w-5/6 h-fit min-w-[320px] min-h-[400px] md:w-2/5 md:h-full md:max-h-[500px] font-Somar text-curious-blue-900 text-right transition-all">
                <CardContent class="relative h-full flex flex-col items-center justify-around ">
                    <CardHeader class="pr-0 flex flex-row items-center gap-2 justify-center text-wrap text-center">
                        <h1 class="text-xl md:text-2xl select-none">{{ quizData[activeQuestion].question }}
                        </h1>
                    </CardHeader>
                    <div class="w-[95%] md:w-[80%]  flex flex-col items-center gap-5 mt-2 font-Somar font-semibold"
                        v-auto-animate>
                        <div id="answer" :key="quizData[activeQuestion].options.indexOf(option)"
                            v-for="option in quizData[activeQuestion].options"
                            :class="quizData[activeQuestion].options.indexOf(option) == quizData[activeQuestion].answer ? 'bg-green-400 text-curious-blue-50' : ''"
                            class="relative flex items-center justify-end w-full h-12 rounded-xl border-2">
                            <span class="text-sm font-normal mr-5 select-none">{{ option }}</span>
                        </div>
                    </div>
                    <CardFooter class="w-full flex items-center justify-center mt-10">
                        <Button type="button"
                            @click="activeQuestion === quizData.length - 1 ? router.push('/quizes') : NextQuestion()"
                            class=" flex items-center gap-3 px-3 py-3 md:py-4 font-Somar rounded-lg text-curious-blue-50 bg-curious-blue-900 ">
                            <ArrowRight color="#f3f7fc" class="rotate-180" />
                            {{ activeQuestion == quizData.length - 1 ? 'رجوع للقائمة الرئيسية' : 'التالي' }}
                        </Button>
                    </CardFooter>
                </CardContent>
            </Card>
        </main>
    </div>
</template>
