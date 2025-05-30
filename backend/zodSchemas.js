const zod = require('zod')

const userSchemaSignUp = zod.object({
    firstName:zod.string().max(50),
    lastname:zod.string().max(50),
    email:zod.string().email().min(3).max(30),
    password:zod.string().min(6)
})
const userSchemaSignIn = zod.object({
    email:zod.string().email().min(3).max(30),
    password:zod.string().min(6)
})
module.exports = {
    userSchemaSignIn,
    userSchemaSignUp
}