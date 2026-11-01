<template>
  <div class="loading">
    <div class="inner">
      <div class="orb" aria-hidden="true">
        <span class="halo"></span>
        <span class="orbit o1"><span class="p"></span></span>
        <span class="orbit o2"><span class="p"></span></span>
        <LogoBadge :size="64" class="badge" />
      </div>
      <div class="bar"><span></span></div>
    </div>
  </div>
</template>

<script setup>
import LogoBadge from "@/components/LogoBadge.vue";
</script>

<style scoped>
.loading {
  position: fixed;
  inset: 0;
  z-index: 100;
  /* 无兜底：直接透出底下 Background 组件（壁纸就绪显示壁纸，未就绪显示动态极光，
     二者与揭开后的背景完全一致，无缝衔接）。主页卡片在加载期间由 .page 隐藏（见 App.vue）。 */
  background: transparent;
  display: grid;
  place-items: center;
}

.inner {
  position: relative;
  text-align: center;
}

/* ── 星核 + 光环 + 轨道粒子 ── */
.orb {
  position: relative;
  width: 132px;
  height: 132px;
  margin: 0 auto;
}

.badge {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 64px;
  height: 64px;
  animation: pulse 2s ease-in-out infinite;
}

/* 渐变光环：conic 渐变幻成圆环（mask 抠出细带），旋转时流光环绕 */
.halo {
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    var(--accent1) 90deg,
    var(--accent2) 180deg,
    var(--accent1) 270deg,
    transparent 360deg
  );
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
  opacity: 0.85;
  animation: halo-spin 3.2s linear infinite;
}

/* 轨道层：自转带动粒子绕中心公转（粒子为圆形，旋转无朝向问题） */
.orbit {
  position: absolute;
  inset: 0;
}

.orbit .p {
  position: absolute;
  top: 2px;
  left: 50%;
  width: 7px;
  height: 7px;
  margin-left: -3.5px;
  border-radius: 50%;
  background: var(--accent2);
  box-shadow: 0 0 10px var(--accent2);
}

.o1 {
  animation: spin 2.9s linear infinite;
}

.o2 {
  animation: spin 4.3s linear infinite reverse;
}

.o2 .p {
  top: auto;
  bottom: 2px;
  background: var(--accent1);
  box-shadow: 0 0 10px var(--accent1);
}

/* ── 进度条：渐变流光 + 辉光 ── */
.bar {
  width: 150px;
  height: 3px;
  margin: 20px auto 0;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
  position: relative;
}

.bar span {
  display: block;
  height: 100%;
  width: 34%;
  border-radius: 99px;
  background: linear-gradient(90deg, var(--accent1), var(--accent2));
  box-shadow: 0 0 12px rgba(129, 140, 248, 0.55);
  /* 壁纸加载时长不定，进度条改为往复扫动 */
  animation: load-sweep 1.15s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes halo-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 6px rgba(129, 140, 248, 0));
  }
  50% {
    transform: scale(1.05);
    filter: drop-shadow(0 0 14px rgba(129, 140, 248, 0.55));
  }
}

@keyframes load-sweep {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(394%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .halo,
  .orbit,
  .badge,
  .bar span {
    animation: none;
  }
}
</style>