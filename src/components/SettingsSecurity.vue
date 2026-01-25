<template>
    <div>
        <h3 class="text-lg font-medium">
            Security
        </h3>
    </div>

    <Separator class="mt-4 mb-6" />

    <div class="space-y-8">
        <FormField name="mfa">
            <FormItem>
                <FormLabel>
                    MFA
                </FormLabel>
                <FormDescription>
                    Add a second factor to your account for additional account security.
                </FormDescription>

                <svg
                    v-if="isLoading"
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
                <div
                    v-else-if="!isLoading && !MFAEnabled"
                    class="relative flex items-center"
                >
                    <Dialog v-model:open="showEnableMFADialog">
                        <DialogTrigger as-child>
                            <Button>
                                Enable MFA
                            </Button>
                        </DialogTrigger>
                        <DialogContent class="sm:max-w-[425px]">
                            <DialogHeader v-if="view === 'disabled'">
                                <DialogTitle>Enter Password</DialogTitle>
                                <DialogDescription>
                                    Enter your password to enable MFA.
                                </DialogDescription>
                            </DialogHeader>

                            <DialogHeader v-if="view === 'enabled'">
                                <DialogTitle>Scan QR Code</DialogTitle>
                                <DialogDescription>
                                    Scan this QR code with your authenticator app and enter the code below to enable MFA.
                                </DialogDescription>
                            </DialogHeader>

                            <FormField
                                name="password"
                                v-if="view === 'disabled'"
                            >
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            v-model="password"
                                            type="password"
                                        />
                                    </FormControl>
                                </FormItem>
                            </FormField>


                            <div v-if="view === 'enabled'">

                                <div class="flex justify-center">
                                    <div class="p-4 bg-white rounded-md mb-4 inline-block">
                                        <QrcodeVue
                                            class="mx-auto"
                                            :value="qrCode"
                                            :size="250"
                                        />
                                    </div>
                                </div>

                                <FormField name="code">
                                    <FormItem>
                                        <FormLabel>Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                v-model="code"
                                                type="text"
                                                placeholder="000 000"
                                            />
                                        </FormControl>
                                    </FormItem>
                                </FormField>
                            </div>



                            <DialogFooter v-if="view === 'disabled'">
                                <DialogClose as-child>
                                    <Button variant="ghost">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    :disabled="isLoading"
                                    @click="enableMFA"
                                >
                                    Enable MFA
                                </Button>
                            </DialogFooter>

                            <DialogFooter v-if="view === 'enabled'">
                                <DialogClose as-child>
                                    <Button variant="ghost">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    :disabled="isLoading"
                                    @click="confirmMFA"
                                >
                                    Confirm MFA
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div
                    v-else
                    class="relative flex items-center"
                >
                    <Dialog v-model:open="showDisableMFADialog">
                        <DialogTrigger as-child>
                            <Button variant="destructive">
                                Disable MFA
                            </Button>
                        </DialogTrigger>
                        <DialogContent class="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Disable MFA</DialogTitle>
                                <DialogDescription>
                                    Enter your password to disable MFA.
                                </DialogDescription>
                            </DialogHeader>

                            <FormField name="password">
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            v-model="password"
                                            type="password"
                                        />
                                    </FormControl>
                                </FormItem>
                            </FormField>

                            <DialogFooter>
                                <DialogClose as-child>
                                    <Button variant="ghost">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    :disabled="isLoading"
                                    @click="disableMFA"
                                    variant="destructive"
                                >
                                    Disable MFA
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <FormMessage />
            </FormItem>
        </FormField>
    </div>
</template>

<script setup lang="ts">
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ref, onMounted, computed, inject } from 'vue';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";
import QrcodeVue from 'qrcode.vue';
import { useStore } from 'vuex';

const store = useStore();
const api = inject<any>('api');
const errorHandler = inject<any>('errorHandler');

const user = computed(() => store.state.user);

const isLoading = ref(true);
const view = ref('disabled');
const qrCode = ref('');
const password = ref('');
const code = ref('');
const errors = ref<any>({});
const showEnableMFADialog = ref(false);
const showDisableMFADialog = ref(false);
const MFAEnabled = ref(false);

onMounted(async () => {
    try {
        const { data } = await api.auth.requiresMFA(user.value.email);
        MFAEnabled.value = data.mfa;
    } catch (error) {
        errorHandler(error, (data: any, code: any) => {
            if (code === 401) view.value = 'disabled';
        });
    } finally {
        isLoading.value = false;
    }
});

const enableMFA = async () => {
    try {
        isLoading.value = true;
        const { data } = await api.auth.enableMFA({ password: password.value });
        view.value = 'enabled';
        qrCode.value = data.uri;
        password.value = '';
    } catch (error) {
        errorHandler(error, (data: any, code: any) => {
            if (code === 422) errors.value = data;
        });
    } finally {
        isLoading.value = false;
    }
};

const confirmMFA = async () => {
    try {
        isLoading.value = true;
        await api.auth.confirmMFA({ token: code.value });
        showEnableMFADialog.value = false;
        MFAEnabled.value = true;
    } catch (error) {
        errorHandler(error, (data: any, code: any) => {
            if (code === 422) errors.value = data;
        });
    } finally {
        isLoading.value = false;
    }
};

const disableMFA = async () => {
    try {
        isLoading.value = true;
        await api.auth.disableMFA({ password: password.value });
        showDisableMFADialog.value = false;
        MFAEnabled.value = false;
    } catch (error) {
        errorHandler(error, (data: any, code: any) => {
            if (code === 422) errors.value = data;
        });
    } finally {
        isLoading.value = false;
    }
};
</script>