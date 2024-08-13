<script setup lang="ts">
import { usePersistStudent } from './composables/usePersistStudent';


usePersistStudent()
</script>

<template>
  <header>

    <div class="wrapper">

      <nav>
        <RouterLink to="/"></RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style></style>
