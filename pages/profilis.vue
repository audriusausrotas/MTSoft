<!-- <script setup lang="ts">
const { setError, setSuccess } = useError();
const userStore = useUserStore();
const initials = userStore.user?.username.slice(0, 2);
const newPassword = ref<string>("");
const password = ref<string>("");
const lastName = ref<string>(userStore.user?.lastName || "");
const phone = ref<string>(userStore.user?.phone || "");
const isSavedPhone = ref<boolean>(true);
const isSavedName = ref<boolean>(true);

const saveHandler = async (field: string) => {
  let value = "";
  if (field === "phone") value = phone.value!;
  else if (field === "name") value = lastName.value!;
  else if (field === "password") {
    if (password.value !== newPassword.value) {
      setError("Slaptažodžiai nesutampa");
      return;
    }
    value = password.value;
  }

  const response: any = await request.patch("updateProfile", { field, value });

  if (response.success) {
    !useSocketStore().connected && userStore.setUser(response.data);

    if (field === "password") {
      password.value = "";
      newPassword.value = "";
    } else if (field === "phone") isSavedPhone.value = true;
    else if (field === "name") isSavedName.value = true;

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const successHandler = async (photo: string) => {
  const oldPhotoId = userStore.user?.photo;

  // const response: any = await $fetch("/api/uploadPhotos", {
  //   method: "post",
  //   body: { photo, category: "profile", _id: userStore.user?._id },
  // });
  // if (response.success) {
  //   userStore.setUser(response.data);
  //   setSuccess(response.message);
  // } else {
  //   setError(response.message);
  // }

  // const deleteResponse = await $fetch("/api/cloudinary", {
  //   method: "delete",
  //   body: { id: oldPhotoId },
  // });
  // if (!deleteResponse.success) setError(deleteResponse.message);
};

watch(phone, (newPhone) => {
  if (newPhone !== userStore.user?.phone) isSavedPhone.value = false;
  else isSavedPhone.value = true;
});

watch(lastName, (newName) => {
  if (newName !== userStore.user?.lastName) isSavedName.value = false;
  else isSavedName.value = true;
});
</script>

<template>
  <div class="flex flex-col">
    <div class="flex border-b py-8 gap-14">
      <div class="bg-black rounded-xl">
        <div
          class="flex flex-col items-center justify-center overflow-hidden bg-gray-light rounded-t-xl h-60 w-60"
        >
          <NuxtImg
            v-if="userStore.user?.photo && userStore.user.photo !== ''"
            :src="userStore.user?.photo || ''"
            alt="Vartotojo nuotrauka"
            class="object-cover object-center w-full h-full"
            width="48"
            height="48"
            decoding="auto"
            loading="lazy"
            :ismap="true"
          />
          <h3 v-else class="text-3xl uppercase">{{ initials }}</h3>
        </div>
        <BaseUpload @on-success="successHandler" />
      </div>

      <div class="flex flex-col h-60 font-semibold justify-around capitalize">
        <div class="flex gap-4 text-4xl">
          <p>{{ userStore.user?.username }}</p>
          <div class="flex">
            <input
              type="text"
              v-model="lastName"
              placeholder="Pavardė"
              class="max-w-60"
            />
            <div class="flex-1 flex">
              <NuxtImg
                width="20"
                height="20"
                v-if="!isSavedName"
                src="/icons/save.svg"
                decoding="auto"
                loading="lazy"
                :ismap="true"
                @click="saveHandler('name')"
                class="hover:cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div>
          {{ userStore.user?.accountType }}
          <h5 class="font-semibold"></h5>
        </div>
        <h5 class="font-semibold normal-case">{{ userStore.user?.email }}</h5>
        <div class="flex">
          <input
            type="text"
            v-model="phone"
            placeholder="Telefono numeris"
            class="max-w-32"
          />
          <div class="flex-1">
            <NuxtImg
              width="20"
              height="20"
              v-if="!isSavedPhone"
              src="/icons/save.svg"
              decoding="auto"
              loading="lazy"
              :ismap="true"
              @click="saveHandler('phone')"
              class="hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex py-8 gap-4">
      <BaseInput
        :name="newPassword"
        type="password"
        @onChange="(v) => (newPassword = v)"
        placeholder="Naujas slaptažodis"
      />
      <BaseInput
        :name="password"
        type="password"
        @onChange="(v) => (password = v)"
        placeholder="Pakartoti slaptažodį"
      />
      <BaseButton
        name="Išsaugoti slaptažodį"
        @click="saveHandler('password')"
      />
    </div>
  </div>
</template>

<style scoped></style> -->
<template>
  <div class="p-4">
    <div class="mb-2 flex gap-2">
      <input
        v-model.number="distance"
        type="number"
        placeholder="Atstumas (mm)"
        class="border px-2 py-1"
      />
      <input
        v-model.number="angle"
        type="number"
        placeholder="Kampas (°)"
        class="border px-2 py-1"
      />
      <button
        @click="addLineByAngle(distance, angle)"
        class="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Brėžti liniją
      </button>
      <button
        @click="clearCanvas"
        class="bg-red-500 text-white px-3 py-1 rounded"
      >
        Išvalyti
      </button>
    </div>
    <canvas
      ref="canvas"
      width="800"
      height="600"
      style="border: 1px solid #ccc"
      @click="addPoint"
    >
    </canvas>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Point {
  x: number;
  y: number;
}

const canvas = ref<HTMLCanvasElement | null>(null);
const points = ref<Point[]>([]);
const distance = ref<number>(0);
const angle = ref<number>(0);

// mastelis: px per mm (pvz. 4 px = 1 mm)
const scale = 4;

function addPoint(e: MouseEvent) {
  if (!canvas.value) return;
  const rect = canvas.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  points.value.push({ x, y });
  redraw();
}

function addLineByAngle(dMm: number, angleDeg: number) {
  if (!canvas.value || points.value.length === 0) return;
  const last = points.value[points.value.length - 1];
  const rad = (angleDeg * Math.PI) / 180;
  const dPx = dMm * scale;
  const x = last.x + dPx * Math.cos(rad);
  const y = last.y - dPx * Math.sin(rad); // minus, kad 90° būtų aukštyn
  points.value.push({ x, y });
  redraw();
  // reset
  distance.value = 0;
  angle.value = 0;
}

function redraw() {
  if (!canvas.value) return;
  const ctx = canvas.value.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#333";
  ctx.font = "12px Arial";

  let totalPx = 0;

  // linijos + matmenys
  for (let i = 0; i < points.value.length - 1; i++) {
    const p1 = points.value[i],
      p2 = points.value[i + 1];
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    const Lpx = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    totalPx += Lpx;
    const Lmm = (Lpx / scale).toFixed(1);
    ctx.fillText(Lmm + " mm", (p1.x + p2.x) / 2, (p1.y + p2.y) / 2 - 5);
  }

  // bendras ilgis
  const totalMm = (totalPx / scale).toFixed(1);
  ctx.fillStyle = "blue";
  ctx.fillText("Viso: " + totalMm + " mm", 10, 20);

  // kampai – pereinam per visus taškus nuo trečiojo
  for (let i = 2; i < points.value.length; i++) {
    const A = points.value[i - 2];
    const B = points.value[i - 1];
    const C = points.value[i];

    const u = { x: B.x - A.x, y: B.y - A.y };
    const v = { x: C.x - B.x, y: C.y - B.y };
    const dot = u.x * v.x + u.y * v.y;
    const magU = Math.hypot(u.x, u.y);
    const magV = Math.hypot(v.x, v.y);
    if (magU === 0 || magV === 0) continue;

    const angleRad = Math.acos(dot / (magU * magV));
    const angleDeg = ((angleRad * 180) / Math.PI).toFixed(1);

    // kampo lankas
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.arc(B.x, B.y, 40, Math.atan2(-u.y, u.x), Math.atan2(-v.y, v.x));
    ctx.stroke();

    ctx.fillStyle = "red";
    ctx.fillText(angleDeg + "°", B.x + 45, B.y - 5);
  }
}

function clearCanvas() {
  points.value = [];
  if (!canvas.value) return;
  const ctx = canvas.value.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
}
</script>
