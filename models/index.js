const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    art: prisma.art
}