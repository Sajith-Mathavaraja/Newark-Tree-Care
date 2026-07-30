// Images served from local public/assets — using absolute paths via Vite's BASE_URL.
// This ensures the correct absolute URL in both dev (/assets/...) and production (/Newark-Tree-Care/assets/...).
// Using high-quality WebP format (17 KB estate, 43 KB pruning) for sharp visuals.
export const estateAvif = import.meta.env.BASE_URL + "assets/estate.webp";
export const pruningAvif = import.meta.env.BASE_URL + "assets/service_pruning.webp";
