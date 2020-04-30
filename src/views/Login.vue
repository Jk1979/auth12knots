<template>
<form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
        <span class="card-title"><h2>12 knots</h2></span>
        <span class="card-title">account login</span>
        <div class="input-field">
        <input
            id="email"
            type="text"
            :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
            v-model.trim="email"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="($v.email.$dirty && !$v.email.required)">field email is required</small>
        <small class="helper-text invalid" v-else-if="($v.email.$dirty && !$v.email.email)">field email must be a valid email</small>
        </div>
        <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
            :class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.email.minLength) }"
            v-model.trim="password"
        >
        <label for="password">Password</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Password must not be empty</small>
        <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">Password must be at least {{$v.password.$params.minLength.min}} charachters</small>
        </div>
    </div>
    <div class="card-action">
        <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
            Sign in
            <i class="material-icons right">send</i>
        </button>
        </div>

        <p class="center">
        Don't have account?
        <router-link to="/register">Register</router-link>
        </p>
    </div>
</form>

</template>

<script> 

import { required, email, minLength } from 'vuelidate/lib/validators'
import messages from '../utils/messages'

export default {
    name: 'login',
    data: () => (
        {
            email: '',
            password: '',
        }
    ),
    validations: {
        email: {email, required},
        password: { required, minLength: minLength(6)},
    },
    methods: {
        submitHandler() {
            if(this.$v.$invalid) {
                 this.$v.$touch()
                 return
            }
            const user = new URLSearchParams();
            user.append('login', this.email);
            user.append('password', this.password);

            this.$store.dispatch('login',user).then((res)=> {
                console.log(res);
                this.$router.push('/');
            }).catch(err => {
                this.$message(messages['auth/user-not-found'])
            });
        }
    },
    mounted() {
        if(messages[this.$route.query.message]) {
            this.$message(messages[this.$route.query.message])
        }
        
    }
}
</script>