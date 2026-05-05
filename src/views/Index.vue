<template>
    <div class="container max-w-7xl mx-auto px-6 pt-6">
        <div class="flex flex-row items-center justify-between gap-2 mb-2">
            <h1 class="text-2xl font-semibold">
                Index
            </h1>
        </div>
        <p class="text-muted-foreground mb-1">
            A generic index page for listing items.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
            <div class="col-span-2 md:col-span-1">
                <Input
                    v-model="search"
                    placeholder="Search..."
                    class="w-full"
                />
            </div>
        </div>


        <div class="rounded-md border bg-white dark:bg-transparent">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[120px]">
                            Created
                        </TableHead>
                        <TableHead class="w-[120px]">
                            Status
                        </TableHead>
                        <TableHead>
                            Name
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
                            <Badge variant="secondary">
                                {{ item.status }}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {{ item.name }}
                        </TableCell>
                        <TableCell>
                            {{ item.value }}
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
import { inject, onMounted, ref, computed } from 'vue';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter } from 'vue-router';

const errorHandler = inject<any>('errorHandler');
const api = inject<any>('api');
const router = useRouter();

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

        // Add your API methods to src/api/ModelName.ts
        // const { data } = await api.ModelName.index();
        // items.value = data;

        items.value = [
            {
                id: 1,
                createdAt: '2021-01-01',
                status: 'Active',
                name: 'Item 1',
                value: 100,
            },
            {
                id: 2,
                createdAt: '2021-01-02',
                status: 'Inactive',
                name: 'Item 2',
                value: 200,
            },
            {
                id: 3,
                createdAt: '2021-01-03',
                status: 'Pending',
                name: 'Item 3',
                value: 300,
            },
            {
                id: 4,
                createdAt: '2021-01-04',
                status: 'Completed',
                name: 'Item 4',
                value: 400,
            },
            {
                id: 5,
                createdAt: '2021-01-05',
                status: 'Cancelled',
                name: 'Item 5',
                value: 500,
            },
        ];
    } catch (error) {
        errorHandler(error);
    } finally {
        isLoading.value = false;
    }
};

const onClickRow = (item: any) => router.push(`/items/${item.id}`);
</script>
