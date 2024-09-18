<script setup>
import LinkButton from './LinkButton.vue';
import TypeWritter from './typeWritter.vue';

</script>

<template>
    <div class="container mx-auto px-5 overflow-x-hidden md:overflow-x-visible">
        <section class="grid grid-cols-none md:grid-cols-2 pb-16 pt-0 items-center">
            <div class="relative scale-75 lg:scale-100 order-2 md:order-none mt-20 md:mt-0 md:-mb-16 md:-mr-10">
                <img class="z-10 w-full" src="../assets/images/illustration-hero.svg" />
                <div
                    class="-z-10 bg-curious-blue-200 h-52 w-full sm:h-80 sm:w-full rounded-r-full absolute -left-52 md:-left-48 -bottom-8">
                </div>
            </div>
            <div
                class="flex flex-col items-center md:items-end mt-20 md:mt-0 md:right-20 md:absolute md:w-5/6 order-1 md:order-none">
                <TypeWritter />
                <span
                    class="w-5/6 md:w-1/4 text-sm md:text-lg text-center md:text-right md:mt-10 mt-5 font-Somar text-gray-400">منصة
                    متكاملة لإدارة
                    العملية التعليمية لكل من
                    الطالب والاستاذ </span>
                <div
                    class="font-Somar text-l md:text-xl flex flex-col items-end justify-center md:justify-end md:mr-16 mt-14 md:mt-20">
                    <LinkButton btn-type="muted" link="signIn"
                        class="font-theme-heading font-medium bg-curious-blue-400 text-curious-blue-50 px-20 py-3 lg:px-36 md:py-4 rounded-xl shadow-md hover:bg-curious-blue-500 border-2 border-transparent hover:border-theme-grayish-blue hover:text-theme-grayish-blue cursor-pointer transition duration-200">
                        تسجيل الدخول</LinkButton>
                    <router-link :to="{ name: 'teacherSignIn' }"
                        class="text-lg mt-2 text-gray-400 hover:text-curious-blue-400">تسجيل دخول
                        كأستاذ؟</router-link>
                </div>
            </div>
        </section>
    </div>
</template>