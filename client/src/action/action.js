export const parserJWT = (token) => {
    try {
        const regex = /\.\w+\./g
        const parse = (token.match(regex))[0].replace(/\./g, '')
        return JSON.parse(window.atob(parse))
    } catch (error) {
        throw error
    }
}