<script setup lang="ts">
import type { Lecture } from '@/repository/interfaces';
import IconCet from './icons/IconCet.vue';
import { onMounted } from 'vue';


const props = withDefaults(defineProps<{
    lectures: Lecture[]
}>(), {})


const colEnd = (time: string) => {
    const end = parseInt(time, 10) - 5;

    return 'grid-column-end: ' + end;
}
const colStart = (time: string) => {
    const start = parseInt(time, 10) - 6;

    return 'grid-column-start:' + start;
}

const scrollToDayCells = () => {
    const dayCell = document.getElementById('DayCell')
    if (dayCell) {
        dayCell.scrollIntoView(true)
    }
}

onMounted(() => {
    scrollToDayCells()
})


</script>
<template>
    <div class="relative w-[90vw] h-[35vh] md:h-[75vh]">
        <div id="shcedulerWrapper"
            class="text-curious-blue-800 text-[0.5rem] md:text-[1.25rem] border-2 md:border-4 w-full h-full min-w-[500px] grid grid-cols-12 grid-rows-7 gap-0"
            style="direction: rtl;">
            <span id="hourCell"
                class="col-span-1 row-span-1 bg-curious-blue-200 border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                <IconCet class="scale-50" />
            </span>
            <span id="hourCell"
                class="col-span-1 row-span-1 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                08:00
            </span>
            <span id="hourCell"
                class="col-span-1 row-span-1 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                09:00
            </span>
            <span id="hourCell"
                class="col-span-1 row-span-1 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                10:00
            </span>
            <span id="hourCell"
                class="col-span-1 row-span-1 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                11:00
            </span>
            <span id="hourCell"
                class="col-span-1 row-span-1 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                12:00
            </span>
            <span id="hourCell"
                class="col-span-1 row-span-1 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                01:00
            </span>
            <span id="hourCell"
                class="col-span-1 row-span-1 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                02:00
            </span>
            <span id="hourCell"
                class="col-span-1 row-span-1 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                03:00
            </span>
            <span id="hourCell"
                class="col-span-1 row-span-1 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                04:00
            </span>
            <span id="hourCell"
                class="col-span-1 row-span-1 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                05:00
            </span>
            <span id="hourCell"
                class="col-span-1 row-span-1 font-Somar border-2 border-x-0 border-t-0 md:border-4 md:border-t-0 md:border-x-0  align-middle flex items-center justify-center">
                06:00
            </span>
            <span id="DayCell"
                class="col-span-1 row-span-1 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                السبت
            </span>
            <span id="DayCell"
                class="col-span-1 row-span-1 row-start-3 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                الاحد
            </span>
            <span id="DayCell"
                class="col-span-1 row-span-1 row-start-4 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                الاثنين
            </span>
            <span id="DayCell"
                class="col-span-1 row-span-1 row-start-5 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                الثلاثاء
            </span>
            <span id="DayCell"
                class="col-span-1 row-span-1 row-start-6 font-Somar border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                الاربعاء
            </span>
            <span id="DayCell"
                class="col-span-1 row-span-1 row-start-7 font-Somar border-2 border-r-0 border-y-0 md:border-4 md:border-y-0 md:border-r-0  align-middle flex items-center justify-center">
                الخميس
            </span>
            <div :key="props.lectures.indexOf(lecture)" id="lectureCell" v-for="lecture in props.lectures"
                :style="[colStart(lecture.start_time), colEnd(lecture.end_time)]"
                :class="['row-start-' + (lecture.day_of_week, 10 + 1)]"
                class="relative mt-[1px] row-span-1 bg-gray-100 font-Somar text-gray-700 text-[0.4rem] md:text-[1.1rem] flex items-start justify-center flex-col pr-2 md:pr-4">
                <div id="indicator" class="absolute h-[95%] w-[1px] md:w-1 right-0"
                    :class="lecture.absence_percentage <= 10 ? ' bg-green-500' : 'bg-red-500'"></div>
                <span id="subjectName" class="">{{ lecture.subject_name }}</span>
                <span id="lectureTime" class="text-gray-500 md:text-[1rem] ">{{ lecture.start_time }} -
                    {{ lecture.end_time }}</span>
                <span id="absenceRatio" class="text-gray-500 md:text-[0.9rem]">نسبة الغياب:
                    {{ lecture.absence_percentage }}%</span>
            </div>
        </div>
    </div>

</template>
