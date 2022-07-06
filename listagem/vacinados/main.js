const { PrismaClient } = require("@prisma/client")
const   repositorio    = new PrismaClient()

exports.listar = async function ()
{
  return await repositorio
    .vacinado
    .findMany();
}
