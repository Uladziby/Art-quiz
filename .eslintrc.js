// eslint-disable-next-line no-undef
module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "node": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module",
        "ecmaFeatures": {
            "modules": true
        }
    },
    "ignorePatterns": ['dist/*'],
    "rules": {
    }
};
