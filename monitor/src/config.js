const config = {
  reportUrl: 'http://localhost:8000/reportData',
  projectName: 'fd-example'
}

export function setConfig(options) {
  for (const key in config) {
      if (options[key]) {
          config[key] = options[key]
      }
  }
}
export default config