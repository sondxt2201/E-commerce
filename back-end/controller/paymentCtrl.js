const Razorpay = require("razorpay");

const instance = new Razorpay({
    key_id: "rzp_test_Iwzv1fbqTMdnYJ",
    key_secret: "tRfFoBcJX5qdnWtgy4fz1nrS"
});

const checkout = async (req, res) => {
    const { amount } = req.body;
    const option = {
        amount: amount,
        currency: "USD",
    }
    const order = await instance.orders.create(option)
    res.json({
        success: true,
        order
    })
}

const paymentVerification = async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId } = req.body;
    res.json({
        razorpayOrderId,
        razorpayPaymentId,
    })
}



let configVNP = {
    "vnp_TmnCode": "JH5WQMOK",
    "vnp_HashSecret": "SXDMCPCDYOEWLOBQCPATYQOYQPINJETZ",
    "vnp_Url": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    "vnp_Api": "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
    "vnp_ReturnUrl": "http://localhost:8888/order/vnpay_return"
}

const createURL = async (req, res, next) => {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var dateFormat = require('dateformat');

    var tmnCode = configVNP.vnp_TmnCode;
    var secretKey = configVNP.vnp_HashSecret;
    var vnpUrl = configVNP.vnp_Url;
    var returnUrl = configVNP.vnp_ReturnUrl;

    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;

    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params.vnp_Version = '2.1.0';
    vnp_Params.vnp_Command = 'pay';
    vnp_Params.vnp_TmnCode = tmnCode;
    // vnp_Params.vnp_Merchant = ''
    vnp_Params.vnp_Locale = locale;
    vnp_Params.vnp_CurrCode = currCode;
    vnp_Params.vnp_TxnRef = orderId;
    vnp_Params.vnp_OrderInfo = orderInfo;
    vnp_Params.vnp_OrderType = orderType;
    vnp_Params.vnp_Amount = amount * 100;
    vnp_Params.vnp_ReturnUrl = returnUrl;
    vnp_Params.vnp_IpAddr = ipAddr;
    vnp_Params.vnp_CreateDate = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params.vnp_BankCode = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params.vnp_SecureHash = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.redirect(vnpUrl)
};

const IPN = async (req, res, next) => {
    var vnp_Params = req.query;
    var secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    vnp_Params = sortObject(vnp_Params);
    var secretKey = config.vnp_HashSecret;
    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");


    if (secureHash === signed) {
        var orderId = vnp_Params.vnp_TxnRef;
        var rspCode = vnp_Params.vnp_ResponseCode;
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status(200).json({ RspCode: '00', Message: 'success' })
    }
    else {
        res.status(200).json({ RspCode: '97', Message: 'Fail checksum' })
    }
};

const returnURL = async (req, res, next) => {
    var vnp_Params = req.query;

    var secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    vnp_Params = sortObject(vnp_Params);

    var tmnCode = config.vnp_TmnCode;
    var secretKey = config.vnp_HashSecret;

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.render('success', { code: vnp_Params.vnp_ResponseCode })
    } else {
        res.render('success', { code: '97' })
    }

}


module.exports = {
    checkout,
    paymentVerification,
    createURL,
    IPN,
    returnURL
}