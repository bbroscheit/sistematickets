const { Dropbox } = require('dropbox');
const fs = require('fs');
const path = require('path');

// const dbx = new Dropbox({ accessToken: 'sl.BscGXH-zUzIxGbVyAcKLPWkN9d6JY1FP6ZrZoRITcoggfc-mjQpTOlYXpdqT5fRgNp4X8NM1gLYQeqM_VIuskMAfd5xAzyHcsldhEPf5QMkY5XRM-z_TrnE7U6yE4cvN4CgUKYrCUQhN' });

// const saveInDropbox = async (sourcePath, destinationPath) => {
//   try {
//     const response = await dbx.filesUpload({ path: destinationPath, contents: fs.readFileSync(sourcePath) });
//     console.log('Archivo subido a Dropbox:', response.result);
//   } catch (error) {
//     console.error('Error al subir archivo a Dropbox:', error);
//     throw error;
//   }
// };

// module.exports = saveInDropbox;

const saveInDropbox = async (file) => {
    // console.log("file", file);

        // const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
      let ACCESS_TOKEN = 'uat.AERPjyt2AFZ_XaBbZ7pcbd1tpT9TT0qbysPcA7tUxOZ5fRTIAuej1HL_FMmNOtgKuvmUTDwDWH5RJyGyxNDktKkGMW_ZNHi2ujgJis9ZZoK_pbmjuOR5N7S5JJustalhDd5NoYqAEAlGZRnrGukuNG_8ZnHBw6iPr00gQxOQsaWISqXes_f7DWyPbMQNqSVt5abMjqcs6wZHRBs4mGoezNZ5nzFF7GKBdFMVsKaJpj0I3q98dR3tFlCzmMtFPtKh27xqGWPtZGNqfLf7GK3pzEWTCKQvPMOhfsRiluGHlj_N-Zoc-_xStWv132mOQIYIdzPRvIls9uaZSw2UOmg72ZPo-n0rur2ZcfkqCpXdR9GQbdeTx_CY-UgxUcKXNZaGGtSLwyNQqRZzCffkry50MXkW6m-04ZivKTrzOxkYJcWoLuUDOcZCoKr79rKTuG26n_K3QqpF_NxDeOBF_bn1ko7G7bXa-YoIeeLabUq0HrEyTavg_jnluzTuLi_qi1Z9sU0WxNUjFWbZagSknvZjlD3R_cOuy3Bx-cvDjRYz0gFOIKr7YvzZ4Aq1spqkjKaZlwb4b7e38tPpUpubGOSjnnOuSIh6u8Br94QdNgArHaGM2j5q85YmsxTbbIhFwQIZg5szD16V-wD5ZRr9Pawg2o0VzT7BaT0vbVv6M5_zgxf5twImbOvcIegUvJNT8ynLvXHgGdcRUbLwTCffMvaEKJ_8YpmhDnCbI8m5-jKVc60nOVkOOv9F1h2FVQXEWDgVe96N7Yl_M06eNRNF5FSTP91wKRYDc-q85I084ho30lxOS9FyrYVN0VJ49PgY_ZYsNgw2j1QICeNSmEMaqtoxQhODZG4z0dHJAMWGYlKH-0jeKYJ3SKduOxBanms01PIpIZt3--1yYYVwPJE3rbaLDox2ygGH93Wxc0jbMA8eAvqRzZKPKW2btu7ih8dIYg5kvN5KY3MvC2_WA9zuTje3Lqp7t_LBAt8YQ9jL1o92VnYDe21HHGfknH9epn_XlQeWLMTxgW0nKYzD2tUo2__hBL6vGpKyVx9TrnVVNDYLRvigAHCbCpmQHgwHhmAKUSzXS5XM66JSEo4AtHLPWnz08r2udcmBpPsgZMLKLt8v6m4y6OCN-YVsn3ASjIo8HOUaZh1249iOSdSjHgzCUw1hgve2zAGhndCqX7l4WHKCaOoO3J7-dxriogcWXhf0flSNRfI0GJHugN6VpVZr5BHxKRvCNMDEd0MVGsbfNmMPm9e5RIxeoyF5mdDq1pkBZPJHO_ZiHGV314nSzbW6maAOtkra'
      let dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

      try {
        
              dbx.filesUpload({ path: '/' + file.name, file })
              .then (function(response) { console.log(response) })
              .catch(error => console.log(error.message))
          
        

                
          
      } catch (error) {
        console.log("resolver",error.message);

        
      }

      return false


    
}

module.exports = saveInDropbox;