<template>
    <LogoDark v-if="theme === 'light'" />
    <Logo v-else />
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
const theme = useColorMode();
</script>