const { OAuth2Client } = require('google-auth-library');
const  User  = require('../models/User');

const {generateToken} = require('../utils/jwtConfig')


const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5000/api/auth/google/callback'
);

const googleAuthRedirect = (req, res) => {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['email', 'profile'],
  });
  res.redirect(authUrl);
};

const googleAuthCallback = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res.status(400).json({ message: 'No authorization code provided' });
    }

    const { tokens } = await client.getToken(code);
    const idToken = tokens.id_token;

    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ message: 'Google authentication failed' });
    }

    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({
        email: payload.email,
        username: payload.given_name,
        googleId: payload.sub,
        googleToken: tokens.access_token,
      });
      await user.save();
      console.log('User saved:', user);
    }

    const token = generateToken(user, 3600);

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.redirect('http://localhost:3000');

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  googleAuthRedirect,
  googleAuthCallback,
};
