const Alexa = require('ask-sdk-core');
const intentIs = require('lib').intentIs;
const supportsAPL = require('lib').supportsAPL;
const getCurrentDate = require('lib').getCurrentDate;
const shoppingListDocument = require('./documents/shoppingList');

const shoppingList = [
  "Welcome Mat",
  "Dish Soap",
  "Picture Frame",
  "Cat Food"
];

const ShoppingListIntentHandler = {
  canHandle(handlerInput) {
      return intentIs(handlerInput, 'ShoppingListIntent');
  },
  handle(handlerInput) {
      const speakOutput = `As of today, your shopping list contains ${shoppingList.slice(0, shoppingList.length - 1).join(', ')} and ${shoppingList[shoppingList.length - 1]}.`
      let builder = handlerInput.responseBuilder;
      
      if (supportsAPL(handlerInput)) {
          builder = builder.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: shoppingListDocument,
            datasources: {
                textListData: {
                    headerTitle: "Shopping List",
                    headerSubtitle: `${getCurrentDate()}`,
                    items: shoppingList.map(item => ({
                        primaryText: item
                    }))
                }
            }
          });
      }
      
      return builder.speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
  }
};

module.exports = ShoppingListIntentHandler;
