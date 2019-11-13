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