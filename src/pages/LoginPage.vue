<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      v-model="form"
      @submit.prevent="handleLogin"
    >
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="Email" v-model="form.email" type="email" />
        <q-input label="Password" v-model="form.password" type="password" />

        <div class="full-width q-pt-md">
          <q-btn
            class="full-width"
            color="primary"
            label="Login"
            type="submit"
            outline
            rounded
          />
        </div>

        <div class="full-width q-gutter-y-sm">
          <q-btn
            class="full-width"
            color="primary"
            label="Register"
            type="submit"
            to="/register"
            size="sm"
            flat
          />
        </div>

        <div class="full-width q-gutter-y-sm">
          <q-btn
            class="full-width"
            color="primary"
            label="Forgot Password?"
            to="/forgot-password"
            size="sm"
            flat
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginPage",

  setup() {
    const router = useRouter();
    const { login } = useAuthUser();

    const form = ref({
      email: "",
      password: "",
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        router.push("me");
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>
