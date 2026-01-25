<template>
    <div class="min-h-screen flex flex-col items-center justify-center px-6">
        <div class="text-center">
            <h1 class="text-9xl font-extrabold text-gray-300 tracking-widest">
                404
            </h1>
            <div class="bg-blue-500 px-2 text-sm rounded absolute mt-[-.5rem] ml-2 text-white inline-block">
                Page Not Found
            </div>
            <p class="text-gray-500 mt-6 mb-8 text-lg">
                Sorry, the page you are looking for does not exist.
            </p>
            <Button
                class="bg-blue-600 hover:bg-blue-700"
                @click="home()"
            >
                Home
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';

const home = () => window.location.href = '/';
</script>