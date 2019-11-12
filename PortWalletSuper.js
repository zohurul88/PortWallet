const crypto = require("crypto");
class PortWalletSuper {
    constructor(appKey, secretKey, version = 1) {
        this.appKey = appKey;
        this.secretKey = secretKey;
        this.version = version;
        this.payload = {};
        this.mode = "live";
    }

    setMode(mode) {
        this.mode = mode;
        return this;
    }

    setVersion(version) {
        this.version = version;
        return this;
    }

    getToken() {
        let token;
        switch (this.version) {
            case 2:
                token = this.generateV2Token();
                break;
            default:
                token = this.generateToken();
                break;
        }
        return token;
    }



    generateV2Token() {

    }

    generateToken() {
        let time = this.getUnixTimestamp();
        this.payload.token = crypto.createHash("md5").update(this.secretKey + time).digest("hex");
        this.payload.timestamp = time;
        this.payload.app_key = this.appKey;
        return this.payload.token;
    }

    getPayload() {
        return this.payload;
    }

    getUnixTimestamp() {
        return this.mode == "development" ? 1 : Math.floor(Date.now() / 1000);
    }
    getMode() {
        return this.mode;
    }
    getVersion() {
        return 'v' + this.version;
    }
}

module.exports = PortWalletSuper;