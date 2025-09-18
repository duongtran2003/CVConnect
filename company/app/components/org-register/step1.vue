<template>
  <div class="step1">
    <div class="form-body">
      <AppInputText
        :label="'Tên doanh nghiệp'"
        :required="true"
        :value="props.data.name as string"
        :error="formError.name"
        @input="handleInput('name', $event)"
      />
      <AppInputText
        :label="'Địa chỉ website'"
        :required="false"
        :value="props.data.website as string"
        :error="''"
        @input="handleInput('website', $event)"
      />
      <div class="staff-count-wrapper">
        <div class="label">Số lượng nhân sự</div>
        <div class="select-input">
          <USelect
            v-model="companySize"
            :items="companySizeOptions"
            class="selector"
            :variant="'none'"
          />
        </div>
      </div>
      <div class="description-wrapper">
        <editor
          v-model="description"
          api-key="8jpkq73djvfp0t4okuof3f1wqt0lmiv6alnygf645osjnbk0"
          :init="{
            height: 300,
            menubar: false,
            elementpath: false,
            plugins: ['link', 'lists', 'code'],
            toolbar:
              'undo redo | bold italic underline | bullist numlist | link | code',
          }"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Editor from "@tinymce/tinymce-vue";

type TProps = {
  data: Record<string, any>;
};

const props = defineProps<TProps>();
const emits = defineEmits<{
  (e: "input", event: Record<string, any>): void;
}>();

const formError = ref<Record<string, any>>({
  name: "",
});
const companySize = ref<string>("");
const description = ref<string>("");
const companySizeOptions = [
  {
    label: "Từ 1 đến 50",
    value: "1 - 50",
  },
  {
    label: "Từ 50 đến 100",
    value: "50 - 100",
  },
  {
    label: "Từ 100 đến 200",
    value: "100 - 200",
  },
  {
    label: "Từ 200 đến 500",
    value: "200 - 500",
  },
  {
    label: "Trên 500",
    value: "500 - ",
  },
];

const handleInput = (key: string, $event: any) => {
  emits("input", {
    key: key,
    value: $event,
  });
};

watch(companySize, (newVal) => {
  emits("input", {
    key: "companySize",
    value: newVal,
  });
});

watch(description, (newVal) => {
  console.log(newVal);
});
</script>
<style lang="scss" scoped>
.step1 {
  display: flex;
  flex-direction: column;
  width: 100%;

  .form-body {
    display: flex;
    flex-direction: column;
    gap: 4px;
    .label,
    span {
      font-size: 14px;
      line-height: 21px;
      color: $text-light;
    }

    .label {
      margin-bottom: 4px;
    }
    .staff-count-wrapper {
      margin-bottom: 24px;

      .select-input {
        :deep(button.selector) {
          cursor: pointer;
          border: 2px solid rgba($color-primary-800, 0.1);
          border-radius: 10px !important;
          padding: 4px 48px 4px 6px !important;
          font-weight: 500 !important;
          color: $color-gray-600 !important;
          font-size: 13px;
          height: 32px;
          line-height: 20px;
          background-color: $color-gray-100 !important;
          min-width: 240px;
          max-width: 240px;

          &:hover {
            border: 2px solid rgba($color-primary-400, 1);
          }

          span {
            font-size: 14px;
            line-height: 21px;
            color: $text-light;
            font-weight: 400 !important;
          }
          .text-dimmed {
            font-size: 14px;
            line-height: 21px;
            color: $color-gray-400;
            font-weight: 400 !important;
          }
        }
      }

      .label,
      span {
        font-size: 14px;
        line-height: 21px;
        color: $text-light;
      }

      .label {
        margin-bottom: 4px;
      }

      span {
        min-width: 32px;
      }

      .input {
        display: flex;
        flex-direction: row;
        gap: 16px;
        row-gap: 8px;
        flex-wrap: wrap;

        .input-block {
          display: flex;
          flex-direction: row;
          gap: 8px;
          align-items: center;

          .input-wrapper {
            border-radius: 12px;
            border: 3px solid transparent;
            transition-duration: 200ms;
            &:focus-within {
              border: 3px solid rgba($color-primary-400, 0.4);
            }
          }
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }

        input[type="number"] {
          appearance: none;
          width: 140px;
          outline: none;
          border-radius: 10px;
          padding: 4px 6px;
          border: 2px solid rgba($color-primary-800, 0.1);
          transition-duration: 200ms;
          font-size: 14px;
          color: $text-light;
          &:focus,
          &:hover {
            border: 2px solid rgba($color-primary-400, 1);
          }
        }
      }
    }
  }
}
</style>
