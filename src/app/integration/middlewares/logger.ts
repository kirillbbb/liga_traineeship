export default () => (next: any) => (action: any) => {
  console.log('%cACTION:', 'color: #4caf50', action);
  return next(action);
};
