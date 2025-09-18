<template>
  <div class="org-register">
    <div class="content">
      <div class="header">
        <div class="logo">
          <img src="/logo-horizontal.svg" />
        </div>
        <div class="title">Đăng ký tài khoản doanh nghiệp</div>
      </div>
      <div class="top">
        <UStepper v-model="activeTab" :items="items" class="w-full stepper" />
      </div>
      <!-- <div class="title">{{ items[activeTab]?.title }}</div> -->
      <div class="description">
        {{ description[activeTab] }}
      </div>
      <div class="step-content">
        <OrgRegisterStep1
          v-show="activeTab == 0"
          :data="formData.organization as Record<string, unknown>"
          @input="handleInputOrganization($event)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { StepperItem } from "@nuxt/ui";

definePageMeta({
  layout: "auth",
});

const items = ref<StepperItem[]>([
  {
    title: "Thông tin doanh nghiệp",
    icon: "ic:round-location-city",
  },
  {
    title: "Địa chỉ & Logo",
    icon: "ic:round-edit-location-alt",
  },
  {
    title: "Thông tin tài khoản",
    icon: "ic:round-person",
  },
]);

const activeTab = ref<number>(0);
const formData = ref<Record<string, any>>({
  organization: {
    name: "",
    website: "",
    hasRemote: false,
    companySize: "",
  },
});

const handleInputOrganization = (e: Record<string, any>) => {
  formData.value.organization[e.key] = e.value;
};
const description = [
  "Nhập các thông tin cơ bản của doanh nghiệp như tên công ty, số lượng nhân sự, lĩnh vực hoạt động, v.v",
  "Cung cấp địa chỉ và tải lên logo hoặc hình ảnh nhận diện của doanh nghiệp.",
  "Tạo tài khoản với tên đăng nhập, email và mật khẩu để quản lí doanh nghiệp của bạn.",
];
</script>
<style lang="scss" scoped>
.org-register {
  padding-top: 36px;
  padding-left: 14%;
  padding-right: 14%;

  @include respond-max($breakpoint-md) {
    padding-left: 9%;
    padding-right: 9%;
  }

  @include respond-max($breakpoint-sm) {
    padding-top: 12px;
    padding-left: 5%;
    padding-right: 5%;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-bottom: 12px;
      .logo {
        display: flex;
        justify-content: center;
        margin-bottom: 12px;
        img {
          height: 58px;
        }
      }

      .title {
        text-align: center;
        font-weight: 900;
        font-size: 24px;
        color: $color-primary-500;
        line-height: 24px;
        margin-bottom: 24px;
      }
    }

    .top {
      width: 100%;
      margin-bottom: 24px;
      .stepper {
        :deep(button) {
          cursor: pointer;
        }
      }
    }

    .title {
      font-size: 16px;
      list-style: 20px;
      font-weight: 700;
      margin-bottom: 8px;
      color: $text-light;
    }
    .description {
      font-size: 14px;
      line-height: 20px;
      color: $color-gray-500;
      width: min(500px, 80%);
      text-align: center;
      font-style: italic;
    }

    .step-content {
      margin-top: 24px;
      width: min(750px, 80%);

      :deep(.text-input) {
        .input {
          padding: 4px 6px;
          input {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
