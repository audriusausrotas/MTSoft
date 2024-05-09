<script setup lang='ts'>
import { v4 } from 'uuid';
import { gateStatus } from "~/data/selectFieldData";
const props = defineProps(["gate", "index", "provider"])
const gates = useGateStore();
const useUser = useUserStore()

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

        let sendTo
        if (props.provider === "Vartonas") {
            sendTo = useUser.users.find(item => item.accountType === "Vartonas")
        }
        if (props.provider === "Gigasta") {
            sendTo = useUser.users.find(item => item.accountType === "Gigasta")
        }

        if (change === "status") {
            if (useUser.user?.accountType !== "Vartonas" && useUser.user?.accountType !== "Gigasta") {
                const data: any = await $fetch("/api/mail", {
                    method: "put",
                    body: { to: sendTo?.email, message: `Užsakymo ${props.gate.orderNr}, ${props.gate.client.address} statusas pakeistas į "${value}"`, title: "Statusas pasikeitė" },
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
    <div class="flex gap-4 pb-4 flex-wrap items-end">
        <CalcTitle :open="open" @click="open = !open" class="w-8 h-12  flex justify-center" />
        <div v-if="!open" class="flex gap-4 items-end flex-wrap">
            <BaseInput :name="index + 1" width="w-14" label="Nr:" :disable="true" />
            <BaseInput :name="props.gate.orderNr" width="w-36" label="Užsakymo Nr." :disable="true" />
            <BaseInput :name="props.gate.dateCreated.slice(0, 10)" width="w-32" label="Užsakymo data" :disable="true" />
            <BaseInput :name="props.gate.client.address" width="w-80" label="adresas" :disable="true" />
            <div class="flex flex-col gap-1">
                <label for="clientPhone" class="text-sm ml-2 ">Kliento Tel. Nr.</label>
                <BaseInfoField :name="props.gate.client.phone" label="Telefono Numeris" width="w-32" :tel="true"
                    id="clientPhone" />
            </div>
        </div>
        <div class="flex flex-col gap-1">
            <label for="gateStatus" class="text-sm ml-2 ">Statusas</label>
            <div v-if="!open" id="gateStatus" class="text-white self-end py-2 rounded-lg w-40 text-center"
                :class="props.gate.measure === 'Eilėje' ? 'bg-red-full' : props.gate.measure === 'Galima matuoti' ? ' bg-orange-500' : 'bg-green-500'">
                {{ props.gate.measure }}</div>

        </div>
    </div>
    <div v-if="open">
        <div class="flex flex-col gap-4">
            <div class="flex gap-4">
                <BaseSelectField :values="gateStatus" id="gateStatus" :defaultValue="props.gate.measure" width="w-60"
                    @onChange="(value: string) => updateHandler('status', value)" />
                <BaseButtonWithInput name="įvesti užsakymo Nr." placeholder="Užsakymo Nr."
                    @onConfirm="(value) => updateHandler('orderNr', value)" />
                <BaseButtonWithInput name="įvesti komentarą" placeholder="Komentaras"
                    @onConfirm="(value) => updateHandler('comment', value)" />
                <BaseButtonWithConfirmation name="užbaigti užsakymą" @onConfirm="buttonHandler" />
            </div>
            <div class="flex flex-col border p-2 rounded-lg border-dark-light">
                <p class="text-2xl font-bold pb-2 self-center">Komentarai:</p>
                <p v-for="comment in props.gate.comments" :key="v4()"
                    class=" flex justify-between border-b font-semibold">
                <p>
                    {{ ("2024-05-08T20:20:42.121Z").replace("T", " | ").slice(0, 18) }} | <span
                        :class="useUser.user?.username === comment.creator ? 'text-green-500' : 'text-red-full'">
                        {{ comment.creator }}:
                    </span>
                    {{ comment.comment }}
                </p>
                <div @click="updateHandler('deleteComment', comment)"
                    class=" hover:cursor-pointer hover:bg-red-200 rounded-md p-1">
                    <NuxtImg src="/icons/delete.svg" width="18" height="18" decoding="auto" :ismap="true"
                        loading="lazy" />
                </div>
                </p>
            </div>
            <div class="flex justify-between font-semibold border-b border-gray-full py-4">

                <div class="flex flex-col gap-4 justify-between">
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
            <div v-for="(g, i) in props.gate.gates" :key="g._id"
                class="flex flex-col pb-4 border-b border-gray-full last:border-b-0 ">
                <GatesGate :gate="g" :index="i" />
            </div>
        </div>
    </div>
</template>
<style scoped></style>