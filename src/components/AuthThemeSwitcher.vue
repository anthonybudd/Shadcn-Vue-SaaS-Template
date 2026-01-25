<template>
    <p
        class="text-sm text-muted-foreground hover:text-primary cursor-pointer text-center"
        @click="theme = theme === 'light' ? 'dark' : 'light'"
    >
        <Moon
            v-if="theme === 'light'"
            class="w-4 h-4 mx-auto"
        />
        <Sun
            v-else
            class="w-4 h-4 mx-auto"
        />
    </p>
</template>

<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next';
import { useColorMode } from '@vueuse/core';
const theme = useColorMode();
</script>