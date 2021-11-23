const path = require("path");
const webpack = require("webpack");

const aliases = {
    // assets
    "@img"         : path.join(__dirname, "./src/assets/img"    ),
    "@font"        : path.join(__dirname, "./src/assets/font"   ),
    "@style"       : path.join(__dirname, "./src/assets/style"  ),
    // "@lang"        : path.join(__dirname, ".src/assets/lang"   ),
    // mock
    "@mock"        : path.join(__dirname, "./src/mock"          ),
    // system
    "@entity"      : path.join(__dirname, "./src/entity"       ),
    "@enum"        : path.join(__dirname, "./src/enum"         ),
    "@plugins"     : path.join(__dirname, "./src/plugins"      ),
    "@router"      : path.join(__dirname, "./src/router"       ),
    "@type"        : path.join(__dirname, "./src/type"         ),
    // base
    "@layouts"     : path.join(__dirname, "./src/layouts"      ),
    "@pages"       : path.join(__dirname, "./src/pages"        ),
    "@components"  : path.join(__dirname, "./src/components"   ),
    "@composition" : path.join(__dirname, "./src/composition"  ),
    "@services"    : path.join(__dirname, "./src/services"     ),
    "@services"    : path.join(__dirname, "./src/services"     ),
    "@dto"         : path.join(__dirname, "./src/dto"          ),
};

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [".ts", ".js"],
      alias: aliases
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          "HTTP": JSON.stringify(process.env.HTTP),
          "HTTPS": JSON.stringify(process.env.HTTPS),
          "API": JSON.stringify(process.env.API),
        }
      })
    ]
  },
}
