<template>
    <DropdownMenuContent class="w-56 mr-4">
        <DropdownMenuLabel>
            <span class="text-sm font-medium">{{ user.firstName }} {{ user.lastName }}</span><br>
            <span class="text-xs text-muted-foreground">{{ group.name }}</span><br>
            <span class="text-xs text-muted-foreground">{{ user.email }}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <DropdownMenuItem @click="router.push('/')">
                <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="router.push('/index')">
                <span>Index</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="router.push('/account')">
                <span>Account</span>
            </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup v-if="user.groups.length > 1">
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <span>Change Group</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem
                            v-for="g in user.groups"
                            :key="g.id"
                            @click="switchGroup(g.id)"
                        >
                            <Check
                                v-if="group.id === g.id"
                                class="w-4 h-4 inline-block"
                            />
                            <span
                                v-else
                                class="w-4 h-4 inline-block"
                            ></span>
                            {{ g.name }}
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuItem @click="theme = (theme === 'light' ? 'dark' : 'light')">
            <span v-if="theme === 'dark'">Light Mode</span>
            <span v-if="theme === 'light'">Dark Mode</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem @click="onClickLogout">
            <span>Log out</span>
            <DropdownMenuShortcut>⇧Q</DropdownMenuShortcut>
        </DropdownMenuItem>
    </DropdownMenuContent>
</template>

<script setup lang="ts">
import {
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
} from "@/components/ui/dropdown-menu";
import onAccessToken from '@/lib/OnAccessToken.ts';
import { Check } from 'lucide-vue-next';
import { onMounted, onBeforeUnmount } from 'vue';
import { useColorMode } from '@vueuse/core';
import { computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
const api = inject<any>('api');
const $cookies = inject<any>('$cookies');
const errorHandler = inject<any>('errorHandler');

const theme = useColorMode();
const user = computed(() => store.state.user);
const group = computed(() => store.state.group);

const onClickLogout = () => router.push('/logout');

onMounted(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.key === 'q' || e.key === 'Q') && e.shiftKey) onClickLogout();
    };
    window.addEventListener('keydown', handleKeyDown);
    onBeforeUnmount(() => window.removeEventListener('keydown', handleKeyDown));
});

const switchGroup = async (groupID: string) => {
    try {
        if (groupID === group.value.id) return;
        const { data } = await api.user.switchGroup(groupID);
        onAccessToken(data.accessToken, api, $cookies, store);
        window.location.reload(); // AB: Improve this
    } catch (error) {
        errorHandler(error);
    }
};
</script>