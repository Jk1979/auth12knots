<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">12 knots</span>
            <span class="card-title">Registration</span>
            <div class="input-field">
                <input id="email" type="text"
                    :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
                    v-model.trim="email">
                <label for="email">Email</label>
                <small class="helper-text invalid" v-if="($v.email.$dirty && !$v.email.required)">field email is
                    required</small>
                <small class="helper-text invalid" v-else-if="($v.email.$dirty && !$v.email.email)">field email must be
                    a valid email</small>
            </div>
            <div class="input-field">
                <input id="password" type="password" class="validate"
                    :class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.email.minLength) }"
                    v-model.trim="password">
                <label for="password">Password</label>
                <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Password must not
                    be empty</small>
                <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">Password
                    must be at least {{$v.password.$params.minLength.min}} charachters</small>
            </div>
            <div class="input-field">
                <input id="password_confirmation" type="password" class="validate"
                    :class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.email.minLength) }"
                    v-model.trim="password_confirmation">
                <label for="password">Password confirmation</label>
                <small class="helper-text invalid" v-if="$v.password_confirmation.$dirty && !$v.password_confirmation.required">Password must not
                    be empty</small>
                <small class="helper-text invalid" v-else-if="$v.password_confirmation.$dirty && !$v.password_confirmation.minLength">Password
                    must be at least {{$v.password_confirmation.$params.minLength.min}} charachters</small>
            </div>
            <div class="input-field">
                <input id="name" type="text" class="validate"
                    v-model.trim="name"
                    :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                >
                <label for="name">Name</label>
                <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Name field is required</small>
            </div>
            <div class="input-field">
                <input id="surname" type="text" v-model.trim="surname">
                <label for="name">Surname</label>
            </div>
            <p>
                <label>
                    <input type="checkbox"
                    :class="{ invalid: !$v.agree.checked}" 
                    v-model="agree"
                    />
                    <span :class="{checkvalid : (!$v.agree.checked && $v.agree.$dirty) }">Agree with rules and terms of use</span>
                </label>
            </p>
        </div>
        <div class="card-action">
            <div>
                <button class="btn waves-effect waves-light auth-submit" type="submit">
                    Register
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                Already have an account?
                <router-link to="/login">Sign in!</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import {
        required,
        email,
        minLength
    } from 'vuelidate/lib/validators'

    export default {
        name: 'register',
        data: () => ({
            name: '',
            surname: '',
            email: '',
            password: '',
            password_confirmation: '',
            agree: false
        }),
        validations: {
            name: {
                required
            },
            agree: { checked: v => v },
            email: {
                email,
                required
            },
            password: {
                required,
                minLength: minLength(6)
            },
            password_confirmation: {
                required,
                minLength: minLength(6)
            },
        },
        methods: {
            async submitHandler() {
                
                if(this.$v.$invalid) {
                    this.$v.$touch()
                    return;
                }
                const user = new URLSearchParams();
                
                user.append('name', this.name);
                user.append('surname', this.surname);
                user.append('email', this.email);
                user.append('password', this.password);
                user.append('password_confirmation', this.password_confirmation);
                
                try {
                    const regData = await this.$store.dispatch('register',user)
                    console.log(regData);
                    this.$router.push('/')
                } catch(e) { console.log(e); }
            }
        }
    }
</script>
<style scoped>
    .checkvalid {
        color: red
    }
</style>