<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="grid gap-y-4">
                <div class="flex flex-row items-center gap-2 w-full">
                    <div class="grid gap-2 w-full">
                        <Label for="firstName">
                            First Name
                        </Label>
                        <Input
                            :disabled="isLoading"
                            v-model="auth.firstName"
                            placeholder="First Name"
                            type="input"
                            auto-capitalize="none"
                            auto-complete="email"
                            auto-correct="off"
                        />
                        <p
                            v-if="errors.firstName"
                            class="text-red-500 text-sm"
                        >
                            {{ errors.firstName.msg }}
                        </p>
                    </div>
                    <div class="grid gap-2 w-full">
                        <Label for="lastName">
                            Last Name
                        </Label>
                        <Input
                            :disabled="isLoading"
                            v-model="auth.lastName"
                            placeholder="Last Name"
                            type="input"
                            auto-capitalize="none"
                            auto-complete="email"
                            auto-correct="off"
                        />
                        <p
                            v-if="errors.lastName"
                            class="text-red-500 text-sm"
                        >
                            {{ errors.lastName.msg }}
                        </p>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row items-center gap-2 w-full">
                    <div class="grid gap-2 w-full">
                        <Label for="email">
                            Phone Number
                        </Label>
                        <MaskedInput
                            :disabled="isLoading"
                            mask="###-###-####"
                            v-model="auth.phoneNumber"
                            placeholder="Phone Number"
                            type="input"
                            auto-capitalize="none"
                            auto-correct="off"
                        />
                        <p
                            v-if="errors.phoneNumber"
                            class="text-red-500 text-sm"
                        >
                            {{ errors.phoneNumber.msg }}
                        </p>
                    </div>
                    <div class="grid gap-2 w-full">
                        <Label for="email">
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
                        <p
                            v-if="errors.email"
                            class="text-red-500 text-sm"
                        >
                            {{ errors.email.msg }}
                        </p>
                    </div>
                </div>

                <div class="grid gap-2">
                    <Label for="email">
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
                    <p
                        v-if="errors.password"
                        class="text-red-500 text-sm"
                    >
                        {{ errors.password.msg }}
                    </p>
                    <PasswordStrengthIndicator :password="auth.password" />
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
                    <p
                        v-if="errors.htoken"
                        class="text-red-500 text-sm"
                    >
                        {{ errors.htoken.msg }}
                    </p>
                </div> -->

                <div class="flex items-center space-x-2 my-2">
                    <Checkbox v-model="auth.tos" />
                    <div>
                        <label
                            for="terms"
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I accept the <a
                                href="https://example.com/terms-of-service"
                                class="underline underline-offset-4 hover:text-primary"
                            >Terms of Service</a> and <a
                                href="https://example.com/privacy-policy"
                                class="underline underline-offset-4 hover:text-primary"
                            >Privacy Policy</a>
                        </label>
                        <p
                            v-if="errors.tos"
                            class="text-red-500 text-sm"
                        >
                            {{ errors.tos.msg }}
                        </p>
                    </div>
                </div>

                <Button
                    :class="'bg-[#0004E8] hover:bg-[#0507a8]'"
                    :loading="isLoading"
                    :disabled="!isValid || isLoading"
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
            variant="ghost"
            :disabled="isLoading"
            @click="router.push('/login')"
        >
            Login
        </Button>
    </div>
</template>

<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator.vue';
import onAccessToken from '@/lib/OnAccessToken';
import { ref, inject, computed, watch, onUnmounted } from 'vue';
// import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import { useColorMode } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import Joi from 'joi';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Input as MaskedInput } from '@/components/ui/masked-input';

const isDev = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const router = useRouter();
const api = inject<any>('api');
const $cookies = inject<any>('$cookies');
const errorHandler = inject<any>('errorHandler');
const store = inject<any>('store');

// const hCaptchaSiteKey = import.meta.env.VITE_H_CAPTCHA_SITE_KEY;
const theme = useColorMode();

watch(theme, (_: any) => {
    // if (auth.value.htoken.length === 0) key.value++;
});

let validationSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'any.empty': 'You must provide a first name',
        'any.required': 'You must provide a first name',
    }),
    lastName: Joi.string().required().messages({
        'any.empty': 'You must provide a last name',
        'any.required': 'You must provide a last name',
    }),
    phoneNumber: Joi.string().required().pattern(/^\d{3}-\d{3}-\d{4}$/).messages({
        'any.empty': 'You must provide a valid US phone number',
        'any.required': 'You must provide a valid US phone number',
        'string.pattern.base': 'You must provide a valid US phone number',
    }),
    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
        'any.empty': 'You must provide an email address',
        'any.required': 'You must provide an email address',
        'string.email': 'You must provide a valid email address',
    }),
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'any.empty': 'You must provide a password',
            'any.required': 'You must provide a password',
            'string.min': 'Your password must be at least 8 characters long',
        }),
    // htoken: Joi.string().messages({
    //     'string.empty': 'You must complete the captcha',
    // }),
    tos: Joi.boolean().valid(true).required().messages({
        'any.empty': 'You must accept the terms and conditions',
        'any.required': 'You must accept the terms and conditions',
        'any.only': 'You must accept the terms and conditions',
    }),
}).options({ abortEarly: false });

const isLoading = ref(false);
const errors = ref<any>({});
const key = ref(1);
const auth = ref({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    // htoken: '',
    tos: false,
});

const isValid = computed(() => {
    const { error } = validationSchema.validate(auth.value);
    if (error) return false;
    return true;
});

// AB Todo
const calculateProgress = () => {
    // Return progress based on the number of errors in validationSchema (more errors = lower progress)
    const { error } = validationSchema.validate(auth.value);
    const totalFields = Object.keys(auth.value).length;
    const errorCount = error ? error.details.length : 0;
    // Progress between 10 and 100
    const progress = Math.max(10, Math.round(((totalFields - errorCount) / totalFields) * 100)) * 0.8;
    store.commit('setSignUpProgress', progress);
};
const interval = setInterval(() => calculateProgress(), 500);
onUnmounted(() => clearInterval(interval));

if (isDev) {
    auth.value.firstName = 'Anthony';
    auth.value.lastName = 'Budd';
    auth.value.phoneNumber = `512-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
    auth.value.email = `anthonybudd94+${Math.floor(Math.random() * 1000000).toString().substring(0, 5)}@gmail.com`;
    auth.value.password = 'Pos@1234';
    auth.value.tos = true;

    validationSchema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        phoneNumber: Joi.string(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().min(8),
        htoken: Joi.optional(),
        tos: Joi.boolean().valid(true).required().messages({
            'any.only': 'You must accept the terms and conditions',
        }),
    }).options({ abortEarly: false });

    calculateProgress();
}

// const onVerifyHcaptcha = async (token: string) => {
//     auth.value.htoken = token;
//     if (errors.value.htoken) delete errors.value.htoken;
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

        const request: any = {
            firstName: auth.value.firstName,
            lastName: auth.value.lastName,
            phoneNumber: auth.value.phoneNumber,
            email: auth.value.email,
            password: auth.value.password,
        };

        // if (auth.value.htoken.length > 0) request.htoken = auth.value.htoken;
        if (auth.value.tos) request.tos = '2025-12-23';
        const { data } = await api.auth.signUp(request);
        onAccessToken(data.accessToken, api, $cookies, store);
        toast.success('Account created successfully');
        router.push('/');
    } catch (error) {
        key.value++;
        // auth.value.htoken = '';

        errorHandler(error, (data: any, code: any) => {
            if (code === 422) errors.value = data;
        });
    } finally {
        isLoading.value = false;
    }
}
</script>
