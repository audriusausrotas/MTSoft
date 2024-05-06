<script setup lang='ts'>
const props = defineProps(["gate", "index", "provider"])
const user = useUserStore()
const gates = useGateStore();

const { setError, setIsError } = useError();

const open = ref(false)

const buttonHandler = async (id: string) => {
    const response: any = await $fetch(
        "/api/gates",
        {
            method: "patch",
            body: { _id: id, provider: props.provider },
        }
    );
    if (response.success) {
        gates.removeGates(id)
        setIsError(false);
        setError(response.message);
    } else {
        setError(response.message);
    }
}

const measureHandler = async (id: string) => {
    const response: any = await $fetch(
        "/api/gates",
        {
            method: "put",
            body: { _id: id, provider: props.provider },
        }
    );
    if (response.success) {
        gates.updateGate(response.data, props.provider, id)
        setIsError(false);
        setError(response.message);
    } else {
        setError(response.message);
    }
}
</script>

<template>
    <div class="flex gap-4 pb-4 flex-wrap">
        <CalcTitle :open="open" @click="open = !open" />
        <div v-if="!open" class="flex gap-4 items-end flex-wrap">
            <BaseInput :name="index + 1" width="w-12" label="Nr:" :disable="true" />
            <BaseInput :name="gate.client.address" width="w-80" label="adresas" :disable="true" />
            <BaseInfoField :name="gate.client.phone" label="Telefono Numeris" width="w-32" :tel="true" />
            <BaseButton v-if="user.user?.accountType === 'Administratorius'"
                :name="gate.measure === 'Eilėje' ? 'Galima matuoti' : 'Matuoti negalima'"
                @click="measureHandler(gate._id)" />
        </div>
        <div class="text-white self-end px-4 py-2 rounded-lg"
            :class="gate.measure === 'Eilėje' ? 'bg-red-full' : 'bg-green-500'">
            {{ gate.measure }}</div>
    </div>
    <div v-if="open">
        <div class="flex justify-between font-semibold border-b border-red-300 py-4">
            <div class="flex flex-col gap-4 justify-between">
                <h3 class="text-xl">Užsakymo duomenys</h3>
                <BaseInput :name="index + 1" width="w-72" label="Užsakymo nr:" :disable="true" />
                <BaseInput :name="gate.dateCreated.slice(0, 10)" width="w-72" label="užsakymo data:" :disable="true" />
                <BaseButtonWithConfirmation name="užsakymas baigtas" @onConfirm="buttonHandler(gate._id)" />
            </div>
            <div class="flex flex-col gap-4">
                <h3 class="text-xl">Klento duomenys</h3>
                <BaseInput :name="gate.client.username" width="w-72" label="klientas" :disable="true" />
                <BaseInput :name="gate.client.address" width="w-72" label="adresas" :disable="true" />
                <BaseInput :name="gate.client.phone" width="w-72" label="telefonas" :disable="true" />
            </div>
            <div class="flex flex-col gap-4">
                <h3 class="text-xl">Vadybininko duomenys</h3>
                <BaseInput :name="gate.creator.username" width="w-72" label="atsakingas asmuo" :disable="true" />
                <BaseInput :name="gate.creator.phone" width="w-72" label="Telefono numeris" :disable="true" />
                <BaseInput :name="gate.creator.email" width="w-72" label="Elektroninis paštas" :disable="true" />
            </div>
        </div>
        <div v-for="(g, i) in gate.gates" :key="g._id" class="flex flex-col pb-4 border-b border-red-300">
            <GatesGate :gate="g" :index="i" />
        </div>
    </div>
</template>
<style scoped></style>