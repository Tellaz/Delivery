<template>
   <div>
      <DialogMessage
      :dialogOptions="dialogOptions"
      @dialog_false="callback_dialog"
      
      />

      <div class="border border-5 rounded-circle" style=" position: absolute; top: 0px; right: -60px;" >
      <router-link class="remove-underline" :to="{name:'TelaCliente'}" active-class="link-ativo">
         <font-awesome-icon :icon="iconeHome" class="bg-emCima p-1 ml-1 mr-1 mt-1"/>
      </router-link>
      </div>
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex class="mt-16" xs12 sm8 md8>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="#655847">
                        <v-toolbar-title>Login </v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field 
                              v-model="login.email"
                              label="Email"
                              type="email"
                           ></v-text-field>
                           <div v-if="v$.login.email.$error">
                           <v-alert border="bottom" color="pink darken-1" dark>
                              O campo
                              <strong>"email"</strong>
                              não pode ficar vazio
                           </v-alert>
                           </div>
                           <v-text-field
                           @keyup.enter="submit()"
                              v-model="login.senha"
                              label="Senha"
                              type="password"
                           ></v-text-field>
                           <div v-if="v$.login.senha.$error">
                           <v-alert border="bottom" color="pink darken-1" dark>
                              O campo
                              <strong>"senha"</strong>
                              não pode ficar vazio
                           </v-alert>
                           </div>
                        </v-form>
                     </v-card-text>
                     <v-card-actions class="d-flex justify-content-around">
                        <v-btn class="btn-gold" :loading="salvarAlteraçõesLoading" @click="submit()">Entrar</v-btn>
                     </v-card-actions>
                  </v-card>
                        
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
  </div>
</template>

<script>
import DialogMessage from "../../components/DialogMessage.vue";
import DefaultService from "../../services/defaultService";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
   created() {
        this.defaultService = new DefaultService(this.$http, 'api/usuario')
        
      },
   setup() {
    return { v$: useVuelidate() };
  },
    data() {
        return {
           
         requeresAuth: false,
            iconeHome: "fa-solid fa-house-chimney",
           defaultService: null,
           salvarAlteraçõesLoading: false,
           dialogOptions: {
            title: "",
            dialog: false,
            message: "",
            type: "darken-2",
            botaoText: "",
            },
            Errors: 0,
           dialogLoaging: false,
            login: {
               email: "",
               senha: ""
            },
        }
    },

    components: {
    DialogMessage,
  },

  validations() {
    return {
      login: {
        email: { required },
        senha: { required },
       
      },
    };
  },

    methods: {

       callback_dialog() {
      this.dialogOptions.dialog = false;
      this.deleteLoading = false;
      this.dialogLoaging = false;
      if (this.error) {
        this.salvarAlteraçõesLoading = false;
        return;
      }
      this.$router.push({ name: "Perfil" });
      window.location.reload()
    },


       async submit() {
         
         const isFormCorrect = await this.v$.$validate(); 

         if (this.v$.$errors.length - this.Errors == 0) {
         //Caso houver erros do produtotype
         this.salvarAlteraçõesLoading = true;

            this.defaultService
               .login(this.login)
               .then((res) => {  
               window.sessionStorage.setItem('tokens', true);
               this.dialogOptions.title = "Sucesso!";
               this.dialogOptions.message = "Login efetuado com sucesso!";
               this.dialogOptions.type = "success";
               this.dialogOptions.botaoText = "Ok";
               this.dialogOptions.dialog = true;
               this.error = false; 
               this.salvarAlteraçõesLoading = false;
               this.v$.$reset();
               localStorage.setItem('token', res.data.token)
               })
               .catch((error) => {
                this.dialogOptions.title = "Falha no processamento!";
                this.dialogOptions.message = "Não foi possível efetuar o login!";
                this.dialogOptions.type = "error";
                this.dialogOptions.botaoText = "Tente Novamente";
                this.dialogOptions.dialog = true;
                this.error = true;
                return error;
               });

               
         
         } else {
         return isFormCorrect;
         }
         
      },

        
    },

    
   
};
</script>

<style lang="scss">

.bg-emCima:hover {
  width: 20px;
  height: 20px;
}

@import "../../assets/scss/index.scss";
</style>