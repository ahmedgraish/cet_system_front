<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type PrimitiveProps } from 'radix-vue'

interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class']
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
    <div id="header" :class="props.class">
        <slot></slot>
    </div>
</template>
<style></style>
