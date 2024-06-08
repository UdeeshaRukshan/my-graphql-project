import { AddUserInput, UpdateUserInput, User } from './types';

const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'admin' },
  { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'user' },
];

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    user: (_parent: unknown, { id }: { id: string }): User | undefined => {
        // Find the user with the provided id
        const foundUser = users.find(user => user.id === id);
        return foundUser; // Return the found user or undefined if not found
      },
  },
  Mutation: {
    addUser: (_parent: unknown, { input }: { input: AddUserInput }): User => {
      const id = String(users.length + 1);
      const user = { id, ...input };
      users.push(user);
      return user;
    },
    updateUser: (_parent: unknown, { id, input }: { id: string, input: UpdateUserInput }): User => {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Update user properties with input data
      users[userIndex] = {
        ...users[userIndex],
        ...input,
      };

      return users[userIndex];
    },
  },
};

export default resolvers;
