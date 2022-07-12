const { PrismaClient } = require("@prisma/client")
const   client         = new PrismaClient()
exports.repositorio    = () => client.dose;