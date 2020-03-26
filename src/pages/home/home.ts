import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  resultado: number = 0;
  constructor() { }

  calcular(){
    let valor: number = 100;
    let valorCorrigido: number = 0;

    // esse código não volta nenhum resultado
      //this.calcularJuros(valor);
      //this.calcularMulta(valor);

    // o valor corrigido é um número e o calcularJuros volta uma promisse, vai dar erro
      //valorCorrigido = this.calcularJuros(valor);

    //1ªopcao
    // this.calcularJuros(valor)
    //   .then((result: number) =>{
    //     valorCorrigido = result;
    //     this.resultado = valorCorrigido;
    //   });
    // this.calcularMulta(valor) // valorCorrigido
    //   .then((result: number) =>{
    //     valorCorrigido = result;
    //     this.resultado = valorCorrigido;
    //   });

    //2ªopcao
      // this.calcularJuros(valor)
      // .then((result: number) =>{
      //   valorCorrigido = result;

      //   this.calcularMulta(valorCorrigido)
      //   .then((result: number) =>{
      //     valorCorrigido = result;
      //     this.resultado = valorCorrigido;
      //   });

      // });

      //3ªopcao (somar)
      let jurosPromise = this.calcularJuros(valor);
      console.log(jurosPromise);
      let multaPromise = this.calcularMulta(valor);
      console.log(multaPromise);

      // 4ª opcao async await
      // async calcular()

      // const juros = await this.calcularJuros(valor);

      Promise.all([jurosPromise, multaPromise])
        .then(( result:number[]) => {
          valorCorrigido = result[0]+ result[1];
          this.resultado = valorCorrigido;
          console.log(this.resultado)
        })

  }

  // a maioria dos plugins do ionic trabalham com promisse
  // vc não vai conseguir obter resultados usando um abaixo do outro
  // concatene como no primeiro exemplo
  // se precisar da resposta de todos faça o promise.all


  calcularJuros(valorBase: number): Promise<number>{
    return new Promise((resolve, reject) =>{
      if (valorBase>0){
        let result: number = 0;
        let juros: number =0.1;

        result = valorBase + (valorBase * juros);
        resolve(result);
      } else {
        reject('O valor não pode ser zero.');
      }
    });
  }

  calcularMulta(valorBase: number): Promise<number>{
    return new Promise((resolve, reject) =>{
      if (valorBase>0){
        let result: number = 0;
        let multa: number = 50;

        result = valorBase + multa;
        resolve(result);
      } else {
        reject('O valor não pode ser zero.');
      }
    });
  }

}
//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise
//Promise é um objeto usado para processamento assíncrono. Um Promise (de "promessa") representa um valor que pode estar disponível agora, no futuro ou nunca.
