<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      v-model="form"
      @submit.prevent="handleRegister"
    >
      <p class="col-12 text-h5 text-center">Register</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Name"
          v-model="form.name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />
        <q-input label="Email" type="email" v-model="form.email" />
        <q-input label="Password" type="password" v-model="form.password" />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            class="full-width"
            color="primary"
            label="Register"
            type="submit"
            outline
            rounded
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
  name: "RegisterPage",

  setup() {
    const router = useRouter();
    const { register } = useAuthUser();

    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const handleRegister = async () => {
      try {
        console.log("handleRegister", form.value);

        await register(form.value);
        router.push({
          path: "email-confirmation",
          query: { email: form.value.email },
        });
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };
    return { form, handleRegister };
  },
});
</script>
