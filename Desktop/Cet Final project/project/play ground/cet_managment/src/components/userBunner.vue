<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>
<template>
    <a href="settings" id="userBunner"
        class="h-full w-fit rounded-2xl flex items-center justify-around gap-3 px-5  transition-all hover:bg-slate-50 hover:cursor-pointer ml-16">
        <span id="userName" class="font-Somar text-curious-blue-900">احمد محمد اقريش</span>
        <Avatar>
            <AvatarImage
                src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                alt="pic" />
            <AvatarFallback>pic</AvatarFallback>
        </Avatar>
    </a>
</template>