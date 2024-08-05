<script setup lang="ts">
import { ref } from 'vue';
import LinkButton from './LinkButton.vue';

let activeNavItem = ref(1)

interface navItem {
    id?: number,
    icon?: Object,
    link?: String
}
const props = withDefaults(defineProps<{
    list: navItem[]
}>(), {})

</script>

<template>
    <div id="nav"
        class="absolute w-full h-16 bg-curious-blue-400 bottom-0 md:w-20 md:h-full md:right-0 flex md:flex-col items-center justify-evenly px-5 md:px-0">
        <div class=" md:absolute md:h-1"></div>
        <div
            class="relative w-[95vw] h-14 md:h-[85vh] md:w-20 flex md:flex-col items-center justify-between md:justify-evenly">
            <LinkButton :key="item.id" v-for="item in props.list" :link="item.link" @click="activeNavItem = item.id"
                :class="activeNavItem == item.id ? 'bg-white md:hover:bg-cyan-50' : ''"
                class=" h-full w-14 md:h-20 md:w-full flex items-center justify-center rounded-full md:rounded-md md:hover:bg-curious-blue-500">
                <component :color="activeNavItem == item.id ? '#4494d0' : '#f3f7fc'" :is="item.icon"
                    class="w-fit h-fit" />
            </LinkButton>
        </div>
    </div>
</template>