import { getReferenceVideoFileName } from '../../../src/libs/videoUtils';

describe('videoUtils', function () {
  describe('getReferenceVideoFileName', () => {
    it('should return corret referenec video file name', () => {
      const res = getReferenceVideoFileName({ inputFileName: 'foo' });
      expect(res).to.eql('foo.mp4');
    })

  });
})