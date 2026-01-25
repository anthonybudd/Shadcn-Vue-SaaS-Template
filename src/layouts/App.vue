<template>
    <div class="h-full w-full">
        <div class="md:p-[18px] flex flex-row h-auto min-h-screen w-full">
            <Nav />

            <div class="w-full md:pl-[14px] pt-2 md:pt-0 px-2 md:px-0">
                <div class="w-full h-full relative bg-transparent sm:bg-gradient-to-br from-gray-100 to-violet-100 rounded-2xl overflow-hidden">

                    <div class="w-full px-1 sm:px-5 py-2 sm:border-b border-neutral-900/10 inline-flex justify-between items-center">
                        <div class="flex justify-start items-center gap-2">


                            <div class="hidden sm:flex rounded-lg justify-start items-center">
                                <div class="h-7 pr-4 py-[5px] flex justify-center items-center gap-1">
                                    <div class="rounded-xl inline-flex flex-col justify-center items-start">
                                        <div class="text-center justify-center text-neutral-900/50 text-base font-medium font-['Plus_Jakarta_Sans'] leading-5">Dashboard</div>
                                    </div>
                                </div>
                                <div class="rounded-xl inline-flex flex-col justify-center items-start">
                                    <div class="self-stretch justify-start text-neutral-900/10 text-base font-normal font-['Plus_Jakarta_Sans'] leading-5">/</div>
                                </div>
                                <div class="h-7 px-3 py-[5px] rounded-2xl flex justify-center items-center gap-1">
                                    <div class="rounded-xl inline-flex flex-col justify-center items-start">
                                        <div class="self-stretch text-center justify-center text-neutral-900 text-base font-medium font-['Plus_Jakarta_Sans'] leading-5">
                                            {{ router.currentRoute.value.meta.breadcrumb || 'Home' }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <LogoDark class="flex sm:hidden h-10" />
                        </div>
                        <div class="flex justify-start items-center gap-2">
                            <!-- <Bell class="w-5 h-5" /> -->

                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <div
                                        class="flex justify-start items-center gap-2 transition duration-150 cursor-pointer rounded-lg px-2 py-1 hover:shadow border border-transparent hover:border-neutral-300"
                                        tabindex="0"
                                    >
                                        <!-- <img
                                            class="hidden sm:block w-8 h-8 rounded-full"
                                            src="https://placehold.co/32x32"
                                        /> -->
                                        <div class="flex justify-start items-center gap-1">
                                            <div class="flex flex-col justify-start items-start">
                                                <div class="justify-start text-neutral-900 text-md font-medium font-['Plus_Jakarta_Sans']">{{ user.firstName }} {{ user.lastName }}</div>
                                                <div
                                                    v-if="user.type !== 'Admin'"
                                                    class="hidden sm:block justify-start text-neutral-900 text-xs font-medium font-['Plus_Jakarta_Sans']"
                                                >{{ user.email }}</div>
                                                <div
                                                    v-if="user.type === 'Admin'"
                                                    class="justify-start text-xs text-muted-foreground bg-red-500 text-white px-2 py-1 rounded-md"
                                                >
                                                    Admin
                                                </div>
                                            </div>
                                            <ChevronDown class="w-5 h-5" />
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    class="w-56 mr-3"
                                    align="start"
                                >
                                    <DropdownMenuLabel>
                                        <span class="text-sm font-medium">{{ user.firstName }} {{ user.lastName }}</span><br>
                                        <span class="text-xs text-muted-foreground">{{ user.email }}</span>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup v-if="user.type !== 'Admin'">
                                        <DropdownMenuItem
                                            class="cursor-pointer"
                                            @click="router.push('/')"
                                        >
                                            Dashboard
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            class="cursor-pointer"
                                            @click="router.push('/settings')"
                                        >
                                            Settings
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem @click="theme = (theme === 'light' ? 'dark' : 'light')">
                                        <span v-if="theme === 'dark'">Light Mode</span>
                                        <span v-if="theme === 'light'">Dark Mode</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        class="cursor-pointer"
                                        @click="logout()"
                                    >
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <RouterView />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Bell, ChevronDown, ExternalLink } from 'lucide-vue-next';
import { useColorMode } from '@vueuse/core';
import { RouterView } from 'vue-router';
import Nav from '@/components/Nav.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'vue-router';
const router = useRouter();
const showStatusBar = ref(true);
const showActivityBar = ref(false);
const showPanel = ref(false);
const position = ref('bottom');

const user = computed(() => store.state.user);
const store = useStore();

const theme = useColorMode();

const isNavActive = computed({
    get: () => store.getters.isNavActive,
    set: (value: boolean) => store.commit('isNavActive', value),
});

const logout = () => {
    router.push('/logout');
};
</script>
