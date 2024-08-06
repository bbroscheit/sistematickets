const { Suscription } = require('../../bd');
const webpush = require('web-push');
const { PUSH_PUBLIC_KEY , PUSH_PRIVATE_KEY } = process.env

const publicVapidKey = PUSH_PUBLIC_KEY;
const privateVapidKey = PUSH_PRIVATE_KEY;

//console.log('keys', PUSH_PUBLIC_KEY, "key priv", PUSH_PRIVATE_KEY)
webpush.setVapidDetails('mailto:bernardo.broscheit@basani.com.ar', publicVapidKey, privateVapidKey);

const sendNotificationPush = async () => {
 try {
    
    // Obtener todas las suscripciones de la base de datos
    const suscriptions = await Suscription.findAll();

    // Enviar notificación a cada suscripción
    const payload = JSON.stringify({ title: 'Nuevo Ticket Creado', body: `Se ha creado un nuevo ticket` });

    suscriptions.forEach(suscription => {
      webpush.sendNotification(suscription.suscription, payload).catch(error => {
        console.error('Error sending notification:', error);
      });
    });

    
  } catch (error) {
    console.log("error en sendNotificationPush: ", {error: error.message }) 
}}


module.exports = sendNotificationPush;