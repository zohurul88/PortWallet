class PortWallet {
    constructor(appKey, secretKey, version = 1) {
        this.appKey = appKey;
        this.secretKey = secretKey;
        this.version = version;
    }

    getToken() {
        let time = Math.floor(Date.now() / 1000)
        return this.appKey + ':' + this.secretKey + ' v' + this.version + '|' + time;
    }

}

module.exports = PortWallet;