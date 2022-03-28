export default class DefaultService{
    constructor($http, $rota,){
        this.$http = $http
        this.$rota = $rota
        this.$versao = 1
        
    }
    async post(payload){
       this.$http.defaults.headers.common[ "Authorization" ] = 'Bearer '+localStorage.getItem('token');
        return this.$http.post(`${this.$rota}/v${this.$versao}`, {...payload})
    }
    async getAll(){
        this.$http.defaults.headers.common[ "Authorization" ] = 'Bearer '+ localStorage.getItem('token');
        return this.$http.get(`${this.$rota}/v${this.$versao}`)
    }
    async getRelatorio(){
        this.$http.defaults.headers.common[ "Authorization" ] = 'Bearer '+localStorage.getItem('token');
        return this.$http.get(`${this.$rota}/v${this.$versao}/relatorio`)
    }
    async login(payload){
        this.$http.defaults.headers.common[ "Authorization" ] = 'Bearer '+localStorage.getItem('token');
        return this.$http.post(`${this.$rota}/v${this.$versao}/login`, {...payload})
    }
    async cadastro(payload){
        this.$http.defaults.headers.common[ "Authorization" ] = 'Bearer '+localStorage.getItem('token');
        return this.$http.post(`${this.$rota}/v${this.$versao}/criarconta`, {...payload})
    }
    async getCount(){
        this.$http.defaults.headers.common[ "Authorization" ] = 'Bearer '+localStorage.getItem('token');
        return this.$http.get(`${this.$rota}/count`)
    }
    async getById(id){
        this.$http.defaults.headers.common[ "Authorization" ] = 'Bearer '+localStorage.getItem('token');
        return this.$http.get(`${this.$rota}/v${this.$versao}/${id}`)
    }
    async delete(payload){
        this.$http.defaults.headers.common[ "Authorization" ] = 'Bearer '+localStorage.getItem('token');
        return this.$http.delete(`${this.$rota}/v${this.$versao}/${payload.id}`)
    }
    async put(payload){
        this.$http.defaults.headers.common[ "Authorization" ] = 'Bearer '+localStorage.getItem('token');
        return this.$http.put(`${this.$rota}/v${this.$versao}`, {...payload})
    }
}