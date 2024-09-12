<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  RadioGroupIndicator,
  RadioGroupItem,
  type RadioGroupItemProps,
  useForwardProps,
} from 'radix-vue'
import { CheckIcon } from '@radix-icons/vue'
import { cn } from '@/lib/utils'

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RadioGroupItem v-bind="forwardedProps" :class="cn(
    'aspect-square h-4 w-4 rounded-full border  border-gray-900 text-gray-900 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50',
    props.class,
  )
    ">
    <RadioGroupIndicator class="flex items-center justify-center">
      <slot />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
