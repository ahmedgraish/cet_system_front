<script setup lang="ts">
import { usePersistStudent } from './composables/usePersistStudent';
import Toaster from '@/components/ui/toast/Toaster.vue'
usePersistStudent()
</script>

<template>
  <header>

    <div class="wrapper">
      <Toaster />
      <nav>
        <RouterLink to="/"></RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style></style>
