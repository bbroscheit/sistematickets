const { createCA, createCert } = require ("mkcert") ;

// genera un certificado SSL local (para probar https en dev). hoy no lo
// esta usando nada del codigo, lo dejo por si algun dia hace falta volver
// a levantar el server con https local
const certificates = {}

async function certificateGenerator(){
    const ca = await createCA({
        organization: "Basani SA",
        countryCode: "AR",
        state: "Buenos Aires",
        locality: "Aldo Bonzi",
        validity: 365
    });

    const cert = await createCert({
        ca: { key: ca.key, cert: ca.cert },
        domains: ["127.0.0.1", "localhost", "172.19.29.5", "172.19.24.1"],
        validity: 365
    });

    return cert
    // estas dos lineas quedaron despues del return, nunca se ejecutan
    console.log(cert.key, cert.cert); // certificate info
    console.log(`${cert.cert}${ca.cert}`); // create full chain certificate by merging CA and domain certificates
}



module.exports = certificateGenerator


