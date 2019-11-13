const crypto = require("crypto");
const GEN_INVOICE = 1;
const IPN_VALIDATE = 2;
const REFUND_REQUEST = 3;
const GET_INVOICE = 4;
const RECURRING_INVOICE = 5;


class PortWalletSuper {
    constructor(appKey, secretKey, version = 1) {
        this.appKey = appKey;
        this.secretKey = secretKey;
        this.version = version;
        this.payload = {};
        this.mode = "live";
        this.operation = null;
        this.requestData = {
            order: null,
            product: null,
            billing: null,
            shipping: null,
            discount: null,
            emi: null,
            recurring: null,
            invoice: null,
            amount: null,
            refund: null
        };
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
        // this._token = 

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

    getOperation() {
        return this.operation;
    }

    invoice() {
        this.operation = GEN_INVOICE;
        return this;
    }
    with({ order = null, product = null, billing = null, shipping = null, discount = null, emi = null, recurring = null, invoice = null, amount = null, refund = null, customs = null }) {
        order === null ? null : this.order(order);
        product === null ? null : this.product(product);
        billing === null ? null : this.billing(billing);
        shipping === null ? null : this.shipping(shipping);
        discount === null ? null : this.discount(discount);
        emi === null ? null : this.emi(emi);
        invoice === null ? null : this.invoice(invoice);
        amount === null ? null : this.amount(amount);
        refund === null ? null : this.refund(refund);
        return this;
    }

    order(order) {
        this.requestData.order = order;
        return this;
    }
    product(product) {
        this.requestData.product = product;
        return this;
    }
    billing(billing) {
        this.requestData.billing = billing;
        return this;
    }
    shipping(shipping) {
        this.requestData.shipping = shipping;
        return this;
    }
    discount(discount) {
        this.requestData.discount = discount;
        return this;
    }
    emi(emi) {
        this.requestData.emi = emi;
        return this;
    }
    invoice(invoice) {
        this.requestData.invoice = invoice;
        return this;
    }
    amount(amount) {
        this.requestData.amount = amount;
        return this;
    }
    refund(refund) {
        this.requestData.refund = refund;
        return this;
    }

    getRequestData() {
        return this.requestData;
    }

}

module.exports = PortWalletSuper;