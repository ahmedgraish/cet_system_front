<script setup lang="ts">
import { ArrowLeftIcon } from '@radix-icons/vue';
import StudentsRep from '../icons/studentsRep.vue';
import Card from '../ui/card/Card.vue';
import CardDescription from '../ui/card/CardDescription.vue';
import CardFooter from '../ui/card/CardFooter.vue';
import CardHeader from '../ui/card/CardHeader.vue';
import CardTitle from '../ui/card/CardTitle.vue';
import TagIcon from '../icons/tagIcon.vue';
import ArrowRight from '../icons/arrowRight.vue';


</script>

<template>
    <router-link :to="{ name: 'studentAttendance' }" class="">
        <Card class="font-Somar text-curious-blue-900  hover:cursor-pointer hover:drop-shadow-md transition-all">
            <CardHeader class="gap-8">
                <CardTitle class="text-3xl text-center">| | الكترونية </CardTitle>
                <div id="studentNo" class="flex gap-2 items-center justify-center">
                    <div class="w-fit h-fit px-2 py-2 rounded-full shadow-md bg-curious-blue-200">
                        <StudentsRep class="" />
                    </div>
                    <span class=" text-xl font-bold">25</span>
                </div>
            </CardHeader>
            <CardDescription class=" flex flex-col gap-5 text-center ">
                <h2 class="text-xl">بيانات المحاضرة</h2>
                <span id="day" class="text-2xl font-bold text-curious-blue-900">الاحد</span>
                <div id="time" class="text-2xl mt-3">
                    <span id="hr" class="px-2 py-1 rounded-md bg-curious-blue-100 text-curious-blue-500">08</span>
                    :
                    <span id="min" class="text-curious-blue-900">52</span>
                </div>
            </CardDescription>
            <CardFooter class="items-center justify-between mt-12">
                <ArrowRight color="gray" class="rotate-180 scale-150" />
                <h2 class="flex items-center gap-2">المجموعة - 2
                    <TagIcon color="#6b7280" />
                </h2>
            </CardFooter>
        </Card>
    </router-link>
</template>
<style></style>
