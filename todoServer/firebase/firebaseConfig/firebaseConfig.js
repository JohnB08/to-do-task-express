const envFileVerifier = (envFile) => {
    if (typeof envFile === "string" && envFile.length > 0)
        return true;
    else
        return false;
};
const envFileArray = [
    { FIREBASE_TYPE: process.env.FIREBASE_TYPE },
    { FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID },
    { FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID },
    { FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY },
    { FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL },
    { FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID },
    { FIREBASE_AUTH_URI: process.env.FIREBASE_AUTH_URI },
    { FIREBASE_TOKEN_URI: process.env.FIREBASE_TOKEN_URI },
    { FIREBASE_AUTH_PROVIDER_X509_CERT_URL: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL },
    { FIREBASE_CLIENT_x509_CERT_URL: process.env.FIREBASE_CLIENT_X509_CERT_URL },
    { FIREBASE_UNIVERSE_DOMAIN: process.env.FIREBASE_UNIVERSE_DOMAIN }
];
const errorArray = [];
const verifyEnv = () => {
    envFileArray.forEach(env => {
        Object.entries(env).forEach(entry => {
            if (!envFileVerifier(entry[1])) {
                errorArray.push(new Error(`Missing or wrong value at env file ${entry[0]}`));
            }
        });
    });
};
verifyEnv();
console.log(errorArray);
export const serviceAccount = {
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECTID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
    "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
};
console.log(serviceAccount);
