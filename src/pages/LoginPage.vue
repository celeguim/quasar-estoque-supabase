<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      v-model="form"
      @submit.prevent="handleLogin"
    >
      <p class="col-12 text-h5 text-center">Login</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
          type="email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email is required']"
        />

        <q-input
          label="Password"
          v-model="form.password"
          type="password"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 5) ||
              'Password must be greater than 6 chars',
          ]"
        />

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
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "LoginPage",

  setup() {
    const router = useRouter();
    const { login } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const { isLoggedIn } = useAuthUser();

    const form = ref({
      email: "",
      password: "",
    });

    onMounted(() => {
      if (isLoggedIn()) {
        router.push("me");
      }
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        notifySuccess("Login Successful");
        router.push("me");
      } catch (error) {
        //alert(error.message);
        notifyError(error.message);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>
