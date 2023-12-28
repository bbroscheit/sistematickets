require('dotenv').config();

const { Dropbox } = require('dropbox');
const path = require('path');
const { DROPBOX } = process.env


const getSharedLink = async (filePath) => {
    try {
      
      let ACCESS_TOKEN = DROPBOX
      let dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

      const response = await dbx.sharingCreateSharedLinkWithSettings({ path: filePath });
      return response.result.url;
      
    } catch (error) {
      console.error('Error al obtener enlace compartido desde Dropbox:', error);
      throw error;
    }
  };

module.exports = getSharedLink;