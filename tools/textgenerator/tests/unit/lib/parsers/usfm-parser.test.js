/**
 * Setup test libraries
 *
 */
var chai = require('chai');
var should = chai.should();
var mockery = require('mockery');
var sinon = require('sinon');

describe("Parser: USFM", function() {
  var usfm;

  before(function() {
    usfm = require('unfolding-word/lib/parsers/usfm-parser.js');
  });

  describe("parse()", function() {
    
    it("should handle a line with one USFM tag", function() {
      var line = '\\v 46 Then Mary praised God by saying:';
      var expected = {
        key:    'v',
        number: '46',
        text:   'Then Mary praised God by saying:',
        order:  1
      };
      var data = usfm.parseLine(line);
      data.length.should.equal(1);
      data[0].should.deep.equal(expected);
    });

    it("should handle a line with multiple tags", function() {
      var line = '\\q \\v 47 I feel very joyful about God,';
      var expected = [
        {
          key:    'q',
          number: '',
          text:   '',
          order:  1
        },
        {
          key:    'v',
          number: '47',
          text:   'I feel very joyful about God,',
          order:  2
        }
      ];
      var data = usfm.parseLine(line);
      data.length.should.equal(2);
      data.should.deep.equal(expected);
    });

    it("should handle books with numbers in the dbs code", function() {
      var line = '\\id 3JN Unlocked Dynamic Bible';
      var expected = {
        key:    'id',
        number: '',
        text:   '3JN Unlocked Dynamic Bible',
        order:  1
      };
      var data = usfm.parseLine(line);
      data.length.should.equal(1);
      data[0].should.deep.equal(expected);
    });

  });
});