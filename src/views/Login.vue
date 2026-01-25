<template>
    <div class="container relative flex-col items-center justify-center md:grid max-w-none lg:grid-cols-2 lg:px-0 h-full">

        <AuthSideBar />

        <div class="p-8">
            <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[300px] md:w-[400px] lg:w-[500px]">
                <div class="flex flex-col space-y-2 text-left">
                    <div class="flex justify-left mb-4">
                        <Icon class="w-1/3 hidden md:block max-w-20" />
                        <LogoDark class="w-1/3 block md:hidden max-w-20" />
                    </div>
                    <p class="text-4xl font-semibold tracking-tight">
                        Login
                    </p>
                    <p class="text-sm text-muted-foreground">
                        Enter your email and password to login
                    </p>
                </div>

                <LoginForm />

                <p class="px-8 text-center text-xs text-muted-foreground">
                    By clicking continue, you agree to our
                    <a
                        href="https://example.com/terms-of-service"
                        target="_blank"
                        class="underline underline-offset-4 hover:text-primary"
                    >
                        Terms of Service
                    </a>
                    and
                    <a
                        href="https://example.com/privacy-policy"
                        target="_blank"
                        class="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy.
                    </a>

                    <br>
                    <br>
                    <router-link
                        :to="'/forgot'"
                        class="underline underline-offset-4 hover:text-primary cursor-pointer"
                    >
                        Forgot Password
                    </router-link>
                </p>

                <AuthThemeSwitcher />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AuthSideBar from '@/components/AuthSideBar.vue';
import LoginForm from '@/components/LoginForm.vue';
import { useColorMode } from '@vueuse/core';
import AuthThemeSwitcher from '@/components/AuthThemeSwitcher.vue';
const theme = useColorMode();
</script>