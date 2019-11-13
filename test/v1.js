'use strict';
let expect = require('chai').expect;
let assert = require('chai').assert;
let PortWallet = require("../src/PortWallet");
require('dotenv').config();
const portwallet = new PortWallet(process.env.PORTWALLET_APPKEY, process.env.PORTWALLET_SECRETKEY);

describe("PortWallet", () => {

    it("should be an instanceof portwallet", () => {
        assert.instanceOf(portwallet.setMode(process.env.PORTWALLET_MODE), PortWallet);
    });

    it('should be development mode', () => {
        expect(portwallet.getMode()).to.eq('development');
    });

    it("should be an instanceof portwallet", () => {
        assert.instanceOf(portwallet.setVersion(process.env.PORTWALLET_VERSION), PortWallet);
    });

    it('should be version 1', () => {
        expect(portwallet.getVersion()).to.eq('v1');
    });

    it('should return a md5 hash', () => {
        expect(portwallet.getToken()).to.equal("426c7c5d9fb9f28cb594bcba5cb054f2");
    });

    it('should have a property token, app_key, timestamp', () => {
        expect(portwallet.getPayload()).to.have.own.property("token");
        expect(portwallet.getPayload()).to.have.own.property("app_key");
        expect(portwallet.getPayload()).to.have.own.property("timestamp");
    });


});

// portwallet.getToken();
// portwallet.generateInvoice({
//     "order": {
//         "amount": 10,
//         "currency": "BDT",
//         "redirect_url": "http://yourwebsite.com/success",
//         "ipn_url": "http://yourwebsite.com/ipn",
//         "reference": "ABC1234",
//         "validity": 3600
//     },
//     "product": {
//         "name": "Order #ABC1234",
//         "description": "the product description goes here"
//     },
//     "billing": {
//         "customer": {
//             "name": "Customer Name",
//             "email": "email@customer.com",
//             "phone": "01717000000",
//             "address": {
//                 "street": "House 1, Road 1, Gulshan 1",
//                 "city": "Dhaka",
//                 "state": "Dhaka",
//                 "zipcode": "1212",
//                 "country": "BD"
//             }
//         }
//     },
//     "shipping": {
//         "customer": {
//             "name": "Customer Name",
//             "email": "email@customer.com",
//             "phone": "01717000000",
//             "address": {
//                 "street": "House 1, Road 1, Gulshan 1",
//                 "city": "Dhaka",
//                 "state": "Dhaka",
//                 "zipcode": "1212",
//                 "country": "BD"
//             }
//         }
//     },
//     "discount": {
//         "enable": 1,
//         "codes": ["DISC101"]
//     },
//     "emi": {
//         "enable": 1,
//         "tenures": [3, 6, 9]
//     },
//     "customs": [
//         { "order_id": 1 },
//         { "order_reference": "123BD" }
//     ]
// });
// console.log(portwallet.getPayload());