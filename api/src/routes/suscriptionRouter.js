const suscriptionRouter = require('express').Router()
const { Suscription } = require('../bd');

suscriptionRouter.post('/saveSubscription', async (req, res) => {
    const suscription = req.body;
  
    try {
      await Suscription.create({ suscription });
  
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = suscriptionRouter;
