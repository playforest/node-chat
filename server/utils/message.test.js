var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'admin';
        var lat = 1;
        var long = 1;

        var locationMsg = generateLocationMessage(from, lat, long);

        expect(locationMsg.createdAt).toBeA('number');
        expect(locationMsg.url).toBe('https://www.google.com/maps?q=1,1');
        expect(locationMsg.from).toBe('admin');
    })
})