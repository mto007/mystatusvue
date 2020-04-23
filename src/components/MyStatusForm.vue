<template>
  <b-container>
    <div id="mystatus-form">
      <h1>Covid-19 Quarantine Mood Tracker</h1>
      <div class="error">{{ errors }}</div>
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="How are you feeling today?"
          label-for="input-1"
        >
          <b-button-group id="input-1" v-model="input.status">
            <b-button
              v-bind:class="[
                input.status == 1 ? selectedClass : '',
                mybtnClass,
              ]"
              value="1"
              v-on:click="input.status = 1"
              ><font-awesome-icon icon="angry" id="miserable" size="2x"
            /></b-button>
            <b-button
              v-on:click="input.status = 2"
              v-bind:class="[
                input.status == 2 ? selectedClass : '',
                mybtnClass,
              ]"
              value="2"
              ><font-awesome-icon icon="frown" id="unhappy" size="2x"
            /></b-button>
            <b-button
              v-on:click="input.status = 3"
              v-bind:class="[
                input.status == 3 ? selectedClass : '',
                mybtnClass,
              ]"
              value="3"
              ><font-awesome-icon icon="meh" id="normal" size="2x"
            /></b-button>
            <b-button
              v-on:click="input.status = 4"
              v-bind:class="[
                input.status == 4 ? selectedClass : '',
                mybtnClass,
              ]"
              value="4"
              ><font-awesome-icon icon="meh" id="ok" size="2x"
            /></b-button>
            <b-button
              v-on:click="input.status = 5"
              v-bind:class="[
                input.status == 5 ? selectedClass : '',
                mybtnClass,
              ]"
              value="5"
              ><font-awesome-icon icon="grin" id="happy" size="2x"
            /></b-button>
          </b-button-group>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Additional information:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="input.addInfo"
            maxLength="200"
            placeholder="Enter additional information"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="Post code:" label-for="input-3">
          <b-form-input
            id="input-3"
            maxLength="20"
            v-model="input.postCode"
            placeholder="Enter post code"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label="City:" label-for="input-4">
          <b-form-input
            id="input-4"
            maxLength="100"
            v-model="input.city"
            placeholder="City where you are at the moment"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-5" label="Age:" label-for="input-5">
          <b-form-input
            id="input-5"
            v-model="input.age"
            type="number"
            min="0"
            max="110"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-6" label="Sex:" label-for="input-6">
          <b-form-radio-group
            id="btn-radios-sex"
            v-model="input.sex"
            :options="sexoptions"
            buttons
            button-variant="outline-primary"
            name="radios-btn-default"
          ></b-form-radio-group>
        </b-form-group>
        <b-button type="submit" variant="primary"
          >Submit your answer and good luck!</b-button
        >
      </b-form>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "mystatus-form",
  data() {
    return {
      input: {
        status: 0,
        statusDate: "",
        latitude: 0,
        longitude: 0,
        postCode: "",
        city: "",
        age: 0,
        sex: 3,
        addInfo: "",
      },
      errors: "",
      sexoptions: [
        { text: "Female", value: 1 },
        { text: "Male", value: 2 },
        { text: "Prefer not to tell", value: 3 },
      ],
      selectedClass: "selected",
      mybtnClass: "mybtn",
    };
  },
  created() {
    // set current statusDate
    const today = new Date();
    this.input.statusDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    if (!("geolocation" in navigator)) {
      return;
    }
    // get position
    navigator.geolocation.getCurrentPosition((pos) => {
      this.input.latitude = pos.coords.latitude;
      this.input.longitude = pos.coords.longitude;
    });
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.input.status == "") {
        this.errors = "Please enter your mood";
        return;
      }
      this.errors = "";
      const query = `
        mutation createStatus($input: mentalStatusInput!) {
        createStatus(mentalStatus:$input ) {
        id
        status
        }
        }
      `;
      const OperationName = "createStatus";
      const variables = { input: this.input };
      this.axios
        .post("https://localhost:44352/graphql", {
          query,
          variables,
          OperationName,
        })
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.form {
  margin-bottom: 2rem;
}
#miserable {
  color: red;
}
#unhappy {
  color: orange;
}
#normal {
  color: white;
}
#ok {
  color: lime;
}
#happy {
  color: green;
}
.mybtn {
  background-color: lightgray;
}
.error {
  color: red;
  font-weight: bold;
}
.selected {
  outline-color: transparent;
  border: 2px solid black !important;
  font-weight: 600;
}
</style>
