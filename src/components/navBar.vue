<script setup lang="ts">
import { ref } from 'vue';
import LinkButton from './LinkButton.vue';
import TooltipProvider from './ui/tooltip/TooltipProvider.vue';
import Tooltip from './ui/tooltip/Tooltip.vue';
import TooltipTrigger from './ui/tooltip/TooltipTrigger.vue';
import TooltipContent from './ui/tooltip/TooltipContent.vue';

let activeNavItem = ref(1)
let hoverdNavItem = ref(-1)

export interface navItem {
    id?: number,
    icon?: Object,
    link?: String
}
const props = withDefaults(defineProps<{
    list: navItem[]
}>(), {})

let tip = ref('')
const tipContent = (link: string) => {
    if (link.includes('home') || link.includes('Home')) {
        tip.value = "المحاضرات"
    } else if (link.includes('subject') || link.includes('Subject')) {
        tip.value = "الواحبات"
    } else if (link.includes('quiz') || link.includes('Quiz')) {
        tip.value = "الاختبارات"

    } else {
        tip.value = "البيانات الشخصية"
    }
}


</script>

<template>
    <div id="nav"
        class="fixed z-50 w-full h-16 bg-curious-blue-400 bottom-0 md:w-20 md:h-full md:right-0 flex md:flex-col items-center justify-evenly px-5 md:px-0">
        <div
            class="relative w-[95vw] h-14 md:h-[85vh] md:w-20 flex md:flex-col items-center justify-between md:justify-evenly">
            <LinkButton :key="item.id" v-for="item in props.list" :link="item.link" @click="activeNavItem = item.id!"
                :class="activeNavItem == item.id ? 'bg-white md:hover:bg-cyan-50' : ''"
                class="relative h-5/6 w-12 md:h-16 md:w-4/5 flex items-center justify-center rounded-full md:rounded-md md:hover:bg-curious-blue-500">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger @mouseover="tipContent(item.link)"
                            class="w-full h-full flex items-center justify-center">
                            <div @mouseover="hoverdNavItem = item.id!" @mouseleave="hoverdNavItem = -1"
                                class="w-full h-full flex items-center justify-center">
                                <component :color="activeNavItem == item.id ? '#4494d0' : '#f3f7fc'" :is="item.icon"
                                    class="w-fit h-fit" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{{ tip }}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </LinkButton>
        </div>
    </div>
</template>