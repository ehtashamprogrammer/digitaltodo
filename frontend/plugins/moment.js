import moment from 'moment';
import Vue from 'vue';

Vue.prototype.$moment = moment;


Vue.filter('date', function (value) {

    return moment(value).format('DD MMM, YYYY');
});
Vue.filter('dateTime', function (value) {

    return moment(value).format('DD-MMM-YYYY hh:mma');
});
