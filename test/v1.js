'use strict';
let expect = require('chai').expect;
let assert = require('chai').assert;
let PortWallet = require("../PortWallet");
require('dotenv').config();
const portwallet = new PortWallet(process.env.PORTWALLET_APPKEY, process.env.PORTWALLET_SECRETKEY);

portwallet.setMode(process.env.PORTWALLET_MODE).setVersion(process.env.PORTWALLET_VERSION);

describe("PortWallet", () => {

    it('should be development mode', () => {
        expect(portwallet.getMode()).to.eq('development');
    });

    it('should be version 1', () => {
        expect(portwallet.getVersion()).to.eq('v1');
    });

    it('should return a md5 hash', () => {
        expect(portwallet.getToken()).to.equal("426c7c5d9fb9f28cb594bcba5cb054f2");
    })

})