// @flow
//
type Error = string;
type Resource = 'user' | 'book';

export const errors: { [string]: string } = {
  create: 'Can not create',
  get: 'Can not find',
  update: 'Can not update',
  delete: 'Can not delete',
};

export const getErrors = (resource: Resource): { [string]: Error } => ({
  create: errors.create + ' ' + resource,
  get: errors.get + ' ' + resource,
  update: errors.update + ' ' + resource,
  delete: errors.delete + ' ' + resource,
});
