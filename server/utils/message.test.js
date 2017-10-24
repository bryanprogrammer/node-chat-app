var expect = require('expect');
var {generate_message} = require('./message');


describe('generate_message', () =>{
    it('should generate the correct message object', () =>{
        var from = 'Bryan';
        var text = 'some message';
        var message = generate_message(from, text);
        
        expect(message.created_at).toBeA('number');
        expect(message).toInclude({from, text });
    });
});