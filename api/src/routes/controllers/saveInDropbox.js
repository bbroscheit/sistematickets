// require("dotenv").config();

// const { Dropbox } = require("dropbox");
// const fs = require("fs");
// const path = require("path");
// const { DROPBOX } = process.env;

//   // let accessTokenApp =
//   //   "sl.Bsi-bzrq3_cDGLEIZb89Q8KqiL65TZy8h5SwEE1apPno2o7lNRkL_tGeqbejkwAgsSKtcuU1TWLEPUG5p7-XJyQBoqskEGW_SF_bl7Sc5u6LprrgwUetYozMWVVOgJCj-8WzS3jxd7a4nS7XPtj0";
//   let appKey = "87u82u2klpmzv1s";
//   // let appSecret = "6dogolkeiglrtnh";
  
//   let ACCESS_TOKEN = DROPBOX;

//   const saveInDropbox = async (files) => {
//   console.log("file", files);

//   let token = await fetch(`https://www.dropbox.com/oauth2/authorize?client_id=${appKey}&response_type=token&code_challenge=S256&code_challenge_method=S256`)
//                 .then((data) => {
//                 return data;
                 
//   });

//   console.log("token", token);

//   const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;

//   let dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

//   files.map((e) => {
//     if (e.size < UPLOAD_FILE_SIZE_LIMIT) {
//       // File is smaller than 150 MB - use filesUpload API
//       try {
//         const content = fs.readFileSync(e.path);
//         dbx
//           .filesUpload({ path: "/" + e.filename, contents: content })
//           .then(function (response) {
//             console.log(response);
//           })
//           .catch(function (error) {
//             console.error(error.error || error);
//           });
//       } catch (error) {
//         console.error("Error reading file:", error);
//       }
//     } else {
//       // File is bigger than 150 MB - use filesUploadSession* API
//       const maxBlob = 12 * 1024 * 1024; // 8MB - Dropbox JavaScript API suggested chunk size

//       var workItems = [];

//       var offset = 0;

//       while (offset < e.size) {
//         var chunkSize = Math.min(maxBlob, e.size - offset);
//         workItems.push(e.slice(offset, offset + chunkSize));
//         offset += chunkSize;
//       }

//       const task = workItems.reduce((acc, blob, idx, items) => {
//         if (idx == 0) {
//           // Starting multipart upload of file
//           return acc.then(function () {
//             return dbx
//               .filesUploadSessionStart({ close: false, contents: blob })
//               .then((response) => response.result.session_id);
//           });
//         } else if (idx < items.length - 1) {
//           // Append part to the upload session
//           return acc.then(async function (sessionId) {
//             var cursor = { session_id: sessionId, offset: idx * maxBlob };
//             await dbx.filesUploadSessionAppendV2({
//               cursor: cursor,
//               close: false,
//               contents: blob,
//             });
//             return sessionId;
//           });
//         } else {
//           // Last chunk of data, close session
//           return acc.then(function (sessionId) {
//             var cursor = { session_id: sessionId, offset: e.size - blob.size };
//             var commit = {
//               path: "/" + e.filename,
//               mode: "add",
//               autorename: true,
//               mute: false,
//             };
//             return dbx.filesUploadSessionFinish({
//               cursor: cursor,
//               commit: commit,
//               contents: blob,
//             });
//           });
//         }
//       }, Promise.resolve());

//       task
//         .then(function (result) {
//           console.log(result);
//         })
//         .catch(function (error) {
//           console.error("error en task de dropbox", error);
//         });
//     }
//     return false;
//   });
// };

// module.exports = saveInDropbox;

const { Dropbox } = require("dropbox");
const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');
const hostname = 'localhost'
const port = 3001
let appKey = "87u82u2klpmzv1s";

const config = {
  fetch,
  clientId: appKey,
};

const dbx = new Dropbox(config);

const redirectUri = `http://${hostname}:${port}/auth`;


// const { DROPBOX } = process.env;

//   // let accessTokenApp =
//   //   "sl.Bsi-bzrq3_cDGLEIZb89Q8KqiL65TZy8h5SwEE1apPno2o7lNRkL_tGeqbejkwAgsSKtcuU1TWLEPUG5p7-XJyQBoqskEGW_SF_bl7Sc5u6LprrgwUetYozMWVVOgJCj-8WzS3jxd7a4nS7XPtj0";
  
//   // let appSecret = "6dogolkeiglrtnh";
  
//   let ACCESS_TOKEN = DROPBOX;

  const saveInDropbox = async (files) => {
      
    dbx.auth.getAuthenticationUrl(redirectUri, null, 'code', 'offline', null, 'none', true)
      .then((authUrl) => {
        console.log(authUrl)
        res.writeHead(302, { Location: authUrl });
      res.end();
    });
  }

  module.exports = saveInDropbox;