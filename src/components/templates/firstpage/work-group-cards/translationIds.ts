/**
 * Unique translation IDs of the «work group & project cards» section.
 *
 * They continue after the highest ID in public/lang/{fa,en}.json (1809) and are stored in the «central-page»
 * modal, tab «work-group-cards», of both language files. The same entries must exist in the admin panel with
 * these IDs. «View all» reuses the existing ID 171.
 */
export const T = {
  heading: 1810,
  public: 1811,
  openSource: 1812,
  reposHeading: 1813,
  mediaHeading: 1814,
  figmaHeading: 1815,
  docs: 1816,
  orgHeading: 1817,
  groupName: 1818,
  bale: 1819,
  joinGroup: 1820,
  countRepos: 1821,
  countMedia: 1822,
  countDocs: 1823,
  countVersions: 1824,
  imageAlt: 1825,
  newTab: 1826,
  titleFront: 1827,
  titleMedia: 1828,
  titleBackend: 1829,
  titleWorld3d: 1830,
  titleGithub: 1831,
  titleUi: 1832,
  titleUrban: 1833,
  titleVodNft: 1834,
  title3dModel: 1835,
  titleAi: 1836,
  titleTimeTunnel: 1837,
  titleGeography: 1838,
  titleBlockchain: 1839,
  repoNextjs: 1840,
  repoReactjs: 1841,
  repoMicroservice: 1842,
  repoAdminPanel: 1843,
  repo3dMultiverse: 1844,
  repoServer: 1845,
  repoVod: 1846,
  repoNpc: 1847,
  repoTunnelBackend: 1848,
  repoTunnelFront: 1849,
  repoMaps: 1850,
  repoPsc: 1851,
  repoPsd: 1852,
  orgParadise: 1853,
  socialMedium: 1854,
  socialLinkedin: 1855,
  socialYoutube: 1856,
  socialSubstack: 1857,
  socialInstagram: 1858,
  figmaInternal: 1859,
  figmaExternal: 1860,
} as const;

/** Existing ID: «مشاهده همه» / «View All» (also used by the other homepage sections). */
export const VIEW_ALL_ID = 171;
