<template>
  <div id="app" class="body-style">
    <v-app>
      <div>
        <Background />
        <div >
        <Appbar />
        </div>
        <v-container>
          <div id="content">
            <router-view></router-view>
          </div>
        </v-container>
      </div>
    </v-app>
  </div>
</template>
<script>
import Appbar from "./components/Appbar.vue"
import Background from "./components/Background.vue"
//import axios from 'axios'
export default {
  async created(){
    this.rota = this.$route.name;
   // const res = await axios.get('api/usuario/v1');
   // console.log(res);

  },
  components: {
    Appbar,
    Background,
  },
  data() {
    return {
      rota: "",
      dialogOptions: {
        dialog: false,
        title: "Sucesso!",
        message: "Item Excluido Com sucesso",
        type: "success",
        botaoText: "Ok"
      }
    }
  },
  methods: {
    dialog_false() {
      this.dialogOptions.dialog = false
    },
    openDialog() {
      this.dialogOptions.dialog = true
    },
    
  }
}
</script>
<style >
#content {
  position: relative;
  z-index: 6 !important;
}
</style>
