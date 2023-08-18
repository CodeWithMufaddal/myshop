// src/extensions/users-permissions/controllers/refreshToken.js
module.exports = {
    verifyRefreshToken: async (ctx) => {
      // Assuming you have a function to verify the refresh token
      const verifiedToken = await verifyRefreshTokenFunction(ctx.query.access_token);
  
      if (verifiedToken) {
        // Generate a new access token or return it from the verified token, depending on your logic
        const newAccessToken = generateAccessTokenFunction(verifiedToken.user);
        
        ctx.send({
          data: {
            access_token: newAccessToken
          }
        });
      } else {
        ctx.throw(401, 'Invalid refresh token');
      }
    }
  };
  