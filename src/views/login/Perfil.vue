<template>
<div>
   <DialogMessage
            :dialogOptions="dialogOptions"
            @dialog_false="callback_dialog"
            />

  <template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        
        <v-card>
          <v-card-title>
            <span class="text-h5">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="fone"
                    label="Fone"
                    required
                  ></v-text-field>
                </v-col>
                
              </v-row>
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="submit()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

    <template>
      <v-item-group >
        <v-container >
          <v-row>
            <v-col
              
              class="d-flex justify-content-around"
              cols="12"
              md="12"
            >
              
                  <v-card
                    max-width="375"
                    class="mt-10 "
                  >
                    <v-img
                      src="https://filestore.community.support.microsoft.com/api/images/6061bd47-2818-4f2b-b04a-5a9ddb6f6467?upload=true"
                      height="300px"
                      dark
                    >
                      <v-row  class="fill-height">
                        
                        <v-card-title>
                    
                          

                        </v-card-title>

                        <v-spacer></v-spacer>
                        
                      </v-row>
                    </v-img>


                        <v-text-field

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
                  </v-card>
                  <v-card
                    width="375"
                    class="mt-10"
                  >
                    
                        <div class="d-flex justify-content-center">
                        <v-btn small class="btn-gold " @click="cadastrarADM()">Cadastrar Novo ADM</v-btn>
                        </div>
                        
                        <hr>
                  </v-card>
                
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </template>

          
    
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
    },
    setup() {
    return { v$: useVuelidate() };
  },
  data() {
       return {
              fone: "",
              Errors: 0,
              id: 0,
              dialog: false,
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

//         dialogDelete: false,
//             itemToBeDeleted: null,
//             defaultService: null,
//             produto: null,
//             headers: [
//                 { text: 'Numero', value: 'numeroWhats' },
                

//                 {
//                   text: "Ações",
//                   value: "actions",
//                   sortable: false,
//                 },
//             ],
//             desserts: [
//             ]
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

      callback_dialog() {
        this.dialogOptions.dialog = false;
        this.deleteLoading = false;
        this.dialogLoaging = false;
        this.dialog = false;
        if (this.error) {
          this.salvarAlteraçõesLoading = false;
          return;
        }

      },

      async getNumero(){
      var usuarioService = new DefaultService(this.$http, "api/usuario");
      this.usuario = await usuarioService.getAll();
      this.fone = this.usuario.data[0].numeroWhats
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
//       deleteItem (item) {
//         this.editedIndex = this.desserts.indexOf(item)
//         this.editedItem = Object.assign({}, item)
//         this.dialogDelete = true
//       },

//       deleteItemConfirm () {
//         this.desserts.splice(this.editedIndex, 1)
//         this.closeDelete()
//       },

//       close () {
//         this.dialog = false
//         this.$nextTick(() => {
//           this.editedItem = Object.assign({}, this.defaultItem)
//           this.editedIndex = -1
//         })
//       },

//       closeDelete () {
//         this.dialogDelete = false
//         this.$nextTick(() => {
//           this.editedItem = Object.assign({}, this.defaultItem)
//           this.editedIndex = -1
//         })
//       },

//       save () {
//         if (this.editedIndex > -1) {
//           Object.assign(this.desserts[this.editedIndex], this.editedItem)
//         } else {
//           this.desserts.push(this.editedItem)
//         }
//         this.close()
//       },
     }
   
};
</script>

<style lang="scss">
@import "../../assets/scss/index.scss";
</style>