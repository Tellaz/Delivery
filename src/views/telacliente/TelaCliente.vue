<template >
  <div>
      
            <!-- <DialogMessage
            :dialogOptions="dialogOptions"
            @dialog_false="callback_dialog"
            />
            <DialogDelete
            :dialogDelete="dialogDelete"
            @delete_confirm="deleteItemConfirm"
            @false_dialog="closeDelete"
            /> -->

            <!-- <v-dialog v-model="dialogLoaging" max-width="500px">
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
            </v-dialog> -->

            <v-card class="rounded-3">
              <div class="ml-5 border-color d-flex justify-content-right">
                <div class="icon-cesta">
              
                  <img src="../../../public/carrinho-de-compras.png" />
              
                </div>
              </div>
              <v-card-title class="text-center justify-center py-6">
                <h1>
                  Lanchonete
                </h1>
              </v-card-title>

              <v-tabs
                v-model="tab"
                background-color="transparent"
                grow
              >
                <v-tab
                  v-for="item in abas"
                  :key="item"
                >
                  {{ item }}
                </v-tab>
              </v-tabs>

                    
              <v-tabs-items   v-model="tab">
                <v-tab-item
                 v-for="item in abas"
                  :key="item"
                >
                  <v-card
                    flat
                  >
                    <v-card-text>

                      <v-container  >
                        <v-row  dense> 
                            <v-col
                            v-for="(produtos, i) in produtos"
                            :key="i"
                            cols="12"    
                            >
                            <v-card
                                :color="color"
                                dark
                            >
                                <div  class="d-flex flex-no-wrap justify-space-between">
                                <div  >
                                    <v-card-title
                                    class="text-h5"
                                    v-text="produtos.name"
                                    ></v-card-title>

                                    <v-card-subtitle v-text="'R$'+produtos.preco"></v-card-subtitle>

                                    <v-card-subtitle v-text="produtos.ingrediente"></v-card-subtitle>

                                    <v-card-actions>
                                    
                                    <v-btn
                                        v-if="produtos.id > 0 "
                                        class="ml-2 mt-5"
                                        outlined
                                        rounded
                                        small
                                    >
                                        Adicionar ao Carrinho
                                    </v-btn>
                                    </v-card-actions>
                                </div>

                                <v-avatar
                                    class="ma-3"
                                    size="auto"
                                    tile
                                    style="max-width: 300px;"
                                >
                                    <v-img :src="produtos.imagem"></v-img>
                                </v-avatar>
                                </div>
                            </v-card>
                            </v-col>
                          </v-row>
                          </v-container>

                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>   
            

    <div class="d-flex justify-content-center">
     
      <v-btn
        primary
        class="btn-gold"
        :loading="salvarAlteraçõesLoading"
        @click="submit"
        >Finalizar Compra</v-btn>
        
        

    </div>
  </div>
</template>
<script>
// import DialogDelete from "../../components/DialogDelete.vue";
// import DialogMessage from "../../components/DialogMessage.vue";
import useVuelidate from "@vuelidate/core";
// import { required } from "@vuelidate/validators";
import DefaultService from "../../services/defaultService";
export default {
      created() {
        this.defaultService = new DefaultService(this.$http, 'produtos')
        this.getProdutos();
        // this.getAbas();
    
    
      },
  setup() {
    return { v$: useVuelidate() };
  },
//   created() {
//     this.defaultService = new DefaultService(this.$http, "tools");
//     if (this.$route.name == "toolsCreate") {
//       this.title = "Cadastro de Ferramentas";
//       this.method = "create";
//       this.MethodBtn = "Cadastrar";
//     }
//     if (this.$route.name == "toolsRead") {
//       this.title = "Visualizando a Ferramenta";
//       this.method = "read";
//       this.inputDisable = true;
//       this.tools.id = this.$route.params.id;
//       this.getToolById();
//     }
//     if (this.$route.name == "toolsEdit") {
//       this.title = "Editando a Ferramenta";
//       this.method = "edit";
//       this.load();
//       this.inputDisable = false;
//       this.tools.id = this.$route.params.id;
//       this.MethodBtn = "Salvar alterações";
//       this.getToolById();
//     }
//   },
  data() {
    return {

       tab: null,
       abas: ['lanches', 'bebidas',],

      produtos: [{
        id: null,
        name: "",
        preco: 0,
        imagem: "",
        ingrediente: "",
        abas: [
          'lanches', 'bebidas',
        ],
      }],

      color: '(112, 112, 112)',
      


    //   deleteLoading: false,
    //   salvarAlteraçõesLoading: false,
    //   inputDisable: false,
    //   Errors: 0,
    //   tools: {
    //     id: null,
    //     name: "",
    //   },

    //   title: null,
    //   method: "",
    //   defaultService: null,

    //   dialogOptions: {
    //     title: "",
    //     dialog: false,
    //     message: "",
    //     type: "darken-2",
    //     botaoText: "",
    //   },
    //   dialogLoaging: false,
    //   dialogDelete: {
    //     dialog: false,
    //   },
    };
  },
  components: {
    // DialogMessage,
    // DialogDelete,
  },
  validations() {
    return {
     
    };
  },

  methods: {

    // async setDesserts() {
    //         var produtos = await this.defaultService.getAll()
    //         this.items = produtos.data
    //         for (let i = 0; i < this.items.length; i++) {
    //             this.desserts.push({ ...this.items[i] })
    //         }
    //         console.log(this.desserts)
    //     },

    async getProdutos(){
      this.produtos = new DefaultService(this.$http, "produto");
      var produtos = await this.items.getAll();
      this.items = produtos.data
      for (let i = 0; i < this.items.length; i++) {
        this.items.push(...this.items[i])
      }
    },

    // getAbas(){
    //   // this.produtos = new DefaultService(this.$http, "produto");
    //   // var produtos = await this.items.getAll();
    //   // this.abas = produtos.data
    //   for (let i = 0; i < this.produtos.abas.length; i++) {
    //     this.abas.push(...this.produtos.abas[i])
    //   }
    // },
   
  },
};
</script>
<style  lang="scss" scoped>
@import "../../assets/scss/index.scss";

img {
 max-width: 100%;
 max-height: 100%;
}
.icon-cesta {
 height: 70px;
 width: 70px;
}

</style>