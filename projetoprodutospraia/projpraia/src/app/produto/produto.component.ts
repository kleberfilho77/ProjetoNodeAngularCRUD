import { ProdutoService } from './../service/produto.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';

@Component({
	selector: 'app-produto',
	templateUrl: './produto.component.html',
	styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

	produto: Produto;
	produtos: Produto[] = [];

	constructor(private service: ProdutoService) {
		this.produto = new Produto();
	}

	ngOnInit() {
		this.listar();
	}

	public visualizaValor(valor) {
		let formatter = new Intl.NumberFormat('pt-BR', {
		  style: 'currency',
		  currency: 'BRL'
		}).format(valor / 100);
	
		if (valor == undefined)
		  return ""
		else
		  return formatter;
	  }

	gravar(){
		let precoajustado = this.produto.preco.toString().replace(",","");
		this.produto.preco = parseInt(precoajustado);
		console.log(this.produto.preco);
		this.service.create(this.produto).subscribe(res => {
			console.log('Produto gravado com sucesso', this.produto);
			this.produto = new Produto();
			this.listar();
		})
	}

	listar(){
		this.service.findAll().subscribe(res => {
			this.produtos = res;
			console.log(this.produtos);
		})
	}

	deletar(index:number){
		this.service.delete(this.produtos[index].codigo).subscribe(res =>{
			this.listar();
			console.log(this.produtos);
		})

	}

	buscarcodigo(){

		this.service.findByCode(parseInt((document.getElementById("buscacode") as HTMLInputElement).value)).subscribe(res=>{
			this.produtos = [];
			this.produtos.push(res);
		})
		

	}

	alterar(index:number){

		this.produtos[index].codigo = parseInt((document.getElementById("inputcode"+index) as HTMLInputElement).value);

		this.produtos[index].nome = (document.getElementById("inputname"+index) as HTMLInputElement).value;


		let valor = (document.getElementById("inputprice"+index) as HTMLInputElement).value

		valor = valor.replace(",","");

		if(valor.includes("R$ ")){
			valor = valor.replace("R$ ","");
		}

		console.log(valor);
		this.produtos[index].preco = parseInt(valor);

		this.atualiza(this.produtos[index].codigo, this.produtos[index] );

	}

	atualiza(code : number, prod : Produto){
		this.service.update(code,prod).subscribe(res =>{
			this.listar();
			console.log(this.produtos);
		})
	}

}
