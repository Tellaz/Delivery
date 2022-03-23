<template>
<div>

  <template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Open Dialog
          </v-btn>
        </template>
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
            <small>*</small>
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
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

 <v-card
    max-width="375"
    class="mx-auto"
  >
    <v-img
      src="https://filestore.community.support.microsoft.com/api/images/6061bd47-2818-4f2b-b04a-5a9ddb6f6467?upload=true"
      height="300px"
      dark
    >
      <v-row class="fill-height">
        <v-card-title>
         
          <v-spacer></v-spacer>

          <v-btn
            dark
            icon
            class="mr-4"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

        </v-card-title>

        <v-spacer></v-spacer>

        <v-card-title class="white--text pl-12 pt-12">
          <div class="text-h5 pl-12 pt-12">
           fone: +{{fone}}
          </div>
        </v-card-title>
      </v-row>
    </v-img>


    </v-card>
</div>
</template>

<script>
    

export default {
//     created(){
        
//     },
  data() {
       return {
              fone: "5518991971208",
              dialog: false,

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

     methods: {
//         editItem (item) {
//         this.editedIndex = this.desserts.indexOf(item)
//         this.editedItem = Object.assign({}, item)
//         this.dialog = true
//       },

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