<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import PenIcon from '@/components/icons/penIcon.vue';
import TagIcon from '@/components/icons/tagIcon.vue';
import ClockIcon from '@/components/icons/clockIcon.vue';
import type { TransformedQuiz } from '@/repository/interfaces';
import { formatDateInArabic } from '@/lib/utils';



function calculateDurationInMinutes(startTime: Date, endTime: Date): number {
    // Calculate the difference in milliseconds
    const diffInMs = endTime.getTime() - startTime.getTime();

    // Convert milliseconds to minutes
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    return diffInMinutes;
}

const props = withDefaults(defineProps<{
    quizCardInfo: TransformedQuiz
    due?: boolean
}>(), {})


</script>

<template>
    <router-link :to="{ name: 'quizAttemptingPage', params: { quizId: props.quizCardInfo.id } }"
        v-if="(props.quizCardInfo.end_time > new Date() && !props.quizCardInfo.done) && props.due"
        class="w-5/6 h-1/4 min-w-[330px] min-h-[200px] md:w-1/4 md:h-1/3 md:min-w-[380px]">
        <Card
            class="w-full h-full font-Somar text-curious-blue-900 text-right hover:cursor-pointer hover:drop-shadow-md transition-all">
            <CardContent>
                <CardHeader class="relative pr-0 flex flex-row items-center gap-2 justify-end">
                    <h1 class="text-xl md:text-2xl select-none">{{ props.quizCardInfo.name }}</h1>
                    <PenIcon color="#1e3d5c" />
                    <div
                        class="absolute border left-0 px-3 py-0.5 rounded-md flex items-center justify-center text-xs text-blue-50 bg-blue-600">
                        <span>!جديد</span>
                    </div>
                </CardHeader>
                <CardDescription class="flex flex-row-reverse gap-8 md:gap-20 mt-2 font-Somar font-semibold ">
                    <span class="flex items-center gap-1 select-none w-fit "> {{
                        formatDateInArabic(props.quizCardInfo.start_time, 'EEEE') }} : {{
                            props.quizCardInfo.start_time.toLocaleDateString('Ar') }}
                        <TagIcon color="#6b7280" />
                    </span>
                    <span class="flex items-center gap-2 select-none"> الزمن : {{
                        calculateDurationInMinutes(props.quizCardInfo.start_time, props.quizCardInfo.end_time) }} د
                        <ClockIcon color="#6b7280" />
                    </span>
                </CardDescription>
                <CardDescription class="mt-7 md:mt-10">
                    <span class="font-Somar select-none">{{ props.quizCardInfo.note }}</span>
                </CardDescription>
            </CardContent>
        </Card>
    </router-link>

    <router-link :to="{ name: 'quizScore', params: { quizId: props.quizCardInfo.id } }"
        v-if="(props.quizCardInfo.end_time < new Date() || props.quizCardInfo.done) && !props.due"
        class="relative w-5/6 h-1/4 min-w-[330px] min-h-[200px] md:w-1/4 md:h-1/3 md:min-w-[380px]">
        <Card
            class="w-full h-full font-Somar text-curious-blue-900 text-right hover:cursor-pointer hover:drop-shadow-md transition-all">
            <CardContent>

                <CardHeader class="relative pr-0 flex flex-row items-center gap-2 justify-end">
                    <h1 class="text-xl md:text-2xl select-none">{{ props.quizCardInfo.name }}</h1>
                    <PenIcon color="#1e3d5c" />
                    <div v-if="!props.quizCardInfo.done"
                        class="absolute border left-0 px-3 py-0.5 rounded-md flex items-center justify-center text-xs text-red-50 bg-crimson-600">
                        <span>
                            غير منجز
                        </span>
                    </div>
                    <div v-else
                        class="absolute border left-0 px-3 py-0.5 rounded-md flex items-center justify-center text-xs text-green-50 bg-green-600">
                        <span>منجز</span>
                    </div>
                </CardHeader>
                <CardDescription class="flex flex-row-reverse gap-8 md:gap-20 mt-2 font-Somar font-semibold">
                    <span class="flex items-center gap-1 select-none w-fit"> {{
                        formatDateInArabic(props.quizCardInfo.start_time, 'EEEE') }} : {{
                            props.quizCardInfo.start_time.toLocaleDateString('Ar') }}
                        <TagIcon color="#6b7280" />
                    </span>
                    <span class="flex items-center gap-2 select-none"> الزمن : {{
                        calculateDurationInMinutes(props.quizCardInfo.start_time, props.quizCardInfo.end_time) }} د
                        <ClockIcon color="#6b7280" />
                    </span>
                </CardDescription>
                <CardDescription class="mt-7 md:mt-10">
                    <span class="font-Somar select-none">{{ props.quizCardInfo.note }}</span>
                </CardDescription>
            </CardContent>
        </Card>
    </router-link>

</template>
