<template>
  <RouterView />
  <Toaster />
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { RouterView } from 'vue-router';
import { onMounted, watch } from 'vue';
import { Toaster } from 'vue-sonner';

const theme = useColorMode();

watch(theme, (newVal: any) => localStorage.setItem('theme', newVal));
onMounted(() => theme.value = localStorage.getItem('theme') == 'light' ? 'light' : 'dark');
</script>