<template>
    <div>
        <form
            v-if="!isError"
            @submit.prevent="onSubmit"
        >
            <div class="grid gap-2">
                <div class="grid gap-1">
                    <Label
                        class="sr-only"
                        for="email"
                    >
                        Email
                    </Label>
                    <Input
                        :disabled="true"
                        v-model="auth.email"
                        placeholder="name@example.com"
                        type="input"
                        auto-capitalize="none"
                        auto-complete="email"
                        auto-correct="off"
                    />
                    <ValidationError :error="errors.email" />

                    <Label
                        class="sr-only"
                        for="password"
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
                    <PasswordStrengthIndicator :password="auth.password" />
                    <ValidationError :error="errors.password" />
                </div>

                <vue-hcaptcha
                    :key="key"
                    @verify="onVerifyHcaptcha"
                    @expired="onExpiredHcaptcha"
                    @error="onErrorHcaptcha"
                    :sitekey="hCaptchaSiteKey"
                ></vue-hcaptcha>
                <ValidationError :error="errors.htoken" />

                <Button
                    :loading="isLoading"
                    :disabled="!isValid || isLoading"
                >
                    Reset Password
                </Button>
            </div>
        </form>

        <div v-else>
            <p class="text-center">
                This link is invalid or has expired.
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import onAccessToken from '@/lib/OnAccessToken';
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import { ref, inject, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Joi from 'joi';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import ValidationError from '@/components/ValidationError.vue';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator.vue';

const router = useRouter();
const api = inject('api') as any;
const $cookies = inject('$cookies') as any;
const store = inject('store') as any;
const errorHandler = inject('errorHandler') as any;

const hCaptchaSiteKey = import.meta.env.VITE_H_CAPTCHA_SITE_KEY;

let validationSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().min(8),
    htoken: Joi.string().messages({
        'string.empty': 'You must complete the captcha',
    }),
}).options({ abortEarly: false });

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    validationSchema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().min(8),
        htoken: Joi.optional(),
    }).options({ abortEarly: false });
}

const isLoading = ref(false);
const isError = ref(false);
const errors = ref({});
const key = ref(1);
const auth = ref({
    email: '',
    password: '',
    htoken: '',
});

const isValid = computed(() => {
    const { error } = validationSchema.validate(auth.value);
    if (error) return false;
    return true;
});

onMounted(async () => {
    try {
        const { data } = await api.auth.getUserByResetKey(router.currentRoute.value.params.passwordResetKey as string);
        auth.value.email = data.email;
    } catch (error) {
        errorHandler(error, (data: any, code: any) => {
            isError.value = true;
        });
    }
});

const onVerifyHcaptcha = async (token: string) => {
    auth.value.htoken = token;
    if (errors.value.htoken) delete errors.value.htoken;
};
const onExpiredHcaptcha = async () => auth.value.htoken = '';
const onErrorHcaptcha = async () => auth.value.htoken = '';

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

        const request: any = {
            email: auth.value.email,
            password: auth.value.password,
            passwordResetKey: router.currentRoute.value.params.passwordResetKey as string,
        };
        if (auth.value.htoken.length > 0) request.htoken = auth.value.htoken;
        const { data } = await api.auth.resetPassword(request);
        onAccessToken(data.accessToken, api, $cookies, store);
        router.push('/');
    } catch (error) {
        key.value++;
        auth.value.htoken = '';

        errorHandler(error, (data: any, code: any) => {
            if (code === 422) errors.value = data;
        });
    } finally {
        isLoading.value = false;
    }
}
</script>
