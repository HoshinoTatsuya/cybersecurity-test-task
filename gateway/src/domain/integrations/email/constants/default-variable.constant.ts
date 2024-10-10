const encodingFile = 'base64'

const mainLogoPath = `${__dirname}/../assets/logo.jpeg`
const appStoreLogoPath = `${__dirname}/../assets/appstore.jpeg`
const googlePlayLogoPath = `${__dirname}/../assets/googleplay.jpeg`

const mainLogoLink = 'https://img.lave.tech/logo.jpeg'
const appStoreLogoLink = 'https://img.lave.tech/appstore.jpeg'
const googlePlayLogoLink = 'https://img.lave.tech/googleplay.jpeg'

export const defaultTitle: string = 'LAVE'
export const defaultProjectName: string = 'LAVE'
export const realProjectName: string = 'Cargo Solutions'
export const realProjectCP = ' © ' + new Date(Date.now()).getFullYear()
export const mainLogo: string = mainLogoLink //fs.readFileSync(mainLogoPath).toString(encodingFile)
export const appStoreLogo: string = appStoreLogoLink //fs.readFileSync(appStoreLogoPath).toString(encodingFile)
export const googlePlayLogo: string = googlePlayLogoLink //fs.readFileSync(googlePlayLogoPath).toString(encodingFile)
