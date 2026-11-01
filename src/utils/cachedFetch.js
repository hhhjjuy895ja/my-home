/**
 * 数据卡片统一的「localStorage 缓存 → 带超时拉取 → 回写」模板（参考 home 仓库）
 *
 * 约定：
 *  - 缓存统一存 { ts, data }；
 *  - loader(signal) 返回 data：非 null 则回写缓存并返回；返回 null 表示
 *    「数据无效但不报错」，不缓存；抛错（网络/解析失败）原样上抛，由调用方决定失败态；
 *  - 超时默认 8s，经 AbortController 中止。
 */
export async function cachedFetch({ key, ttl = 0, timeout = 8000, loader }) {
  try {
    const cached = JSON.parse(localStorage.getItem(key) || "null");
    if (cached && cached.data != null && ttl > 0 && Date.now() - cached.ts < ttl) {
      return cached.data;
    }
  } catch {
    // 缓存解析失败则正常请求
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  try {
    const data = await loader(ctrl.signal);
    if (data != null) {
      try {
        localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
      } catch {
        // 存储失败不影响展示
      }
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}
