const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      email: 'example@example.com',
      name: 'John Doe',
      posts: {
        create: [
          {
            title: 'My first post',
            content: 'This is the content of my first post',
            published: true,
          },
        ],
      },
    },
  });

  console.log('New user created:', newUser);

  // Create a new post for an existing user
  const newPost = await prisma.post.create({
    data: {
      title: 'Another post',
      content: 'This is another post content',
      published: false,
      author: {
        connect: { id: newUser.id },
      },
    },
  });

  console.log('New post created:', newPost);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
