/**
 * Check if running inside Tauri environment
 */
export const useTauriAvailable = () => {
	if (import.meta.server) return false;
    // @ts-expect-error
	return !!window.__TAURI_INTERNALS__;
};
