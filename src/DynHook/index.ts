import { reactive } from 'vue'

interface DynHookState extends Record<string, any> {
	options: any[],
	loading: boolean,
	successFetchCount: number,
	onFetch: (query: Record<string, any>) => Promise<void>,
}

function DynHook(defaults: Partial<DynHookState>) {
	const dynHookState = reactive<DynHookState>({
		options: [],
		loading: false,
		successFetchCount: 0,
		...defaults,
		onFetch: async (query) => {
			if (!defaults.onFetch) {
				console.warn('select hook没有onFetch方法提供')
				return
			};
			dynHookState.loading = true
			try {
				await defaults.onFetch(query)
				dynHookState.successFetchCount += 1
			} finally {
				dynHookState.loading = false
			}
		},
	});
	return dynHookState
}

export default DynHook