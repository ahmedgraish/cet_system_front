<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import PenIcon from '@/components/icons/penIcon.vue';
import TagIcon from '@/components/icons/tagIcon.vue';
import ArrowRight from './icons/arrowRight.vue';
import type { Subject } from '@/repository/interfaces';



const props = withDefaults(defineProps<{
    subjectCardInfo: Subject
}>(), {})


</script>

<template>

    <router-link :to="{ name: 'homeWorksPage', params: { subjectId: props.subjectCardInfo.id } }"
        class="w-5/6 h-1/2 min-w-[330px] min-h-[200px] md:w-80 md:h-1/2 md:min-w-[300px]">
        <Card
            class="relative w-full h-full font-Somar text-curious-blue-900  hover:cursor-pointer hover:drop-shadow-md transition-all">
            <CardContent>
                <CardHeader class="pr-0 pb-3 flex flex-row items-center gap-2 justify-end">
                    <h1 class="text-xl md:text-2xl select-none">{{ props.subjectCardInfo.name }}</h1>
                    <PenIcon color="#1e3d5c" />
                </CardHeader>
                <CardDescription class="flex flex-col items-end gap-2 font-Somar">
                    <span class="flex items-center select-none">كلية التقنية الالكترونية</span>
                    <span class="flex items-center select-none">{{ props.subjectCardInfo.teacher_name }}</span>
                </CardDescription>
                <hr class=" hidden md:block mt-4">
                <CardDescription class="absolute flex items-center justify-between w-[85%] bottom-5 right-5">
                    <ArrowRight color="gray" class="rotate-180" />
                    <span class="flex items-center gap-1 select-none"> المجموعة - {{ props.subjectCardInfo.group_name }}
                        <TagIcon color="#6b7280" />
                    </span>
                </CardDescription>
            </CardContent>
        </Card>
    </router-link>

</template>
