export class Produto{

    codigo : number;
    nome : string;
    preco : number;
    imagem: string;

    constructor(codigo?:number, nome?:string, preco?:number, imagem?:string){
        this.codigo=codigo;
        this.nome=nome;
        this.preco=preco;
        this.imagem=imagem;
    }

}