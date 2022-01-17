<template>
<div>
  <b-button v-b-modal.modal-prevent-closing>New Task</b-button>

  <div class="my-3">
    <h4>Incomplete</h4>
    <b-list-group class="col-6">
      <b-list-group-item v-for="(task,index) in pending_tasks" :key="index" class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h6 class="mb-1">{{ task.summary }}</h6>
            <font-awesome-icon :icon="['fa', 'trash']"/>


        </div>
        <p class="mb-1">
          {{task.due_date}}
        </p>
<!--        <small>3 days ago</small>-->
      </b-list-group-item>
    </b-list-group>

  </div>

  <div class="my-3">
    <h4>Completed</h4>
    <b-list-group class="col-6">
      <b-list-group-item v-for="(task,index) in completed_tasks" :key="index" class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <b-form-checkbox
            id="checkbox-1"
            name="checkbox-1"
            value="completed"
            checked="true"
            disabled
          >
          </b-form-checkbox>
          <h6 class="mb-1">{{ task.summary }}</h6>
          <font-awesome-icon :icon="['fa', 'trash']"/>


        </div>


      </b-list-group-item>
    </b-list-group>
    <ul  class="mb-0 pl-3">
      <li v-for="(task,index) in completed_tasks" :key="index">{{ task.summary }}</li>
    </ul>
  </div>

  <b-modal
    id="modal-prevent-closing"
    ref="modal"
    title="New Task"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="Summary"
        label-for="name-input"
        invalid-feedback="Name is required"

      >
        <b-form-input
          id="name-input"
          v-model="form.summary"

          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Description"
        label-for="name-input"
        invalid-feedback="Name is required"

      >
        <b-form-input
          id="name-input"
          v-model="form.description"

          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Due Date"
        label-for="name-input"
        invalid-feedback="Name is required"

      >
        <b-form-input
          id="name-input"
          v-model="form.due_date"

          required
        ></b-form-input>
      </b-form-group>

      <date-time-picker v-model="form" label="Due Date"></date-time-picker>


    </form>
  </b-modal>

</div>

</template>

<script>

import Form from "vform";
import dateTimePicker from "~/components/DateTimePicker";
export default {
  name:'indexPage',

  components: {
    dateTimePicker,
  },
  data() {
    return {
      pending_tasks: [],
      completed_tasks: [],
      form: new Form({
        summary:null,
        description:null,
        due_date:null,

      }),


    }
  },

  mounted() {
    this.$echo.channel('task-expired.'+this.user.id).on("TaskExpired", (payload) => {
      console.log(payload);
    });

    this.get();
  },
  methods: {

    get() {
      this.$axios.get(this.route('/tasks'))
        .then((response) => {
          this.pending_tasks = response.data.pending_tasks;
          this.completed_tasks = response.data.completed_tasks;
          this.loader = false;
        }).catch((error) => {

      })
    },


    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      this.form.post(this.route('/tasks'))
      .then((response) => {
          this.pending_tasks.push(response.data)
      })
      .catch((error) => {

      })

      // Exit when the form isn't valid
      // if (!this.checkFormValidity()) {
      //   return
      // }
      // Push the name to submitted names
      // this.submittedNames.push(this.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>
