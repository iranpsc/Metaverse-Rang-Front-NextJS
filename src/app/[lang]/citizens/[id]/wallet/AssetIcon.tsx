import type { AssetIconType } from "./walletHistory.types";

interface AssetIconProps {
  type: AssetIconType;
  color: string;
}

const ASSET_ICON_SRC: Record<string, string> = {
  gauge: "https://s3.metarang.com/metarang/asset/threshold_of_effect.gif",
  trophy: "https://s3.metarang.com/metarang/asset/satisfaction.gif",
  flag: "https://s3.metarang.com/metarang/asset/red_tool.gif",
  coin: "https://s3.metarang.com/metarang/asset/coin_psc.gif",
  blueGem: "https://s3.metarang.com/metarang/asset/blue_tool.gif",
  yellowSparkle: "https://s3.metarang.com/metarang/asset/yellow_tool.gif",
  diamond: "https://s3.metarang.com/metarang/asset/rial.gif",
};

// Original per-type dimensions (kept so the swap doesn't shift layout)
const ASSET_ICON_SIZE: Record<string, { width: number; height: number }> = {
  trophy: { width: 61, height: 78 },
  flag: { width: 71, height: 73 },
  coin: { width: 74, height: 75 },
  gauge: { width: 70, height: 72 },
  blueGem: { width: 73, height: 73 },
  yellowSparkle: { width: 74, height: 72 },
  diamond: { width: 97, height: 78 },
};

export default function AssetIcon({ type, color }: AssetIconProps) {
  const key = ASSET_ICON_SRC[type] ? type : "diamond";
  const src = ASSET_ICON_SRC[key];
  const { width, height } = ASSET_ICON_SIZE[key];

  return (
    <img
      src={src}
      alt={type}
      width={width}
      height={height}
      style={{ display: "block" }}
    />
  );
}