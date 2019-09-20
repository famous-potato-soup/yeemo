module.exports = {
    'facebookAuth' : {
        'clientID'      : 'APP-ID',
        'clientSecret'  : 'APP-SECRET',
        'callbackURL'     : 'http://localhost:4000/api/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    }
};