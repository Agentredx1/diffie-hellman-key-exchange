/*Diffie Hellman Key exchange web example
    Made to demonstrate how the key exchange works.
    Nice example of cryptography

Created: 3/18/2024
Simon Greenaway*/

var publicAgreement = [[23,5],[31,3]];//ordered pairs, primitive root modulo is some crazy math!
var agreedPair = 0;
var prime = 0;//prime number for mod() later. Integer
var primitiveRoot = 0;//"Primitive root modulo p", where p is primeGen. Integer


/* User object module, duplicate for user B and THEN gen private Keys
*/
var userA = {
    publicKey: 0,
    privateKey: 0,
    prime: 0,
    primitiveRoot: 0,
    publicAgreed: [0,0],
    setPrivateKey(){
        this.privateKey = Math.floor(Math.random() * 10) + 1; //Random private key 1-10
    },//end setter for private key
    getPrivateKey(){
        return this.privateKey;
    },//end get 'private' key, silly but need to display on screen!
    setPublicAgreed(newPrime, newPrimitiveRoot){
        this.prime = newPrime;
        this.primitiveRoot = newPrimitiveRoot;
    },//end set PublicAgreed, publicly known values. primitive root modulus P where P = this.prime

    getPublicKey(){
        return this.publicKey;
    },//end getter for publicKey

    setPublicKey(){
        this.publicKey = ((primitiveRoot ^ this.privateKey) % prime);
    },//end set publicKey

    decodeMessage(exchangedPublicKey){
        let decodeMessage = exchangedPublicKey^this.privateKey;
        decodeMessage = decodeMessage % prime;
        return decodeMessage;
    },//end decodeMessage method, decodes message using public key from other user
}//end User object

function main(){
    agreedPair = Math.floor(Math.random() * (publicAgreement.length));
    prime = publicAgreement[agreedPair][0];
    primitiveRoot = publicAgreement[agreedPair][1];
    var userB = {...userA};//spread operator, new to me, but cloning userA
    userA.setPublicAgreed(prime,primitiveRoot);
    userB.setPublicAgreed(prime,primitiveRoot);
    userA.setPrivateKey();
    userB.setPrivateKey();
    userA.setPublicKey();
    userB.setPublicKey();
    var elPrivateKey = document.getElementsByClassName("privateKey");
    elPrivateKey[0].textContent = "private key: " + userA.getPrivateKey();
    elPrivateKey[1].textContent = "private key: " + userB.getPrivateKey();
    var elPublicKey = document.getElementsByClassName("publicKey");
    elPublicKey[0].textContent = "public key: " + userA.getPublicKey();
    elPublicKey[1].textContent = "public key: " + userB.getPublicKey(); 
    var elResult = document.getElementsByClassName("result");
    elResult[0].textContent = "result: " + userA.decodeMessage(userB.getPublicKey());
    elResult[1].textContent = "result: " + userB.decodeMessage(userA.getPublicKey());
    var elCheck = document.getElementById("check");
    elCheck.textContent = userA.decodeMessage(userB.getPublicKey()) + " == " + userB.decodeMessage(userA.getPublicKey());
    document.getElementById("prime").textContent = "agreed prime: " + prime;
    document.getElementById("primitiveRoot").textContent = "primitive root of prime: " + primitiveRoot;
    var elDecodeWork = document.getElementsByClassName("decodeWork");
    elDecodeWork[0].textContent = "decode with: (" + userB.getPublicKey() + "^" + userA.getPrivateKey() + ") modulos " + prime + " = " + userA.decodeMessage(userB.getPublicKey());
    elDecodeWork[1].textContent = "decode with: (" + userA.getPublicKey() + "^" + userB.getPrivateKey() + ") modulos " + prime + " = " + userB.decodeMessage(userA.getPublicKey());         
    var elPublicKeyWork = document.getElementsByClassName("publicKeyWork");
    elPublicKeyWork[0].textContent = "generate public key: (" + prime + "^" + userA.getPrivateKey() + ") modulos " + primitiveRoot + " = " + userA.getPublicKey();    
    elPublicKeyWork[1].textContent = "generate public key: (" + prime + "^" + userB.getPrivateKey() + ") modulos " + primitiveRoot + " = " + userB.getPublicKey();         
}//end main function

var elStartButton = document.getElementById("run");
elStartButton.addEventListener("click", function(){
    main();
});


