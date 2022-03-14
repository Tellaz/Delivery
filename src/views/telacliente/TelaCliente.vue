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

              <v-card-title class=" text-center justify-center py-1">
                <img class="border border-5 border-dark rounded" src="../../../public/Doug.png" alt="">
              </v-card-title>

              
            <v-card class="mb-5 rounded-3">
              
                <div class=" ml-5 border-color d-flex justify-content-right">
                  <div class="d-flex justify-center icon-cesta">
                    <h3 class="rounded-circle pl-2 pr-2 pt-1 border border-2 mt-6" style=" background-color: black; position: absolute;" >
                      {{ cart.length }}
                    </h3>
                    <img  style="size: 10px;"  src="../../../public/carrinho-de-compras.png" />
                  </div>
                    
                </div>

              <v-tabs
                v-model="tab"
                background-color="transparent"
                grow
              >
                <v-tab
                  
                  
                >
                  cardápio
                </v-tab>
                
              </v-tabs>

                    
              <v-tabs-items    v-model="tab">
                <v-tab-item

                v-for="item in abas" 
                :key="item"
                
                
                >
                  <v-card
                   
                    flat
                  >
                    <v-card-text >

                     

                      <v-container >
                         
                        <v-row  dense> 
                            <v-col
                            v-for="(desserts, i) in desserts"
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
                                    v-text="desserts.nome"
                                    ></v-card-title>

                                    <v-card-subtitle v-text="'R$'+desserts.preco"></v-card-subtitle>

                                    <v-card-subtitle size="auto" v-text="desserts.descricaoCurta"></v-card-subtitle>

                                    <v-card-actions>
                                    
                                    <v-btn
                                        v-if="desserts.id > 0 "
                                        class="ml-2 mt-5"
                                        outlined
                                        rounded
                                        small
                                        @click.prevent="addCart(desserts)"
                                    >
                                        + Carrinho
                                    </v-btn>
                                   
                                    </v-card-actions>
                                    <v-card-actions>
                                    
                                    <v-btn
                                        v-if="desserts.id > 0 "
                                        class="ml-2"
                                        outlined
                                        rounded
                                        small
                                        v-model="desserts.id"
                                        @click.prevent="removeCart(desserts)"
                                    >
                                        Remover
                                    </v-btn>
                                   
                                    </v-card-actions>
                                </div>

                                <v-avatar
                                    class="ma-3"
                                    size="auto"
                                    tile
                                    style="max-width: 200px;"
                                >
                                    <v-img :src="desserts.urlImagem"></v-img>
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
            

    <div class="mb-4 fixed-bottom d-flex justify-content-center">
     
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
        this.defaultService = new DefaultService(this.$http, 'api/lanche')
        this.setDesserts();
        
        
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
       abas: [{id: 1, name:'lanches'}, {id: 2, name:'bebidas'},],
      desserts: [
            ],
      produtos: [{
        id: null,
        name: "",
        preco: 0,
        imagem: "",
        ingrediente: "",
        categoria: 0,
      }],
      cart: [],

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

    addCart(product){
      this.cart.push(product)
      
    },

    inCart(product){
      return this.cart.indexOf(product) != -1
    },

    removeCart(product){
      
      this.cart = this.cart.filter((prod) => {
        return product != prod
      })
      
      
    },

    // async setDesserts() {
    //         var produtos = await this.defaultService.getAll()
    //         this.items = produtos.data
    //         for (let i = 0; i < this.items.length; i++) {
    //             this.desserts.push({ ...this.items[i] })
    //         }
    //         console.log(this.desserts)
    //     },

    // async getProdutos(){
    //   this.produtos = new DefaultService(this.$http, "api/lanche");
    //   var produtos = await this.items.getAll();
    //   this.items = produtos.data
    //   for (let i = 0; i < this.items.length; i++) {
    //     this.items.push(...this.items[i])
    //   }
    // },

    async setDesserts() {
            var produtos = await this.defaultService.getAll()
            this.produto = produtos.data
            for (let i = 0; i < this.produto.length; i++) {
                this.desserts.push({ ...this.produto[i] })
            }
            console.log(this.desserts)
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
v-btn{
  white-space: normal;
}
.icon-cesta {
 height: 70px;
 width: 70px;
}

.titulo{
  font-size:100px;
  color: rgb(80, 164, 179);
}

</style>