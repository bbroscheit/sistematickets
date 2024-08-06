export async function subscribeUserToPush() {
    if ('Notification' in window && navigator.serviceWorker) {
      const registration = await navigator.serviceWorker.ready;
  
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.error('Permission not granted for Notification');
        return;
      }else{
        console.log('Permission granted for Notification');
      }
      
      //console.log("key" , process.env.NEXT_PUBLIC_PUSHKEY)
      const applicationServerKey = urlBase64ToUint8Array(process.env.NEXT_PUBLIC_PUSHKEY);
      
      //console.log('applicationServerKey:', applicationServerKey)

      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
      });
      
      
      // Enviar la suscripción al backend
      await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/saveSubscription`, {
        //await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/saveSubscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pushSubscription)
      });
  
      //console.log('Push Subscription:', JSON.stringify(pushSubscription));
      return pushSubscription;
    }
  }

  const urlBase64ToUint8Array = (base64String) => {
    try {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding).replace(/-/g,   
   '+').replace(/_/g, '/');
      const rawData = window.atob(base64);   
  
  
      //console.log('rawData:', rawData); // Imprime la cadena decodificada
  
      const uint8Array = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        uint8Array[i] = rawData.charCodeAt(i);
      }
  
      //console.log('uint8Array:', uint8Array); // Imprime el Uint8Array
  
      // Convertir a hexadecimal para mejor visualización
      const hexString = Array.from(uint8Array, byte => byte.toString(16).padStart(2, '0')).join('');
      //console.log('hexString:', hexString);
  
      return uint8Array;
    } catch (error) {
      console.error('Error decoding Base64:', error);
    }
  };
  

  