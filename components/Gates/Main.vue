<script setup lang='ts'>
const props = defineProps(["provider", "gates"])
const user = useUserStore()

const gates = useGateStore();
const open = ref(false)
const { setError, setIsError } = useError();

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

</script>

<template>
    <div class="flex flex-col gap-12">
        <div v-for="(gate, index) in props.gates" :key="gate._id" class="flex flex-col border-b-8 border-red-full">
            <div class="flex justify-between">
                <CalcTitle :name="open ? 'Sutraukti' : 'Išskleisti'" @onClick="open = !open" :open="open"
                    class="border py-2 px-4 rounded-lg border-dark-light w-32" />
                <div class="flex gap-4">
                    <BaseButton v-if="user.user?.accountType === 'Administratorius'"
                        :name="gate.measure === 'Eilėje' ? 'Galima matuoti' : 'Matuoti negalima'" />
                    <BaseInfoField label="galima matuoti" :name="gate.measure" class="text-white"
                        :class="gate.measure === 'Eilėje' ? 'bg-red-full' : 'bg-green-500'" />
                </div>
            </div>
            <div class="flex justify-between font-semibold border-b border-red-300 py-4">

                <div class="flex flex-col gap-4 justify-between">
                    <h3 class="text-xl">Užsakymo duomenys</h3>
                    <BaseInput :name="index + 1" width="w-72" label="Užsakymo nr:" :disable="true" />
                    <BaseInput :name="gate.dateCreated.slice(0, 10)" width="w-72" label="užsakymo data:"
                        :disable="true" />
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
    </div>
</template>
<style scoped></style>