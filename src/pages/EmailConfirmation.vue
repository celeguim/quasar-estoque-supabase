<template>
  <q-page padding>
    <p class="text-body1">Thanks for registering!</p>
    <p class="text-body1">
      Please confirm your email: <strong> {{ $route.query.email }} </strong>
    </p>

    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-btn
          class="full-width"
          color="primary"
          label="Login"
          to="/login"
          rounded
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmailConfirmation",
});
</script>
