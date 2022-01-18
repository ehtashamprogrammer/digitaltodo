<template>
<div>
  <b-table striped hover :items="users" :fields="fields"></b-table>

</div>
</template>
<script>
export default {
  layout:'admin',
  middleware:"authenticated",

  data(){
    return{
      fields: ['id', 'name', 'email'],
      users:[],

    }
  },
  mounted() {
    this.$axios.get(this.route('/users'))
    .then((response) => {
      this.users = response.data.users
    })
  }

}
</script>
