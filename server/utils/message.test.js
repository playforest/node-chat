var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // store res in variable
        var from = 'imi';
        var text = 'hello'
        var msg = generateMessage(from, text);

        // assert createdAt toBeA number
        expect(msg.createdAt).toBeA('number')

        expect(msg).toInclude({from,text});
    })
})