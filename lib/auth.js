import { jwtVerify, SignJWT } from "jose";
const secretKey = new TextEncoder().encode("harchi");

// export const generateJWT = async ({ mobilePhone }) => {
//   const header = {
//     alg: "HS256",
//     typ: "JWT",
//   };

//   const payload = {
//     mobilePhone,
//   };

//   const token = await new SignJWT(payload)
//     .setProtectedHeader(header)
//     .setIssuedAt()
//     .sign(secretKey);

//   return token;
// };



export const verifyJwt = async (token) => {
  try {
    const result = await jwtVerify(token.value, secretKey);
    return result
  }
  catch(error) {
    return false
  }
};
