<template >
  <div>
    <DialogMessage
      :dialogOptions="dialogOptions"
      @dialog_false="callback_dialog"
    />
    <DialogDelete
      :dialogDelete="dialogDelete"
      @delete_confirm="deleteItemConfirm"
      @false_dialog="closeDelete"
    />

    <v-dialog v-model="dialogLoaging" max-width="500px">
      <v-card>
        <v-card-title class="body-style d-flex justify-center"
          >Aguarde!</v-card-title
        >
        <v-card-actions
          :loading="deleteLoading"
          class="d-flex justify-content-around"
        >
        </v-card-actions>
        <center class="border-0">
          <v-btn
            :style="{ backgroundColor: 'rgb(30, 30, 30)' }"
            class="border-0 body-style d-flex justify-center"
            :loading="deleteLoading"
            >.</v-btn
          >
        </center>
      </v-card>
    </v-dialog>

    <div class="d-flex justify-center titulo">{{ title }}</div>
    <v-text-field
      :disabled="inputDisable"
      v-model="Parts.name"
      label="Nome"
    ></v-text-field>
    <div v-if="v$.Parts.name.$error">
      <v-alert border="bottom" color="pink darken-1" dark>
        O campo
        <strong>"Nome"</strong>
        não pode ficar vazio
      </v-alert>
    </div>

    <v-slider
    v-model="Parts.health"
    color="green"
    label="Vida"
    
    min="1"
    max="100"
    thumb-label
    ></v-slider>
   

    <v-textarea
      :disabled="inputDisable"
      label="Descrição"
      auto-grow
      v-model="Parts.description"
    ></v-textarea>
    <div v-if="v$.Parts.description.$error">
      <v-alert border="bottom" color="pink darken-1" dark>
        O campo
        <strong>"Descrição"</strong>
        não pode ficar vazio
      </v-alert>
    </div>
    <div v-if="inputDisable == false" class="d-flex justify-content-around">
      <v-btn
        v-if="method == 'edit'"
        primary
        class="btn-gold mx-4"
        @click="deleteParts"
        >Excluir peça</v-btn
      >
      <v-btn
        primary
        class="btn-gold mx-4"
        :loading="salvarAlteraçõesLoading"
        @click="submit"
        >{{ MethodBtn }}</v-btn
      >
    </div>
  </div>
</template>
<script>
import DialogMessage from "../../components/DialogMessage.vue";
import DialogDelete from "../../components/DialogDelete.vue";
import DefaultService from "../../services/defaultService.js";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  async created() {
    this.defaultService = new DefaultService(this.$http, "parts");
    if (this.$route.name == "partsCreate") {
      this.method = "create";
      this.title = "Cadastro de Peça";
      this.MethodBtn = "Cadastrar";
    }
    if (this.$route.name == "partsEdit") {
      this.method = "edit";
      this.title = "Editando a Peça";
      this.load();
      this.MethodBtn = "Salvar alterações";
      this.getPartsByID();
    }
    if (this.$route.name == "partsRead") {
      this.method = "read";
      this.title = "Visualizando a Peça";
      this.inputDisable = true;
      this.getPartsByID();
    }
    if (this.$route.name == "partsRead") {
      this.method = "read";
      this.title = "Mostrando a Peça";
      this.getPartsByID();
    }
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      deleteLoading: false,
      salvarAlteraçõesLoading: false,
      defaultService: null,
      inputDisable: false,
      method: null,
      title: "",
      Errors: 0,
      Parts: {
        id: null,
        name: "",
        health: 0,
        description: "",
      },
      MethodBtn: "",
      selectSpaceShip: null,
      items: [],
      tools: null,
      dialogOptions: {
        title: "",
        dialog: false,
        message: "",
        type: "darken-2",
        botaoText: "",
      },
      dialogLoaging: false,
      dialogDelete: {
        dialog: false,
      },
    };
  },
  components: {
    DialogMessage,
    DialogDelete,
  },
  validations() {
    return {
      Parts: {
        name: { required },
        life: { required },
        description: { required },
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
      this.$router.push({ name: "partsList" });
    },

    clearInputs() {
      Object.keys(this.Parts).forEach((key) => {
        this.Parts[key] = "";
      });
    },

    closeDelete() {
      this.dialogDelete.dialog = false;
    },

    deleteItemConfirm() {
      this.deleteLoading = true;
      this.dialogLoaging = true;
      this.defaultService
        .delete(this.Parts)
        .then((res) => {
          this.dialogOptions.title = "Sucesso!";
          this.dialogOptions.message = "Item excluido com sucesso!";
          this.dialogOptions.type = "success";
          this.dialogOptions.botaoText = "Ok";
          this.dialogOptions.dialog = true;
          this.v$.$reset();
          this.deleteLoading = false;
          this.dialogLoaging = false;
          return res;
        })
        .catch((error) => {
          this.dialogOptions.title = "Falha no processamento!";
          this.dialogOptions.message = "Não foi possível excluir a peça!";
          this.dialogOptions.type = "error";
          this.dialogOptions.botaoText = "Tente Novamente";
          this.dialogOptions.dialog = true;
          this.error = true;
          return error;
        });
    },

    async deleteParts() {
      this.dialogDelete.dialog = true;
    },

    async getPartsByID() {
      this.Parts.id = this.$route.params.id;
      var partsByID = await this.defaultService.getById(this.Parts.id);
      this.Parts.name = partsByID.data.part.name;
      this.Parts.health = partsByID.data.part.health;
      this.Parts.description = partsByID.data.part.description;
    },



    async submit() {
      const isFormCorrect = await this.v$.$validate();

      if (this.Parts.id) {
        if (!isFormCorrect) {
          return isFormCorrect;
        }
      }

      if (!isFormCorrect) {
        return isFormCorrect;
      } else {
        if (this.v$.$errors.length - this.Errors == 0) {
          //Caso houver erros do spaceshiptype
          this.salvarAlteraçõesLoading = true;
          if (this.method == "create") {
            this.defaultService
              .post(this.Parts)
              .then(() => {
                this.error = false;
                this.dialogOptions.title = "Sucesso!";
                this.dialogOptions.message = "Item cadastrado com sucesso!";
                this.dialogOptions.type = "success";
                this.dialogOptions.botaoText = "Ok";
                this.dialogOptions.dialog = true;
                this.salvarAlteraçõesLoading = false;

                this.v$.$reset();
              })
              .catch((error) => {
                this.dialogOptions.title = "Falha no processamento!";
                this.dialogOptions.message = "Não foi possível cadastrar peça!";
                this.dialogOptions.type = "error";
                this.dialogOptions.botaoText = "Tente Novamente";
                this.dialogOptions.dialog = true;
                this.error = true;
                return error;
              });
          } else {
            this.defaultService
              .put(this.Parts)
              .then((res) => {
                this.dialogOptions.title = "Sucesso!";
                this.dialogOptions.message = "Item editado com sucesso!";
                this.dialogOptions.type = "success";
                this.dialogOptions.botaoText = "Ok";
                this.dialogOptions.dialog = true;
                this.v$.$reset();
                this.salvarAlteraçõesLoading = false;
                return res;
              })
              .catch((error) => {
                this.dialogOptions.title = "Falha no processamento!";
                this.dialogOptions.message = "Não foi possível editar a peça!";
                this.dialogOptions.type = "error";
                this.dialogOptions.botaoText = "Tente Novamente";
                this.dialogOptions.dialog = true;
                this.error = true;
                return error;
              });
          }
        }
      }
    },
  },
};
</script>
<style  lang="scss" scoped>
@import "../../assets/scss/index.scss";
</style>