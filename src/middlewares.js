export const isAuthenticated = request => {
  if (!request.user) {
    throw Error('You need to l0g in to perform this action');
  }
};

export const isAdmin = request => {
  if (!request.user) {
    throw Error('You need to log in to perform this action');
  }

  if (request.user.role !== 'ADMIN') {
    throw Error('ACCESS DENIED');
  }
};
