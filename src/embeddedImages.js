// Images replaced with Cloudinary CDN URLs to remove ~35KB of base64 data from the JS bundle.
// Previously these were base64-encoded data URIs which inflated the critical-path JS
// by 25+ KiB and appeared as "unused JavaScript" in Lighthouse audits.
// CDN URLs load as separate image requests (parallel, cached) — zero JS bundle cost.
export const estateAvif = "https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_35,w_450/estate_tree_care_ykpxxt";
export const pruningAvif = "https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_35,w_450/pruning_tree_care_q6wspn";
