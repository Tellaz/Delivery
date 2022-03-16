<template>
  <div>
    <div class="d-flex justify-center titulo">Relatório</div>
    <v-card elevation="5" class="p-4 mb-4"
      v-for="(report, i) in pushReports"
      :key="i"
      >
      
      <div class="d-flex justify-center">
        Produto: {{' ' + pushReports[i].nome }}, comprado: {{' ' + pushReports[i].momentoVenda }}, pelo valor de{{ ' ' + pushReports[i].preco }}.
      </div>
    </v-card>
  </div>
</template>
<script>
import DefaultService from "../../services/defaultService";
export default {
  
  data() {
    return {
      reports: {
          id: 0,
          nome: "",
          data: "",
          valor: 0
      },
      produtos: [],
      pushReports: [],
      vendas: [],
      pushVendas: [],
      desserts: [],
      // datas: []
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
   
  //  async setVendas() {
  //           var vendaService =  new  DefaultService(this.$http, "api/venda");
  //           var venda = await vendaService.getAll()
  //           this.vendas = venda.data
            
  //           console.log(this.vendas);
            
  //       },
      
      // async setDesserts() {
      //       var vendaService =  new  DefaultService(this.$http, "api/venda");
             
      //       var produtos = await vendaService.getRelatorio()
      //       this.produto = produtos.data
      //       for (let i = 0; i < this.produto.length; i++) {
              
      //           this.desserts.push({ ...this.produto[i] })
      //       }
      //       console.log(this.produto)
      //   },

      // async setDesserts() {
      //       var produtos = await this.defaultService.getAll()
      //       this.produto = produtos.data
            
      //       console.log(this.desserts)
      //   },

       async mesclarProduto(){
          var vendaService =  new  DefaultService(this.$http, "api/venda");
            var venda = await vendaService.getAll()
            this.vendas = venda.data

            var produtos = await this.defaultService.getAll()
            this.produto = produtos.data

          for (let index = 0; index < this.vendas.length; index++) {
              console.log(this.vendas[index]);
            for (let i = 0; i < this.produto.length; i++) {
              
              if (this.vendas[index].lanches[0].idLanche == this.produto[i].id) {
                
                this.pushReports.push({nome: this.produto[i].nome, preco: this.produto[i].preco, momentoVenda: this.vendas[index].momentoVenda})

                let data = new Date(this.pushReports[index].momentoVenda);
                this.pushReports[index].momentoVenda = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
                
              }

            }
          }
          
        },




    
  },
};
</script>
<style lang="scss">
@import "../../../src/assets/scss/index.scss";
</style>