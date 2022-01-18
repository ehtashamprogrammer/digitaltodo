<template>

        <date-picker v-model="form.due_date" :placeholder="placeholder" :config="options"></date-picker>

</template>

<script>

import datePicker from "vue-bootstrap-datetimepicker";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";

export default {
  name: 'DateTimePicker',

  components: {
    datePicker,
  },

  props:{
    placeholder:{
      required:true
    },
    value:{
      required:true,
      type:Object
    }
  },



  data() {
    return {
      options: {
        format: "YYYY-MM-DD HH:m:s",
        useCurrent: false,
        icons: {
          time: "far fa-clock",
          date: "far fa-calendar",
          up: "fas fa-arrow-up",
          down: "fas fa-arrow-down",
          previous: "fas fa-chevron-left",
          next: "fas fa-chevron-right",
          today: "fas fa-calendar-check",
          clear: "far fa-trash-alt",
          close: "far fa-times-circle",
        },
      },
    }
  },

  computed:{
    form:{
      get(){
        return this.value;
      },
      set(val){
        this.$emit('input',val);
      }
    },
  }
}

</script>
