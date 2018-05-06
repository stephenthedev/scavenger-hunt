const crypto = require('crypto');
const secret = process.env.USER_SECTET || 'abcdefg';

module.exports =   function hash(str){
    const hash = crypto.createHmac('sha256', secret)
    .update(str)
    .digest('hex');
    return hash;
}
