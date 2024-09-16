<script setup lang="ts">
import type { Lecture } from '@/repository/interfaces';
import IconCet from './icons/IconCet.vue';
import { onMounted, ref } from 'vue';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import Button from './ui/button/Button.vue';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'
import DialogTitle from './ui/dialog/DialogTitle.vue';
import Textarea from './ui/textarea/Textarea.vue';
import { useStudentStore } from '@/stores/student';

const studentStore = useStudentStore()
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
const handLecClick = (lectureId: number) => {
    const trigger = document.getElementById("dialogTrigger" + lectureId);
    trigger!.click()
}

let noteValue = ref('')
const addNote = (lectureId: number) => {
    studentStore.addLectureNote(lectureId, noteValue.value)
    handLecClick(lectureId)
    noteValue.value = ''
}

onMounted(() => {
    scrollToDayCells()
})


</script>
<template>
    <div class="relative w-[90vw] h-[35vh] md:h-[75vh]">
        <div id="shcedulerWrapper"
            class="select-none text-curious-blue-800 text-[0.5rem] md:text-[1.25rem] border-2 md:border-4 w-full h-full min-w-[500px] grid grid-cols-12 grid-rows-7 gap-0"
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
            <HoverCard :key="props.lectures.indexOf(lecture)" id="lectureCell" v-for="lecture in props.lectures">

                <HoverCardTrigger @click="handLecClick(lecture.id)"
                    :style="[colStart(lecture.start_time), colEnd(lecture.end_time)]"
                    :class="['row-start-' + (lecture.day_of_week + 1)]"
                    class="relative mt-[2px] row-span-1 bg-gray-50 border hover:bg-gray-100 hover:text-curious-blue-950 transition-all delay-75 hover:cursor-pointer font-Somar text-gray-700 text-[0.4rem] md:text-[1rem] flex items-start justify-center flex-col pr-2 md:pr-4 select-none">
                    <div id="indicator" class="absolute h-[95%] w-[1px] md:w-1 right-0"
                        :class="lecture.absence_percentage <= 10 ? ' bg-green-500' : 'bg-red-500'"></div>
                    <span id="subjectName" class="">{{ lecture.subject_name }}</span>
                    <span id="lectureTime" class="text-gray-500 md:text-[0.8rem] ">{{ lecture.start_time }} -
                        {{ lecture.end_time }}</span>
                    <span id="absenceRatio" class="text-gray-500 md:text-[0.7rem] select-none">نسبة الغياب:
                        {{ lecture.absence_percentage }}%</span>
                </HoverCardTrigger>
                <HoverCardContent class="font-Somar flex flex-col justify-end items-end">
                    <h1 class="font-bold self-center ">ملاحظات</h1>
                    <div class="w-full h-[1px] bg-black"></div>

                    <span class="mt-5 h-14"
                        v-if="!studentStore.lecturesNotes.find(lec => lec.lectureId === lecture.id) || studentStore.lecturesNotes.find(lec => lec.lectureId === lecture.id)!.note.length < 1">لاتوجد
                        اي
                        ملاحظات</span>
                    <span class="mt-5 h-14" v-else>{{ studentStore.lecturesNotes.find(lec => lec.lectureId ===
                        lecture.id)?.note }}</span>
                </HoverCardContent>
                <Dialog class="absolute">
                    <DialogTrigger :id="'dialogTrigger' + lecture.id" class="absolute bg-black">


                    </DialogTrigger>
                    <DialogContent class="w-[85%] flex flex-col items-center font-Somar">
                        <DialogTitle class="h-5">ملاحظاتك</DialogTitle>
                        <span class="md:hidden mt-5 h-14">{{ studentStore.lecturesNotes.find(lec => lec.lectureId ===
                            lecture.id)?.note }}</span>
                        <Textarea class="py-5 md:py-4" dir="rtl" type="text" placeholder="ملاحظة" v-model="noteValue" />
                        <Button @click="addNote(lecture.id)"
                            class="px-20 py-2 lg:px-16 md:py-3 rounded-lg text-curious-blue-50 bg-curious-blue-950 ">
                            اضافة
                        </Button>
                    </DialogContent>
                </Dialog>

            </HoverCard>

        </div>
    </div>

</template>
