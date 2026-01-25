<template>
    <div class="container relative flex-col items-center justify-center md:grid max-w-none lg:grid-cols-2 lg:px-0 h-full">

        <AuthSideBar />

        <div class="p-8">
            <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[300px] md:w-[400px] lg:w-[500px]">
                <div class="flex flex-col space-y-2 text-center">
                    <div class="flex justify-center mb-4">
                        <Logo />
                    </div>
                    <h1 class="text-2xl font-semibold tracking-tight">
                        Forgot Password
                    </h1>
                    <p class="text-sm text-muted-foreground">
                        Enter your email below to reset your password
                    </p>
                </div>

                <ForgotForm />

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AuthSideBar from '@/components/AuthSideBar.vue';
import ForgotForm from '@/components/ForgotForm.vue';
</script>