<script setup lang="ts">
import { usePersistStudent } from './composables/usePersistStudent';
import Toaster from '@/components/ui/toast/Toaster.vue'
import { usePersistTeacher } from './composables/usePersistTeacher';
usePersistStudent()
usePersistTeacher()
</script>

<template>
  <header>

    <div class="wrapper">
      <Toaster />
    </div>
  </header>

  <RouterView />
</template>

<style></style>
