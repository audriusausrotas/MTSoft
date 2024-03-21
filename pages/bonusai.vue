<script setup lang='ts'>
import type { Bonus } from '~/data/interfaces';
const { setError, setIsError } = useError();
const bonuses = ref()

const getBonuses = async () => {
    const response: { data: Bonus[], success: boolean, message: string } = await $fetch("/api/bonus");
    if (response.success) {
        bonuses.value = [...response.data]
        setIsError(false)
        setError(response.message);
    } else {
        setError(response.message);
    }
}
getBonuses()

</script>

<template>
    <div class="">
        <div class="flex gap-4 text-lg font-medium border-b p-2 rounded-t-xl bg-gray-ultra-light">
            <p class="w-8">Nr</p>
            <p class="flex-1">Adresas</p>
            <p class="w-28">Data</p>
            <p class="w-28">Kaina</p>
            <p class="w-28">Savikaina</p>
            <p class="w-28">Pelnas</p>
            <p class="w-28">Marža</p>
            <p class="w-28">Bonusas</p>
        </div>
        <div v-for="bonus, index in bonuses" :key="bonus._id" class="flex gap-4 border-b py-1 px-2">
            <p class="w-8">{{ index + 1 }}</p>
            <p class="flex-1">{{ bonus.address }}</p>
            <p class="w-28">{{ bonus.dateFinished.slice(0, 10) }}</p>
            <p class="w-28">{{ bonus.price }} €</p>
            <p class="w-28">{{ bonus.cost }} €</p>
            <p class="w-28">{{ bonus.profit }} €</p>
            <p class="w-28">{{ bonus.margin }} %</p>
            <p class="w-28">{{ bonus.bonus }} €</p>
        </div>
    </div>
</template>
<style scoped></style>