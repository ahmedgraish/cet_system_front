<script setup>
defineProps(['color'])

</script>
<template>
    <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5.5 5C5.22386 5 5 5.22386 5 5.5C5 5.77614 5.22386 6 5.5 6H10.5C10.7761 6 11 5.77614 11 5.5C11 5.22386 10.7761 5 10.5 5H5.5Z"
            :fill="color" />
        <path
            d="M5.5 7C5.22386 7 5 7.22386 5 7.5C5 7.77614 5.22386 8 5.5 8H8.5C8.77614 8 9 7.77614 9 7.5C9 7.22386 8.77614 7 8.5 7H5.5Z"
            :fill="color" />
        <path
            d="M8 2C9.10457 2 10 1.10457 10 0H12.5C13.3284 0 14 0.671573 14 1.5V14.5C14 15.3284 13.3284 16 12.5 16H3.5C2.67157 16 2 15.3284 2 14.5V1.5C2 0.671573 2.67157 0 3.5 0H6C6 1.10457 6.89543 2 8 2ZM8 3C6.69378 3 5.58254 2.16519 5.17071 1H3.5C3.22386 1 3 1.22386 3 1.5V14.5C3 14.7761 3.22386 15 3.5 15H12.5C12.7761 15 13 14.7761 13 14.5V1.5C13 1.22386 12.7761 1 12.5 1H10.8293C10.4175 2.16519 9.30622 3 8 3Z"
            :fill="color" />
    </svg>

</template>