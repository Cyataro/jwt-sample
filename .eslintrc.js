var eslintConfig = {
  plugins: ["node"],
  extends: ["standard", "standard-jsdoc"],
  rules: {
    "node/no-extraneous-require": ["error", {
      "allowModules": ["body-parser"]
    }],
    "valid-jsdoc": ["error", {
      "requireParamDescription": false,
      "requireReturnDescription": false
    }],
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": false,
        "FunctionExpression": false
      }
    }],
    "eqeqeq": "error",
    "brace-style": ["error", "1tbs", {"allowSingleLine": true}],
    "space-before-blocks": "error",
    "keyword-spacing": "error",
    "space-infix-ops": "error",
    "comma-spacing": "error",
    "no-mixed-spaces-and-tabs": "error",
    "indent": ["error", 2]
  }
}

if (process.env.NODE_ENV == 'test') {
  eslintConfig.rules = Object.assign(
    eslintConfig.rules,
    {
      "no-alert": "warn",
      "no-console": "error",
      "no-debugger": "error"
    }
  )
}

module.exports = eslintConfig
