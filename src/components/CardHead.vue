<template>
  <div class="head" :style="mb ? { marginBottom: mb } : undefined">
    <span class="head-left">
      <Icon :name="icon" :size="15" />
      <span>{{ title }}</span>
    </span>
    <slot />
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

// 数据卡共享卡头（参考 home 仓库的 CardHead）：左侧图标 + 标题，
// 右侧用默认插槽放各卡特有内容，margin-bottom 经 mb 注入
defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  mb: { type: String, default: "" },
});
</script>

<style scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.head-left {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-dim);
}
</style>
