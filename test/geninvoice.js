'use strict';
let expect = require('chai').expect;
let assert = require('chai').assert;
let PortWallet = require("../src/PortWallet");
require('dotenv').config();
const portwallet = new PortWallet(process.env.PORTWALLET_APPKEY, process.env.PORTWALLET_SECRETKEY);

describe("PortWalletGenInvoice", () => {

    it("should be an instanceof portwallet", () => {
        assert.instanceOf(portwallet.invoice(), PortWallet);
    });

    it("should be return 1", () => {
        expect(portwallet.getOperation()).to.eq(1);
    });

    it("Checking the request data", () => {
        expect(portwallet.with({}).getRequestData()).to.have.own.property("order");
    })



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