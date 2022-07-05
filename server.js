const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() 
{
  const vacinados = await prisma
    .vacinado
    .findMany()
    
  console.log(vacinados)
}

main()
  .catch(e => {throw e})
  .finally(async () => await prisma.$disconnect())
