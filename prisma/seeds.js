const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async ($tx) => {
    const newUser = await $tx.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
      }
    });

    const newPost = await $tx.post.create({
      data: {
        userId: newUser.id,
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
      }
    });

    await $tx.comment.createMany({
      data: [
        {
          authorId: newUser.id,
          postId: newPost.id,
          text: faker.lorem.paragraphs()
        },
        {
          authorId: newUser.id,
          postId: newPost.id,
          text: faker.lorem.paragraphs()
        },
        {
          authorId: newUser.id,
          postId: newPost.id,
          text: faker.lorem.paragraphs()
        },
        {
          authorId: newUser.id,
          postId: newPost.id,
          text: faker.lorem.paragraphs()
        }
      ]
    });
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
