import { mergeKeyToObject } from './converter';

describe('utils test', () => {
  test('mergeKeyToObject', () => {
    const input = { '123': { name: 'thanh' }, '234': { name: 'dung' } };
    const expectedOutput = [
      { id: '123', name: 'thanh' },
      { id: '234', name: 'dung' }
    ];
    const result = mergeKeyToObject(input);
    expect(result).toMatchObject(expectedOutput);
  });
});
