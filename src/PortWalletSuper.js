const crypto = require("crypto");
const request = require("request");
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
            order: {},
            product: {},
            billing: {},
            shipping: {},
            discount: {},
            emi: {},
            recurring: {},
            invoice: null,
            amount: null,
            refund: {},
            customs: []
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
        if (customs !== null) {
            for (let i in customs) {
                this.customs(customs[i]);
            }
        }
        return this;
    }

    order({ amount = amount, currency = currency, redirect_url = redirect_url, ipn_url = ipn_url, reference = null, validity = null }) {
        this.requestData.order.amount = amount;
        this.requestData.order.currency = currency;
        this.requestData.order.redirect_url = redirect_url;
        this.requestData.order.ipn_url = ipn_url;
        if (reference !== null) {
            this.requestData.order.reference = reference;
        }
        if (validity !== null) {
            this.requestData.order.validity = validity;
        }

        return this;
    }

    product({ name = name, description = description }) {
        this.requestData.product.name = name;
        this.requestData.product.description = description;
        return this;
    }
    billing({ customer = customer }) {
        this.requestData.billing.customer = this.customer(customer);
        return this;
    }
    shipping({ customer = customer }) {
        this.requestData.shipping.customer = this.customer(customer);
        return this;
    }
    customer({ name = name, email = email, phone = phone, address = null }) {
        address = address === null ? this.address({}) : this.address(address);
        return {
            name,
            email,
            phone,
            address
        }
    }
    address({ street = "unknown", city = "unknown", state = "unknown", zipcode = "unknown", country = "BD" }) {
        return {
            street,
            city,
            state,
            zipcode,
            country
        }
    }
    discount({ enable = 1, codes = [] }) {
        this.requestData.discount.enable = enable;
        this.requestData.discount.codes = codes;
        return this;
    }
    emi({ enable = 1, tenures = [0] }) {
        this.requestData.emi.enable = enable;
        this.requestData.emi.tenures = tenures;
        return this;
    }
    customs(custom) {
        this.requestData.customs.push(custom);
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

    create() {
        var options = {
            method: 'POST',
            url: 'https://api-sandbox.portwallet.com/api/v1',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                app_key: '.',
                token: '.',
                timestamp: '1',
                call: 'refund_request',
                invoice: '85D1B31620E7D923',
                amount: '10'
            }
        };

        request(options, function(error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });

    }

    genInvoice() {

    }

}

module.exports = PortWalletSuper;