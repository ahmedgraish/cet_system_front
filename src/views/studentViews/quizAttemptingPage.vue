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
import { onMounted, onUnmounted, ref } from 'vue';
import ArrowRight from '@/components/icons/arrowRight.vue';
import router from '@/router';
import type { navItem } from '@/components/navBar.vue';
import { useStudentStore } from '@/stores/student';
import type { Answer } from '@/repository/interfaces';
import { useRoute } from 'vue-router';
import { useToast } from '@/components/ui/toast'
import LoadingScreen from '@/components/loadingScreen.vue';

const { toast } = useToast()

const navItems: navItem[] = [
    { id: 3, icon: scheduleIcon, link: 'home' },
    { id: 2, icon: homeworkIcon, link: 'subjectsListingPage' },
    { id: 1, icon: quizIcon, link: 'quizesPage' },
    { id: 4, icon: settingsIcon, link: 'studentInfo' }
]
const studentStore = useStudentStore()
const route = useRoute()
const quizData = studentStore.studentQuizes.find(quiz => quiz.id === Number(route.params.quizId))?.questions;

let activeQuestion = ref(0)
let clickedAnswer = ref(-1)
let submitedAnswers: Answer[] = []

const NextQuestion = () => {
    if (clickedAnswer.value >= 0 && clickedAnswer.value < quizData![activeQuestion.value].options.length) {
        submitedAnswers.push({
            question_id: quizData![activeQuestion.value].id,
            answer: quizData![activeQuestion.value].options[clickedAnswer.value],
        });
    }

    activeQuestion.value < quizData!.length - 1 ? activeQuestion.value++ : handleResults()
    console.log(clickedAnswer.value);

    clickedAnswer.value = -1;
};
const handleResults = async () => {
    await studentStore.submitAnswer(Number(route.params.quizId), { answers: submitedAnswers })
    router.push({ name: 'quizScore', params: { quizId: Number(route.params.quizId) } })
}

const quizDuration = () => {
    const quiz = studentStore.studentQuizes.find(quiz => quiz.id === Number(route.params.quizId))
    if (quiz) {
        const duration = quiz.end_time.getTime() - new Date().getTime()
        return duration
    }
    return 0
}

function formatMillisToMinutesAndSeconds(milliseconds: number) {
    const minutes = Math.floor(milliseconds / 60000); // 1 minute = 60000 milliseconds
    const seconds = Math.floor((milliseconds % 60000) / 1000); // 1 second = 1000 milliseconds

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

let duration = ref<number>(Math.max(quizDuration(), 0));
let time = ref('')
let intervalId: number | null = null;

onMounted(() => {
    intervalId = setInterval(() => {
        if (duration.value <= 0) {
            clearInterval(intervalId!);
            toast({
                title: '!! عذرا',
                description: 'انتهى وقت الامتحان',
                variant: 'destructive',
                duration: 1000
            });
            router.push({ name: 'quizesPage' });
            return;
        }

        const formattedTime = formatMillisToMinutesAndSeconds(duration.value);
        time.value = formattedTime;
        duration.value -= 1000;
    }, 1000);
});

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});
</script>
<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex flex-row-reverse items-end justify-end">
        <navBar :list="navItems" />
        <LoadingScreen v-if="studentStore.isLoading" />

        <main
            class="w-full h-full md:w-[95vw] md:h-[92vh] flex flex-col md:flex-row md:flex-wrap items-center pb-20 md:p-12 justify-center md:justify-evenly gap-10 overflow-auto"
            v-auto-animate>

            <span
                class="absolute top-5 md:top-0 w-full flex justify-center font-Somar text-4xl text-curious-blue-900">{{
                    time
                }}</span>
            <Card id="questionsCards"
                class=" relative w-5/6 h-fit min-w-[320px] min-h-[400px] md:w-2/5 md:h-full md:max-h-[500px] font-Somar text-curious-blue-900 text-right transition-all">
                <CardContent class="relative h-full flex flex-col items-center justify-around ">
                    <CardHeader class="pr-0 flex flex-row items-center gap-2 justify-center text-wrap text-center">
                        <h1 class="text-xl md:text-2xl select-none">{{ quizData![activeQuestion].question }}
                        </h1>
                    </CardHeader>
                    <div class="w-[95%] md:w-[80%]  flex flex-col items-center gap-5 mt-2 font-Somar font-semibold"
                        v-auto-animate>
                        <div id="answer" :key="quizData![activeQuestion].options.indexOf(option)"
                            v-for="option in quizData![activeQuestion].options"
                            @click="clickedAnswer = quizData![activeQuestion].options.indexOf(option)"
                            :class="quizData![activeQuestion].options.indexOf(option) == clickedAnswer ? 'bg-curious-blue-900 text-curious-blue-50' : ''"
                            class="relative flex items-center justify-end w-full h-12 rounded-xl border-2  hover:cursor-pointer hover:bg-curious-blue-900 hover:text-curious-blue-50">
                            <span class="text-sm font-normal mr-5 select-none">{{ option }}</span>
                        </div>
                    </div>
                    <CardFooter class="w-full flex items-center justify-center mt-10">
                        <Button type="button" @click="activeQuestion <= quizData!.length - 1 ? NextQuestion() : null"
                            class=" flex items-center gap-3 px-3 py-3 md:py-4 font-Somar rounded-lg text-curious-blue-50 bg-curious-blue-900 ">
                            <ArrowRight color="#f3f7fc" class="rotate-180" />
                            {{ activeQuestion == quizData!.length - 1 ? 'تسليم' : 'التالي' }}
                        </Button>
                    </CardFooter>
                </CardContent>
            </Card>
        </main>
    </div>
</template>
