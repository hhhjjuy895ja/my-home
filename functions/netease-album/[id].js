/**
 * GET /netease-album/:id —— 网易云专辑详情同源代理
 * 对应 vite.config.js 中 server/preview 的同名代理，生产环境由本函数托管。
 */
const UPSTREAM = "https://music.163.com/api/v1/album";

export async function onRequestGet({ request, params }) {
	const target = new URL(`${UPSTREAM}/${params.id}`);

	const resp = await fetch(target.toString(), {
		method: request.method,
		headers: request.headers,
		redirect: "follow",
	});

	const headers = new Headers();
	for (const name of ["content-type", "cache-control", "date", "expires", "vary"]) {
		const v = resp.headers.get(name);
		if (v) headers.set(name, v);
	}
	return new Response(resp.body, { status: resp.status, headers });
}