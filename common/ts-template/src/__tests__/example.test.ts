import {testFunction} from '../index';

describe('myFunction', () => {
    it('should do something', () => {
        const result = testFunction();

        expect(result).toBe(200);
    });
});
