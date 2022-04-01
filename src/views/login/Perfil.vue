<template>
<div>
   <DialogMessage
            :dialogOptions="dialogOptions"
            @dialog_false="callback_dialog"
            />

  <template  >
    <v-row >
      <v-dialog 
        v-model="dialog"
        persistent
        max-width="600px"
      >
        
        <v-card  >
          <v-card-title class="d-flex justify-content-center">
            <span class="text-h5">Editar Contato</span>
          </v-card-title>
          <v-card-text>
            <v-container >
              <v-row class="d-flex justify-content-center" >
                <v-col
                  cols="12"
                >
                  <v-text-field
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    v-model="fone"
                    label="Numero"
                    required
                  ></v-text-field>
                </v-col>
                
              </v-row>
            </v-container>
           
          </v-card-text>
          <div class="d-flex justify-content-center">

          <v-card-actions  >
            <v-spacer></v-spacer>
            <v-btn
              color="white darken-1"
              text
              @click="fecharDialog()"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="white darken-1"
              text
              @click="submit()"
            >
              Salvar
            </v-btn>
          </v-card-actions>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

  <template  >
    <v-row >
      <v-dialog 
        v-model="dialogStatus"
        persistent
        max-width="600px"
      >
        
        <v-card  >
          <v-card-title class="d-flex justify-content-center">
            <span class="text-h5">Alterar Status</span>
          </v-card-title>
          <v-card-text>
            <v-container >
              <v-row class="d-flex justify-content-center" >
                <v-col
                  cols="12"
                >
                 <v-select
                    :items="valorStatus"
                    item-text="name"
                    item-value="name"   
                    v-model="statusRes"
                    label="Status"
                  ></v-select>
                  
                </v-col>
                
              </v-row>
            </v-container>
           
          </v-card-text>
          <div class="d-flex justify-content-center">

          <v-card-actions  >
            <v-spacer></v-spacer>
            <v-btn
              color="white darken-1"
              text
              @click="fecharDialog()"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="white darken-1"
              text
              @click="submitStatus()"
            >
              Salvar
            </v-btn>
          </v-card-actions>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
    
        
              <div class="d-flex justify-content-center" >

              
                  <v-card
                    width="375"
                    class="mt-10 "
                  >
                    <div
                      v-if="statusRes == 'Fechado'"
                      style="backgroundColor: red;"
                      class="mb-5"
                    >
                    
                      <v-row  class="fill-height">
                        
                        <v-card-title>
                    
                          

                        </v-card-title>

                        <v-spacer></v-spacer>
                        
                      </v-row>
                    </div>
                    <div
                      v-if="statusRes == 'Aberto'"
                      style="backgroundColor: green;"
                      class="mb-5"
                    >
                    
                      <v-row  class="fill-height">
                        
                        <v-card-title>
                    
                          

                        </v-card-title>

                        <v-spacer></v-spacer>
                        
                      </v-row>
                    </div>


                        <v-text-field
                          class="p-3"
                          label="Numero"
                          v-model="fone"
                          persistent-hint
                          disabled
                        ></v-text-field>
                        <div v-if="v$.fone.$error">
                          <v-alert border="bottom" color="pink darken-1" dark>
                            O campo
                            <strong>"fone"</strong>
                            não pode ficar vazio
                          </v-alert>
                        </div>

                        <div class="d-flex justify-content-center">
                        <v-btn small class="btn-gold mb-3 mr-2" @click="editItem()">Editar</v-btn>
                        
                        </div>
                         <v-text-field
                          class="p-3"
                          label="Status"
                          v-model="statusRes"
                          persistent-hint
                          disabled
                        ></v-text-field>
                        <div v-if="v$.fone.$error">
                          <v-alert border="bottom" color="pink darken-1" dark>
                            O campo
                            <strong>"Status"</strong>
                            não pode ficar vazio
                          </v-alert>
                        </div>
                        <div class="d-flex justify-content-center">
                        <v-btn small class="btn-gold mb-3 mr-2" @click="editStatus()">Alterar</v-btn>
                        
                        </div>
                  </v-card>
            </div>

            <div class="d-flex justify-content-center ">
                  <v-card
                    height="200"
                    width="375"
                    class="mt-10"
                  >
                        <div class="mt-1 d-flex justify-content-center">
                        <v-btn small class="btn-gold " @click="cadastrarADM()">Cadastrar Novo ADM</v-btn>
                        </div>
                         <hr>
                  <v-data-table
                  
                    :headers="headers"
                    :items="desserts"
                    :footer-props="{
                      'items-per-page-text': '',
                      pageText: '{0}-{1} de {2}',
                    }"
                    sort-by="calories"
                    class="mb-10 elevation-1"
                  >
                   
                    <template v-slot:item.actions="{ item }">
                      <div class="actions-inline">
                        <v-icon small class="mr-2" @click="edittItem(item)">mdi-pencil</v-icon>
                      </div>
                    </template>

                    <template v-slot:no-data>
                      <div>Nenhum email cadastrado até o momento</div>
                    </template>

                  </v-data-table>

                  </v-card>
            </div>
          
    
</div>
</template>

<script>
import DefaultService from "../../services/defaultService";  
import DialogMessage from "../../components/DialogMessage.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
    created(){
        this.getNumero();
        this.setDesserts();
    },
    setup() {
    return { v$: useVuelidate() };
  },
  data() {
       return {
              valorStatus: [{name:'Aberto'}, {name:'Fechado'},],
              dialogDelete: false,
              statusRes: "",
              fone: "",
              Errors: 0,
              id: 0,
              dialog: false,
              dialogStatus: false,
              usuario:[],
              salvarNum: [],
              usuarioFone: [],
              dialogOptions: {
              title: "",
              dialog: false,
              message: "",
              type: "darken-2",
              botaoText: "",
            },
            contas: [],

            headers: [
                { text: 'Email', value: 'email' },
                
                {
                  text: "Ações",
                  value: "actions",
                  sortable: false,
                },
            ],
            desserts: [
            ]

              }
        },

    components: {
      DialogMessage,
      // DialogDelete,
    },

    validations() {
    return {   
        fone: { required },
    };
  },

    methods: {

      fecharDialog(){
        this.dialog = false
        this.dialogStatus = false
        this.fone = this.salvarNum.numeroWhats
        this.statusRes = this.salvarNum.status
      },

      callback_dialog() {
        this.dialogOptions.dialog = false;
        this.deleteLoading = false;
        this.dialogLoaging = false;
        this.dialog = false;
        this.dialogStatus = false;
        if (this.error) {
          this.salvarAlteraçõesLoading = false;
          return;
        }

      },

       async setDesserts() {
            var usuarioService = new DefaultService(this.$http, "api/usuario");
            var email = await usuarioService.getAll()
            this.contas = email.data
            for (let i = 0; i < this.contas.length; i++) {
                this.desserts.push({ ...this.contas[i] })
            }
            
        },

       closeDelete() {
            this.itemToBeDeleted = null
            this.dialogDelete = false
        },

        deleteItem(item) {
            this.dialogDelete = true
            this.itemToBeDeleted = item
        },

        deleteItemConfirm() {
          var usuarioService = new DefaultService(this.$http, "api/usuario");
            usuarioService.delete(this.itemToBeDeleted)
            this.desserts = []
            this.dialogDelete = false
            this.setDesserts()
        },

        edittItem(item) {
            this.$router.push({ path: `email/${item.id}/edit` })
        },

      async getNumero(){
      var usuarioService = new DefaultService(this.$http, "api/usuario");
      this.usuario = await usuarioService.getAll();
      this.fone = this.usuario.data[0].numeroWhats
      this.statusRes = this.usuario.data[0].status
      this.id = this.usuario.data[0].id
        for (let index = 0; index < this.usuario.data.length; index++) {
          if (this.id == this.usuario.data[index].id) {
            this.usuarioFone.push({...this.usuario.data[index]})
            this.salvarNum = this.usuarioFone[0]
          }
          
        }
        
      },

      cadastrarADM(){
        this.$router.push({ path: `cadastro` })
      },

      editItem () {
        
        this.dialog = true
      },

       editStatus () {
        this.dialogStatus = true
      },

      async submitStatus(){
         const isFormCorrect = await this.v$.$validate();


         if (this.v$.$errors.length - this.Errors == 0) {
        //Caso houver erros do produtotype
        this.salvarAlteraçõesLoading = true;
        
        this.salvarNum.status = this.statusRes;

        var usuarioService = new DefaultService(this.$http, "api/usuario");
        usuarioService
            .put(this.salvarNum)
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

          }else {
          return isFormCorrect;
        }

      },

      async submit(){
         const isFormCorrect = await this.v$.$validate();


         if (this.v$.$errors.length - this.Errors == 0) {
        //Caso houver erros do produtotype
        this.salvarAlteraçõesLoading = true;
        
        this.salvarNum.numeroWhats = this.fone;

        var usuarioService = new DefaultService(this.$http, "api/usuario");
        usuarioService
            .put(this.salvarNum)
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

          }else {
          return isFormCorrect;
        }

      }

     }
   
};
</script>

<style lang="scss">
@import "../../assets/scss/index.scss";
</style>