export const mergeKeyToObject = (object: any) => {
  // input: { '123': { name: 'thanh' }, '234': { name: 'dung' } }
  // [ [ '123', { name: 'thanh' } ], [ '234', { name: 'dung' } ] ]
  // output: [{ id: '123', name: 'thanh' }, { id: '234', name: dung }]
  return object
    ? Object.entries(object).map(([id, obj]) => ({
        ...obj,
        id
      }))
    : [];
};
