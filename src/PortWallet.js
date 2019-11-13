let PortWalletSuper = require("./PortWalletSuper");

class PortWallet extends PortWalletSuper {
    constructor(appKey, secretKey, version = 1) {
        super(appKey, secretKey, version);
    }
}



module.exports = PortWallet;