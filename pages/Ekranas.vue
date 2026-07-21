<script setup lang="ts">
definePageMeta({
  layout: false,
  ssr: false,
});

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

const now = ref(new Date());

let timer: ReturnType<typeof setInterval>;

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
  if (currentSegment.value) {
    const meta = typeMeta[currentSegment.value.type];

    return {
      text: meta.label,
      color: meta.color,
    };
  }

  return {
    text: "Nedarbo laikas",
    color: "#8a8a8a",
  };
});

const timeLeft = computed(() => {
  if (!currentSegment.value) {
    return "";
  }

  const left = currentSegment.value.end - currentMinutes();

  const min = Math.floor(left);

  const sec = Math.floor((left - min) * 60);

  return `${min} min ${String(sec).padStart(2, "0")} s`;
});

function timelinePosition(shift: Shift) {
  const minutes = currentMinutes();

  if (minutes < shift.start || minutes > shift.end) {
    return null;
  }

  return ((minutes - shift.start) / (shift.end - shift.start)) * 100;
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center p-20">
    <h1 class="text-3xl font-bold uppercase mb-8">Darbo grafiko laikrodis</h1>

    <div
      class="w-full max-w-[1400px] rounded-3xl border-[3px] p-10 text-center"
      :style="{
        borderColor: currentStatus.color,
        background: '#f2f2f2',
      }"
    >
      <div
        class="font-mono text-[12vw] font-bold leading-none"
        :style="{
          color: currentStatus.color,
        }"
      >
        {{ timeNow }}
      </div>

      <div class="mt-4 uppercase text-gray-500">
        {{ dateNow }}
      </div>

      <div
        class="inline-flex items-center gap-4 mt-10 px-10 py-4 rounded-full border-4"
        :style="{
          borderColor: currentStatus.color,
        }"
      >
        <span
          class="w-5 h-5 rounded-full"
          :style="{
            background: currentStatus.color,
          }"
        />

        <span class="font-bold text-3xl uppercase">
          {{ currentStatus.text }}
        </span>
      </div>

      <div v-if="currentSegment" class="mt-6 text-2xl font-bold">
        Liko:
        <span class="text-gray-600">
          {{ timeLeft }}
        </span>
      </div>
    </div>

    <div class="w-full max-w-[1400px] mt-10 space-y-6">
      <div v-for="shift in shifts" :key="shift.name" class="border-2 rounded-2xl p-6">
        <div class="flex justify-between font-bold mb-4">
          <span>
            {{ shift.name }}
          </span>

          <span>
            {{ shift.segments[0].s }}
            –
            {{ shift.segments[shift.segments.length - 1].e }}
          </span>
        </div>

        <div class="relative">
          <div class="flex h-14 rounded-xl overflow-hidden border">
            <div
              v-for="seg in shift.segments"
              :key="`${shift.name}-${seg.s}`"
              class="h-full"
              :style="{
                flex: tm(seg.e) - tm(seg.s),
                background: typeMeta[seg.type].color,
              }"
            />
          </div>

          <div
            v-if="timelinePosition(shift) !== null"
            class="absolute top-[-12px] bottom-[-12px] w-1 bg-black rounded-full transition-all duration-1000"
            :style="{
              left: `${timelinePosition(shift)}%`,
            }"
          >
            <div class="absolute -top-8 -left-6 bg-black text-white text-xs px-2 py-1 rounded">
              DABAR
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
