<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:px-4 sm:py-4">

        <!-- <DashboardActiveAdvance /> -->

        <div class="hidden bg-slate-100 sm:bg-white outline outline-1 outline-offset-[-1px] outline-teal-950/10 rounded-2xl p-4">
            <div class="w-full inline-flex justify-between items-center">
                <div class="flex justify-start items-center gap-3">
                    <div class="w-8 h-8 px-1 relative bg-[#A9D828] rounded outline outline-1 overflow-hidden">
                        <Banknote class="w-full h-full" />
                    </div>
                    <div class="justify-start text-teal-950 text-base font-bold font-['Plus_Jakarta_Sans'] leading-5">
                        Payments
                    </div>
                </div>
            </div>

            <div class="w-full mt-4 inline-flex justify-between items-center">
                <div class="py-1 rounded-[5px] inline-flex flex-col justify-start items-center gap-4">
                    <div class="self-stretch rounded-xl flex flex-col justify-center items-start">
                        <div class="justify-start text-stone-500 text-sm font-semibold font-['Plus_Jakarta_Sans'] leading-5">
                            Advance Cash Received
                        </div>
                    </div>
                    <div class="self-stretch rounded-lg inline-flex justify-between items-center flex-wrap content-center">
                        <div class="justify-start text-teal-950 text-lg font-bold font-['Plus_Jakarta_Sans'] leading-5">
                            $300
                        </div>
                        <div class="flex-1 rounded-xl flex justify-end items-center gap-2 flex-wrap content-center">
                            <div class="rounded-lg flex justify-center items-center">
                                <div class="w-4 h-4 relative"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="py-1 rounded-[5px] inline-flex flex-col justify-start items-center gap-4">
                    <div class="self-stretch rounded-xl flex flex-col justify-center items-start">
                        <div class="justify-start text-stone-500 text-sm font-semibold font-['Plus_Jakarta_Sans'] leading-5">
                            Total Payback
                        </div>
                    </div>
                    <div class="self-stretch rounded-lg inline-flex justify-between items-center flex-wrap content-center">
                        <div class="justify-start text-teal-950 text-lg font-bold font-['Plus_Jakarta_Sans'] leading-5">
                            $420
                        </div>
                        <div class="flex-1 h-4 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import DashboardActiveAdvance from '@/components/DashboardActiveAdvance.vue';
// import ActiveAdvance from '@/assets/ActiveAdvance.svg';
import { ArrowUpRight, Banknote } from 'lucide-vue-next';

import {
    Tabs,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'

</script>