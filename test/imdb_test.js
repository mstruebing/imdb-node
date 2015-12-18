import { expect } from 'chai';

import { parseID } from '../app/imdb/id_parser';
import { createLink } from '../app/imdb/link_creator';

describe('application logic', () => {

  function zeroFill( number, width = 7) {
  width -= number.toString().length;
    if ( width > 0 ) {
      return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + "";
  }

    it('extracts the id', () => {
      for (var i = 0; i < 1000; i++) {
        expect(parseID('tt' + zeroFill(i))).to.equal('tt' + zeroFill(i));
      }
    });

    it('generates the link', () => {
    });
});
