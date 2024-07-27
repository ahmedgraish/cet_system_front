<script setup>
const props = defineProps({
    link: String,
    class: {
        type: String,
        default: "text-sm sm:text-md md:text-base"
    }
});
</script>

<template>
    <a :href="link" v-smooth-scroll
        class="font-theme-heading font-medium bg-curious-blue-400 text-curious-blue-50 px-20 py-3 lg:px-36 md:py-4 rounded-xl shadow-md hover:bg-curious-blue-500 border-2 border-transparent hover:border-theme-grayish-blue hover:text-theme-grayish-blue cursor-pointer transition duration-200">
        <slot></slot>
    </a>
</template>