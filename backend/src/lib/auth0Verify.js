import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

// Replace with your actual Auth0 domain
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN; // e.g., "your-tenant.auth0.com"
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE; // e.g., from Auth0 API settings

const client = jwksClient({
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        if (err) return callback(err);
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}

export function verifyAuth0Token(token) {
    console.log("Auth0 Domain:", process.env.AUTH0_DOMAIN);
    console.log("Auth0 Audience:", process.env.AUTH0_AUDIENCE);
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            getKey,
            {
                audience: AUTH0_AUDIENCE,
                issuer: `https://${AUTH0_DOMAIN}/`,
                algorithms: ["RS256"],
            },
            (err, decoded) => {
                if (err) return reject(err);
                resolve(decoded);
            }
        );
    });
}
