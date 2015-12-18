import { expect } from 'chai';

import { parseID } from '../app/imdb/id_parser';
import { createLink } from '../app/imdb/link_creator';

const prefix = 'tt';
const urlPrefix = 'http://www.imdb.com/title/';

describe('imdb', () => {
  function zeroFill( number, width = 7) {
  width -= number.toString().length;
    if ( width > 0 ) {
      return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + "";
  }

    it('extracts the id', () => {
      expect(parseID(prefix + zeroFill(0))).to.equal('tt' + zeroFill(0));
      expect(parseID(prefix + zeroFill(-1))).to.equal(null);
      expect(parseID(prefix + zeroFill(888888888))).to.equal(null);
      expect(parseID('aaa')).to.equal(null);
      expect(parseID('')).to.equal(null);
      expect(parseID('http://www.imdb.com/title/tt4046784/')).to.equal('tt4046784');

      for (var i = 0; i < 10; i++) {
        const id = 'tt' + zeroFill(Math.round(Math.random() * 10000));
        expect(parseID(zeroFill(id))).to.equal(id);
      }

      for (var i = 0; i < 10; i++) {
        const id = 'tt' + zeroFill(Math.round(Math.random() * 100000));
        expect(parseID(zeroFill(id))).to.equal(id);
      }

      for (var i = 0; i < 10; i++) {
        const id = 'tt' + zeroFill(Math.round(Math.random() * 1000000));
        expect(parseID(zeroFill(id))).to.equal(id);
      }
    });


    it('generates the link', () => {
      for (var i = 0; i < 10; i++) {
        const id = 'tt' + zeroFill(Math.round(Math.random() * 10000));
        expect(createLink(zeroFill(id))).to.equal(urlPrefix + id);
      }

      for (var i = 0; i < 10; i++) {
        const id = 'tt' + zeroFill(Math.round(Math.random() * 100000));
        expect(createLink(zeroFill(id))).to.equal(urlPrefix + id);
      }

      for (var i = 0; i < 10; i++) {
        const id = 'tt' + zeroFill(Math.round(Math.random() * 1000000));
        expect(createLink(zeroFill(id))).to.equal(urlPrefix + id);
      }
    });
});
