<template>
    <div class="container max-w-4xl mx-auto px-6 pt-6 space-y-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
                <h1 class="text-2xl font-semibold">
                    Model Details
                </h1>
                <p class="text-muted-foreground">
                    Mock single model view page.
                </p>
            </div>
        </div>

        <div class="border rounded-lg p-4 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p class="text-xs uppercase tracking-wide text-muted-foreground">
                        ID
                    </p>
                    <p class="font-medium">
                        {{ model.id }}
                    </p>
                </div>

                <div>
                    <p class="text-xs uppercase tracking-wide text-muted-foreground">
                        Name
                    </p>
                    <p class="font-medium">
                        {{ model.name }}
                    </p>
                </div>

                <div>
                    <p class="text-xs uppercase tracking-wide text-muted-foreground">
                        Type
                    </p>
                    <p class="font-medium">
                        {{ model.type }}
                    </p>
                </div>

                <div>
                    <p class="text-xs uppercase tracking-wide text-muted-foreground">
                        Created At
                    </p>
                    <p class="font-medium">
                        {{ model.createdAt }}
                    </p>
                </div>

                <div>
                    <p class="text-xs uppercase tracking-wide text-muted-foreground">
                        Owner
                    </p>
                    <p class="font-medium">
                        {{ model.owner }}
                    </p>
                </div>

                <div>
                    <p class="text-xs uppercase tracking-wide text-muted-foreground">
                        Value
                    </p>
                    <p class="font-medium">
                        ${{ model.value.toLocaleString() }}
                    </p>
                </div>
            </div>

            <div>
                <p class="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    Description
                </p>
                <p class="text-sm leading-6 text-muted-foreground">
                    {{ model.description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const model = {
    id: 'MOD-1001',
    name: 'Starter Analytics Model',
    type: 'Forecast',
    status: 'Active',
    owner: 'Product Team',
    createdAt: '2026-04-20',
    value: 12500,
    description: 'This is a placeholder model used to demonstrate a simple single-model detail page with basic metadata and status information.',
};
</script>
