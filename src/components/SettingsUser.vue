<template>
    <div>
        <h3 class="text-lg font-medium">
            User
        </h3>
        <!-- <p class="text-sm text-muted-foreground">
            Update your user settings. Set your preferred language and timezone.
        </p> -->
    </div>

    <Separator class="mt-4 mb-6" />

    <div class="space-y-8">

        <div class="flex flex-col md:flex-row gap-2">
            <FormField
                name="firstName"
                class="min-w-[250px]"
            >
                <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                        <Input
                            v-model="user.firstName"
                            type="text"
                            placeholder="Your name"
                        />
                    </FormControl>
                    <FormDescription class="hidden md:block">
                        Your full name. This is not public.
                    </FormDescription>
                </FormItem>
            </FormField>

            <FormField
                name="lastName"
                class="min-w-[250px]"
            >
                <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                        <Input
                            v-model="user.lastName"
                            type="text"
                            placeholder="Your name"
                        />
                    </FormControl>

                    <FormDescription>
                        <span class="hidden  md:block">&nbsp;</span>
                        <span class="block md:hidden">Your full name. This is not public.</span>
                    </FormDescription>
                </FormItem>
            </FormField>
        </div>



        <FormField name="name">
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input
                        v-model="user.email"
                        disabled
                        type="text"
                        placeholder="Your name"
                    />
                </FormControl>
                <FormDescription>
                    The is the email address you use to login to your account. This is not public.
                </FormDescription>
            </FormItem>
        </FormField>

        <FormField name="name">
            <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                    <Input
                        v-model="user.id"
                        disabled
                        type="text"
                        placeholder="Your name"
                    />
                </FormControl>
                <FormDescription>
                    This is your unique user ID.
                </FormDescription>
            </FormItem>
        </FormField>

        <div class="flex justify-start">
            <Button
                :loading="isLoading"
                variant="secondary"
                @click="updateAccount"
            >
                Update Account
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";


import { ref, onMounted, inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
const api = inject<any>('api');

const user = computed(() => store.state.user);

const isLoading = ref(false);

const updateAccount = async () => {
    try {
        isLoading.value = true;
        await api.user.update({
            firstName: user.value.firstName,
            lastName: user.value.lastName,
        });
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};
</script>