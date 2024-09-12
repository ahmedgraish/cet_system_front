<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
    class?: HTMLAttributes['class']
}>(), {
})
</script>

<template>
    <div dir="rtl" id="tableWrapper" :class="cn('flex flex-col border ', props.class)">
        <div id="header" class="w-full  flex items-center justify-end bg-curious-blue-100  py-4 border-b">
            <slot name="header" />
        </div>
        <div id="row" class="flex flex-col w-full  ">
            <slot name="row" />
        </div>
    </div>
</template>