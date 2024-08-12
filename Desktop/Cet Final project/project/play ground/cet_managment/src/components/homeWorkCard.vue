<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import PenIcon from '@/components/icons/penIcon.vue';
import TagIcon from '@/components/icons/tagIcon.vue';

export interface HomeWorkCardInfo {
    name: string,
    day: string,
    date: Date,
    note?: string

}

const props = withDefaults(defineProps<{
    homeWorkCardInfo: HomeWorkCardInfo
    due?: boolean
}>(), {})



</script>

<template>
    <a v-if="props.homeWorkCardInfo.date >= new Date() && props.due" href="#"
        class="w-5/6 h-1/6 min-w-[330px] min-h-[150px] md:w-1/5 md:h-1/3 md:min-w-[400px]">
        <Card
            class="w-full h-full font-Somar text-curious-blue-900  hover:cursor-pointer hover:drop-shadow-md transition-all">
            <CardContent>
                <CardHeader class="pr-0 flex flex-row items-center gap-2 justify-end">
                    <h1 class="text-xl md:text-2xl select-none">{{ props.homeWorkCardInfo.name }}</h1>
                    <PenIcon color="#1e3d5c" />
                </CardHeader>
                <CardDescription class="flex justify-end mt-2 font-Somar font-semibold">
                    <span class="flex items-center gap-1 select-none"> {{ props.homeWorkCardInfo.day }} : {{
                        props.homeWorkCardInfo.date.toLocaleDateString('Ar') }}
                        <TagIcon color="#6b7280" />
                    </span>
                </CardDescription>
                <!-- <CardDescription class="mt-7 md:mt-10">
                    <span class="font-Somar select-none">{{ props.homeWorkCardInfo.note }}</span>
                </CardDescription> -->
            </CardContent>
        </Card>
    </a>

    <a v-if="props.homeWorkCardInfo.date < new Date() && !props.due" href="#"
        class="w-5/6 h-1/6 min-w-[330px] min-h-[150px] md:w-1/5 md:h-1/3 md:min-w-[400px]">
        <Card
            class="w-full h-full font-Somar text-curious-blue-900  hover:cursor-pointer hover:drop-shadow-md transition-all">
            <CardContent>
                <CardHeader class="pr-0 flex flex-row items-center gap-2 justify-end">
                    <h1 class="text-xl md:text-2xl select-none">{{ props.homeWorkCardInfo.name }}</h1>
                    <PenIcon color="#1e3d5c" />
                </CardHeader>
                <CardDescription class="flex justify-end mt-2 font-Somar font-semibold">
                    <span class="flex items-center gap-1 select-none"> {{ props.homeWorkCardInfo.day }} : {{
                        props.homeWorkCardInfo.date.toLocaleDateString('Ar') }}
                        <TagIcon color="#6b7280" />
                    </span>
                </CardDescription>
                <CardDescription class="mt-7 md:mt-10">
                    <span class="font-Somar select-none">{{ props.homeWorkCardInfo.note }}</span>
                </CardDescription>
            </CardContent>
        </Card>
    </a>

</template>
