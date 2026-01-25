<template>
    <div>
        <h3 class="text-lg font-medium">
            Profile
        </h3>
    </div>

    <Separator class="mt-4 mb-6" />

    <div class="space-y-8">
        <div class="flex flex-col">
            <p class="text-sm text-muted-foreground mb-2">
                Profile Preview
            </p>

            <div class="rounded-lg border p-4">
                <div
                    v-if="!!previewHeaderImageURL"
                    class="relative w-full aspect-[3/1]"
                >
                    <img
                        v-if="!isLoadingHeaderImage"
                        :src="previewHeaderImageURL"
                        alt="Profile Header Image"
                        class="w-full h-full object-cover rounded-lg"
                    />
                    <div
                        v-else
                        class="absolute inset-0 flex items-center justify-center rounded-lg"
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
                </div>
                <div
                    class="relative pl-4"
                    :class="{
                        'mt-[-70px]': !!previewHeaderImageURL
                    }"
                >
                    <div class="w-25 h-25 rounded-full border-2 bg-black border-[#0099FF] overflow-hidden">
                        <img
                            :src="previewImageURL"
                            alt="Profile Image"
                        />
                    </div>
                    <div class="flex flex-col">
                        <p class="text-lg font-medium">{{ group.name }}</p>
                        <p class="text-sm text-muted-foreground">@{{ group.username }}</p>
                        <p class="text-sm text-muted-foreground">{{ group.transactions }} Payments</p>
                    </div>
                </div>
            </div>
        </div>

        <FormField name="profileImage">
            <FormItem>
                <FormLabel>
                    Profile Image
                </FormLabel>
                <FormDescription>
                    Upload a profile image for your profile.
                </FormDescription>
                <div class="relative flex items-center">
                    <FormControl>
                        <Dialog v-model:open="profileImageDialogOpen">
                            <DialogContent class="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        Change Profile Image
                                    </DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    <div
                                        class="text-sm my-2 ml-1 transition-all duration-500 overflow-hidden flex justify-center"
                                        :class="{
                                            'max-h-0 opacity-0': !profileImageURL,
                                            'max-h-60 opacity-100': profileImageURL
                                        }"
                                    >
                                        <ImageCropper
                                            v-if="profileImageURL"
                                            :src="profileImageURL"
                                            ref="imageCropper"
                                        />
                                    </div>
                                </DialogDescription>
                                <DialogFooter>
                                    <DialogClose as-child>
                                        <Button
                                            :disabled="isLoading || isLoadingProfileImage"
                                            variant="ghost"
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        :variant="!profileImageURL ? 'default' : 'secondary'"
                                        :disabled="isLoading || isLoadingProfileImage"
                                        @click="openImage.click()"
                                    >
                                        {{ !profileImageURL ? 'Select Image' : 'Change Image' }}
                                    </Button>
                                    <Button
                                        v-if="profileImageURL"
                                        :disabled="isLoading || isLoadingProfileImage"
                                        :loading="isLoadingProfileImage"
                                        @click="uploadProfileImage"
                                    >
                                        Set Profile Image
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Button
                            variant="secondary"
                            @click="openProfileImageDialog"
                        >
                            Change Profile Image
                        </Button>
                        <input
                            type="file"
                            accept="image/jpeg, image/png, image/jpg, image/webp"
                            ref="openImage"
                            class="hidden"
                            @change="onSelectProfileImage($event?.target?.files)"
                        />
                    </FormControl>
                </div>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField name="headerImage">
            <FormItem>
                <FormLabel>
                    Header Image
                </FormLabel>
                <FormDescription>
                    Upload a header image.
                </FormDescription>
                <div class="relative flex items-center">
                    <FormControl>
                        <Dialog v-model:open="headerImageDialogOpen">
                            <DialogContent class="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        Change Header Image
                                    </DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    <div
                                        class="text-sm my-2 ml-1 transition-all duration-500 overflow-hidden flex justify-center"
                                        :class="{
                                            'max-h-0 opacity-0': !headerImageURL,
                                            'max-h-60 opacity-100': headerImageURL
                                        }"
                                    >
                                        <img
                                            :src="headerImageURL"
                                            alt="Header Image"
                                            class="w-full aspect-[3/1] object-cover rounded-lg"
                                        />
                                    </div>
                                </DialogDescription>
                                <DialogFooter>
                                    <DialogClose as-child>
                                        <Button
                                            :disabled="isLoading || isLoadingHeaderImage"
                                            variant="ghost"
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        :variant="!headerImageURL ? 'default' : 'secondary'"
                                        :disabled="isLoading || isLoadingHeaderImage"
                                        @click="openHeaderImage.click()"
                                    >
                                        {{ !headerImageURL ? 'Select Image' : 'Change Image' }}
                                    </Button>
                                    <Button
                                        v-if="headerImageURL"
                                        :disabled="isLoading || isLoadingHeaderImage"
                                        :loading="isLoadingHeaderImage"
                                        @click="uploadHeaderImage"
                                    >
                                        Set Header Image
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Button
                            variant="secondary"
                            @click="openHeaderImageDialog"
                        >
                            Change Header Image
                        </Button>
                        <input
                            type="file"
                            accept="image/jpeg, image/png, image/jpg, image/webp"
                            ref="openHeaderImage"
                            class="hidden"
                            @change="onSelectHeaderImage($event?.target?.files)"
                        />
                    </FormControl>
                </div>
                <FormMessage />
            </FormItem>
        </FormField>


        <FormField name="username">
            <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input
                        v-model="group.username"
                        disabled
                        type="text"
                        placeholder="Your name"
                    />
                </FormControl>
                <FormDescription>
                    This can't be changed. Profile URL: <a
                        :href="`https://example.com/@${group.username}`"
                        target="_blank"
                        class="text-blue-500"
                    >Example.com/@{{ group.username }}</a>
                </FormDescription>
            </FormItem>
        </FormField>

        <FormField name="displayName">
            <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                    <Input
                        v-model="group.name"
                        type="text"
                        placeholder="Your public display name"
                    />
                </FormControl>
                <FormDescription>
                    This is the name your audiance knows you by. This can include special characters and emojis.
                </FormDescription>
            </FormItem>
        </FormField>

        <FormField name="minimum-amount">
            <FormItem>
                <FormLabel>Require a minimum amount</FormLabel>
                <FormControl>
                    <div class="flex items-center space-x-2">
                        <Switch
                            v-model="group.minimumAmountEnabled"
                            @update:model-value="setMinimumAmountEnabled"
                            id="minimum-amount"
                        />
                    </div>
                    <div
                        class="transition-all duration-300 overflow-hidden"
                        :class="{
                            'max-h-0': !group.minimumAmountEnabled,
                            'max-h-[100vh]': group.minimumAmountEnabled
                        }"
                    >
                        <Input
                            v-model="group.minimumAmount"
                            type="text"
                            placeholder="0.001"
                        />
                    </div>
                </FormControl>
                <FormDescription>
                    Set a minimum payment you will accept.
                    <span v-if="group.minimumAmountEnabled">
                        {{ group.minimumAmount }} ≈ {{ $c(group.minimumAmount, 'USD') }}
                    </span>
                </FormDescription>
            </FormItem>
        </FormField>

        <div class="flex justify-start">
            <Button
                :disabled="isLoading || isLoadingProfileImage"
                :loading="isLoading"
                @click="updateProfile"
            >
                Update Profile
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
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
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import ImageCropper from '@/components/ImageCropper.vue';
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { toast } from 'vue-sonner';



import { ref, onMounted, watch, computed, inject } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const api = inject<any>('api');
const errorHandler = inject<any>('errorHandler');

const group = computed(() => store.state.group);

const isLoading = ref(false);

const updateProfile = async () => {
    try {
        isLoading.value = true;
        await api.group.update(group.value.id, {
            name: group.value.name,
            minimumAmountEnabled: group.value.minimumAmountEnabled,
            minimumAmount: group.value.minimumAmount,
        });
    } catch (error) {
        errorHandler(error, (data: any, code: any) => {
            if (code === 422) imageErrors.value = data;
        });
    } finally {
        isLoading.value = false;
    }
};

const dataURLtoBlob = (dataurl: string) => {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)![1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
        u8arr[i] = bstr.charCodeAt(i);
    }
    return new Blob([u8arr], { type: mime });
};

////////////////////////////////////
// Profile Image
const isLoadingProfileImage = ref(false);
const image = ref<File | null>(null);
const openImage = ref<any>(null);
const previewImageURL = ref<string>(group.value.image);
const profileImageURL = ref<string | null>(null);
const profileImageErrors = ref<any>({});
const profileImageDialogOpen = ref(false);
const imageCropper = ref<any>(null);

const openProfileImageDialog = () => {
    profileImageDialogOpen.value = true;
    openImage.value?.click();
};

const onSelectProfileImage = (files: File[]) => {
    if (files.length > 0) {
        const file = files[0];
        image.value = file;
    }
    const reader = new FileReader();
    reader.onload = (e) => profileImageURL.value = e.target?.result as string;
    reader.readAsDataURL(image.value as Blob);
};

const uploadProfileImage = async () => {
    try {
        isLoadingProfileImage.value = true;
        const crop = imageCropper.value?.emitCrop();
        const cropBlob = dataURLtoBlob(crop);
        const fd = new FormData();
        fd.append('image', cropBlob);
        await api.group.uploadImage(fd);
        await new Promise(resolve => setTimeout(resolve, 5000));
        const { data } = await api.group.get(group.value.id);
        store.commit('setGroup', data);
        image.value = null;
        previewImageURL.value = data.image;
        profileImageDialogOpen.value = false;
        toast.success('Profile image updated');
    } catch (error) {
        errorHandler(error, (data: any, code: any) => {
            if (code === 422) profileImageErrors.value = data;
        });
    } finally {
        isLoadingProfileImage.value = false;
    }
};



////////////////////////////////////
// Header Image
const previewHeaderImageURL = ref<string>(group.value.headerImage);
const isLoadingHeaderImage = ref(false);
const headerImage = ref<File | null>(null);
const openHeaderImage = ref<any>(null);
const headerImageURL = ref<string | null>(null);
const headerImageErrors = ref<any>({});
const headerImageDialogOpen = ref(false);

const openHeaderImageDialog = () => {
    headerImageDialogOpen.value = true;
    openHeaderImage.value?.click();
};

const onSelectHeaderImage = (files: File[]) => {
    if (files.length > 0) {
        const file = files[0];
        headerImage.value = file;
    }
    const reader = new FileReader();
    reader.onload = (e) => headerImageURL.value = e.target?.result as string;
    reader.readAsDataURL(headerImage.value as Blob);
};

const uploadHeaderImage = async () => {
    try {
        isLoadingHeaderImage.value = true;
        const crop = headerImageURL.value as string;
        const cropBlob = dataURLtoBlob(crop);
        const fd = new FormData();
        fd.append('image', cropBlob);
        await api.group.uploadHeaderImage(fd);
        headerImageDialogOpen.value = false;

        toast.success('Header image updated');

        await new Promise(resolve => setTimeout(resolve, 5000));
        const { data } = await api.group.get(group.value.id);
        headerImage.value = null;
        store.commit('setGroup', data);
        console.log(data);
        console.log(data.headerImage);
        previewHeaderImageURL.value = data.headerImage;
    } catch (error) {
        errorHandler(error, (data: any, code: any) => {
            if (code === 422) headerImageErrors.value = data;
        });
    } finally {
        isLoadingHeaderImage.value = false;
    }
};


////////////////////////////////////
// Min
const setMinimumAmountEnabled = async () => {
    try {
        await api.group.setMinimumAmountEnabled(group.value.id, group.value.minimumAmountEnabled);
    } catch (error) {
        errorHandler(error);
    }
};
</script>