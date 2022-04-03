<template>
  <div>

      <div class="d-flex justify-content-center titulo">Relatório</div>
          
      <v-data-table
      
        :headers="headers"
        :items="pushReports"
        
        :footer-props="{
          
          'items-per-page-text': 'compras por página:', 
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
        <template v-slot:footer>
          <hr>
        <div  class="d-flex justify-content-center">
          <div v-if="load == false" class=" border-bottom border-1 mb-4 ">
            Valor total de compras: {{totalValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}}
          </div>  
        </div>
        </template>
        <!-- <template v-slot:item.lanches="{ item }">
        <div>
        <img class="d-flex justify-center border-color" style="max-width: 100px;" :src="item.lanches" alt=""> 
        </div>
      </template> -->

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
      nomeLanches: [],
      total: 0,
      produtos: [],
      pushReports: [],
      vendas: [],
      valorLanche: [],
      pushVendas: [],
      totalValor: 0,
      
      // datas: []

      headers: [
                { text: 'Pedido', value: 'id' },
                
                { text: 'Lanches', value: 'lanches' },
               
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
    this.mesclarProduto();
    this.formatarData();
    this.calcularTotalValor();
    this.calcular();
  },

  methods: {
  
       async mesclarProduto(){
          this.load = true
          var vendaService =  new  DefaultService(this.$http, "api/venda");
          var venda = await vendaService.getAll()
          this.vendas = venda.data

          var produtos = await this.defaultService.getAll()
          this.produto = produtos.data
          
          for (let index = 0; index < this.vendas.length; index++) {
            
              this.totalValor = this.totalValor + this.vendas[index].total
            for (let i = 0; i < this.produto.length; i++) {

            
              
              if (this.vendas[index].lanches.length > 1) {
                for (let i = 0; i < this.produto.length; i++) {
                  
                  for (let j = 0; j < this.vendas[index].lanches.length; j++) {
  
                      if (this.vendas[index].lanches[j].idLanche == this.produto[i].id) {
                        
                        this.nomeLanches = this.nomeLanches + this.produto[i].nome +" | " ;
                        
                      }
                    
                  }
                  
                }
                if (this.vendas[index].lanches[0].idLanche == this.produto[i].id) {
                console.log(this.nomeLanches)

                let data = new Date(this.vendas[index].momentoVenda);
                
                this.vendas[index].momentoVenda = data.toLocaleDateString('pt-BR')

                
                // this.vendas[index].id = this.vendas[index].id.filter((ele , pos) =>{
                //     return this.vendas[index].id.indexOf(ele) == pos;
                // }) 
                
                // var uniqueArr = [...new Set(this.vendas.id)]
                // console.log(uniqueArr);

                // console.log(this.vendas[index].id);
                this.pushReports.push({
                  id: this.vendas[index].id,
                  lanches: this.nomeLanches,
                  preco: this.vendas[index].total.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }), 
                  momentoVenda: this.vendas[index].momentoVenda})

                  

                }
                this.nomeLanches = []
                }
                else{

                for (let j = 0; j < this.vendas[index].lanches.length; j++) {
                 if (this.vendas[index].lanches[0].idLanche == this.produto[i].id) {
                   
                   let data = new Date(this.vendas[index].momentoVenda);
                
                
                this.vendas[index].momentoVenda = data.toLocaleDateString('pt-BR')

                
                // this.vendas[index].id = this.vendas[index].id.filter((ele , pos) =>{
                //     return this.vendas[index].id.indexOf(ele) == pos;
                // }) 
                
                // var uniqueArr = [...new Set(this.vendas.id)]
                // console.log(uniqueArr);

                // console.log(this.vendas[index].id);
                this.pushReports.push({
                  id: this.vendas[index].id,
                  lanches: this.produto[i].nome,
                  preco: this.vendas[index].total.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }), 
                  momentoVenda: this.vendas[index].momentoVenda})

                }
              }
              }

            }
          }

          this.load = false
          
        },
    //   calcular(){
    //   for (let index = 0; index < this.pushReports.length; index++) {
    //       this.nomeLanches =  this.nomeLanches + this.pushReports[index].lanches;         
    //   }
      
    // }




    
  },
};
</script>
<style lang="scss">

.v-progress-circular {
  margin: 1rem;
}

@import "../../../src/assets/scss/index.scss";
</style>