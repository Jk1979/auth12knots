<template>
  <div>
    <div class="page-title">
      <h3>{{ "ProfileTitle"|localize }}</h3>
    </div>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="description">Name</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >field name is required</small
        >
      </div>
      <div class="switch">
        <label>
          Russian
          <input type="checkbox" v-model="isEnLocale" />
          <span class="lever"></span>
          English
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        Refresh
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import localizeFilter from "../filters/localize.filter"

export default {
  name: "Profile",
  metaInfo() {
    return {
      title: this.$title('meta_title'),
      titleTemplate: '%s - Yay!',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    }
  },
  data: () => ({
    name: "",
    isEnLocale: true,
  }),
  mounted() {
    console.log(this.info.locale);
    this.name = this.info.name;
    this.isEnLocale = this.info.locale === "en-US";
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  validations: {
    name: { required },
  },
  computed: {
    ...mapGetters(["info"]),
    ...mapActions(["updateInfo"]),
  },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        // await this.updateInfo({
        await this.$store.dispatch('updateInfo',{
          name: this.name,
          locale: this.isEnLocale ? "en-US" : "ru-RU",
        });
      } catch (e) {
        this.$store.commit("setError", e);
      }
    },
  },
};
</script>
<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
