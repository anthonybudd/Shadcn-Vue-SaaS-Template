<template>
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold">Dashboard</h1>
                <p class="text-muted-foreground mt-1">Welcome back! Here's what's happening with your business.</p>
            </div>
            <div class="flex items-center gap-2">
                <Badge
                    variant="outline"
                    class="text-sm"
                >Last 30 days</Badge>
            </div>
        </div>

        <!-- Key Metrics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Total Revenue -->
            <Card>
                <CardHeader class="flex flex-row items-center justify-between pb-2">
                    <CardTitle class="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                    <svg
                        class="h-4 w-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">${{ formatCurrency(totalRevenue) }}</div>
                    <p class="text-xs text-muted-foreground mt-1">
                        <span :class="revenueChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                            {{ revenueChange >= 0 ? '+' : '' }}{{ revenueChange }}%
                        </span>
                        from last month
                    </p>
                </CardContent>
            </Card>

            <!-- Active Users -->
            <Card>
                <CardHeader class="flex flex-row items-center justify-between pb-2">
                    <CardTitle class="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                    <svg
                        class="h-4 w-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ formatNumber(activeUsers) }}</div>
                    <p class="text-xs text-muted-foreground mt-1">
                        <span :class="usersChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                            {{ usersChange >= 0 ? '+' : '' }}{{ usersChange }}%
                        </span>
                        from last month
                    </p>
                </CardContent>
            </Card>

            <!-- Total Orders -->
            <Card>
                <CardHeader class="flex flex-row items-center justify-between pb-2">
                    <CardTitle class="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                    <svg
                        class="h-4 w-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ formatNumber(totalOrders) }}</div>
                    <p class="text-xs text-muted-foreground mt-1">
                        <span :class="ordersChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                            {{ ordersChange >= 0 ? '+' : '' }}{{ ordersChange }}%
                        </span>
                        from last month
                    </p>
                </CardContent>
            </Card>

            <!-- Conversion Rate -->
            <Card>
                <CardHeader class="flex flex-row items-center justify-between pb-2">
                    <CardTitle class="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                    <svg
                        class="h-4 w-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ conversionRate }}%</div>
                    <p class="text-xs text-muted-foreground mt-1">
                        <span :class="conversionChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                            {{ conversionChange >= 0 ? '+' : '' }}{{ conversionChange }}%
                        </span>
                        from last month
                    </p>
                </CardContent>
            </Card>
        </div>

        <!-- Revenue Chart -->
        <Card>
            <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue trends over the past 12 months</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-2xl font-bold">${{formatCurrency(revenueData.monthly.reduce((a, b) => a + b, 0))}}</div>
                            <p class="text-sm text-muted-foreground">Total revenue this year</p>
                        </div>
                    </div>
                    <div class="h-[300px] w-full">
                        <div class="h-full flex items-end justify-between gap-1">
                            <div
                                v-for="(value, index) in revenueData.monthly"
                                :key="index"
                                class="flex-1 flex flex-col items-center group"
                            >
                                <div
                                    class="w-full bg-primary rounded-t transition-all hover:opacity-80 relative"
                                    :style="{ height: `${(value / maxRevenue) * 100}%` }"
                                >
                                    <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded whitespace-nowrap">
                                        ${{ formatCurrency(value) }}
                                    </div>
                                </div>
                                <span class="text-xs text-muted-foreground mt-2">{{ revenueData.monthLabels[index] }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Charts and Tables Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Top Products -->
            <Card>
                <CardHeader>
                    <CardTitle>Top Products</CardTitle>
                    <CardDescription>Best performing products this month</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="space-y-4">
                        <div
                            v-for="(product, index) in topProducts"
                            :key="product.id"
                            class="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                        >
                            <div class="flex items-center gap-3">
                                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold">
                                    {{ index + 1 }}
                                </div>
                                <div>
                                    <div class="font-medium">{{ product.name }}</div>
                                    <div class="text-sm text-muted-foreground">{{ product.category }}</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="font-semibold">${{ formatCurrency(product.revenue) }}</div>
                                <div class="text-xs text-muted-foreground">{{ product.sales }} sales</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Recent Activity -->
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest transactions and events</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="space-y-4">
                        <div
                            v-for="activity in recentActivity"
                            :key="activity.id"
                            class="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                        >
                            <div
                                class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                                :class="activity.type === 'order' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                                    activity.type === 'user' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                                        'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'"
                            >
                                <svg
                                    v-if="activity.type === 'order'"
                                    class="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                                <svg
                                    v-else-if="activity.type === 'user'"
                                    class="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                <svg
                                    v-else
                                    class="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="font-medium text-sm">{{ activity.title }}</div>
                                <div class="text-xs text-muted-foreground mt-0.5">{{ activity.description }}</div>
                                <div class="text-xs text-muted-foreground mt-1">{{ formatTimeAgo(activity.timestamp) }}</div>
                            </div>
                            <Badge
                                v-if="activity.amount"
                                variant="outline"
                                class="text-xs"
                            >
                                ${{ formatCurrency(activity.amount) }}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Performance Metrics Table -->
        <Card>
            <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Detailed breakdown of key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Metric</TableHead>
                                <TableHead>Current</TableHead>
                                <TableHead>Previous</TableHead>
                                <TableHead>Change</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="metric in performanceMetrics"
                                :key="metric.id"
                            >
                                <TableCell class="font-medium">{{ metric.name }}</TableCell>
                                <TableCell>{{ metric.current }}</TableCell>
                                <TableCell>{{ metric.previous }}</TableCell>
                                <TableCell>
                                    <span :class="metric.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                                        {{ metric.change >= 0 ? '+' : '' }}{{ metric.change }}{{ metric.unit }}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Badge :variant="metric.change >= 0 ? 'default' : 'destructive'">
                                        {{ metric.change >= 0 ? 'Positive' : 'Negative' }}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const revenueData = ref({
    monthly: [2450, 3200, 3010, 4090, 3895, 4586, 3840, 3999, 3675, 4099, 4250, 4625],
    monthLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
});

// Key Metrics
const totalRevenue = ref(46250);
const revenueChange = ref(12.5);
const activeUsers = ref(12450);
const usersChange = ref(8.3);
const totalOrders = ref(3420);
const ordersChange = ref(15.2);
const conversionRate = ref(3.24);
const conversionChange = ref(0.8);

// Top Products
const topProducts = ref([
    { id: 1, name: 'Premium Subscription', category: 'Subscription', revenue: 12500, sales: 342 },
    { id: 2, name: 'Enterprise Plan', category: 'Subscription', revenue: 9800, sales: 156 },
    { id: 3, name: 'API Access', category: 'Service', revenue: 7200, sales: 480 },
    { id: 4, name: 'Custom Integration', category: 'Service', revenue: 5600, sales: 89 },
    { id: 5, name: 'Training Package', category: 'Education', revenue: 3200, sales: 128 }
]);

// Recent Activity
const recentActivity = ref([
    { id: 1, type: 'order', title: 'New Order', description: 'Premium Subscription purchased', amount: 99, timestamp: new Date(Date.now() - 5 * 60000) },
    { id: 2, type: 'user', title: 'New User', description: 'John Doe signed up', amount: null, timestamp: new Date(Date.now() - 15 * 60000) },
    { id: 3, type: 'order', title: 'New Order', description: 'Enterprise Plan purchased', amount: 299, timestamp: new Date(Date.now() - 32 * 60000) },
    { id: 4, type: 'payment', title: 'Payment Received', description: 'Invoice #1234 paid', amount: 1250, timestamp: new Date(Date.now() - 45 * 60000) },
    { id: 5, type: 'order', title: 'New Order', description: 'API Access purchased', amount: 49, timestamp: new Date(Date.now() - 60 * 60000) }
]);

// Performance Metrics
const performanceMetrics = ref([
    { id: 1, name: 'Average Order Value', current: '$135.20', previous: '$128.50', change: 5.2, unit: '%', status: 'positive' },
    { id: 2, name: 'Customer Lifetime Value', current: '$2,450', previous: '$2,320', change: 5.6, unit: '%', status: 'positive' },
    { id: 3, name: 'Churn Rate', current: '2.3%', previous: '2.8%', change: -17.9, unit: '%', status: 'positive' },
    { id: 4, name: 'Monthly Recurring Revenue', current: '$38,500', previous: '$36,200', change: 6.4, unit: '%', status: 'positive' },
    { id: 5, name: 'Customer Acquisition Cost', current: '$45', previous: '$48', change: -6.3, unit: '%', status: 'positive' }
]);

// Computed
const maxRevenue = computed(() => Math.max(...revenueData.value.monthly));

// Helper Functions
const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
};

const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
};
</script>