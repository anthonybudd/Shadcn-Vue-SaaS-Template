<template>
    <div class="fixed top-0 left-0 right-0 z-50 bg-secondary dark:bg-black">
        <nav class="border-b">
            <div class="hidden lg:block relative">
                <div class="flex items-center h-[66px] py-3">
                    <router-link
                        class="flex-shrink-0 px-6 cursor-pointer"
                        to="/"
                    >
                        <LogoTheme class="w-48 cursor-pointer" />
                    </router-link>
                    <div class="flex-1 flex items-center ml-8">
                        <div class="flex items-center space-x-4 lg:space-x-6">
                            <router-link
                                v-for="item in menuItems"
                                :key="item.to"
                                :to="item.to"
                                class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                :class="{ 'text-primary': $route.path === item.to }"
                            >
                                <span class="inline-flex items-center gap-1">
                                    <component
                                        :is="item.icon"
                                        class="w-4 h-4 inline-block"
                                    />
                                    {{ item.label }}
                                </span>
                            </router-link>
                        </div>
                    </div>
                    <div class="flex items-center pr-6">
                        <div class="ml-6">
                            <div class="relative">
                                <DropdownMenu>
                                    <DropdownMenuTrigger as-child>
                                        <button class="flex items-center space-x-2 rounded-lg transition-colors cursor-pointer">
                                            <img
                                                alt="Profile Image"
                                                src="https://github.com/anthonybudd.png?size=120"
                                                class="rounded-full object-cover w-12 h-12 text-sm border-1 bg-black border-[#0099FF]"
                                            />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <MainMenuDropDown />
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:hidden">
                <div class="px-4">
                    <div class="flex items-center justify-between h-16">
                        <router-link
                            to="/"
                            class="flex items-center"
                        >
                            <LogoTheme class="w-48 cursor-pointer" />
                        </router-link>

                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <button class="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                                    <Menu />
                                </button>
                            </DropdownMenuTrigger>
                            <MainMenuDropDown />
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { LayoutGrid, ReceiptText, User, Menu } from 'lucide-vue-next';
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import MainMenuDropDown from '@/components/MainMenuDropDown.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';

const router = useRouter();
const store = useStore();

const group = computed(() => store.state.group);

const menuItems = [
    {
        label: 'Dashboard',
        icon: LayoutGrid,
        to: '/',
    },
    {
        label: 'Index',
        icon: ReceiptText,
        to: '/index',
    },
    {
        label: 'Account',
        icon: User,
        to: '/account',
    },
];
</script>