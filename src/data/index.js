import {removeTrailingSlashes, removeProtocols} from '@/util'

const pjson = require('../../package.json')

export const ROOT_URL = removeTrailingSlashes(pjson.root)

export const PROJECT_PATH = pjson.path

export const emailRegex = "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)"

export const taggingScript = (hostname) => {
    return  hostname == removeProtocols(ROOT_URL)
    // production
    ? '//assets.adobedtm.com/launch- EN9a3781943c7a420ab8158e4f9cfecf88.min.js'
    // development
    : '//assets.adobedtm.com/launch-ENc07edfb1c11e4662a63619a1da5b94ff-development.min.js'
}