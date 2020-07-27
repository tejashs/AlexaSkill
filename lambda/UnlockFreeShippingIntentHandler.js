const intentIs = require('lib').intentIs;
const supportsAPL = require('lib').supportsAPL;
const getProductsDataSource = require('lib').getProductsDataSource;
const productListDocument = require('./documents/productList');

const products = [
  {
    id: "B07G95V3LW",
    title: "Sikye Personal...",
    ratingNumber: 4.5,
    ratingText: "6 ratings",
    price: 3.49,
    imageUrl: "https://www.amazon.com/images/I/61Nn8osc18L._AC_SL1024_.jpg",
  },
  {
    id: "B07J1W83FW",
    title: "Cherry Sakura...",
    ratingNumber: 4.5,
    ratingText: "9 ratings",
    price: 5.98,
    imageUrl: "https://www.amazon.com/images/I/61JNZ2wkrrL._AC_SL1000_.jpg"
  },
  {
    id: "B079RF2LLV",
    title: "wintefei Modern...",
    ratingNumber: 4.0,
    ratingText: "165 ratings",
    price: 3.99,
    imageUrl: "https://www.amazon.com/images/I/51IhD3X31lL._AC_SL1001_.jpg"
  },
  {
    id: "B00U0N86ZI",
    title: "Distressed Metal...",
    ratingNumber: 4.2,
    ratingText: "2,165 ratings",
    price: 4.99,
    imageUrl: "https://www.amazon.com/images/I/61U2PjYB-UL._AC_SL1000_.jpg"
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
