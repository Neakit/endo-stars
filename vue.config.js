const path = require("path");

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
};

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [".ts", ".js"],
      alias: aliases
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
}