const coluna = document.getElementById('coluna')
let botao = document.querySelectorAll('.page-link')
let paginaAtual=1


botao.forEach((b)=>{
                //add evento para cada botao 
                b.addEventListener('click',(ev)=>{
                    ev.preventDefault();
                let bot = ev.currentTarget.parentNode

                    

                //adicionando classe disabled do no li 
                bot.classList.add('disabled')
                let NumberPageSwitch =parseInt( ev.currentTarget.dataset.bsBotao)
                    console.log("Botao Apertado : "+ev.currentTarget+" OQUE  saiu : "+NumberPageSwitch)
           
              //Pegando a paginal atual e atualizando e substituido com o valor do data
                 paginaAtual=NumberPageSwitch;
                chamaApi(paginaAtual)
                })
              
            })

function chamaApi(pagina =1) {
    const URL = `https://api.jikan.moe/v4/anime?page=${pagina}`
     console.log("Chamando API para página:", pagina);
    try {

        fetch(URL).then(resposta => { return resposta.json() }).then(animes => {
                console.log("Conectado Com Sucesso !!")
            console.log("Infos dos Animes: ", animes)
           
                 
            coluna.innerHTML=""

            if(animes.data.length ===0){
                coluna.innerText= '<div class="container alert alert-warning">Não existe anime nessa pagina</div>' 
            }


            animes.data.forEach(anime => {
                
                const im = anime.images.jpg.image_url;
                const titl = anime.title;
                const txt = anime.background

                let div = document.createElement('div')
                div.classList.add("card")
                div.classList.add("h-115")
                div.classList.add("col-md-3")
                div.classList.add("col-sm-4")
                div.classList.add("col-6")
                div.classList.add("col-12")
                div.classList.add("bg-warning")
               
               
                let img = document.createElement('img')
                img.classList.add("card-img-top")
              
                let divCardBody = document.createElement('div')
                divCardBody.classList.add("card-body")
                
                let ptitle = document.createElement('p')
                ptitle.classList.add("card-title")
                
                let ptext = document.createElement('p')
                ptext.classList.add("card-text")
                
                let botao =document.createElement('button')
                botao.classList.add("btn")
                botao.classList.add("btn-info")
                botao.textContent="VER MAIS"
                botao.classList.add("text-light")
                botao.type="button";

                botao.onclick= ()=>{
                   alert("Nome do anime : "+titl+"\n"+"Descrição: "+txt)
                }

                img.src = im;
                ptitle.textContent = titl;
                ptext.textContent = txt;

                divCardBody.append(ptitle)
                div.append(img,divCardBody,botao)
                coluna.append(div)
                console.log("Chegou aqui ")

                

            });
              console.log("Cards carregados com sucesso!");      
        })
          

    } catch (error) {
        console.log("Erro mensagem : " + error.mensagem);
    }


}







chamaApi()
document.querySelector('[data-bs-botao="1"]').parentNode.classList.add('disabled');


