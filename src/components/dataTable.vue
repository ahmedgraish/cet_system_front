<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
    class?: HTMLAttributes['class']
}>(), {
})
</script>

<template>
    <div dir="rtl" id="tableWrapper" :class="cn('flex flex-col border-2 border-gray-300 font-Somar', props.class)">
        <div id="header"
            class="w-full  flex items-center justify-start bg-gradient-to-r from-cyan-500 to-curious-blue-400  text-curious-blue-50 py-4 border-b"
            style="animation: bgAnimation 0.5s ease-in-out infinite;">
            <slot name="header" c />
        </div>
        <div id="row" class="flex flex-col gap-3 w-full  ">
            <slot name="row" />
        </div>
    </div>
</template>
<style scoped></style>