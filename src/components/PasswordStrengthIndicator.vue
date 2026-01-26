<template>
    <div
        class="text-sm ml-1 transition-all duration-500 overflow-hidden"
        :class="{
            'max-h-0 opacity-0': !show,
            'max-h-40 opacity-100': show
        }"
    >
        <div class="flex items-center space-x-1">
            <Check
                v-if="containsMoreThan8Characters"
                class="text-green-500"
                :size="20"
            />
            <X
                v-else
                class="text-red-500"
                :size="20"
            />
            <span class="ml-1">
                At least 8 characters
            </span>
        </div>

        <div class="flex items-center space-x-1">
            <Check
                v-if="containsUppercaseAndLowercaseLetter"
                class="text-green-500"
                :size="20"
            />
            <X
                v-else
                class="text-red-500"
                :size="20"
            />
            <span class="ml-1">
                Must contain an uppercase and lowercase letter
            </span>
        </div>

        <div class="flex items-center space-x-1">
            <Check
                v-if="containsNumber"
                class="text-green-500"
                :size="20"
            />
            <X
                v-else
                class="text-red-500"
                :size="20"
            />
            <span class="ml-1">
                Must contain a number
            </span>
        </div>

        <div class="flex items-center space-x-1">
            <Check
                v-if="containsSpecialCharacter"
                class="text-green-500"
                :size="20"
            />
            <X
                v-else
                class="text-red-500"
                :size="20"
            />
            <span class="ml-1">
                Must contain a special character (&%$#@!*)
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Check, X } from 'lucide-vue-next';

const props = defineProps({
    password: {
        type: String,
        required: true,
    },
});

const show = computed(() => {
    return props.password.length > 0;
});

const containsMoreThan8Characters = computed(() => {
    return props.password.length >= 8;
});

const containsUppercaseAndLowercaseLetter = computed(() => {
    return /[A-Z]/.test(props.password) && /[a-z]/.test(props.password);
});

const containsNumber = computed(() => {
    return /[0-9]/.test(props.password);
});

const containsSpecialCharacter = computed(() => {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(props.password);
});
</script>