<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'



const props = withDefaults(defineProps<{
    image: string
    name: string
    link: string
}>(), {})

</script>
<template>
    <router-link :to="{ name: props.link }" id="userBunner"
        class="h-full w-fit rounded-2xl flex items-center justify-around gap-3 px-5  transition-all hover:bg-slate-50 hover:cursor-pointer ml-16">
        <span id="userName" class="font-Somar text-curious-blue-900">{{ props.name }}</span>
        <Avatar>
            <AvatarImage :src="props.image" alt="pic" />
            <AvatarFallback>pic</AvatarFallback>
        </Avatar>
    </router-link>
</template>