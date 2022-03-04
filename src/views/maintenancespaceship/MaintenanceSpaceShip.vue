<template >
  <div>

    <DialogMessage
      :dialogOptions="dialogOptions"
      @dialog_false="callback_dialog"
    />
    <div class="d-flex justify-center titulo">Manutenção da nave</div>
    
    <template>
      <v-container fluid>
        <v-row align="center">
          <v-col
            class="d-flex"
            cols="12"
            sm="6"
          >
            <v-select
              :items="getParts"
              label="Peça"
            ></v-select>
          </v-col>

          <v-col
            class="d-flex"
            cols="12"
            sm="6"
          >
            <v-select 
              :items="items"
              label="Ferramenta"
            ></v-select>
          </v-col>

          
        </v-row>
      </v-container>
    </template>




      <center class="d-flex justify-content-around">
        <v-btn primary class="btn-gold" :loading="salvarAlteraçõesLoading" @click="submit">Confirmar</v-btn>
      </center>

    
  </div>
</template>
<script>

import DialogMessage from "../../components/DialogMessage.vue";
import useVuelidate from "@vuelidate/core";
// import { required } from "@vuelidate/validators";
import DefaultService from "../../services/defaultService";

export default {
  async created() {
    this.defaultService = new DefaultService(this.$http, "parts");
    this.getTools();

    this.setParts();

  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      Parts: [],
      tools: [],
      Erros: 0,
      desserts: [],
      items: [],
      getParts: [],
      defaultService: null,
       dialogOptions: {
        title: "",
        dialog: false,
        message: "",
        type: "darken-2",
        botaoText: "",
      },
      salvarAlteraçõesLoading: false,
      dialogLoaging: false
    };
  },

  components: {
   DialogMessage
  },
  validations() {
    return {
   
    };
  },
  methods: {

  async setParts() {
      this.Parts = new DefaultService(this.$http, "parts");
      var part = await this.Parts.getAll();
      this.Parts = part.data
      for (let i = 0; i < this.Parts.length; i++) {
        this.getParts.push(this.Parts[i].name)
      }
    },

    async getTools(){
      this.tools = new DefaultService(this.$http, "tools");
      var alltools = await this.tools.getAll();
      this.tools = alltools.data
      for (let i = 0; i < this.tools.length; i++) {
        this.items.push(this.tools[i].name)
      }
    },

    // async submit() {
    //   const isFormCorrect = await this.v$.$validate();

    //   if (this.Parts.id) {
    //     if (!isFormCorrect) {
    //       return isFormCorrect;
    //     }
    //   }

    //   if (!isFormCorrect) {
    //     return isFormCorrect;
    //   } else {
    //     if (this.v$.$errors.length - this.Errors == 0) {
    //       //Caso houver erros do spaceshiptype
    //       this.salvarAlteraçõesLoading = true;
          
    //         this.defaultService
    //           .put(this.Parts)
    //           .then((res) => {
    //             this.dialogOptions.title = "Sucesso!";
    //             this.dialogOptions.message = "Item editado com sucesso!";
    //             this.dialogOptions.type = "success";
    //             this.dialogOptions.botaoText = "Ok";
    //             this.dialogOptions.dialog = true;
    //             this.v$.$reset();
    //             this.salvarAlteraçõesLoading = false;
    //             return res;
    //           })
    //           .catch((error) => {
    //             this.dialogOptions.title = "Falha no processamento!";
    //             this.dialogOptions.message = "Não foi possível editar a peça!";
    //             this.dialogOptions.type = "error";
    //             this.dialogOptions.botaoText = "Tente Novamente";
    //             this.dialogOptions.dialog = true;
    //             this.error = true;
    //             return error;
    //           });
          
    //     }
    //   }
    // },

  }
};
</script>

<style  lang="scss" scoped>
@import "../../assets/scss/index.scss";
</style>
