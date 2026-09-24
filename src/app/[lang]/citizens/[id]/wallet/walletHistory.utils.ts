import { ASSET_ORDER, type Period } from "./walletHistory.types";

/**
 * Builds the querystring for the summary/chart endpoints.
 * "All assets selected" is treated as "no filter" to match the API's
 * default behaviour. Pure function — no React, no network — so it can
 * be unit-tested directly:
 *
 *   expect(buildWalletQuery("weekly", ["blue", "red"])).toBe("period=weekly&assets=blue&assets=red")
 *   expect(buildWalletQuery("weekly", ASSET_ORDER)).toBe("period=weekly")
 */
export function buildWalletQuery(period: Period, selectedAssets: string[]): string {
  const qs = new URLSearchParams();
  const isAllSelected = selectedAssets.length === ASSET_ORDER.length;

  qs.append("period", period);
  if (!isAllSelected) {
    selectedAssets.forEach((asset) => qs.append("assets", asset));
  }

  return qs.toString();
}
