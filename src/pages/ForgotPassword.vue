<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      v-model="form"
      @submit.prevent="handleForgotPassword"
    >
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          type="email"
          v-model="form.email"
          :lazy-rules="true"
          :rules="[(val) => val.length > 0 || 'Email is required']"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Send Reset Email"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />

          <q-btn
            class="full-width"
            color="primary"
            label="Back"
            to="/login"
            rounded
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
  name: "ForgotPasswordPage",

  setup() {
    const router = useRouter();
    const { sendPasswordResetEmail } = useAuthUser();

    const form = ref({
      email: "luiz.celeguim@gmail.com",
    });

    const handleForgotPassword = async () => {
      try {
        console.log(form.value.email);
        await sendPasswordResetEmail(form.value.email);
        alert("sent email for reset " + form.value.email);
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    };

    return { form, handleForgotPassword };
  },
});
</script>
