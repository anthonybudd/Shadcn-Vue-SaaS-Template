<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="grid gap-2">
                <div
                    v-if="isError"
                    class="text-xs text-red-600"
                >
                    Invalid email or password
                </div>

                <div class="grid gap-2">
                    <Label
                        class="sr-only"
                        for="email"
                    >
                        Email
                    </Label>
                    <Input
                        :disabled="isLoading"
                        v-model="auth.email"
                        placeholder="Email"
                        type="input"
                        auto-capitalize="none"
                        auto-complete="email"
                        auto-correct="off"
                    />

                    <Label
                        class="sr-only"
                        for="email"
                    >
                        Password
                    </Label>
                    <Input
                        :disabled="isLoading"
                        v-model="auth.password"
                        placeholder="Password"
                        type="password"
                        auto-capitalize="none"
                        auto-correct="off"
                    />
                </div>

                <!-- <div class="flex flex-col items-center">
                    <vue-hcaptcha
                        :key="key"
                        :theme="theme"
                        @verify="onVerifyHcaptcha"
                        @expired="onExpiredHcaptcha"
                        @error="onErrorHcaptcha"
                        :sitekey="hCaptchaSiteKey"
                    ></vue-hcaptcha>
                </div> -->

                <div
                    class="transition-all duration-300 overflow-hidden"
                    :class="{
                        'max-h-0 opacity-0': !requiresMFA,
                        'max-h-40 opacity-100': requiresMFA
                    }"
                >
                    <Label for="token">
                        MFA Token
                    </Label>
                    <Input
                        :disabled="isLoading"
                        v-model="auth.token"
                        placeholder="000 000"
                        type="text"
                        auto-capitalize="none"
                        auto-correct="off"
                    />
                </div>

                <Button
                    :loading="isLoading"
                    :disabled="isLoading"
                >
                    Continue
                </Button>
            </div>
        </form>

        <div class="relative">
            <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 my-2 text-muted-foreground">
                    Or
                </span>
            </div>
        </div>

        <Button
            class="w-full"
            @click="onClickSignUp"
            :disabled="isLoading"
        >
            Create Account
        </Button>
    </div>
</template>

<script setup lang="ts">
// import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import onAccessToken from '@/lib/OnAccessToken';
import { useColorMode } from '@vueuse/core';
import { ref, inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import Joi from 'joi';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const isDev = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const router = useRouter();
const api = inject('api') as any;
const $cookies = inject('$cookies') as any;
const store = inject('store') as any;
const errorHandler = inject('errorHandler') as any;

// const hCaptchaSiteKey = import.meta.env.VITE_H_CAPTCHA_SITE_KEY;

let validationSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().min(8),
    token: Joi.optional(),
    // htoken: Joi.string().messages({
    //     'string.empty': 'You must complete the captcha',
    // }),
}).options({ abortEarly: false });

const isLoading = ref(false);
const isError = ref(false);
const requiresMFA = ref(false);
const errors = ref<any>({});
const theme = useColorMode();
const key = ref(1);
const auth = ref({
    email: '',
    password: '',
    token: '',
    // htoken: '',
});

// const isValid = computed(() => {
//     const { error } = validationSchema.validate(auth.value);
//     if (error) return false;
//     return true;
// });

if (isDev) {
    auth.value.email = 'user@example.com';
    auth.value.password = 'Password@1234';

    validationSchema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().min(8),
        token: Joi.optional(),
        htoken: Joi.optional(),
    }).options({ abortEarly: false });
}

const onClickSignUp = () => router.push('/sign-up');

// const onVerifyHcaptcha = async (token: string) => {
//     auth.value.htoken = token;
//     if (errors.value.htoken) delete errors.value.htoken;

//     // Nicer UX
//     const { data: mfa } = await api.auth.requiresMFA(auth.value.email);
//     requiresMFA.value = mfa.mfa;
// };
// const onExpiredHcaptcha = async () => auth.value.htoken = '';
// const onErrorHcaptcha = async () => auth.value.htoken = '';

async function onSubmit() {
    try {
        isLoading.value = true;

        const { error } = validationSchema.validate(auth.value);
        if (error) return errors.value = error.details.reduce((acc: any, curr: any) => {
            acc[curr.path[0]] = {
                msg: curr.message.replaceAll('"', ''),
            };
            return acc;
        }, {});


        if (auth.value.token.length === 0) {
            const { data: mfa } = await api.auth.requiresMFA(auth.value.email);
            if (mfa.mfa) {
                requiresMFA.value = true;
                return;
            }
        }

        const request: any = {
            email: auth.value.email,
            password: auth.value.password,
        };
        if (auth.value.token.length === 6) request.token = auth.value.token;
        // if (auth.value.htoken.length > 0) request.htoken = auth.value.htoken;
        const { data } = await api.auth.login(request);
        await onAccessToken(data.accessToken, api, $cookies, store);
        const user = store.state.user;

        if (user.type === 'Admin') return router.push('/admin');
        if (user.status === 'Declined') return router.push('/declined');
        if (user.status === 'Blocked') return router.push('/blocked');
        if (user.status === 'Approved' && user.advanceID === null) return router.push('/advance');
        return router.push('/');
    } catch (error) {
        key.value++;
        // auth.value.htoken = '';
        auth.value.token = ''; // MFA

        errorHandler(error, (data: any, code: any) => {
            if (code === 422) errors.value = data;
            if (code === 401) isError.value = true;
        });

        isLoading.value = false;
    }
}
</script>
