<template>
  <div>
    <DialogMessage
      :dialogOptions="dialogOptions"
      @dialog_false="callback_dialog($event)"
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
    <div>
      <v-text-field
        label="Nome"
        v-model="produtoData.nome"
        color="white"
        :disabled="inputDisable"
      ></v-text-field>
      <div v-if="v$.produtoData.nome.$error">
        <v-alert border="bottom" color="pink darken-1" dark>
          O campo
          <strong>"Nome"</strong>
          não pode ficar vazio
        </v-alert>
      </div>

      <v-text-field
        label="Preço"
        v-model="produtoData.preco"
        color="white"
        :disabled="inputDisable"
      ></v-text-field>
      <div v-if="v$.produtoData.preco.$error">
        <v-alert border="bottom" color="pink darken-1" dark>
          O campo
          <strong>"preco"</strong>
          não pode ficar vazio
        </v-alert>
      </div>

      <v-text-field
        label="Imagem"
        v-model="produtoData.urlImagem"
        color="white"
        :disabled="inputDisable"
      ></v-text-field>

      <div v-if="v$.produtoData.urlImagem.$error">
        <v-alert border="bottom" color="pink darken-1" dark>
          O campo
          <strong>"urlImagem"</strong>
          não pode ficar vazio
        </v-alert>
      </div> 
      <!-- <v-file-input
        multiple
        label="Imagem produto"
        v-model="produtoData.imagem">
      </v-file-input> -->

      <!-- <v-row align="center">
        <v-col cols="12">
          <v-select
            :items="itemsYear"
            v-model="produtoData.year"
            label="Categoria"
          ></v-select>
        </v-col>
      </v-row>
      -->

      

      <v-textarea
        label="Descrição"
        v-model="produtoData.descricaoCurta"
        color="white"
        :disabled="inputDisable"
      ></v-textarea>
      <div v-if="v$.produtoData.descricaoCurta.$error">
        <v-alert border="bottom" color="pink darken-1" dark>
          O campo
          <strong>"Descrição"</strong>
          não pode ficar vazio
        </v-alert>
      </div>

      <div class="d-flex justify-content-around">
        <v-btn
          v-if="method == 'edit'"
          primary
          class="btn-gold"
          @click="deleteShip()"
          >Excluir</v-btn
        >
        <v-btn
          primary
          class="btn-gold"
          @click="submit()"
          :loading="salvarAlteraçõesLoading"
          >{{ MethodBtn }}</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import DialogDelete from "../../components/DialogDelete.vue";
import DialogMessage from "../../components/DialogMessage.vue";
import DefaultService from "../../services/defaultService";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      dialogLoaging: false,
      deleteLoading: false,
      salvarAlteraçõesLoading: false,
      itemsYear: [],
      year: null,
      
      Errors: 0,
      
      dialogOptions: {
        title: "",
        dialog: false,
        message: "",
        type: "darken-2",
        botaoText: "",
      },
      dialogDelete: {
        dialog: false,
      },
      dialog: false,
      
      inputDisable: false,

      method: "create",
      ships: [],
      produtoData: {
        id: 0,
        nome: "",
        preco: 0,
        urlImagem: "",
        descricaoCurta: "",
        categoria: "string",
        urlCapa: "string",
        
       
      },
      
      defaultService: null,
      
      itemsStatus: [
        { text: "Inativa", value: 0 },
        { text: "Ativa", value: 1 },
        { text: "Em Manutenção", value: 2 },
      ],
      mask: "!#XXXXXXXX",
      menu: false,
    };
  },
  computed: {
    swatchStyle() {
      const { menu } = this;
      return {
        backgroundColor: this.produtoData.color,
        cursor: "pointer",
        height: "30px",
        width: "30px",
        borderRadius: menu ? "50%" : "4px",
        transition: "border-radius 200ms ease-in-out",
      };
    },
  },

  // async created() {
  //   var Xmas = new Date().getFullYear();
  //   for (let i = Xmas; i >= 1900; i--){
  //     this.itemsYear.push(i)
  //   }
  //     this.setprodutoType()
  //   this.defaultService = new DefaultService(this.$http, 'ships');
  //   if (this.$route.nome == "shipsEdit") {
  //     this.method = "update";
  //     this.MethodBtn = "Salvar alterações"
  //     this.load();
  //     this.getShipByID()
  //   }
  //   else if (this.$route.nome == "shipsCreate") {
  //     this.method = "create";
  //     this.MethodBtn = "Cadastrar"
  //   }
  // },

  async created() {
    var Xmas = new Date().getFullYear();
    for (let i = Xmas; i >= 1900; i--) {
      this.itemsYear.push(i);
    }
    
    this.defaultService = new DefaultService(this.$http, "api/lanche");
    if (this.$route.name == "produtoCreate") {
      this.method = "create";
      this.title = "Cadastro de Produto";
      this.MethodBtn = "Cadastrar";
    }
    if (this.$route.name == "produtoEdit") {
      this.method = "edit";
      this.title = "Editando a Produto";
      this.load();
      this.MethodBtn = "Salvar alterações";
      this.getProdutosByID();
    }
    if (this.$route.name == "produtoRead") {
      this.method = "read";
      this.title = "Visualizando a Produto";
      this.inputDisable = true;
      this.getProdutosByID();
    }
    if (this.$route.name == "produtoRead") {
      this.method = "read";
      this.title = "Mostrando a Produto";
      this.getProdutosByID();
    }
  },

  components: { DialogMessage, DialogDelete },
  
  validations() {
    return {
      produtoData: {
        nome: { required },
        preco: { required },
        descricaoCurta: { required },
        urlImagem: { required },
        
        
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
      this.$router.push({ name: "listaProdutos" });
      
     
    },

    clean() {
      this.produtoData.nome = "";
      this.produtoData.preco = 0;
      this.produtoData.descricaoCurta = "";
      
      
      this.id = null;
    },
    
    closeDelete() {
      this.dialogDelete.dialog = false;
    },

    async deleteItemConfirm() {
      this.dialogLoaging = true;
      this.deleteLoading = true;
      this.defaultService
        .delete(this.produtoData)
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
          this.dialogOptions.message = "Não foi possível excluir a nave!";
          this.dialogOptions.type = "error";
          this.dialogOptions.botaoText = "Tente Novamente";
          this.dialogOptions.dialog = true;
          this.error = true;
          return error;
        });
    },

    deleteShip() {
      this.dialogDelete.dialog = true;
    },

   

    async getProdutosByID() {
      this.produtoData.id = this.$route.params.id;
      var lancheByID = await this.defaultService.getById(this.produtoData.id);
      console.log(this.lancheByID);
      this.produtoData.nome = lancheByID.data.nome;
      this.produtoData.preco = lancheByID.data.preco;
      this.produtoData.descricaoCurta = lancheByID.data.descricaoCurta;
      this.produtoData.urlImagem = lancheByID.data.urlImagem;
      this.produtoData.categoria = lancheByID.data.categoria;
      this.produtoData.urlCapa = lancheByID.data.urlCapa;
     
     
    },


    onContext(ctx) {
      // The date formatted in the locale, or the `label-no-date-selected` string
      this.formatted = ctx.selectedFormatted;
      // The following will be an empty string until a valid date is entered
      this.selected = ctx.selectedYMD;
    },

   

    async submit() {
      const isFormCorrect = await this.v$.$validate(); 

      
      if (this.v$.$errors.length - this.Errors == 0) {
        //Caso houver erros do produtotype
        this.salvarAlteraçõesLoading = true;
        if (this.method == "create") {
          this.defaultService
            .post(this.produtoData)
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
              this.dialogOptions.message = "Não foi possível cadastrar a nave!";
              this.dialogOptions.type = "error";
              this.dialogOptions.botaoText = "Tente Novamente";
              this.dialogOptions.dialog = true;
              this.error = true;
              return error;
            });
        } else {
          this.defaultService
            .put(this.produtoData)
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
              this.dialogOptions.message = "Não foi possível editar a nave!";
              this.dialogOptions.type = "error";
              this.dialogOptions.botaoText = "Tente Novamente";
              this.dialogOptions.dialog = true;
              this.error = true;
              return error;
            });
        }
      } else {
        return isFormCorrect;
      }
    },


  },
};
</script>

<style lang="scss" scoped>
@import "../../../src/assets/scss/index.scss";
</style>