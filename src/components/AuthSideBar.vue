<template>
    <div class="relative hidden h-full flex-col bg-muted p-10 text-left text-white dark:border-r lg:flex">
        <div
            class="absolute inset-0 rounded-2xl"
            style="background: linear-gradient(135deg, #134e4a 0%, #065f46 70%), linear-gradient(to bottom, transparent 70%, #030712 98%, #101A39 100%);"
        />
        <div class="relative z-20 flex items-center text-lg font-medium">
            <Logo class="max-w-1/3" />
        </div>

        <div class="relative z-20 mt-auto">
            <div class="flex flex-row gap-4 w-full mb-16">
                <div class="w-2/3">
                    <div class="opacity-80 justify-center">
                        <span class="text-white text-5xl font-semibold font-['Plus_Jakarta_Sans'] leading-[54px]">Login to</span><br>
                        <span class="text-white/30 text-5xl font-semibold font-['Plus_Jakarta_Sans'] leading-[54px]">access your account</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>