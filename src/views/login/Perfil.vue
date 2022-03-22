<template>
<div>
  <!-- <v-card
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
          <v-btn
            dark
            icon
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            dark
            icon
            class="mr-4"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-card-title>

        <v-spacer></v-spacer>

        <v-card-title class="white--text pl-12 pt-12">
          <div class="text-h4 pl-12 pt-12">
            {{}}
          </div>
        </v-card-title>
      </v-row>
    </v-img>

     <div
      :headers="headers"
      :items="desserts"
      
    >
      <template >
        <v-toolbar flat>
          <v-spacer></v-spacer>
          
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="body-style d-flex justify-center"
                >Deseja excluir este item?</v-card-title
              >
              <v-card-actions class="d-flex justify-content-around">
                <v-btn  text @click="deleteItemConfirm"
                  >Excluir</v-btn
                >
                <v-btn text @click="closeDelete"
                  >Cancelar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="actions-inline">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </div>
      </template>
      
    </div>
    </v-card> -->
</div>
</template>

<script>
    

export default {
//     created(){
        
//     },
//     data() {
//         return {
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
//         }
//     },

//     methods: {
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
//     }
   
};
</script>

<style lang="scss">
@import "../../assets/scss/index.scss";
</style>