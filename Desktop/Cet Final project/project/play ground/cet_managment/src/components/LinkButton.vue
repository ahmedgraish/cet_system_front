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
    <a :href="link" v-smooth-scroll :class="props.class">
        <slot></slot>
    </a>
</template>