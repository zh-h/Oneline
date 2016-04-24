const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const tokenList = (
        req.headers.authorization &&
        JSON.parse(req.headers.authorization.split(' ')[1]) ||
        []
    );
    const validPassports = {};

    // 提取有效 token 的 payload 到 req.olPassports
    tokenList.forEach(token => {
        try {
            const decoded = jwt.verify(token, process.env.KEY);
            validPassports[decoded.provider] = decoded.uid;
        } catch (e) {
            // Empty
        }
    });

    if (Object.keys(validPassports).length <= 0) {
        next({ statusCode: 401 });
    } else {
        req.olTokenList = tokenList;
        req.olPassports = validPassports;
        next();
    }
};
