import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export const manifest = defineManifest(async (_env) => ({
  manifest_version: 3,
  name: "NPlayer",
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  description: "A simple player for M3U8, HLS, and DASH files",
  icons: {
    "16": "src/icons/icon.png",
    "48": "src/icons/icon.png",
    "128": "src/icons/icon.png",
  },
  action: {
    default_title: "NPlayer",
    default_icon: {
      "16": "src/icons/icon.png",
      "48": "src/icons/icon.png",
      "128": "src/icons/icon.png",
    },
  },
  permissions: ["declarativeNetRequest"],
  host_permissions: ["*://*/*.m3u8*"],
  web_accessible_resources: [
    {
      resources: ["index.html"],
      matches: ["<all_urls>"],
    },
  ],
  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
  content_scripts: [
    {
      js: ["src/content.ts"],
      matches: ["https://*/*", "http://*/*"],
    },
  ],
}));
