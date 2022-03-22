export default class DefaultService{
    constructor($http, $rota,){
        this.$http = $http
        this.$rota = $rota
        this.$versao = 1
    }
    async post(payload){
        return this.$http.post(`${this.$rota}/v${this.$versao}`, {...payload})
    }
    async getAll(){
        return this.$http.get(`${this.$rota}/v${this.$versao}`)
    }
    async getRelatorio(){
        return this.$http.get(`${this.$rota}/v${this.$versao}/relatorio`)
    }
    async login(payload){
        return this.$http.post(`${this.$rota}/v${this.$versao}/login`, {...payload})
    }
    async getCount(){
        return this.$http.get(`${this.$rota}/count`)
    }
    async getById(id){
        return this.$http.get(`${this.$rota}/v${this.$versao}/${id}`)
    }
    async delete(payload){
        return this.$http.delete(`${this.$rota}/v${this.$versao}/${payload.id}`)
    }
    async put(payload){
        return this.$http.put(`${this.$rota}/v${this.$versao}`, {...payload})
    }
}