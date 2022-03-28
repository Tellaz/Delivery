<template>
  <div>

      <div class="d-flex justify-content-center titulo">Relatório</div>
          
      <v-data-table
      
        :headers="headers"
        :items="pushReports"
        
        :footer-props="{
          
          'items-per-page-text': 'compra por página:',
          pageText: '{0}-{1} de {2}', 
        }"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:no-data>
          <v-progress-circular
            v-if="load"
            :size="50"
            color="white"
            indeterminate
          ></v-progress-circular>
          <div v-if="load == false">Nenhuma compra até o momento</div>
        </template>

      </v-data-table>

  </div>
</template>
<script>
import DefaultService from "../../services/defaultService";
export default {
  
  data() {
    return {
      load: false,
      reports: {
          id: 0,
          nome: "",
          data: "",
          valor: 0
      },
      total: 0,
      produtos: [],
      pushReports: [],
      vendas: [],
      pushVendas: [],
      
      // datas: []

      headers: [
                { text: 'Pedido', value: 'nome' },
                
               
                { text: 'Data', value: 'momentoVenda' },
               
                { text: 'Valor', value: 'preco' },   

                
            ],
            desserts: [
            ]
    };
  },

  created() {
    this.defaultService = new DefaultService(this.$http, 'api/lanche')
    // this.setDesserts();
    // this.setVendas();
    this.mesclarProduto();
    this.formatarData();
  },

  methods: {

      // async totalValor(){
      //     var vendaService =  new  DefaultService(this.$http, "api/venda");
      //       var venda = await vendaService.getAll()
      //       this.vendas = venda.data
            
      // },
    

  
       async mesclarProduto(){
          this.load = true
          var vendaService =  new  DefaultService(this.$http, "api/venda");
          var venda = await vendaService.getAll()
          this.vendas = venda.data

          var produtos = await this.defaultService.getAll()
          this.produto = produtos.data

          for (let index = 0; index < this.vendas.length; index++) {
              console.log(this.vendas[index]);
            for (let i = 0; i < this.produto.length; i++) {
              
              if (this.vendas[index].lanches[0].idLanche == this.produto[i].id) {
                
                let data = new Date(this.vendas[index].momentoVenda);
                
                
                this.vendas[index].momentoVenda = data.toLocaleDateString('pt-BR')

                this.pushReports.push({nome: this.produto[i].nome, preco: this.produto[i].preco, momentoVenda: this.vendas[index].momentoVenda})

   
              }

            }
          }
          this.load = false
          
        },




    
  },
};
</script>
<style lang="scss">

.v-progress-circular {
  margin: 1rem;
}

@import "../../../src/assets/scss/index.scss";
</style>