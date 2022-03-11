<template >
  <div>
    <div class="d-flex justify-content-center titulo">Lista de Produtos</div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :footer-props="{
        'items-per-page-text': 'Naves por página:',
        pageText: '{0}-{1} de {2}',
      }"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-btn class="mb-2 btn-gold" @click="newItem"
            >Criar um novo Produto</v-btn
          >
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

      <template v-slot:item.urlImagem="{ item }">
        <div>
        <img class="d-flex justify-center border-color" style="max-width: 100px;" :src="item.urlImagem" alt=""> 
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="actions-inline">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </div>
      </template>

      <template v-slot:no-data>
        <div>Nenhum item cadastrado até o momento</div>
      </template>

    </v-data-table>
  </div>
</template>
<script>
import DefaultService from "../../services/defaultService"
export default {

    async created() {
        this.defaultService = new DefaultService(this.$http, "api/lanche")
        this.setDesserts()
    },
    data() {
        return {
            dialogDelete: false,
            itemToBeDeleted: null,
            defaultService: null,
            produto: null,
            headers: [
                { text: 'Nome', value: 'nome' },
                
               
                { text: 'Preço', value: 'preco' },
               
                { text: 'Ingrediente', value: 'descricaoCurta' },

                { text: 'Imagem', value: 'urlImagem' },

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
    methods: {

        closeDelete() {
            this.itemToBeDeleted = null
            this.dialogDelete = false
        },

        deleteItem(item) {
            this.dialogDelete = true
            this.itemToBeDeleted = item
        },

        deleteItemConfirm() {
            this.defaultService.delete(this.itemToBeDeleted)
            this.desserts = []
            this.dialogDelete = false
            this.setDesserts()
        },

        editItem(item) {
            this.$router.push({ path: `produto/1/${item.id}/edit` })
        },

        newItem() {
            this.$router.push({ path: `cadastrarproduto` })
        },

        async setDesserts() {
            var produtos = await this.defaultService.getAll()
            this.produto = produtos.data
            for (let i = 0; i < this.produto.length; i++) {
                this.desserts.push({ ...this.produto[i] })
            }
            console.log(this.desserts)
        },
    //   async setDesserts(){
    //   this.items = new DefaultService(this.$http, "produto");
    //   var produtos = await this.items.getAll();
    //   this.items = produtos.data
    //   for (let i = 0; i < this.items.length; i++) {
    //     this.items.push(...this.items[i])
    //   }
    // },
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/index.scss";
</style>