<template>
    <div class="container max-w-7xl mx-auto px-6 pt-6">
        <div class="flex flex-row items-center justify-between gap-2 mb-2">
            <h1 class="text-2xl font-semibold">
                Index
            </h1>
        </div>
        <p class="text-muted-foreground mb-1">
            A generic index page.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
            <div class="col-span-2 md:col-span-1">
                <Input
                    v-model="search"
                    placeholder="Search..."
                    class="w-full"
                />
            </div>

            <div class="col-span-2 flex flex-row gap-x-2">
                <div>
                    <!-- <TransactionStatusFilter @onChange="onChangeStatus" /> -->
                </div>
                <div class="flex felx-row items-center space-x-2 mt-[-4px]">
                    <Switch
                        id="isTestMode"
                        v-model="isTestMode"
                    />
                    <Label for="isTestMode">Test Mode</Label>
                </div>
            </div>
        </div>


        <div class="rounded-md border bg-white dark:bg-transparent">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[120px]">
                            Created
                        </TableHead>
                        <TableHead>
                            Status
                        </TableHead>
                        <TableHead>
                            Value
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow
                        v-for="item in filteredItems"
                        :key="item.id"
                        class="cursor-pointer"
                        @click="onClickRow(item)"
                    >
                        <TableCell>
                            {{ $formatDate(item.createdAt) }}
                        </TableCell>
                        <TableCell>

                        </TableCell>
                        <TableCell>

                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <div
                v-if="isLoading"
                class="flex justify-center items-center py-12"
            >
                <svg
                    class="animate-spin h-8 w-8 text-gray-400 dark:text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
                    ></path>
                </svg>
            </div>

            <div
                v-else-if="!isLoading && filteredItems.length === 0"
                class="p-8 text-center text-muted-foreground"
            >
                No items found.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
// import TransactionStatusFilter from '@/components/TransactionStatusFilter.vue';
import { inject, onMounted, ref, watch, computed } from 'vue';
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const errorHandler = inject<any>('errorHandler');
const api = inject<any>('api');
const router = useRouter();
const store = useStore();

const items = ref<any[]>([]);
const isLoading = ref(false);

const search = ref('');
const filteredItems = computed(() => (
    items.value.filter((item) => JSON.stringify(item).toLowerCase().includes(search.value.toLowerCase()))
));

onMounted(async () => getData());

const getData = async () => {
    try {
        isLoading.value = true;
        // if (isTestMode.value) {
        //     const { data } = await api.testTransactions.index();
        //     transactions.value = data;
        // } else {
        //     const { data } = await api.transactions.index();
        //     transactions.value = data;
        // }
    } catch (error) {
        errorHandler(error);
    } finally {
        isLoading.value = false;
    }
};

const onChangeStatus = (s: any[]) => {
    statuses.value = s;
};

const onClickRow = (item: any) => {
    router.push(`/items/${item.id}`);
};
</script>
