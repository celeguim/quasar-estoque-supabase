import { ref } from "vue";
import useSupabase from "boot/supabase";

const user = ref(null);
export default function useAuthUser() {
  const { supabase } = useSupabase();
  //console.log("supabase", supabase);

  const login = async ({ email, password }) => {
    console.log("login", email, password);
    const { user, error } = await supabase.auth.signIn({ email, password });
    console.log("login", user, error);
    if (error) {
      console.error(error);
      throw error;
    }
    return user;
  };

  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signIn({ provider });
    if (error) throw error;
    return user;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isLoggedIn = () => {
    return user.value != null;
  };

  /**
   * Register
   */
  const register = async ({ email, password, ...meta }) => {
    console.log("register", email, password, meta);

    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        // arbitrary meta data is passed as the second argument under a data key
        // to the Supabase signUp method
        data: meta,
        // the to redirect to after the user confirms their email
        // window.location wouldn't be available if we were rendering server side
        // but since we're all on the client it will work fine
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation"`,
      }
    );
    if (error) throw error;
    return user;
  };

  /**
   * Update user email, password, or meta data
   */
  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data);
    if (error) throw error;
    return user;
  };

  const sendPasswordResetEmail = async (email) => {
    console.log("sendPasswordResetEmail", email);
    const { user, error } = await supabase.auth.api.resetPasswordForEmail(
      email
    );
    if (error) throw error;
    return user;
  };

  const resetPassword = async (accessToken, newPassword) => {
    console.log("resetPassword", accessToken, newPassword);

    const { user, error } = await supabase.auth.api.updateUser(accessToken, {
      password: newPassword,
    });
    if (error) throw error;
    return user;
  };

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordResetEmail,
    resetPassword,
  };
}
