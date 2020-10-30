import Vue from 'vue'
import moment from "moment";
import VuetableFieldSequence from 'vuetable-2/src/components/VuetableFieldSequence.vue'
import VuetableFieldCheckbox from 'vuetable-2/src/components/VuetableFieldCheckbox.vue'
Vue.component('vuetable-field-checkbox', VuetableFieldCheckbox)

export default [
  {
    name: VuetableFieldSequence,
    title: "No.",
    width: "5%"
  },
  {
    name: 'vuetable-field-checkbox',
    title: "checkbox",
    width: "5%"
  },
  {
    name: "name",
    title: '<i class="grey user outline icon"></i>Name',
    width: "20%",
    sortField: "name"
  },
  {
    name: "email",
    title: '<i class="grey mail outline icon"></i>Email',
    width: "20%",
    sortField: "email"
  },
  {
    name: "birthdate",
    title: '<i class="grey birthday icon"></i>Birthdate',
    width: "15%",
    formatter: (value) => {
      return (value === null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format('MMM Do, YYYY')
    }
  },
  {
    name: "gender-slot",
    title: '<i class="grey heterosexual icon"></i>Gender',
    titleClass: "center aligned",
    dataClass: "center aligned",
    width: "15%",
  },
  {
    name: "salary",
    title: '<i class="grey money icon"></i>Salary',
    titleClass: "center aligned",
    dataClass: "right aligned",
    width: "15%",
   
    sortField: "salary"
  }
];
