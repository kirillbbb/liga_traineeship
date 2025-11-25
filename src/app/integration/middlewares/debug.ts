export default () => (next: any) => (action: any) => {
  console.debug('DEBUG →', action.type);
  return next(action);
};
