const intentIs = require('lib').intentIs;
const supportsAPL = require('lib').supportsAPL;
const getProductsDataSource = require('lib').getProductsDataSource;
const productListDocument = require('./documents/productList');

const products = [
  {
    id: "product1",
    title: "Product 1",
    ratingNumber: 3.5,
    ratingText: "509 ratings",
    price: 10.99,
    imageUrl: "https://d2o906d8ln7ui1.cloudfront.net/images/sm_gouda.png",
  },
  {
    id: "product2",
    title: "Product 2",
    ratingNumber: 4.0,
    ratingText: "125 ratings",
    price: 6.99,
    imageUrl: "https://d2o906d8ln7ui1.cloudfront.net/images/sm_cheddar.png"
  },
  {
    id: "product3",
    title: "Product 3",
    ratingNumber: 4.5,
    ratingText: "60 ratings",
    price: 5.49,
    imageUrl: "https://d2o906d8ln7ui1.cloudfront.net/images/sm_blue.png"
  },
  {
    id: "product4",
    title: "Product 4",
    ratingNumber: 5.0,
    ratingText: "98 ratings",
    price: 3.00,
    imageUrl: "https://d2o906d8ln7ui1.cloudfront.net/images/sm_brie.png"
  }
];

function getTotalCost(products) {
  const total = products.reduce((sum, product) => sum + product.price, 0);
  return `$${total.toFixed(2)}`;
}

const UnlockFreeShippingIntentHandler = {
  canHandle(handlerInput) {
      return intentIs(handlerInput, 'UnlockFreeShippingIntent');
  },
  handle(handlerInput) {
    let speakOutput = `Here are some products that match your shopping list and add up to a total of ${getTotalCost(products)} to unlock free shipping.`;
    let builder = handlerInput.responseBuilder;

    if (supportsAPL(handlerInput)) {
      builder = builder.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: productListDocument,
        datasources: getProductsDataSource(products)
      });
    }
    
    return builder.speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

module.exports = UnlockFreeShippingIntentHandler;
