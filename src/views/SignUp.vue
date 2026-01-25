<template>
    <div class="container relative flex-col items-center justify-center md:grid max-w-none lg:grid-cols-2 lg:px-0 h-full">

        <AuthSideBar />

        <div class="p-8">
            <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
                <div class="w-full h-3 bg-gray-200 rounded-full mb-6">
                    <div
                        class="h-3 bg-[#0004E8] rounded-full transition-all duration-300"
                        :style="{ width: `${signUpProgress}%` }"
                    ></div>
                </div>

                <div class="flex flex-col space-y-2 text-left">
                    <div class="flex justify-left mb-4">
                        <Icon class="w-1/3 hidden md:block max-w-20" />
                        <LogoDark class="w-30 block md:hidden mx-auto" />
                    </div>
                    <p class="text-4xl font-semibold tracking-tight">
                        Sign-Up
                    </p>
                    <p class="text-sm text-muted-foreground">
                        Please enter the following information to sign up.
                    </p>
                </div>

                <SignUpForm />

                <AuthThemeSwitcher />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AuthThemeSwitcher from '@/components/AuthThemeSwitcher.vue';
import AuthSideBar from '@/components/AuthSideBar.vue';
import SignUpForm from '@/components/SignUpForm.vue';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const signUpProgress = computed(() => store.state.signUpProgress);

onMounted(() => {
    store.commit('setSignUpProgress', 10);
});
</script>