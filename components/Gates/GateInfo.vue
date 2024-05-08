<script setup lang='ts'>
const props = defineProps(["gate", "index", "provider"])
const user = useUserStore()
const gates = useGateStore();

const { setError, setIsError } = useError();

const open = ref<boolean>(false)

const buttonHandler = async () => {
    const response: any = await $fetch(
        "/api/gates",
        {
            method: "patch",
            body: { _id: props.gate._id, provider: props.provider },
        }
    );
    if (response.success) {
        gates.removeGates(props.gate._id)
        setIsError(false);
        setError(response.message);
    } else {
        setError(response.message);
    }
}

const measureHandler = async () => {
    const response: any = await $fetch(
        "/api/gates",
        {
            method: "put",
            body: { _id: props.gate._id, provider: props.provider, change: "status" },
        }
    );
    if (response.success) {
        gates.updateGate(response.data, props.provider, props.gate._id)
        setIsError(false);
        setError(response.message);
    } else {
        setError(response.message);
    }
}

const orderNumberHandler = (value: string) => {

}

const commentHandler = (value: string) => {

}
</script>

<template>
    <div class="flex gap-4 pb-4 flex-wrap items-end">
        <CalcTitle :open="open" @click="open = !open" class="w-8 h-12  flex justify-center" />
        <div v-if="!open" class="flex gap-4 items-end flex-wrap">
            <BaseInput :name="index + 1" width="w-12" label="Nr:" :disable="true" />
            <BaseInput :name="index + 1" width="w-24" label="Užsakymo Nr." :disable="true" />
            <BaseInput :name="gate.client.address" width="w-80" label="adresas" :disable="true" />
            <BaseInfoField :name="gate.client.phone" label="Telefono Numeris" width="w-32" :tel="true" />
        </div>
        <div v-if="!open" class="text-white self-end py-2 rounded-lg w-40 text-center"
            :class="gate.measure === 'Eilėje' ? 'bg-red-full' : 'bg-green-500'">
            {{ gate.measure }}</div>

    </div>
    <div v-if="open">
        <div class="flex flex-col">
            <div class="flex gap-4">
                <BaseButton name="pakeisti statusa" @click="measureHandler" class="self-end" />
                <BaseButtonWithInput name="įvesti užsakymo Nr." placeholder="Užsakymo Nr."
                    @onConfirm="orderNumberHandler" />
                <BaseButtonWithInput name="įvesti komentarą" placeholder="Komentaras" @onConfirm="commentHandler" />
                <BaseButtonWithConfirmation name="užbaigti užsakymą" @onConfirm="buttonHandler" />
            </div>
            <div class="flex justify-between font-semibold border-b border-gray-full py-4">

                <div class="flex flex-col gap-4 justify-between">
                    <h3 class="text-xl">Užsakymo duomenys</h3>
                    <BaseInput :name="index + 1" width="w-72" label="Užsakymo nr:" :disable="true" />
                    <BaseInput :name="gate.measure" width="w-72" label="Statusas:" :disable="true"
                        :class="gate.measure === 'Eilėje' ? 'text-red-full' : 'text-green-500'" />
                    <BaseInput :name="gate.dateCreated.slice(0, 10)" width="w-72" label="užsakymo data:"
                        :disable="true" />


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
            <div v-for="(g, i) in gate.gates" :key="g._id"
                class="flex flex-col pb-4 border-b border-gray-full last:border-b-0 ">
                <GatesGate :gate="g" :index="i" />
            </div>
        </div>
    </div>
</template>
<style scoped></style>