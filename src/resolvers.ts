import { PrismaClient } from '@prisma/client';
import { ApolloError } from 'apollo-server-express';

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await prisma.user.findMany({
          include: {
            posts: true,
          },
        });
      } catch (error) {
        throw new ApolloError('Failed to fetch users', 'FETCH_USERS_ERROR', { error });
      }
    },
    user: async (_parent: unknown, { id }: { id: string }) => {
      try {
        return await prisma.user.findUnique({
          where: {
            id: Number(id),
          },
          include: {
            posts: true,
          },
        });
      } catch (error) {
        throw new ApolloError('Failed to fetch user', 'FETCH_USER_ERROR', { error });
      }
    },
    posts: async () => {
      try {
        return await prisma.post.findMany({
          include: {
            author: true,
          },
        });
      } catch (error) {
        throw new ApolloError('Failed to fetch posts', 'FETCH_POSTS_ERROR', { error });
      }
    },
    post: async (_parent: unknown, { id }: { id: string }) => {
      try {
        return await prisma.post.findUnique({
          where: {
            id: Number(id),
          },
          include: {
            author: true,
          },
        });
      } catch (error) {
        throw new ApolloError('Failed to fetch post', 'FETCH_POST_ERROR', { error });
      }
    },
  },
  Mutation: {
    createUser: async (_parent: unknown, { input }: { input: { email: string; name: string; role: string } }) => {
      try {
        return await prisma.user.create({
          data: {
            email: input.email,
            name: input.name,
            
          },
        });
      } catch (error) {
        throw new ApolloError('Failed to create user', 'CREATE_USER_ERROR', { error });
      }
    },
    updateUser: async (_parent: unknown, { id, input }: { id: string, input: { name?: string; email?: string; role?: string } }) => {
      try {
        return await prisma.user.update({
          where: { id: Number(id) },
          data: input,
        });
      } catch (error) {
        throw new ApolloError('Failed to update user', 'UPDATE_USER_ERROR', { error });
      }
    },
  },
  User: {
    posts: async (parent: { id: number }) => {
      try {
        return await prisma.post.findMany({
          where: {
            authorId: parent.id,
          },
        });
      } catch (error) {
        throw new ApolloError('Failed to fetch user posts', 'FETCH_USER_POSTS_ERROR', { error });
      }
    },
  },
  Post: {
    author: async (parent: { authorId: number }) => {
      try {
        return await prisma.user.findUnique({
          where: {
            id: parent.authorId,
          },
        });
      } catch (error) {
        throw new ApolloError('Failed to fetch post author', 'FETCH_POST_AUTHOR_ERROR', { error });
      }
    },
  },
};

export default resolvers;
