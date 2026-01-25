<template>
    <div>
        <form
            v-if="!isSubmitted"
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
                        v-model="auth.email"
                        placeholder="Email"
                        type="input"
                        auto-capitalize="none"
                        auto-complete="email"
                        auto-correct="off"
                    />
                    <ValidationError :error="errors.email" />
                </div>

                <!-- <vue-hcaptcha
                    :key="key"
                    @verify="onVerifyHcaptcha"
                    @expired="onExpiredHcaptcha"
                    @error="onErrorHcaptcha"
                    :sitekey="hCaptchaSiteKey"
                ></vue-hcaptcha>
                <ValidationError :error="errors.htoken" /> -->

                <Button
                    :loading="isLoading"
                    :disabled="!isValid || isLoading"
                >
                    Reset Password
                </Button>
            </div>

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
                variant="outline"
                class="w-full"
                @click="router.push('/login')"
            >
                Login
            </Button>
        </form>

        <div v-else>
            <p class="text-center">
                If an account exists with this email, you will receive an email with a link to reset your password.
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
// import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import { ref, inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import Joi from 'joi';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import ValidationError from '@/components/ValidationError.vue';

const router = useRouter();
const api = inject('api') as any;
const errorHandler = inject('errorHandler') as any;

// const hCaptchaSiteKey = import.meta.env.VITE_H_CAPTCHA_SITE_KEY;

let validationSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    // htoken: Joi.string().messages({
    //     'string.empty': 'You must complete the captcha',
    // }),
}).options({ abortEarly: false });

// Dev
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    validationSchema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }),
        htoken: Joi.optional(),
    }).options({ abortEarly: false });
}

const isLoading = ref(false);
const isSubmitted = ref(false);
const errors = ref({});
const key = ref(1);
const auth = ref({
    email: '',
    htoken: '',
});

const isValid = computed(() => {
    const { error } = validationSchema.validate(auth.value);
    if (error) return false;
    return true;
});

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
            email: auth.value.email,
        };
        // if (auth.value.htoken.length > 0) request.htoken = auth.value.htoken;
        await api.auth.forgotPassword(request);

        isSubmitted.value = true;

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
