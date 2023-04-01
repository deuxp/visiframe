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
        author: "Gottfried Kleinberger",
        exe: "utopics-visualizer.exe",
        name: "utopics-visualizer",
        description: "Utopics visualizer. Stream visual efx from Utopics.",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        icon: "src/icons/png/32x32.png",
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
