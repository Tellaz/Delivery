<template>
   
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex class="mt-16" xs12 sm8 md8>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="green">
                        <v-toolbar-title>Login </v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              name="login"
                              label="Email"
                              type="email"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              name="password"
                              label="Senha"
                              type="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions class="d-flex justify-content-around">
                        <v-btn class="btn-gold" @click="submit()">Entrar</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
  
</template>

<script>
export default {
    data() {
        return {
            login: [

            ],
        }
    },

    methods: {
        submit(){
            this.$router.push({ name: "Perfil" });
            window.location.reload()
        }
    },
   
};
</script>

<style lang="scss">
@import "../../assets/scss/index.scss";
</style>