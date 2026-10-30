/** What a resource link points at. Drives the icon and, for repositories, the Open Source rule. */
export type LinkKind = "repository" | "social" | "design" | "organization" | "document";

export type Platform =
  | "github"
  | "medium"
  | "linkedin"
  | "youtube"
  | "substack"
  | "instagram"
  | "figma"
  | "web";

export type GroupIcon = "repository" | "media" | "design" | "organization";

/** "list" = one full-width row per link; "grid" = two columns of compact links. */
export type GroupLayout = "list" | "grid";

export interface ResourceLink {
  /** Stable, unique within its card (used as React key). */
  id: string;
  kind: LinkKind;
  platform: Platform;
  href: string;
  /** string → shown verbatim (repository names); number → translation ID. */
  label: string | number;
  /** Optional translation ID; used as the accessible description. */
  descriptionId?: number;
}

export interface ResourceGroup {
  id: string;
  /** Translation ID of the divider heading. */
  headingId: number;
  icon: GroupIcon;
  layout: GroupLayout;
  links: ResourceLink[];
}

export interface WorkGroupLink {
  href: string;
  /** Translation ID of the group name. */
  nameId: number;
  /** Translation ID of the messenger name (second line of the group box). */
  platformLabelId: number;
}

export interface WorkGroupCardData {
  id: string;
  titleId: number;
  /** Optional: Figma shows an eyebrow line and a description; the source data has neither. */
  eyebrowId?: number;
  descriptionId?: number;
  imageUrl: string;
  isPublic: boolean;
  /** Only honoured when the card also has at least one repository link. */
  isOpenSource: boolean;
  workGroup: WorkGroupLink;
  /** Zero or more groups (repositories, media, figma versions, ...). */
  groups: ResourceGroup[];
  /** Related-document links; shown after the last group (or on their own). */
  documents: ResourceLink[];
}
