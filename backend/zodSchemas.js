const zod = require('zod')

const userSchemaSignUp = zod.object({
    firstname:zod.string().max(50),
    lastname:zod.string().max(50),
    email:zod.string().email().min(3).max(30),
    password:zod.string().min(6)
})
const userSchemaSignIn = zod.object({
    email:zod.string().email().min(3).max(30),
    password:zod.string().min(6)
})
 const updateBodySchema = zod.object({
    firstName:zod.string().max(50).optional(),
    lastname:zod.string().max(50).optional(),
    password:zod.string().min(6).optional(),
})
module.exports = {
    userSchemaSignIn,
    userSchemaSignUp,
    updateBodySchema
}