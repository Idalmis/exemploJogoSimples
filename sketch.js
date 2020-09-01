var xj=100, yj=100,dz=1; //dz Ã© a velocidade cim que o quadrado se move
var disparo = false;
var xd, yd;                // coordendas do disparo
//var contFrames = 0;            //taxa de atualizaÃ§Ã£o da tela
var vidas = 3, pontos = 0, nivel = 1;
var colisao = false, colisaodisparo = false;
var raiojogador = 25;          //raio da elipse do jogador
var raioinimigo = 30;          //raio da elipse do inimigo
var raiodisparo1 = 10, raiodisparo2 = 4;  //raio 1 e 2 da elipse do disparo
var xinimigo= [], yinimigo= [];
//var vtam = [];
var qt = 5;   //num de meteoros max que aparecem quase simultaneos
var tamArea = 500;
var limitepontos=0;
var tela = 1;
//var anima; 
//var imgsAndando = [];
//var meteor; 
//var meteoro = [];
//var contFrame = 0; 
var img
var img2
var imgnave
var disparos;
var imgStyle;

function preload() {
  img = loadImage("espaco.jpg")     //imagem do fundo  
  img2 = loadImage("espaco2.png")  //imagem do fundo preto
  disparos =loadImage("tiro.png")
  imgnave=loadImage("nave.png");
   met = loadImage("meteoro.png")
 
  /*for (i = 0; i < 9; i++) {
    //imgsAndando[i] = loadImage("nave.png");    
    //meteoro[i] = loadImage("meteoro.png")
  }  */
}





function setup() {      //setup para executar somente uma vez
  createCanvas(tamArea, tamArea);
  xj = 30;  //x da nave
  xd = xj;  //x do disparo              
  yj = 400;  //y da nave
  yd = yj;    //y do disparo
  frameRate(30);  //velocidade da descida dos meteoros?
  
  /* adicionei para testar css
  imgstyle= createImg(  "nave.png",  'nave');
  imgstyle.style("border-width", "6px")
  imgstyle.style("border-style", "dashed")
  imgstyle.style( "border-color", "#f00")
  */
  
  
  //imgstyle.style("border-style", solid)
    
  //imgstyle.style( 'border-color', '#f00')
  //imgstyle.style( "background_color", "pink")
  // imgstyle.style("border-width", "thick")  
  
  
  for ( i = 0; i < 100; i++) { //inicializa coord de 100 meteoros?
      xinimigo[i] = random(tamArea-5,10);   //x de meteoro
      yinimigo[i] = random(tamArea,tamArea); //y de meteoro
    }
}

function draw() {            //Draw para executar sempre

//inicio do Jogo
if ( tela == 1) {  
  background(img); //imagem do fundo com figura
  textSize(34); 
  fill(135,206,235);
  text("Exemplo JOGO" ,130 , 50)
   fill(200,50,200);
  text("Para começar"+"\n"+
       "pressione ENTER", 130, 250);
  if (keyIsDown(ENTER) ) {
           tela = 2;  
  } 
}

//Jogar  
if ( tela == 2) {      
  textSize(32); 
  fill(135,206,235);
  text("Tela 2", 50, 160);
  background(img2)        //imagem do fundo preto
  if(keyIsDown(LEFT_ARROW)){  //move x para esquerda
     if(xj>10){
          xj -= 8;
     }
  }
  if(keyIsDown(RIGHT_ARROW)){   //move x para a direita
       if(xj<430){
      xj += 8;
      }
  }
  
 //clear();                //"clear" mantem a tela limpa
 //background(img2)  //imagem do fundo preto
 
 //animação/visualização de meteoros, nave, disparo, vidas, pontos,   nível e colisões  
 for ( i = 0; i < qt; i++) { //para controlar o quantidade de   inimigos (meteoros)
    
    //meteor = meteoro[contFrame]
    //anima = imgsAndando[contFrame];
    //anima=imgnave;
    image( imgnave, xj, yj); //movimenta nave com movim. do teclado
    
  
   
   
  // contFrame++;
  //  if ( contFrame > 1 ) {
   //      contFrame = 0;  
    //  }
  
  //image( meteor, xinimigo[i], yinimigo[i]);//mostra meteoro x e y
    image( met, xinimigo[i], yinimigo[i]);//mostra meteoro x e y
    yinimigo[i] = yinimigo[i]+dz  //aumenta y
  
    //contFrame++;
    //  if ( contFrame > 1 ) {
    //     contFrame = 0;  
    //  }  
  
      if(yinimigo[i] > height) {   //chega ao fim da tela
         yinimigo[i] = random(-200, -10)   //gera y aleatório
      }
 
      if (disparo) {
         image(disparos,xd,yd)    //imagem do disparo       
      }
      
      if(yinimigo[i] ==0){
         vidas--
      }
   
  //--------------------------textos na tela-----------------------------
 
  textSize(22);
  fill(135,206,235);
  text("Vidas: "+vidas, 10, 25);
  text("Pontos: "+pontos, 385, 25);
  text( "Nivel: "+ nivel, 220, 25)
  
  //-----------------------colisÃ£o entre os objetos--------------------- entre nave e meteoro
  
   if ( dist(xj,yj,xinimigo[i],yinimigo[i]) < raioinimigo+raiojogador ) {
     if ( colisao == false) { 
       vidas= vidas-1;  //perde vida    
       colisao = true;
       yinimigo[i]= random(-100,-5)  //atualiza y de meteoro
     }
    }
   else {
    colisao = false;  
     }
  
  //------------------------colisÃ£o entre disparo e inimigo---------------  atingiu o meteoro
  
  if ( dist(xd,yd,xinimigo[i],yinimigo[i]) < raioinimigo+10+raiodisparo1 ) {
    if(colisaodisparo == false){
      colisaodisparo = true
       yinimigo[i] = random(-100, -10)
       disparo = false
        colisaodisparo = false
       pontos=pontos+5
           limitepontos=limitepontos+5
       yd=yj
    }
  }
  else{
    colisaodisparo = false
  }
  
  
 } // for da quantidade de inimigos
  
  
 //--------------------trata--disparo----------------------------
 if (keyIsDown(32) && (! disparo) ){ //inicia disparo
    disparo = true; 
    xd = xj+45; //atualiza x de disparo usando x da nave
    yd = yj;     
 }
  
 // movimentação do disparo 
  // se o disparo estiver ativo 
 if (disparo) {
    // movimenta o disparo / tiro 
    yd = yd -10;
    // se o disparo sumir na tela 
    if (yd < 0) {
      // habilida a ocorrencia de um novo disparo 
      disparo = false; 
    }
 }
  
 //-----------------------subir de nivel---------------------
 if(limitepontos==100){
  nivel++
 limitepontos=0
 qt+=2
 }
 if (vidas == 0 ) {
        tela = 3;  //fim do jogo
    }
}  //fim de tela 2
  

if ( tela == 3) {
    background(img);
    textSize(32);    
    fill(480,50,10);
    text("FIM DE JOGO", 130, 250);
    if (keyIsDown(32) ) {
       tela = 1;      
    } 
  }

}                    //fim de function draw

