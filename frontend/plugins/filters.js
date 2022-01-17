import Vue from 'vue'


Vue.filter('price', function (value) {

    return `£${parseFloat(value).toFixed(2)}`;
});


Vue.filter('accurate', function (value) {

  return `£${parseInt(value * 100)/100}`;
});
