<script setup lang="ts">
import { useScreenStore } from "~/store/screen";

type SegmentType = "darbas" | "pertrauke" | "pietus";

interface Segment {
  s: string;
  e: string;
  type: SegmentType;
}

interface Shift {
  name: string;
  start: number;
  end: number;
  segments: Segment[];
}

interface Status {
  text: string;
  color: string;
}

interface CurrentSegment extends Segment {
  start: number;
  end: number;
  progress: number;
}

const useScreen = useScreenStore();
const useSettings = useSettingsStore();

const now = ref(new Date());
const muted = ref(false);

let timer: ReturnType<typeof setInterval>;
let audio: any = null;

onMounted(() => {
  audio = new Audio("/sounds/asdf.wav");
});

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const typeMeta: Record<
  SegmentType,
  {
    label: string;
    color: string;
  }
> = {
  darbas: {
    label: "Darbo laikas",
    color: "#1c8a45",
  },

  pertrauke: {
    label: "Pertraukėlė",
    color: "#d99a00",
  },

  pietus: {
    label: "Pietų pertrauka",
    color: "#d4531f",
  },
};

function tm(time: string): number {
  const [h, m] = time.split(":").map(Number);

  return h * 60 + m;
}

const shifts: Shift[] = [
  {
    name: "1 pamaina",

    start: tm("06:30"),
    end: tm("15:00"),

    segments: [
      { s: "06:30", e: "08:30", type: "darbas" },
      { s: "08:30", e: "08:45", type: "pertrauke" },
      { s: "08:45", e: "11:15", type: "darbas" },
      { s: "11:15", e: "11:45", type: "pietus" },
      { s: "11:45", e: "13:30", type: "darbas" },
      { s: "13:30", e: "13:45", type: "pertrauke" },
      { s: "13:45", e: "15:00", type: "darbas" },
    ],
  },

  {
    name: "2 pamaina",

    start: tm("13:30"),
    end: tm("22:00"),

    segments: [
      { s: "13:30", e: "15:30", type: "darbas" },
      { s: "15:30", e: "15:45", type: "pertrauke" },
      { s: "15:45", e: "18:15", type: "darbas" },
      { s: "18:15", e: "18:45", type: "pietus" },
      { s: "18:45", e: "20:30", type: "darbas" },
      { s: "20:30", e: "20:45", type: "pertrauke" },
      { s: "20:45", e: "22:00", type: "darbas" },
    ],
  },
];

const timeNow = computed(() =>
  now.value.toLocaleTimeString("lt-LT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }),
);

const dateNow = computed(() =>
  now.value.toLocaleDateString("lt-LT", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }),
);

function currentMinutes() {
  return now.value.getHours() * 60 + now.value.getMinutes() + now.value.getSeconds() / 60;
}

const currentSegment = computed<CurrentSegment | null>(() => {
  const minutes = currentMinutes();

  for (const shift of shifts) {
    for (const seg of shift.segments) {
      const start = tm(seg.s);
      const end = tm(seg.e);

      if (minutes >= start && minutes < end) {
        return {
          ...seg,
          start,
          end,
          progress: ((minutes - start) / (end - start)) * 100,
        };
      }
    }
  }

  return null;
});

const currentStatus = computed<Status>(() => {
  if (currentSegment?.value) {
    const meta = typeMeta[currentSegment?.value?.type];

    return {
      text: meta?.label,
      color: meta?.color,
    };
  }

  return {
    text: "Nedarbo laikas",
    color: "#8a8a8a",
  };
});

const timeLeft = computed(() => {
  if (!currentSegment.value) return "--:--";

  const totalMinutes = Math.ceil(currentSegment.value.end - currentMinutes());
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) return `${hours} val ${minutes} min`;
  return `${minutes} min`;
});

function timelinePosition(shift: Shift) {
  const minutes = currentMinutes();

  if (minutes <= shift?.start || minutes >= shift?.end) {
    return null;
  }

  return ((minutes - shift?.start) / (shift?.end - shift?.start)) * 100;
}

const getCurrentShift = () => {
  const minutes = currentMinutes();

  const shift1Start = tm(useSettings.reportsGeneral.workStart1);
  const shift1End = tm(useSettings.reportsGeneral.workEnd1);
  const shift2End = tm(useSettings.reportsGeneral.workEnd2);

  if (minutes >= shift1Start && minutes < shift1End) return 1;
  if (minutes >= shift1End && minutes < shift2End) return 2;
  return 0;
};

watch(currentStatus, (newStatus, oldStatus) => {
  if (newStatus.text !== oldStatus?.text) {
    if (muted.value) audio?.play();
  }
});

watch(
  now,
  () => {
    const shift = getCurrentShift();

    if (useScreen.shift !== shift) {
      useScreen.setShift(shift);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      @click="muted = !muted"
      class="absolute top-1 right-1 border border-gray-300 rounded-lg shadow-lg p-1.5 w-8 h-8 hover:cursor-pointer"
    >
      <img v-if="muted" src="/icons/soundON.svg" alt="soundIcon" />
      <img v-else src="/icons/soundOFF.svg" alt="soundIcon" />
    </div>
    <div
      class="flex gap-8 rounded-3xl border-[3px] px-10 py-4 text-center shadow-xl"
      :style="{
        borderColor: currentStatus?.color,
        background: '#f2f2f2',
      }"
    >
      <div
        class="font-mono text-[170px] font-bold leading-none"
        :style="{
          color: currentStatus?.color,
        }"
      >
        {{ timeNow }}
      </div>

      <div class="flex flex-col items-center justify-between">
        <div class="uppercase text-2xl font-bold">
          {{ dateNow }}
        </div>

        <div
          class="flex items-center gap-4 px-10 py-4 rounded-full border-4"
          :style="{
            borderColor: currentStatus?.color,
          }"
        >
          <span
            class="w-5 h-5 rounded-full"
            :style="{
              background: currentStatus?.color,
            }"
          />

          <span class="font-bold text-3xl uppercase">
            {{ currentStatus?.text }}
          </span>
        </div>

        <div class="text-2xl font-bold">Liko: {{ timeLeft }}</div>
      </div>
    </div>

    <div class="w-full flex gap-4">
      <div v-for="shift in shifts" :key="shift.name" class="w-full">
        <div class="flex justify-center gap-20 font-bold text-lg">
          <span>
            {{ shift.name }}
          </span>

          <span>
            {{ shift?.segments[0]?.s }}
            –
            {{ shift?.segments[shift?.segments.length - 1]?.e }}
          </span>
        </div>

        <div class="relative shadow-lg">
          <div class="flex h-8 rounded-lg overflow-hidden border">
            <div
              v-for="seg in shift.segments"
              :key="`${shift.name}-${seg.s}`"
              class="h-full"
              :style="{
                flex: tm(seg.e) - tm(seg.s),
                background: typeMeta[seg.type]?.color,
              }"
            />
          </div>

          <div
            v-if="timelinePosition(shift) !== null"
            class="absolute top-0 -bottom-2 w-1 bg-black rounded-full transition-all duration-1000"
            :style="{
              left: `${timelinePosition(shift)}%`,
            }"
          >
            <div
              class="absolute top-9 -left-6 bg-black text-white font-medium text-xs px-2 py-1 rounded tracking-wider"
            >
              DABAR
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
