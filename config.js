module.exports = {
    'facebookAuth' : {
        'clientID'      : 'your-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'     : 'http://localhost:3000/api/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    }
};