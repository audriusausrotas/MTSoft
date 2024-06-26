<script setup lang='ts'>
import { v4 } from 'uuid';
import { gateStatus } from "~/data/selectFieldData";
const props = defineProps(["gate", "index", "provider"])
const gates = useGateStore();
const useUser = useUserStore()

const { setError, setIsError } = useError();

const vartonasUsers = useUser.users.filter(user => user.accountType === "Vartonas").map(user => user.email)

console.log("visi")
console.log(useUser.users)
console.log("vartono")
console.log(vartonasUsers)


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

const updateHandler = async (change: string, value: any) => {

    const response: any = await $fetch(
        "/api/gates",
        {
            method: "put",
            body: { _id: props.gate._id, provider: props.provider, change, value, username: useUser.user?.username },
        }
    );
    if (response.success) {
        gates.updateGate(response.data, props.provider, props.gate._id)

        if (change === "status") {
            if (useUser.user?.accountType !== "Vartonas" && useUser.user?.accountType !== "Gigasta") {
                const data: any = await $fetch("/api/mail", {
                    method: "put",
                    body: { to: response.data.manager, message: `Užsakymo ${props.gate.orderNr}, ${props.gate.client.address} statusas pakeistas į "${value}"`, title: "Statusas pasikeitė" },
                });
                if (data.success) {
                    setIsError(false);
                    setError(data.message);
                } else {
                    setError(data.message);
                }
            }
        }
        setIsError(false);
        setError(response.message);
    } else {
        setError(response.message);
    }
}

</script>
<template>
    <div class="flex gap-4 pb-4 flex-wrap items-end ">
        <CalcTitle v-if="!open" :open="open" @click="open = !open" class="w-8 h-12  flex justify-center" />
        <div v-if="!open" class="flex gap-4 items-end flex-wrap">
            <BaseInput :name="index + 1" width="w-14" label="Nr:" :disable="true" />
            <BaseInput :name="props.gate.orderNr" width="w-36" label="Užsakymo Nr." :disable="true" />
            <BaseInput :name="props.gate.dateCreated.slice(0, 10)" width="w-32" label="Užsakymo data" :disable="true" />
            <BaseInput :name="props.gate.client.address" width="w-80" label="adresas" :disable="true" />
            <BaseInfoField v-if="useUser.user?.accountType === 'Administratorius' && props.gate.manager"
                :name="props.gate.manager.split('@')[0].replace('.', ' ')" width="w-32" label="Atsakingas"
                class="capitalize" />
            <div class="flex flex-col gap-1">
                <label for="clientPhone" class="text-sm ml-2 ">Kliento Tel. Nr.</label>
                <BaseInfoField :name="props.gate.client.phone" label="Telefono Numeris" width="w-32" :tel="true"
                    id="clientPhone" />
            </div>
        </div>
        <div class="flex flex-col">
            <div v-if="!open" id="gateStatus" class="text-white self-end py-2 rounded-lg w-40 text-center"
                :class="props.gate.measure === 'Eilėje' ? 'bg-red-full' : props.gate.measure === 'Galima matuoti' ? ' bg-orange-500' : 'bg-green-500'">
                {{ props.gate.measure }}</div>
        </div>
    </div>
    <div v-if="open">
        <div class="flex flex-col gap-4 pb-4 ">
            <div class="flex gap-4">
                <CalcTitle v-if="open" :open="open" @click="open = !open" class="w-8 h-12  flex justify-center" />
                <BaseSelectField :values="gateStatus" id="gateStatus" :defaultValue="props.gate.measure" width="w-60"
                    @onChange="(value: string) => updateHandler('status', value)" />
                <BaseSelectField :values="vartonasUsers" id="vartonasUsers" :defaultValue="props.gate.manager"
                    width="w-60" @onChange="(value: string) => updateHandler('manager', value)" />
                <BaseButtonWithInput name="įvesti užsakymo Nr." placeholder="Užsakymo Nr."
                    @onConfirm="(value) => updateHandler('orderNr', value)" />
                <BaseButtonWithConfirmation name="užbaigti užsakymą" @onConfirm="buttonHandler" />
            </div>
            <div class="flex justify-between font-semibold  gap-4 flex-wrap">
                <div class="flex flex-col gap-4 ">
                    <h3 class="text-xl">Užsakymo duomenys</h3>
                    <BaseInput :name="props.gate.orderNr" width="w-72" label="Užsakymo nr:" :disable="true" />
                    <BaseInput :name="props.gate.measure" width="w-72" label="Statusas:" :disable="true"
                        :class="props.gate.measure === 'Eilėje' ? 'text-red-full' : props.gate.measure === 'Galima matuoti' ? ' text-orange-500' : 'text-green-500'" />
                    <BaseInput :name="props.gate.dateCreated.slice(0, 10)" width="w-72" label="užsakymo data:"
                        :disable="true" />
                </div>
                <div class="flex flex-col gap-4">
                    <h3 class="text-xl">Klento duomenys</h3>
                    <BaseInput :name="props.gate.client.username" width="w-72" label="klientas" :disable="true" />
                    <BaseInput :name="props.gate.client.address" width="w-72" label="adresas" :disable="true" />
                    <BaseInput :name="props.gate.client.phone" width="w-72" label="telefonas" :disable="true" />
                </div>
                <div class="flex flex-col gap-4">
                    <h3 class="text-xl">Vadybininko duomenys</h3>
                    <BaseInput :name="props.gate.creator.username" width="w-72" label="atsakingas asmuo"
                        :disable="true" />
                    <BaseInput :name="props.gate.creator.phone" width="w-72" label="Telefono numeris" :disable="true" />
                    <BaseInput :name="props.gate.creator.email" width="w-72" label="Elektroninis paštas"
                        :disable="true" />
                </div>
            </div>

            <div class="py-8">
                <BaseComment :commentsArray="props.gate.comments" :id="props.gate._id"
                    @onSave="(value) => updateHandler('comment', value)"
                    @onDelete="(id, comment) => updateHandler('deleteComment', comment)" />
            </div>
            <div class="flex flex-col gap-4">
                <div v-for="( g, i ) in  props.gate.gates " :key="g._id">
                    <GatesGate :gate="g" :index="i" />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>