<script setup lang="ts">
import Header from '@/components/appHeader.vue';
import HeroSection from '@/components/heroSection.vue';
import cetLogo from '@/components/icons/IconCet.vue'
</script>

<template>
    <div id="wrapper" class="relative h-[100dvh] w-screen flex items-center justify-center">
        <Header
            class="absolute font-Somar text-curious-blue-50 top-0 h-16 w-full bg-curious-blue-400 flex justify-end items-center">
            <span>كلية التقنية الالكترونية</span>
            <cetLogo class="h-full scale-50 md:scale-75" />
        </Header>
        <HeroSection />
    </div>
</template>

<style></style>
