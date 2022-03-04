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
      v-model="tools.name"
      label="Nome"
    ></v-text-field>
    <div v-if="v$.tools.name.$error">
      <v-alert border="bottom" color="pink darken-1" dark>
        O campo
        <strong>"Nome"</strong>
        não pode ficar vazio
      </v-alert>
    </div>
    <div v-if="inputDisable == false" class="d-flex justify-content-around">
      <v-btn
        v-if="method == 'edit'"
        primary
        class="btn-gold"
        @click="deletetools"
        >Excluir Ferramenta</v-btn
      >
      <v-btn
        primary
        class="btn-gold"
        :loading="salvarAlteraçõesLoading"
        @click="submit"
        >{{ MethodBtn }}</v-btn
      >
    </div>
  </div>
</template>
<script>
import DialogDelete from "../../components/DialogDelete.vue";
import DialogMessage from "../../components/DialogMessage.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DefaultService from "../../services/defaultService";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  created() {
    this.defaultService = new DefaultService(this.$http, "tools");
    if (this.$route.name == "toolsCreate") {
      this.title = "Cadastro de Ferramentas";
      this.method = "create";
      this.MethodBtn = "Cadastrar";
    }
    if (this.$route.name == "toolsRead") {
      this.title = "Visualizando a Ferramenta";
      this.method = "read";
      this.inputDisable = true;
      this.tools.id = this.$route.params.id;
      this.getToolById();
    }
    if (this.$route.name == "toolsEdit") {
      this.title = "Editando a Ferramenta";
      this.method = "edit";
      this.load();
      this.inputDisable = false;
      this.tools.id = this.$route.params.id;
      this.MethodBtn = "Salvar alterações";
      this.getToolById();
    }
  },
  data() {
    return {
      deleteLoading: false,
      salvarAlteraçõesLoading: false,
      inputDisable: false,
      Errors: 0,
      tools: {
        id: null,
        name: "",
      },

      title: null,
      method: "",
      defaultService: null,

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
      tools: {
        name: { required },
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
      this.$router.push({ name: "toolsList" });
    },

    clearInputs() {
      Object.keys(this.tools).forEach((key) => {
        this.tools[key] = "";
      });
    },

    closeDelete() {
      this.dialogDelete.dialog = false;
    },

    async deleteItemConfirm() {
      this.dialogLoaging = true;
      this.deleteLoading = true;
      this.defaultService
        .delete(this.tools)
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
          this.dialogOptions.message = "Não foi possível excluir a ferramenta!";
          this.dialogOptions.type = "error";
          this.dialogOptions.botaoText = "Tente Novamente";
          this.dialogOptions.dialog = true;
          this.error = true;
          return error;
        });
    },

    async deletetools() {
      this.dialogDelete.dialog = true;
    },

    async getToolById() {
      var tool = await this.defaultService.getById(this.tools.id);
      this.tools.name = tool.data.tool.name;
    },

    load() {
      this.id = this.$route.params.id;
      this.defaultService.getById(this.id).then((resp) => {
        this.shipsData.id = resp.data.spaceShip.id;
        this.shipsData.name = resp.data.spaceShip.name;
        this.shipsData.color = resp.data.spaceShip.color;
        this.shipsData.year = resp.data.spaceShip.year;
        this.shipsData.description = resp.data.spaceShip.description;
        this.shipsData.spaceShipTypeId = resp.data.spaceShip.spaceShipType;
      });
    },

    async submit() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return isFormCorrect;
      } else {
        if (this.v$.$errors.length - this.Errors == 0) {
          //Caso houver erros do spaceshiptype
          this.salvarAlteraçõesLoading = true;
          if (this.method == "create") {
            this.defaultService
              .post(this.tools)
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
                this.dialogOptions.message =
                  "Não foi possível cadastrar a ferramenta!";
                this.dialogOptions.type = "error";
                this.dialogOptions.botaoText = "Tente Novamente";
                this.dialogOptions.dialog = true;
                this.error = true;
                return error;
              });
          } else {
            this.defaultService
              .put(this.tools)
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
                this.dialogOptions.message =
                  "Não foi possível editar a ferramenta!";
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