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
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
