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
    <v-layout  align-center justify-center>
    <v-flex class="border border-color" xs12 sm8 md8>
    <v-card class="border-color elevation-12">
        <div class="p-3">
        <v-text-field
            label="Nome"
            v-model="usuarioData.nome"
            color="white"
            :disabled="inputDisable"
        ></v-text-field>
        <div v-if="v$.usuarioData.nome.$error">
            <v-alert border="bottom" color="pink darken-1" dark>
            O campo
            <strong>"Nome"</strong>
            não pode ficar vazio
            </v-alert>
        </div>

        <v-text-field
                v-model="usuarioData.email"                
                name="email"
                label="Email"
                type="email"
            ></v-text-field>
            <div v-if="v$.usuarioData.email.$error">
            <v-alert border="bottom" color="pink darken-1" dark>
            O campo
            <strong>"Email"</strong>
            não pode ficar vazio
            </v-alert>
        </div>

            <v-text-field
                id="password"
                v-model="usuarioData.password"
                name="password"
                label="Senha"
                type="password"
            ></v-text-field>
            <div v-if="v$.usuarioData.password.$error">
            <v-alert border="bottom" color="pink darken-1" dark>
            O campo
            <strong>"Senha"</strong>
            não pode ficar vazio
            </v-alert>
        </div>

        <v-text-field
            id="password"
            
            name="password"
            label="Confirmar Senha"
            type="password"
        ></v-text-field>

        

        

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
    </v-card>
    </v-flex>
    </v-layout>
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
      abas: [{id: 1, name:'Lanche'}, {id: 2, name:'Bebida'},],
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
      usuarioData: {
        id: 0,
        nome: "",
        email: "",
        password: "",
       
        
       
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
        backgroundColor: this.usuarioData.color,
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
    if (this.$route.name == "Cadastro") {
      this.method = "create";
      this.title = "Cadastro de Admin";
      this.MethodBtn = "Cadastrar";
    }
    if (this.$route.name == "produtoEdit") {
      this.method = "edit";
      this.title = "Editando a Produto";
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
      usuarioData: {
        nome: { required },
        email: { required },
        password: { required },     
        
        
        
        
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
      this.usuarioData.nome = "";
      this.usuarioData.preco = 0;
      this.usuarioData.descricaoCurta = "";
      
      
      this.id = null;
    },
    
    closeDelete() {
      this.dialogDelete.dialog = false;
    },

    async deleteItemConfirm() {
      this.dialogLoaging = true;
      this.deleteLoading = true;
      this.defaultService
        .delete(this.usuarioData)
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
          this.dialogOptions.message = "Não foi possível excluir!";
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
      this.usuarioData.id = this.$route.params.id;
      var lancheByID = await this.defaultService.getById(this.usuarioData.id);

      this.usuarioData.nome = lancheByID.data.nome;
      this.usuarioData.preco = lancheByID.data.preco;
      this.usuarioData.descricaoCurta = lancheByID.data.descricaoCurta;
      this.usuarioData.urlImagem = lancheByID.data.urlImagem;
      // this.usuarioData.categoria = lancheByID.data.categoria;
     
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
            .post(this.usuarioData)
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
              this.dialogOptions.message = "Não foi possível cadastrar!";
              this.dialogOptions.type = "error";
              this.dialogOptions.botaoText = "Tente Novamente";
              this.dialogOptions.dialog = true;
              this.error = true;
              return error;
            });
        } else {
          console.log(this.usuarioData);
          this.defaultService
            .put(this.usuarioData)
            .then(() => {
              this.dialogOptions.title = "Sucesso!";
              this.dialogOptions.message = "Item editado com sucesso!";
              this.dialogOptions.type = "success";
              this.dialogOptions.botaoText = "Ok";
              this.dialogOptions.dialog = true;
              this.v$.$reset();
              this.salvarAlteraçõesLoading = false;
              
            })
            .catch((error) => {
              this.dialogOptions.title = "Falha no processamento!";
              this.dialogOptions.message = "Não foi possível editar!";
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

