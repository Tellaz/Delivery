<template >
  <div>
      
            <DialogMessage
            :dialogOptions="dialogOptions"
            @dialog_false="callback_dialog"
            />
            <!-- <DialogDelete
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
              
              <v-card-title  class="d-flex justify-content-center py-1">
                <img  class=" border-5 border-dark logo-site" src="../../../public/Dico.png" alt="">
                
                
              </v-card-title>
            
                    <div class=" mb-6 d-flex justify-content-center" >
                      <div v-if="statusRestaurante == 'Aberto'" class="mt-5 border-aberto pl-2 pr-2 p-1">
                        Aberto
                      </div>
                      <div  v-if="statusRestaurante == 'Fechado'" class="mt-5 border-fechado pl-2 pr-2 p-1" >
                        Fechado
                      </div>
                    </div>
            <v-card class=" mb-5 borda-cardapio">
              
                <div class=" ml-5 border-color d-flex justify-content-right">
                  <div class="d-flex justify-center icon-cesta">
                    <h3 class="rounded-circle pl-2 pr-2 pt-1 border border-2 mt-6" style=" background-color: black; position: absolute;" >
                      {{ cart.length }} 
                    </h3>
                    <img class="" style="size: 10px;"  src="../../../public/carrinho-de-compras.png" /> 
                  </div>
                </div>
                <div class="row justify-content-end mr-1 ml-1">
                  <div v-if="tab == 1"  class="col-6 mb-5 mt-5 border-lista pl-2 pr-2 p-1 d-flex  flex-wrap margin-0 ml-1">
                      Lista: 
                    <li  class=" ml-5" v-for="(item, i) in nomeProduto" :key="i" >
                      {{ nomeProduto[i].nome }}
                    </li>
                  </div>
                </div>

                <div v-if="tab == 0" class="row justify-content-start mr-1 ml-1">
                  <div  class="col-6 mb-5 mt-5 border-lista pl-2 pr-2 p-1 d-flex  flex-wrap mr-1 ml-1">
                      Lista: 
                    <li  class=" ml-5" v-for="(item, i) in nomeProduto" :key="i" >
                      {{ nomeProduto[i].nome }}
                    </li>
                  </div>
                </div>

              <v-tabs
                v-model="tab"
                background-color="transparent"
                grow
              >
                <v-tab
                v-for="item in abas" 
                :key="item"
                >
                  {{item.name}}
                </v-tab>
                
              </v-tabs>
       
              <v-tabs-items v-model="tab">
                <v-tab-item
                v-for="item in abas" 
                :key="item"
                >
                  <v-card
                   v-if="tab == 0"
                    flat
                  >
                    <v-card-text >
                      <v-container >
                        <div class="d-flex justify-content-center">

                        <v-progress-circular
                          v-if="load"
                          :size="50"
                          color="white"
                          indeterminate
                        ></v-progress-circular>
                        </div>
                         
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
                                <div  class="border border-1 d-flex flex-no-wrap justify-space-between">
                                <div  >
                                    <v-card-title
                                    class="nomeSemQuebra text-h6"
                                    v-text="desserts.nome"
                                    ></v-card-title>

                                    <v-card-subtitle class="text-h6" style="color: green;" v-text="desserts.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })"></v-card-subtitle>

                                    <v-card-subtitle size="auto" v-text="desserts.descricaoCurta"></v-card-subtitle>

                                    <v-card-actions>
                                    
                                    <v-btn
                                        v-if="desserts.id > 0 && statusRestaurante == 'Aberto' "
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
                                        v-if="desserts.id > 0 && statusRestaurante == 'Aberto'"
                                        class="ml-2"
                                        style="background-color: #6e1300; border-color: red;"
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
                                    <v-img class=" border border-color" :src="desserts.urlImagem"></v-img>
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

              <v-tabs-items v-model="tab">
                <v-tab-item
                 v-for="item in abas" 
                :key="item"
                >
                  <v-card
                   v-if="tab == 1"
                    flat
                  >
                    <v-card-text >
                      <v-container >
                        <div class="d-flex justify-content-center">

                        <v-progress-circular
                          v-if="load"
                          :size="50"
                          color="white"
                          indeterminate
                        ></v-progress-circular>
                        </div>
                         
                        <v-row  dense> 
                            <v-col
                            v-for="(dessertsBebidas, i) in dessertsBebidas"
                            :key="i"
                            cols="12"    
                            >
                            <v-card
                                :color="color"
                                dark
                            >
                                <div  class="border border-1 d-flex flex-no-wrap justify-space-between">
                                <div  >
                                    <v-card-title
                                    class="nomeSemQuebra text-h6"
                                    v-text="dessertsBebidas.nome"
                                    ></v-card-title>

                                    <v-card-subtitle class="text-h6" style="color: green;" v-text="dessertsBebidas.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })"></v-card-subtitle>

                                    <v-card-subtitle size="auto" v-text="dessertsBebidas.descricaoCurta"></v-card-subtitle>

                                    <v-card-actions>
                                    
                                    <v-btn
                                        v-if="dessertsBebidas.id > 0 && statusRestaurante == 'Aberto'"
                                        class="ml-2 mt-5"
                                        outlined
                                        rounded
                                        small
                                        @click.prevent="addCart(dessertsBebidas)"
                                    >
                                        + Carrinho
                                    </v-btn>
                                   
                                    </v-card-actions>
                                    <v-card-actions>
                                    
                                    <v-btn
                                        v-if="dessertsBebidas.id > 0 && statusRestaurante == 'Aberto'"
                                        class="ml-2"
                                        style="background-color: #6e1300; border-color: red;"
                                        outlined
                                        rounded
                                        small
                                        v-model="dessertsBebidas.id"
                                        @click.prevent="removeCart(dessertsBebidas)"
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
                                    <v-img class=" border border-color" :src="dessertsBebidas.urlImagem"></v-img>
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


          <v-row class="mb-4 fixed-bottom d-flex justify-content-center" justify="center">
            <v-dialog
              v-if="cart.length  > 0"
              v-model="dialog"
              persistent
              max-width="600px"
            >
              <template  v-slot:activator="{ on, attrs }">
                <v-btn 
                  
                  max-width="200px"
                  primary
                  v-bind="attrs"
                  v-on="on"
                  class="btn-gold"
                  @click="calcular()"
                  > Finalizar Compra
      
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Detalhes de entrega</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="8"
                        style="color: red; font-size: 30px;"
                      > Total:
                        {{ valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }) }} 
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="8"
                        style=" font-size: 15px;"
                      >
                        {{ ' ' + produtosTela + ' '}} 
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="8"
                      >
                        <v-text-field
                          v-model="cliente.nome"
                          label="Nome"
                          required
                        ></v-text-field>
                      </v-col>
                          <div v-if="v$.cliente.nome.$error">
                            <v-alert border="bottom" color="pink darken-1" dark>
                              O campo
                              <strong>"nome"</strong>
                              não pode ficar vazio
                            </v-alert>
                          </div>
                      <v-col
                        cols="12"
                        sm="6"
                        md="8"
                      > Endereço
                        <v-text-field
                          label="Rua"
                          v-model="cliente.rua"
                          persistent-hint
                          required
                        ></v-text-field>
                      </v-col>
                        <div v-if="v$.cliente.rua.$error">
                          <v-alert border="bottom" color="pink darken-1" dark>
                            O campo
                            <strong>"rua"</strong>
                            não pode ficar vazio
                          </v-alert>
                        </div>
                      <v-col cols="12"
                          sm="6"
                          md="4">---------------------------
                        <v-text-field
                          onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                          label="Número"
                          v-model="cliente.numero"
                          required
                        ></v-text-field>
                      </v-col>
                        <div v-if="v$.cliente.numero.$error">
                          <v-alert border="bottom" color="pink darken-1" dark>
                            O campo
                            <strong>"numero"</strong>
                            não pode ficar vazio
                          </v-alert>
                        </div>
                      <v-col cols="12">
                        <v-text-field
                          label="Bairro"
                          v-model="cliente.bairro"
                          required
                        ></v-text-field>
                      </v-col>
                        <div v-if="v$.cliente.bairro.$error">
                          <v-alert border="bottom" color="pink darken-1" dark>
                            O campo
                            <strong>"bairro"</strong>
                            não pode ficar vazio
                          </v-alert>
                        </div>
                      <v-col
                        cols="12"
                        sm="6"
                      >____________________________________
                        <v-select
                          :items="['Crédito', 'Débito', 'Dinheiro']"
                          label="Forma de pagamento"
                          v-model="cliente.pagamento"
                          required
                        ></v-select>
                      </v-col>
                        <div v-if="v$.cliente.pagamento.$error">
                          <v-alert border="bottom" color="pink darken-1" dark>
                            O campo
                            <strong>"pagamento"</strong>
                            não pode ficar vazio
                          </v-alert>
                        </div>
                      <v-col v-if="cliente.pagamento == 'Dinheiro'" cols="12"
                          sm="6"
                          md="4">opcional
                        <v-text-field
                          onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                          label="Troco para:"
                          v-model="cliente.troco"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small></small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="cancelarCompra()"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    :loading="salvarAlteraçõesLoading"
                    @click="submit"
                  >
                    Comprar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
            

    <!-- <div >
     
      <v-btn
        primary
        class="btn-gold"
        :loading="salvarAlteraçõesLoading"
        @click="submit"
        >Finalizar Compra</v-btn>
        
    </div> -->
  </div>
</template>
<script>
// import DialogDelete from "../../components/DialogDelete.vue";
import DialogMessage from "../../components/DialogMessage.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DefaultService from "../../services/defaultService";
export default {
      created() {
        this.defaultService = new DefaultService(this.$http, 'api/lanche')
        this.setDesserts();
        this.getNumero();
        this.getStatus();
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
      statusRestaurante: "",
      load: false,
      cliente: [{
        nome: "",
        rua: "",
        numero: 0,
        bairro: "",
        pagamento: "",
        troco: 0
      }],
      dessertsBebidas: [],
      dialog: false,
       tab: null,
       abas: [{id: 1, name:'lanches'}, {id: 2, name:'bebidas'},],
      desserts: [
            ],
      dialogOptions: {
        title: "",
        dialog: false,
        message: "",
        type: "darken-2",
        botaoText: "",
      },
      numeroTelefone: [],
      valor: 0,
      totalProdutos: [],
      produtosTela: [],
      nomeProduto: [],
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
      Errors: 0,
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
    DialogMessage,
    // DialogDelete,
  },
  validations() {
    return {
      cliente: {
        nome: { required },
        rua: { required },
        bairro: { required },
        pagamento: { required },
        numero: { required },
        
        
        
      },
    };
  },

  methods: {

    callback_dialog() {
      this.dialogOptions.dialog = false;
      this.deleteLoading = false;
      this.dialogLoaging = false;
      this.dialog = false;
      if (this.error) {
        this.salvarAlteraçõesLoading = false;
        return;
      }
     
      if( navigator.userAgent.match(/iPhone|iPad|iPod/i) )
      {
        if (this.cliente.troco > 0) {
          
          window.open('https://wa.me/send?phone='+this.numeroTelefone+'&text=Pedido%0A--------------%0A'+
          this.totalProdutos+'%0ATotal:%20'+this.valor+'%20Reais%0A%0A--------------%0ANome:%20'+this.cliente.nome
          +'%0A--------------%0AEndereço%0A--------------%0ARua:%20'+this.cliente.rua +'%0ABairro:%20'+
          this.cliente.bairro +'%0ANumero:%20'+this.cliente.numero +
          '%0AForma%20de%20pagamento:%20'+this.cliente.pagamento+'%0ATroco%20para:%20'+this.cliente.troco+'%20Reais');
        }else{
          window.open('https://wa.me/send?phone='+this.numeroTelefone+'&text=Pedido%0A--------------%0A'+
          this.totalProdutos+'%0ATotal:%20'+this.valor+'%20Reais%0A%0A--------------%0ANome:%20'+this.cliente.nome
          +'%0A--------------%0AEndereço%0A--------------%0ARua:%20'+this.cliente.rua +'%0ABairro:%20'+
          this.cliente.bairro +'%0ANumero:%20'+this.cliente.numero +
          '%0AForma%20de%20pagamento:%20'+this.cliente.pagamento);

        }
      }
      else
      {
        if (this.cliente.troco > 0) {
          
          window.open('https://api.whatsapp.com/send?phone='+this.numeroTelefone+'&text=Pedido%0A--------------%0A'+
          this.totalProdutos+'%0ATotal:%20'+this.valor+'%20Reais%0A%0A--------------%0ANome:%20'+this.cliente.nome
          +'%0A--------------%0AEndereço%0A--------------%0ARua:%20'+this.cliente.rua +'%0ABairro:%20'+
          this.cliente.bairro +'%0ANumero:%20'+this.cliente.numero +
          '%0AForma%20de%20pagamento:%20'+this.cliente.pagamento+'%0ATroco%20para:%20'+this.cliente.troco+'%20Reais');
        }else{
          window.open('https://api.whatsapp.com/send?phone='+this.numeroTelefone+'&text=Pedido%0A--------------%0A'+
          this.totalProdutos+'%0ATotal:%20'+this.valor+'%20Reais%0A%0A--------------%0ANome:%20'+this.cliente.nome
          +'%0A--------------%0AEndereço%0A--------------%0ARua:%20'+this.cliente.rua +'%0ABairro:%20'+
          this.cliente.bairro +'%0ANumero:%20'+this.cliente.numero +
          '%0AForma%20de%20pagamento:%20'+this.cliente.pagamento);

        }
      }
      
      
      this.clearInputs();
      this.clearCart();
      this.valor = 0;
      this.totalProdutos = [];
      this.produtosTela = [];
      this.cart = [];
      this.nomeProduto = [];
    },

    addCart(product){
      this.cart.push(product)
      
      this.nomeProduto.push(product) 
      
    },

    inCart(product){
      return this.cart.indexOf(product) != -1 
    },

    removeCart(product){
      
      this.cart = this.cart.filter((prod) => {
        return product != prod
      })
      this.nomeProduto = this.nomeProduto.filter((prodt) => {
        return product != prodt
      })
      
      
    },


    async getNumero(){
      var numberService = new DefaultService(this.$http, "api/number");
      var numero = await numberService.getAll();
      this.numeroTelefone = numero.data
      
    },

    async getStatus(){
      var StatusService = new DefaultService(this.$http, "api/status");
      var status = await StatusService.getAll();
      this.statusRestaurante = status.data
      
    },

    async setDesserts() {
            this.load = true
            var produtos = await this.defaultService.getAll()
            this.produto = produtos.data
            for (let i = 0; i < this.produto.length; i++) {
              if (this.produto[i].categoria == 1) {
                
                
                this.desserts.push({ ...this.produto[i] })
              }else{
                this.dessertsBebidas.push({ ...this.produto[i] })
              }
            }
           this.load = false
        },

    async calcular(){
      for (let index = 0; index < this.cart.length; index++) {
          this.valor = await this.valor + this.cart[index].preco;
          this.totalProdutos = await this.totalProdutos +'%0A'+ this.cart[index].nome;
          this.produtosTela = await this.produtosTela +' - '+ this.cart[index].nome;
                
      }
    },

    clearInputs() {
      Object.keys(this.cliente).forEach((key) => {
        this.cliente[key] = "";
      });
    },

    clearCart() {
      //this.cart.pop();
      //this.nomeProduto.pop();
      this.valor = 0;
      this.totalProdutos = [];
      this.produtosTela = [];
      this.cart = [];
      this.nomeProduto = [];
      // this.cart.filter((prod) => {
      //   return product != prod
      // })
      // this.nomeProduto.filter((prod) => {
      //   return product != prod
      // })

    },

    cancelarCompra(){
      this.dialog = false;
      this.valor = 0;
      this.clearInputs();
      this.clearCart();
    },

    // getAbas(){
    //   // this.produtos = new DefaultService(this.$http, "produto");
    //   // var produtos = await this.items.getAll();
    //   // this.abas = produtos.data
    //   for (let i = 0; i < this.produtos.abas.length; i++) {
    //     this.abas.push(...this.produtos.abas[i])
    //   }
    // },

    async submit(){

    const isFormCorrect = await this.v$.$validate(); 

      
      if (this.v$.$errors.length - this.Errors == 0) {
        //Caso houver erros do produtotype
        this.salvarAlteraçõesLoading = true;
      

        var venda = {
          id: 1,
          codigo: "string",
          idUsuario: 1,
          lanches:[],
        };
         

          for (let index = 0; index < this.cart.length; index++) {
              venda.lanches.push({
              id: 0,
              idLanche: this.cart[index].id,
              quantidade: 1,
             })
          }
           console.log(venda);
                
        

                      var vendaService =  new  DefaultService(this.$http, "api/venda");
                        vendaService.post(venda)
                        .then(() => {
                        this.error = false;
                        this.dialogOptions.title = "Sucesso!";
                        this.dialogOptions.message = "Seu pedido será encamihado para o WhatsApp!";
                        this.dialogOptions.type = "success";
                        this.dialogOptions.botaoText = "Ok";
                         this.dialogOptions.dialog = true;
                        
                        this.salvarAlteraçõesLoading = false;
                        this.v$.$reset();
                      })
                      .catch((error) => {
                        this.dialogOptions.title = "Falha no processamento!";
                        this.dialogOptions.message = "Não foi possível efetuar o pedido!";
                        this.dialogOptions.type = "error";
                        this.dialogOptions.botaoText = "Tente Novamente";
                        this.dialogOptions.dialog = true;
                        this.error = true;
                        return error;
                      }); 
        
      

      }else {
        return isFormCorrect;
      }  
      
    }
   
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

.border-aberto{
  border: 3px;
  border-color: rgb(0, 247, 12);
  border-style: solid;
  border-radius: 20px;
}

.margin-0{
  margin-right: -3px;
}

.border-lista{
  border: 2px;
  border-color: rgb(255, 255, 255);
  border-top-style: solid;
  border-bottom-style: solid;
  border-left-style: dotted;
  border-right-style: solid;
  border-radius: 0px 5px 5px 0px;
}

.border-fechado{
  border: 3px;
  border-color: rgb(255, 17, 0);
  border-style: solid;
  border-radius: 20px;
}

.nomeSemQuebra{
 //white-space: pre !important;
 word-break: normal;
}

.icon-cesta {
 height: 70px;
 width: 70px;
}

.logo-site{
 border-radius: 0px 0px 50px 50px ;
 margin-top: -15px; 
 
}

.bg-emCima:hover {
  width: 27px;
  height: 22px;
}


.margin-logo{
  
  margin-right: 110px;
}
.borda-cardapio{
 border-radius: 5% ;
}

.marginCard{
  border-top: none;
}

.titulo{
  font-size:100px;
  color: rgb(80, 164, 179);
}

</style>