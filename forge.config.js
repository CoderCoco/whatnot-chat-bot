const packageJson = require('./package.json');
const { version } = packageJson;

module.exports = {
  packagerConfig: {
    "asar": true
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: (arch) => ({
        name: 'whatnot-chatbot',
        authors: 'CoderCoco',
        exe: 'whatnot-chatbot.exe',
        noMsi: true,
        setupExe: `whatnot-chatbot-${version}-win32-${arch}-setup.exe`
      })
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'CoderCoco',
          name: 'whatnot-chat-bot',
        },
        draft: true,
        prerelease: false,
      }
    }
  ]
};
