<script setup lang="ts">
const props = defineProps<{
  shift: string;
  currentTime: Date;
  shiftTime: {
    start: string;
    end: string;
  };
  breaks: {
    time: string;
    length: string;
  }[];
}>();

const colors = {
  work: "#15803D",
  break: "#F97316",
  longBreak: "#DC2626",
  inactive: "#9CA3AF",
};

const parseTime = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  const d = new Date(props.currentTime);
  d.setHours(h, m, 0, 0);
  return d;
};

const shiftStart = computed(() => parseTime(props.shiftTime.start));
const shiftEnd = computed(() => parseTime(props.shiftTime.end));

const shiftMinutes = computed(() => {
  return (shiftEnd.value.getTime() - shiftStart.value.getTime()) / 60000;
});

const breaksWithPosition = computed(() => {
  return props.breaks
    .map((b) => {
      const start = parseTime(b.time);

      const offset =
        ((start.getTime() - shiftStart.value.getTime()) / 60000 / shiftMinutes.value) * 100;

      const width = (Number(b.length) / shiftMinutes.value) * 100;

      return {
        ...b,
        offset,
        width,
        color: Number(b.length) === 30 ? colors.longBreak : colors.break,
      };
    })
    .filter((b) => b.offset >= 0 && b.offset <= 100);
});

const nowPosition = computed(() => {
  const diff = (props.currentTime.getTime() - shiftStart.value.getTime()) / 60000;

  return Math.min(Math.max((diff / shiftMinutes.value) * 100, 0), 100);
});

const stateColor = computed(() => {
  const now = props.currentTime;

  if (now < shiftStart.value || now > shiftEnd.value) {
    return colors.inactive;
  }

  const activeBreak = breaksWithPosition.value.find((b) => {
    const start = parseTime(b.time);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + Number(b.length));

    return now >= start && now <= end;
  });

  if (activeBreak) {
    return activeBreak.color;
  }

  return colors.work;
});

const active = computed(() => {
  return props.currentTime >= shiftStart.value && props.currentTime <= shiftEnd.value;
});
</script>

<template>
  <div class="flex flex-col gap-4 border rounded-2xl p-10 font-bold text-2xl">
    <div class="flex justify-between">
      <div>{{ shift }} PAMAINA</div>
      <div>{{ shiftTime.start }} - {{ shiftTime.end }}</div>
    </div>

    <div class="relative w-full h-14 rounded-xl overflow-hidden bg-gray-300">
      <!-- darbo juosta -->
      <div class="absolute inset-0 transition-colors" :style="{ backgroundColor: stateColor }" />

      <!-- break intarpai -->
      <div
        v-for="b in breaksWithPosition"
        :key="b.time"
        class="absolute top-0 h-full"
        :style="{
          left: b.offset + '%',
          width: b.width + '%',
          backgroundColor: b.color,
        }"
      />

      <!-- dabartinis laikas -->
      <div
        v-if="active"
        class="absolute top-0 h-full w-1 bg-black"
        :style="{
          left: nowPosition + '%',
        }"
      />
    </div>
  </div>
</template>
