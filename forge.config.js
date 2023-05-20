module.exports = {
  packagerConfig: {
    asar: true,
    icon: "src/icons/mac/icon",
    osxSign: {
      identity: "rxellent@gmail.com",
      "hardened-runtime": true,
      entitlements: "entitlements.plist",
      "entitlements-inherit": "entitlements.plist",
      "signature-flags": "library",
    },
    // osxNotarize: {
    //   tool: "notarytool",
    //   appleId: process.env.REACT_APP_APP_ID,
    //   appleIdPassword: process.env.REACT_APP_APP_ID_PASSWORD,
    //   teamId: process.env.REACT_APP_TEAM_ID,
    // },
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        authors: "Gottfried Kleinberger",
        setupExe: "utopics-visualizer.exe",
        setupIcon: "src/icons/win/icon.ico",
        name: "utopics-visualizer",
        description: "Utopics visualizer. Stream visual efx from Utopics.",
        noMsi: true,
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin", "linux"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        icon: "src/icons/png/32x32.png",
        maintainer: "Gottfried Kleinberger",
        executableName: "utopics-visualizer",
        name: "utopics-visualizer",
        description: "Utopics visualizer. Stream visual efx from Utopics.",
        licence: "MIT",
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
