// This code has to be added to local-intercept.js located in venia-concept in order to apply customizations to the ProductFullDetail component.

const { Targetables } = require("@magento/pwa-buildpack");

function localIntercept(targets) {
  const targetables = Targetables.using(targets);

  const ProductDetails = targetables.reactComponent(
    "@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js"
  );

  ProductDetails.wrapWithFile(
    '@twoja-firma/pwa-schema-product/src/targets/wrapper'
  );
}

module.exports = localIntercept;
