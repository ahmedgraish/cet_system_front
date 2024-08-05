<script lang="ts">
import cetLogo from '@/components/icons/IconCet.vue';
</script>
<template>
    <div class="relative w-[90vw] h-[35vh] md:h-[75vh]">
        <div id="shcedulerWrapper"
            class="text-curious-blue-800 text-[0.5rem] md:text-[1.25rem] border-2 md:border-4 w-full h-full #min-w-[500px] #min-h-[400px]  grid grid-cols-12 grid-rows-7 gap-0"
            style="direction: rtl;">
            <span id="hourCell"
                class="col-span-1 row-span-1 bg-curious-blue-200 border-2 border-r-0 border-t-0 md:border-4 md:border-t-0 md:border-r-0  align-middle flex items-center justify-center">
                <cetLogo class="scale-50 " />
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
            <div id="lectureCell"
                class="relative col-span-5 row-span-1 col-start-2 row-start-2 bg-gray-100 font-Somar text-gray-700 text-[0.4rem] md:text-[1.1rem] flex items-start justify-center flex-col pr-2 md:pr-4">
                <div id="indicator" class="absolute h-[95%] w-[1px] md:w-1 bg-red-500 right-0"></div>
                <span id="subjectName" class="">هندسة برمجيات</span>
                <span id="lectureTime" class="text-gray-500 md:text-[1rem] ">08:00 - 12:00</span>
                <span id="absenceRatio" class="text-gray-500 md:text-[0.9rem]">نسبة الغياب: 20%</span>
            </div>
            <div id="lectureCell"
                class="relative col-span-4 row-span-1 col-start-4 row-start-4 bg-gray-100 font-Somar text-gray-700 text-[0.4rem] md:text-[1.1rem] flex items-start justify-center flex-col pr-2 md:pr-4">
                <div id="indicator" class="absolute h-[95%] w-[1px] md:w-1 bg-red-500 right-0"></div>
                <span id="subjectName" class="text-nowrap">هندسة برمجيات</span>
                <span id="lectureTime" class="text-gray-500 md:text-[1rem] text-nowrap ">08:00 - 12:00</span>
                <span id="absenceRatio" class="text-gray-500 md:text-[0.9rem] text-nowrap">نسبة الغياب: 20%</span>
            </div>
        </div>
    </div>

</template>