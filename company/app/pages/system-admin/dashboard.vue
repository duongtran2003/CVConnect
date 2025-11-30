<template>
  <div class="dashboard-wrapper flex flex-col gap-4">
    <div class="block top-block">
      <!-- <div class="title">Thống kê hệ thống</div> -->
      <div class="top">
        <AppInputMonthpicker
          :label="''"
          :required="false"
          :value="monthInput"
          :error="''"
          :slim-error="true"
          :placeholder="'Chọn khoảng thời gian'"
          :is-range="true"
          @input="handleMonthInput($event)"
        />
      </div>
    </div>
    <div class="line">
      <DashboardSystemAdminOverviewCard
        v-for="(card, index) of overview"
        :key="index"
        :num="card.num"
        :str="card.str"
        :icon="card.icon"
      />
    </div>
    <div class="block">
      <DashboardSystemAdminChartPassRate :data="passRate" />
    </div>
    <div class="h-[9999px]">rest of the content</div>
  </div>
</template>
<script setup lang="ts">
import moment from "moment";
import type { TPassRateData } from "~/components/dashboard/system-admin/chart/pass-rate.vue";
import { overviewMap } from "~/const/views/system-admin/dashboard";

definePageMeta({
  layout: "system-admin",
});

const { setLoading } = useLoadingStore();
const { getOverview, getPassRate } = useDashboardApi();

const route = useRoute();
const router = useRouter();

const monthInput = ref<any>(undefined);

const overview = ref<any>(undefined);
const passRate = ref<TPassRateData[]>([]);

onBeforeMount(() => {
  const qStart = route.query.start as string | undefined; // "2025-11"
  const qEnd = route.query.end as string | undefined;

  const isValidYM = (m?: string) => m && moment(m, "YYYY-MM", true).isValid();

  if (isValidYM(qStart) && isValidYM(qEnd)) {
    const mStart = moment(qStart, "YYYY-MM");
    const mEnd = moment(qEnd, "YYYY-MM");

    monthInput.value = [
      { month: mStart.month(), year: mStart.year() },
      { month: mEnd.month(), year: mEnd.year() },
    ];

    return;
  }

  const now = moment();
  monthInput.value = [
    { month: 0, year: now.year() }, // January
    { month: now.month(), year: now.year() }, // current month
  ];
});

function handleMonthInput(value: any) {
  monthInput.value = value;
}

async function fetchOverview(payload: any) {
  const res = await getOverview(payload);
  const arr = [];
  console.log({ res });
  for (const key of Object.keys(res.data)) {
    arr.push({
      str: overviewMap[key as keyof typeof overviewMap].text,
      num: res.data[key],
      icon: overviewMap[key as keyof typeof overviewMap].icon,
    });
  }
  overview.value = arr;
}

async function fetchPassRate(payload: any) {
  const res = await getPassRate(payload);
  passRate.value = res.data;
}

watch(
  monthInput,
  async (newVal) => {
    if (!newVal || !newVal[0] || !newVal[1]) return;

    const s = newVal[0]; // {year, month}
    const e = newVal[1];

    router.replace({
      query: {
        ...route.query,
        start: moment({ year: s.year, month: s.month }).format("YYYY-MM"),
        end: moment({ year: e.year, month: e.month }).format("YYYY-MM"),
      },
    });

    const startDate = moment({ year: s.year, month: s.month })
      .startOf("month")
      .toDate();
    const endDate = moment({ year: e.year, month: e.month })
      .endOf("month")
      .toDate();

    const payload = {
      startTime: toDateStart(startDate.toDateString()),
      endTime: toDateEnd(endDate.toDateString()),
    };

    setLoading(true);
    await Promise.allSettled([fetchOverview(payload), fetchPassRate(payload)]);
    setLoading(false);
  },
  { immediate: true },
);
</script>
<style lang="scss" scoped>
.block {
  @include box-shadow;
  background-color: white;
  padding: 12px;
  border-radius: 8px;

  &.top-block {
    margin-top: 8px;
    position: sticky;
    top: 0px;
    z-index: 1;
    border: 1px solid $color-gray-300;
  }
}

.title {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 6px;
}

.top {
  display: flex;
  flex-direction: row;

  :deep(.monthpicker-input) {
    max-width: 240px;
  }
}

.line {
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
