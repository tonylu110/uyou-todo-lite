import { getVersion } from '@tauri-apps/api/app'

const appVersion = await getVersion()

const versionCodeArr: Array<number> = appVersion.split('.').map((item) => {
  return Number(item)
})

export const versionCode = versionCodeArr[0] * 100 + versionCodeArr[1] * 10 + Number(versionCodeArr[2])
