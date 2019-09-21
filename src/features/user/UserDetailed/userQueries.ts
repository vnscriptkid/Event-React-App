export const userDetailedQueryFactory = (userId: string) => [
  {
    collection: `users`,
    doc: userId,
    subcollections: [{ collection: `photos` }],
    storeAs: 'photos'
  },
  {
    collection: `users`,
    doc: userId,
    storeAs: 'userProfile'
  }
];
