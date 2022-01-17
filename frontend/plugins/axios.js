import Vue from 'vue';

const vue = new Vue();
export default function ({$axios, redirect}) {
    $axios.defaults.withCredentials = true;
}
