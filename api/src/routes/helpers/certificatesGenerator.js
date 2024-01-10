const { createCA, createCert } = require ("mkcert") ;

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
    console.log(cert.key, cert.cert); // certificate info
    console.log(`${cert.cert}${ca.cert}`); // create full chain certificate by merging CA and domain certificates
}



module.exports = certificateGenerator


