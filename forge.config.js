module.exports = {
  packagerConfig: {
    osxSign: {
      entitlements: "./entitlements.plist",
    },
    osxNotarize: {
      tool: "notarytool",
      appleId: process.env.REACT_APP_APPLE_ID,
      appleIdPassword: process.env.REACT_APP_APPLE_ID_PASSWORD,
      teamId: process.env.REACT_APP_TEAM_ID,
    },
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
