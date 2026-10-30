import { T } from "./translationIds";
import type {
  ResourceGroup,
  ResourceLink,
  WorkGroupCardData,
  WorkGroupLink,
} from "./types";

/* -------------------------------------------------------------------------- */
/* Small builders — they keep the data below readable and fully typed.        */
/* -------------------------------------------------------------------------- */

const IMAGE_BASE = "https://s3.metarang.com/metarang/asset/logo_cart";
const GITHUB_BASE = "https://github.com/iranpsc";
const GOOGLE_SEARCH = "https://www.google.com/search?q=";

const T_PUBLIC_GROUP = T.groupName;
const T_BALE = T.bale;

const workGroup = (slug: string): WorkGroupLink => ({
  href: `http://ble.ir/${slug}`,
  nameId: T_PUBLIC_GROUP,
  platformLabelId: T_BALE,
});

/** `slug` is only needed when the repository URL differs from the display name (e.g. letter case). */
const repo = (
  id: string,
  name: string,
  descriptionId: number,
  slug: string = name.replace(/ /g, "-"),
): ResourceLink => ({
  id,
  kind: "repository",
  platform: "github",
  href: `${GITHUB_BASE}/${slug}`,
  label: name,
  descriptionId,
});

const docs = (id: string, href: string): ResourceLink => ({
  id,
  kind: "document",
  platform: "web",
  href,
  label: T.docs,
});

const searchDocs = (id: string, encodedQuery: string): ResourceLink =>
  docs(id, `${GOOGLE_SEARCH}${encodedQuery}`);

const repositories = (id: string, links: ResourceLink[]): ResourceGroup => ({
  id,
  headingId: T.reposHeading,
  icon: "repository",
  layout: "list",
  links,
});

/* -------------------------------------------------------------------------- */
/* Cards — source: «کارت های توسعه.txt»                                        */
/* Document links keep the original Google search query; the session-specific */
/* tracking parameters of the original URLs were dropped.                     */
/* -------------------------------------------------------------------------- */

export const workGroupCards: readonly WorkGroupCardData[] = [
  {
    id: "front",
    titleId: T.titleFront,
    imageUrl: `${IMAGE_BASE}/Metaverse_Rang_Front_512.jpg`,
    isPublic: true,
    isOpenSource: true,
    workGroup: workGroup("metaverse_rang_front"),
    groups: [
      repositories("front-repos", [
        repo("front-nextjs", "Metaverse Rang Front NextJS", T.repoNextjs),
        repo("front-reactjs", "Metaverse Rang Front ReactJS", T.repoReactjs),
      ]),
    ],
    documents: [
      searchDocs(
        "front-docs",
        "%D8%A7%D8%B3%D9%86%D8%A7%D8%AF+%D9%85%D8%B1%D8%AA%D8%A8%D8%B7+%D8%A8%D9%87+%D8%AA%D9%88%D8%B3%D8%B9%D9%87+%D9%81%D8%B1%D8%A7%D9%86%D8%AA+%D9%85%D8%AA%D8%A7%D8%B1%D9%86%DA%AF",
      ),
    ],
  },
  {
    id: "media",
    titleId: T.titleMedia,
    imageUrl: `${IMAGE_BASE}/Metaverse_Rang_Media_512.jpg`,
    isPublic: true,
    isOpenSource: false,
    workGroup: workGroup("metaverse_rang_media"),
    groups: [
      {
        id: "media-active",
        headingId: T.mediaHeading,
        icon: "media",
        layout: "grid",
        links: [
          { id: "medium", kind: "social", platform: "medium", href: "https://medium.com/@metarang.iran", label: T.socialMedium },
          { id: "linkedin", kind: "social", platform: "linkedin", href: "https://www.linkedin.com/company/metaverse-rang", label: T.socialLinkedin },
          { id: "youtube", kind: "social", platform: "youtube", href: "https://www.youtube.com/@metargb", label: T.socialYoutube },
          { id: "substack", kind: "social", platform: "substack", href: "https://substack.com/@metarang", label: T.socialSubstack },
          { id: "instagram", kind: "social", platform: "instagram", href: "https://www.instagram.com/metaverse_rang", label: T.socialInstagram },
        ],
      },
    ],
    documents: [
      searchDocs(
        "media-docs",
        "%D8%A7%D8%B3%D9%86%D8%A7%D8%AF+%D9%85%D8%B1%D8%AA%D8%A8%D8%B7+%D8%A8%D9%87+%D8%B1%D8%B3%D8%A7%D9%86%D9%87+%D9%87%D8%A7%DB%8C+%D9%85%D8%AA%D8%A7%D8%B1%D9%86%DA%AF",
      ),
    ],
  },
  {
    id: "backend",
    titleId: T.titleBackend,
    imageUrl: `${IMAGE_BASE}/Metaverse_Rang_Backend_512.jpg`,
    isPublic: true,
    isOpenSource: true,
    workGroup: workGroup("metaverse_rang_bakend"),
    groups: [
      repositories("backend-repos", [
        repo("backend-microservice", "Metaverse Rang Microservice", T.repoMicroservice),
        repo("backend-admin", "Metaverse Rang Microservice Admin Panel", T.repoAdminPanel),
      ]),
    ],
    documents: [
      searchDocs(
        "backend-docs",
        "%D8%A7%D8%B3%D9%86%D8%A7%D8%AF+%D9%85%D8%B1%D8%AA%D8%A8%D8%B7+%D8%A8%D9%87+%D8%AA%D9%88%D8%B3%D8%B9%D9%87+%D8%A8%DA%A9%D9%86%D8%AF+%D9%85%D8%AA%D8%A7%D8%B1%D9%86%DA%AF",
      ),
    ],
  },
  {
    id: "world3d",
    titleId: T.titleWorld3d,
    imageUrl: `${IMAGE_BASE}/Metaverse_Rang_world_3d_512.jpg`,
    isPublic: true,
    isOpenSource: true,
    workGroup: workGroup("metaverse_rang_world3d"),
    groups: [
      repositories("world3d-repos", [
        repo("world3d-multiverse", "Metaverse Rang World 3D Multiverse", T.repo3dMultiverse),
        repo("world3d-server", "Metaverse Rang World 3D Multiverse Server", T.repoServer),
      ]),
    ],
    documents: [
      searchDocs(
        "world3d-docs",
        "%D8%A7%D8%B3%D9%86%D8%A7%D8%AF+%D9%85%D8%B1%D8%AA%D8%A8%D8%B7+%D8%A8%D9%87+%D8%AA%D9%88%D8%B3%D8%B9%D9%87+%D8%AC%D9%87%D8%A7%D9%86+%D8%B3%D9%87+%D8%A8%D8%B9%D8%AF%DB%8C+%D9%85%D8%AA%D8%A7%D8%B1%D9%86%DA%AF",
      ),
    ],
  },
  {
    id: "github-management",
    titleId: T.titleGithub,
    imageUrl: `${IMAGE_BASE}/Paradise_Supply_Chain_Holding_512.jpg`,
    isPublic: true,
    // The source lists an organization link here, not "open source repositories".
    isOpenSource: false,
    workGroup: workGroup("metaverse_rang_github"),
    groups: [
      {
        id: "github-org",
        headingId: T.orgHeading,
        icon: "organization",
        layout: "list",
        links: [
          {
            id: "paradise-holding",
            kind: "organization",
            platform: "github",
            href: GITHUB_BASE,
            label: "Paradise Supply Chain Holding",
            descriptionId: T.orgParadise,
          },
        ],
      },
    ],
    documents: [
      searchDocs(
        "github-docs",
        "%D8%A7%D8%B3%D9%86%D8%A7%D8%AF+%D9%85%D8%B1%D8%A8%D9%88%D8%B7+%D8%A8%D9%87+%DA%AF%DB%8C%D8%AA+%D9%87%D8%A7%D8%A8+iran+psc+%D9%85%D8%AA%D8%A7%D8%B1%D9%86%DA%AF",
      ),
    ],
  },
  {
    id: "ui",
    titleId: T.titleUi,
    imageUrl: `${IMAGE_BASE}/Metaverse_Rang_UI_UX_512.jpg`,
    isPublic: true,
    isOpenSource: false,
    workGroup: workGroup("metaverse_rang_ui_ux"),
    groups: [
      {
        id: "ui-figma",
        headingId: T.figmaHeading,
        icon: "design",
        layout: "list",
        // The «Figma 3D environments» entry in the source has no link, so it is not rendered.
        links: [
          {
            id: "figma-internal",
            kind: "design",
            platform: "figma",
            href: "https://www.figma.com/design/lHgvuzgJhUFACNpMBJK0jI/ui?node-id=34-1989&t=I1MeiKvWGrsTNl1f-1",
            label: T.figmaInternal,
          },
          {
            id: "figma-external",
            kind: "design",
            platform: "figma",
            href: "https://www.figma.com/design/qyvJ4Sjw4h5gRIrE9KotBY/ui-next?node-id=2474-218&t=Eq9vwV0mXGNDZvZr-1",
            label: T.figmaExternal,
          },
        ],
      },
    ],
    documents: [
      searchDocs(
        "ui-docs",
        "%D8%A7%D8%B3%D9%86%D8%A7%D8%AF+%D9%85%D8%B1%D8%A8%D9%88%D8%B7+%D8%A8%D9%87+%D8%AA%D9%88%D8%B3%D8%B9%D9%87+%D8%B1%D8%A7%D8%A8%D8%B7+%DA%A9%D8%A7%D8%B1%D8%A8%D8%B1%DB%8C+%D9%85%D8%AA%D8%A7%D8%B1%D9%86%DA%AF",
      ),
    ],
  },
  {
    id: "urban",
    titleId: T.titleUrban,
    imageUrl: `${IMAGE_BASE}/Metaverse_Rang_Urban_Development_512.jpg`,
    isPublic: true,
    isOpenSource: false,
    workGroup: workGroup("metaverse_rang_urban_development"),
    groups: [],
    documents: [
      searchDocs(
        "urban-docs",
        "%D8%A7%D8%B3%D9%86%D8%A7%D8%AF+%D9%85%D8%B1%D8%AA%D8%A8%D8%B7+%D8%A8%D9%87+%D8%AA%D9%88%D8%B3%D8%B9%D9%87+%D8%B4%D9%87%D8%B1%DB%8C+%D9%85%D8%AA%D8%A7%D8%B1%D9%86%DA%AF",
      ),
    ],
  },
  {
    id: "vod-nft",
    titleId: T.titleVodNft,
    imageUrl: `${IMAGE_BASE}/Metaverse_Rang_Sovereign_Assets_NFT_VOD_512.jpg`,
    isPublic: true,
    isOpenSource: true,
    workGroup: workGroup("metaverse_rang_assets_nft_vod"),
    groups: [
      repositories("vod-repos", [
        repo("vod-nft", "Metaverse Rang Sovereign Assets NFT VOD", T.repoVod),
      ]),
    ],
    documents: [
      searchDocs(
        "vod-docs",
        "%D8%A7%D8%B3%D9%86%D8%A7%D8%AF+%D9%85%D8%B1%D8%AA%D8%A8%D8%B7+%D8%A8%D9%87+%D8%A7%D8%B3%D9%86%D8%A7%D8%AF+%D9%85%D8%A7%D9%84%DA%A9%DB%8C%D8%AA+%D9%85%D8%AC%D8%A7%D8%B2%DB%8C+VOD+%D9%85%D8%AA%D8%A7%D8%B1%D9%86%DA%AF",
      ),
    ],
  },
  {
    id: "3d-model",
    titleId: T.title3dModel,
    imageUrl: `${IMAGE_BASE}/Metaverse_Rang_3dmodel_512.jpg`,
    isPublic: true,
    isOpenSource: false,
    workGroup: workGroup("metaverse_rang_3dmodel"),
    groups: [],
    documents: [
      searchDocs(
        "3d-model-docs",
        "%D8%A7%D8%B3%D9%86%D8%A7%D8%AF+%D9%85%D8%B1%D8%AA%D8%A8%D8%B7+%D8%A8%D9%87+%D9%85%D8%AF%D9%84+%D8%B3%D8%A7%D8%B2%DB%8C+%D8%B3%D9%87+%D8%A8%D8%B9%D8%AF%DB%8C+%D9%85%D8%AA%D8%A7%D8%B1%D9%86%DA%AF",
      ),
    ],
  },
  {
    id: "ai",
    titleId: T.titleAi,
    imageUrl: `${IMAGE_BASE}/Metaverse_Rang_Semi_Intelligent_NPC_512.jpg`,
    isPublic: true,
    isOpenSource: true,
    // Note: this group link has a different slug pattern in the source.
    workGroup: workGroup("semi_intelligent_npc"),
    groups: [
      repositories("ai-repos", [
        repo("ai-npc", "Metaverse Rang Semi intelligent NPC", T.repoNpc),
      ]),
    ],
    documents: [
      searchDocs(
        "ai-docs",
        "%D8%A7%D8%B3%D9%86%D8%A7%D8%AF+%D9%85%D8%B1%D8%AA%D8%A8%D8%B7+%D8%A8%D9%87+%D8%AA%D9%88%D8%B3%D8%B9%D9%87+%D9%87%D9%88%D8%B4+%D9%85%D8%B5%D9%86%D9%88%D8%B9%DB%8C+NPC+%D9%85%D8%AA%D8%A7%D8%B1%D9%86%DA%AF",
      ),
    ],
  },
  {
    id: "time-tunnel",
    titleId: T.titleTimeTunnel,
    imageUrl: `${IMAGE_BASE}/SSO_Paradise_Supply_Chain_512.jpg`,
    isPublic: true,
    isOpenSource: true,
    workGroup: workGroup("sso_paradise_supply_chain"),
    groups: [
      repositories("tunnel-repos", [
        repo("tunnel-backend", "SSO Paradise Supply Chain GO", T.repoTunnelBackend, "SSO-Paradise-Supply-Chain-Go"),
        repo("tunnel-front", "SSO Paradise Supply Chain GO Front", T.repoTunnelFront, "SSO-Paradise-Supply-Chain-Go-Front"),
      ]),
    ],
    documents: [
      searchDocs(
        "tunnel-docs",
        "%D8%A7%D8%B3%D9%86%D8%A7%D8%AF+%D9%85%D8%B1%D8%AA%D8%A8%D8%B7+%D8%A8%D9%87+%D8%B3%D8%A7%D9%85%D8%A7%D9%86%D9%87+%D8%AA%D9%88%D9%86%D9%84+%D8%B2%D9%85%D8%A7%D9%86+%D8%AF%D8%B1%D9%88%D8%A7%D8%B2%D9%87+%D9%88%D8%B1%D9%88%D8%AF+%D8%A8%D9%87+%D9%85%D8%AA%D8%A7%D8%B1%D9%86%DA%AF",
      ),
    ],
  },
  {
    id: "geography",
    titleId: T.titleGeography,
    imageUrl: `${IMAGE_BASE}/Metaverse_Rang_Geographical_Maps_512.jpg`,
    isPublic: true,
    isOpenSource: true,
    workGroup: workGroup("metaverse_rang_geographical_maps"),
    groups: [
      repositories("geo-repos", [
        repo("geo-maps", "Metaverse Rang Geographical Maps", T.repoMaps),
      ]),
    ],
    documents: [
      searchDocs(
        "geo-docs",
        "%D8%A7%D8%B3%D9%86%D8%A7%D8%AF+%D9%85%D8%B1%D8%AA%D8%A8%D8%B7+%D8%A8%D9%87+%D9%86%D9%82%D8%B4%D9%87+%D8%AC%D8%BA%D8%B1%D8%A7%D9%81%DB%8C%D8%A7%DB%8C%DB%8C+%D9%85%D8%AA%D8%A7%D9%88%D8%B1%D8%B3+%D8%B1%D9%86%DA%AF",
      ),
    ],
  },
  {
    id: "blockchain",
    titleId: T.titleBlockchain,
    imageUrl: `${IMAGE_BASE}/Metaverse_Rang_PSC_Governance_Coin_512.jpg`,
    isPublic: true,
    isOpenSource: true,
    workGroup: workGroup("metaverse_rang_psc_coin"),
    groups: [
      repositories("chain-repos", [
        // The source labels this entry "Metaverse Rang Geographical Maps" (a copy-paste slip);
        // the name below follows the repository URL it links to.
        repo("chain-psc", "Metaverse Rang PSC Governance Coin", T.repoPsc),
        repo("chain-psd", "Metaverse Rang PSD Governance Token", T.repoPsd),
      ]),
    ],
    documents: [docs("chain-docs", "https://metarang.com/fa/whitepaper")],
  },
];
