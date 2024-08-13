<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import PenIcon from '@/components/icons/penIcon.vue';
import TagIcon from '@/components/icons/tagIcon.vue';
import ClockIcon from '@/components/icons/clockIcon.vue';

export interface QuizCardInfo {
    quizName: string,
    day: string,
    date: Date,
    duration: number,
    note?: string

}

const props = withDefaults(defineProps<{
    quizCardInfo: QuizCardInfo
    due?: boolean
}>(), {})



</script>

<template>
    <a v-if="props.quizCardInfo.date >= new Date() && props.due" href="quizAttempting"
        class="w-5/6 h-1/4 min-w-[330px] min-h-[200px] md:w-1/3 md:h-1/3 md:min-w-[500px]">
        <Card
            class="w-full h-full font-Somar text-curious-blue-900 text-right hover:cursor-pointer hover:drop-shadow-md transition-all">
            <CardContent>
                <CardHeader class="pr-0 flex flex-row items-center gap-2 justify-end">
                    <h1 class="text-xl md:text-2xl select-none">{{ props.quizCardInfo.quizName }}</h1>
                    <PenIcon color="#1e3d5c" />
                </CardHeader>
                <CardDescription class="flex flex-row-reverse gap-10 md:gap-24 mt-2 font-Somar font-semibold">
                    <span class="flex items-center gap-1 select-none"> {{ props.quizCardInfo.day }} : {{
                        props.quizCardInfo.date.toLocaleDateString('Ar') }}
                        <TagIcon color="#6b7280" />
                    </span>
                    <span class="flex items-center gap-2 select-none"> الزمن : {{ props.quizCardInfo.duration }} د
                        <ClockIcon color="#6b7280" />
                    </span>
                </CardDescription>
                <CardDescription class="mt-7 md:mt-10">
                    <span class="font-Somar select-none">{{ props.quizCardInfo.note }}</span>
                </CardDescription>
            </CardContent>
        </Card>
    </a>

    <a v-if="props.quizCardInfo.date < new Date() && !props.due" href="#"
        class="w-5/6 h-1/4 min-w-[330px] min-h-[200px] md:w-1/3 md:h-1/3 md:min-w-[500px]">
        <Card
            class="w-full h-full font-Somar text-curious-blue-900 text-right hover:cursor-pointer hover:drop-shadow-md transition-all">
            <CardContent>
                <CardHeader class="pr-0 flex flex-row items-center gap-2 justify-end">
                    <h1 class="text-xl md:text-2xl select-none">{{ props.quizCardInfo.quizName }}</h1>
                    <PenIcon color="#1e3d5c" />
                </CardHeader>
                <CardDescription class="flex flex-row-reverse gap-10 md:gap-24 mt-2 font-Somar font-semibold">
                    <span class="flex items-center gap-1 select-none"> {{ props.quizCardInfo.day }} : {{
                        props.quizCardInfo.date.toLocaleDateString('Ar') }}
                        <TagIcon color="#6b7280" />
                    </span>
                    <span class="flex items-center gap-2 select-none"> الزمن : {{ props.quizCardInfo.duration }} د
                        <ClockIcon color="#6b7280" />
                    </span>
                </CardDescription>
                <CardDescription class="mt-7 md:mt-10">
                    <span class="font-Somar select-none">{{ props.quizCardInfo.note }}</span>
                </CardDescription>
            </CardContent>
        </Card>
    </a>

</template>
