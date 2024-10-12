<script setup lang="ts">
import { ArrowLeftIcon, TrashIcon } from '@radix-icons/vue';
import StudentsRep from '../icons/studentsRep.vue';
import Card from '../ui/card/Card.vue';
import CardDescription from '../ui/card/CardDescription.vue';
import CardFooter from '../ui/card/CardFooter.vue';
import CardHeader from '../ui/card/CardHeader.vue';
import CardTitle from '../ui/card/CardTitle.vue';
import TagIcon from '../icons/tagIcon.vue';
import ArrowRight from '../icons/arrowRight.vue';
import type { TeacherLecture } from '@/repository/interfaces';
import Button from '../ui/button/Button.vue';
import AlertDialog from '../ui/alert-dialog/AlertDialog.vue';
import AlertDialogTrigger from '../ui/alert-dialog/AlertDialogTrigger.vue';
import AlertDialogContent from '../ui/alert-dialog/AlertDialogContent.vue';
import AlertDialogHeader from '../ui/alert-dialog/AlertDialogHeader.vue';
import AlertDialogTitle from '../ui/alert-dialog/AlertDialogTitle.vue';
import AlertDialogDescription from '../ui/alert-dialog/AlertDialogDescription.vue';
import AlertDialogCancel from '../ui/alert-dialog/AlertDialogCancel.vue';
import AlertDialogAction from '../ui/alert-dialog/AlertDialogAction.vue';
import { onMounted } from 'vue';


const props = withDefaults(defineProps<{
    lectureInfo: TeacherLecture
}>(), {})

function getDayOfWeekInArabic(dayNumber: number): string {
    const daysOfWeekArabic = [
        "السبت",   // Saturday
        "الأحد",    // Sunday
        "الاثنين",  // Monday
        "الثلاثاء", // Tuesday
        "الأربعاء", // Wednesday
        "الخميس",   // Thursday
        "الجمعة"    // Friday
    ];

    if (dayNumber < 1 || dayNumber > 7) {
        throw new Error("Invalid day number. Must be between 1 and 7.");
    }

    return daysOfWeekArabic[dayNumber - 1];
}
function isTodayLectureDay(lectureDay: number): boolean {
    const today = new Date().getDay();

    const adjustedToday = today === 6 ? 1 : today === 0 ? 2 : today + 1;

    return adjustedToday === lectureDay;
}


onMounted(() => {

})
</script>

<template>
    <router-link v-if="isTodayLectureDay(lectureInfo.day_of_week)"
        :to="{ name: 'studentAttendance', params: { lectureId: props.lectureInfo.id } }" class="">

        <Card class="font-Somar text-curious-blue-900  hover:cursor-pointer hover:drop-shadow-md transition-all">
            <CardHeader class="relative gap-8">
                <CardTitle class="text-3xl text-center">{{ lectureInfo.subject_name }}</CardTitle>
                <div id="studentNo" class="flex gap-2 items-center justify-center">
                    <div class="w-fit h-fit px-2 py-2 rounded-full shadow-md bg-curious-blue-200">
                        <StudentsRep class="" />
                    </div>
                    <span class=" text-xl font-bold">{{ lectureInfo.number_of_students }}</span>
                </div>
            </CardHeader>
            <CardDescription class=" flex flex-col gap-5 text-center ">
                <h2 class="text-xl">بيانات المحاضرة</h2>
                <span id="day" class="text-2xl font-bold text-curious-blue-900">{{
                    getDayOfWeekInArabic(lectureInfo.day_of_week) }}</span>
                <div id="time" class="text-2xl mt-3">
                    <span id="hr" class="px-2 py-1 rounded-md bg-curious-blue-100 text-curious-blue-500">{{
                        lectureInfo.start_time.split(':')[0] }}</span>
                    :
                    <span id="min" class="text-curious-blue-900">{{ lectureInfo.start_time.split(':')[1] }}</span>
                </div>
            </CardDescription>
            <CardFooter class="items-center justify-between mt-12">
                <ArrowRight color="gray" class="rotate-180 scale-150" />
                <h2 class="flex items-center gap-2">المجموعة - {{ lectureInfo.group_name }}
                    <TagIcon color="#6b7280" />
                </h2>
            </CardFooter>
        </Card>

    </router-link>
    <router-link v-else :to="{ name: '' }" class="cursor-default">

        <Card :class="isTodayLectureDay(lectureInfo.day_of_week) ? 'bg-gray-50' : ''"
            class="font-Somar text-curious-blue-900">
            <CardHeader class="relative gap-8">
                <CardTitle class="text-3xl text-center">{{ lectureInfo.subject_name }}</CardTitle>
                <div id="studentNo" class="flex gap-2 items-center justify-center">
                    <div class="w-fit h-fit px-2 py-2 rounded-full shadow-md bg-curious-blue-200">
                        <StudentsRep class="" />
                    </div>
                    <span class=" text-xl font-bold">{{ lectureInfo.number_of_students }}</span>
                </div>
            </CardHeader>
            <CardDescription class=" flex flex-col gap-5 text-center ">
                <h2 class="text-xl">بيانات المحاضرة</h2>
                <span id="day" class="text-2xl font-bold text-curious-blue-900">{{
                    getDayOfWeekInArabic(lectureInfo.day_of_week) }}</span>
                <div id="time" class="text-2xl mt-3">
                    <span id="hr" class="px-2 py-1 rounded-md bg-curious-blue-100 text-curious-blue-500">{{
                        lectureInfo.start_time.split(':')[0] }}</span>
                    :
                    <span id="min" class="text-curious-blue-900">{{ lectureInfo.start_time.split(':')[1] }}</span>
                </div>
            </CardDescription>
            <CardFooter class="items-center justify-between mt-12">
                <ArrowRight color="gray" class="rotate-180 scale-150" />
                <h2 class="flex items-center gap-2">المجموعة - {{ lectureInfo.group_name }}
                    <TagIcon color="#6b7280" />
                </h2>
            </CardFooter>
        </Card>

    </router-link>
</template>
<style></style>
