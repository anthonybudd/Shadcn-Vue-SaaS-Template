<template>
    <div
        class="fixed h-full md:h-auto top-0 left-0 w-[80vw] min-w-2xs md:static md:w-[250px] lg:w-[300px] md:rounded-lg px-4 pt-8 gap-8 flex flex-col z-40 transition-all duration-300 ease-in-out md:translate-x-0 overflow-y-auto"
        style="background: linear-gradient(135deg, #134e4a 0%, #065f46 70%), linear-gradient(to bottom, transparent 70%, #030712 98%, #101A39 100%);"
        :class="{
            '-translate-x-full': !isNavActive,
            'translate-x-0': isNavActive,
            'active': isNavActive,
            'md:translate-x-0': true
        }"
    >
        <div class="flex items-center justify-between w-full">
            <div class="flex items-center px-4">
                <router-link to="/">
                    <Logo class="w-full cursor-pointer" />
                </router-link>
            </div>
        </div>

        <div class="flex flex-col gap-2.5">
            <div
                v-for="item in menuItems"
                :key="item.path"
                @click="router.push(item.path)"
                class="w-full py-3 px-4 hover:bg-teal-900/50 rounded-lg flex flex-row items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out"
                :class="{ 'bg-teal-900': router.currentRoute.value.path == item.path }"
            >
                <component
                    :is="item.icon"
                    class="w-5 h-5 text-white"
                />
                <div class="text-white font-medium leading-5 flex-1">{{ item.label }}</div>
            </div>
        </div>

        <div class="mt-auto mb-4 flex flex-col gap-2.5">
            <div
                @click="logout()"
                class="w-full py-3 px-4 hover:bg-teal-900/50 rounded-lg flex flex-row items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out"
            >
                <SVGLogout class="w-5 h-5" />
                <div class="justify-start text-white text-base font-medium font-['Plus_Jakarta_Sans'] leading-5">Log Out</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import SVGDashboard from '@/assets/nav/Dashboard.svg';
import SVGSettings from '@/assets/nav/Settings.svg';
import SVGLogout from '@/assets/nav/Logout.svg';

const router = useRouter();
const store = useStore();

const isNavActive = computed({
    get: () => store.getters.isNavActive,
    set: (value: boolean) => store.commit('isNavActive', value),
});

const logout = () => router.push('/logout');

let menuItems = ref<any[]>([
    {
        label: 'Dashboard',
        icon: SVGDashboard,
        path: '/',
    },
    {
        label: 'Settings',
        icon: SVGSettings,
        path: '/settings',
    },
]);
</script>