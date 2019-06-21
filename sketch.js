//letra maiscula e tres "" representa uma seção nova (ex:CHAO*)
//letra minuscula e um "" representa uma subseção(ex: *colisão com chao)


tela=1 //variavel para mundança de tela
imgx=0 //variavel para movimento da tela
y=450; x=50 //x e y do personagem
posx=474 //posição x do inimigo
vida=10 //numero de vidas
var balax, balay //coordenada x e y da bala//valor definido no disparo
tiro=false //variavel de tiro
pontos=0 //pontuação do jogo
aux=0; tempo=0 //variaveis do tempo
plataformaX=650; plataformaY=250 //variavel x e y da plataforma
som0=false
som1=false
som2=false
som3=false
somV=true
pulo = false //identifica o estado do pulo: false, não está acontecendo um pulo
yp = 0
contFrames = 0
balas=10 //quantidade de balas
zerar=false //variavel para zerar variaveis quando ocorrer a mudança de nivel
municaoX=250; municaoY=413 //variaveis x e y da caixa de munição
aux2=0 //auxiliar para aleatorizar a munição
balaXinimigo= posx //variavel x da bala do inimigo
sim=false //essa variavel permite o inimigo atirar novamente apos uma colisão dele (inimigo) com o player/bala
nivel2X=450; nivel2Y=50 //posiçao X e Y da "porta" que passa do nivel 2
pontos2=0 //contagem de pontos para passagem do nivel 2
aux3=0 //auxiliar que "aleatoriza" a criação da porta de passagem
ayuwokiX=650 //variavel X do boss
ayuwokiVida=220
repetir=true
quedaX=120; quedaY=-20 //variaveis X e Y da queda do objeto
var mato1, mato2, montanha1, montanha2 //matinho e montanha da fase 3
mato1x = 0; montanha1x = 0;mato2x = 0; montanha2x = 0 // posição inicial
b= false; i = 0



function preload(){
  fundosom=loadSound('fundosom.mp3')
  fase1som=loadSound("fase1som.mp3")
  fase2som=loadSound("fase2som.mp3")
  fase3som=loadSound("fase3som.mp3")
  somtiroplayer=loadSound("somtiroplayer.mp3")
  sommorteinimigo=loadSound("sommorteinimigo.mp3")
  somgameover=loadSound("risada gameover.mp3")
  somvitoria=loadSound("somvitoria.mp3")
  mato1 = loadImage('matinho.png')
  montanha1 = loadImage('montanha.png')
  mato2 = loadImage('matinho.png')
  montanha2 = loadImage('montanha.png')
}

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
  
  fase1=loadImage("fase1.gif")
  fase2=loadImage("fase2.jpg")
  fase3=loadImage("fase3.png")
  inicial=loadImage ("inicial.jpg") 
  instrucao=loadImage('InShot_20190621_124323366.jpg')
  inimigo1=loadImage("policia.png")
  personagem=loadImage("michael personagem.png")
  chave=loadImage("chave.png")
  caixademunicao=loadImage("caixa de municao.png")
  rusbe=loadImage("rusbé.png")
  ayuwoki=loadImage("ayuwoki.png")
  vitoria=loadImage("vitoria.jpg")
  perdeu=loadImage("perdeu.jpg")
  
    
}

function draw() {
  background(220);
  
//**TELA COM NOME DO JOGO**
  if(tela==1){  
      background(inicial)
      somgameover.stop()
      somvitoria.stop()
      pontos=0
      plataformaX=650; plataformaY=250
      balas=10
      tempo=0
      pontos2=0
      som1=false
      som2=false
      som3=false
      somV=true
      y=450
      x=50
      posx=474
    
    
    if(som0==false){
      fundosom.setVolume(0.5);
      fundosom.play(); 
      som0=true
    }
    if(repetir==true){
      if(keyIsDown(ENTER)){ 
          tela=3
        repetir=false
        }
     if(keyIsDown(70)){ 
          tela=2
       repetir=false
      }
      
    }
  }
  
  
//**TELA DE INSTRUÇÃO*
  if(tela==2){
      background(instrucao)
      if(keyIsDown(ENTER)){ 
              tela=3
      }
  }
  
  
//**FASE 1**
  if(tela==3){
    
    
    
    //**ATIVAÇÃO DO SOM DA FASE 1**
    if(som1==false){
        fase1som.setVolume(0.5);
        fase1som.play()
        som1=true
     }
    
    //*TEMPO*
    if(vida>=0){
      for(cont=0;cont<3;cont++){
            aux++
        //alteração da variavel da mudança de fundo
          if(aux%10==0){
            imgx=imgx-1
          }
        //*transformação para segundos
          if(aux==190){
              aux=0
              tempo++
          }
      }
      
    fundosom.stop();
    
      
    //*MOVIMENTAÇÃO DO FUNDO*
    image(fase1, imgx,-200);
      if(imgx<=-700){
          imgx=0
      }
    
    
    
    //*CHAO*
    fill(112,100,106)
    rect(250,500,500,151)
    //colisão com chao
    if(y>425-50){
          y=425-50
    }
    
    //*CRIAÇÃO DO BONECO CONTROLAVEL/PERSONAGEM*
    noFill()
    stroke(0,0,0)
    image(personagem,x-66, y-58+yp)
    noStroke()
    ellipse(x,y+yp,100,100)
    stroke(0,0,0)
    //*CONTROLE DO BONECO*
      //controle da gravidade
       if (keyIsDown(UP_ARROW) && (! pulo) ){ 
		pulo = true; 
		contFrames = 0; 
	}
	//*movimentação do pulo*
	//se o pulo estiver ativo 
	if (pulo) {
		contFrames++; 
		//movimenta o pulo
		yp = 0.5*(contFrames)*(contFrames - 50);
		//Se o valor da amplitude do pulo for menor que zero
		if (yp > 0) {
                        // O pulo deve ser finalizado 
			// habilida a ocorrência de um novo pulo 
			pulo = false;
			yp = 0; 		
		}
	}
      
    }      
    if(keyIsDown(DOWN_ARROW)){
                y = y+5
    }      
    if(keyIsDown(LEFT_ARROW)){                
                x = x-5
    }      
    if(keyIsDown(RIGHT_ARROW)){
                x = x+5
    }
    //*LIMITES DA TELA*
    if(x<0+50){
        x=0+50
    }      
    if(x>500-50){
        x=500-50
    }      
    if(y<0+50){
        y=0+50
    }     
    if(y>500-50){
      y =500-50
    }
    //*CRIAÇÃO DO INIMIGO*
    noFill()
    noStroke()
    image(inimigo1,posx-33, 343)
    rect(posx,374,50,100);  
    fill(0,0,0)
    //***MOVIMENTAÇÃO DO INIMIGO
    if(posx<500){
        posx=posx-5
    }
    if(posx<-30){
        posx=474
    }
    //*COLISÃO DO PERSONAGEM COM INIMIGO*
    if(pulo==false){
    if(dist(x,y,posx,374)<50+30){
    x=50
    y=450
    posx=474
    vida--
    }
    }
    //*TIRO DO PERSONAGEM*
    if(keyIsDown(CONTROL)){
        if(tiro==false){
            balax= x+50
            balay= y+yp
            tiro=true;
            somtiroplayer.setVolume(0.9);
            somtiroplayer.play();      
        }
    }      
    if(balax>500){
      balax=-50
      tiro=false;
    }     
    if(tiro){
      balax=balax+5;
      //*CRIAÇÃO DA BALA*
    fill(255, 215,0)
    rect(balax,balay,10,2)
    
    //*COLISÃO DA BALA COM O INIMIGO*
    if(dist(balax,balay,posx,374)<50-13){
            balax=1000
            balay=450
            posx=-1000
            pontos=pontos+10
            sommorteinimigo.setVolume(0.9)
            sommorteinimigo.play()
    }
    }
    //*SURGIMENTO DA PLATAFORMA*
    if(pontos>=80){    
        if(plataformaX!==370){
              plataformaX=plataformaX-3      
              if(plataformaX<370){
                   plataformaX=370 
              } 
        }
       //*colisão com a plataforma
       if(plataformaX>180&&plataformaX<500){
         if(x>180){
           if(y+yp<300){
              y=250-50
           }
         }
           else{
             y=450-50
           }
         }
       
        //criação da plataforma
        fill(112,100,106)
        rect(plataformaX, 260, 300, 20) 
      //*PORTA QUE MUDA O NIVEL*
        if(plataformaX==370){
          image(chave,435,190)
            noFill()
            noStroke()
            rect(450, 215, 20, 50)
            //colisão com a porta
            if(dist(x,y,450,215)<50+5){
                    tela=4
                    textSize(32)
                    zerar=true
            }
        }
    }      
    //*TEXTOS QUE APARECERAO NA TELA*
    textSize(20)
    fill(color(255, 165, 0))
    text("Tempo: "+tempo+ " segundos", 5 ,30)
    text("Vidas restantes: "+vida, 5, 60)
    text("Pontuação: "+pontos, 5, 90)
    text("Nivel: 1", 400, 30)
    
    //**MUDANÇA PARA TELA DE GAME OVER**
    if(vida<0){
      tela=0
      fase1som.stop()
      som0=false
      somgameover.setVolume(0.9)
      somgameover.play()
      vida=10
      som1=false
      tempo=0
      pontos=0
    }
  }
  
//=================================================================
  
  
  
  
  
  
  
  
  
  
  //**FASE 2**
    if(tela==4){
       clear()
       background(80)
      
       //MOVIMENTAÇÃO DO FUNDO
      image(fase2, imgx,0);
        imgx--;
        if(imgx<=-500){
            imgx=0
          }
      
       fase1som.stop()
      //***ATIVAÇÃO DO SOM DA FASE 2 ***
      if(som2==false){
        fase2som.setVolume(3.0);
        fase2som.play()
        som2=true
     }
      
      //*"ZERAÇÃO" DAS VARIAVEIS***
      if(zerar==true){
          y=450; x=50, posx=474; aux=0;
          zerar=false
       }     
      
      
//======**DAQUI PRA BAIXO É REPETIÇÃO DOS COMANDOS (EX: CONTROLES, LIMITES, TIRO INIMIGO, COLISOES E ETC |||| PODE PULAR PARA O FINAL)=====**
      
      //*CHAO*
    fill(112,100,106)
    rect(250,500,500,151)
    //colisão com chao
    if(y>425-50){
          y=425-50
    }
    
    //*CRIAÇÃO DO BONECO CONTROLAVEL/PERSONAGEM*
    noFill()
    image(personagem,x-66, y-58+yp)
    noStroke()
    ellipse(x,y+yp,100,100)
    stroke(0,0,0)
    //*CONTROLE DO BONECO*
      //controle da gravidade
       if (keyIsDown(UP_ARROW) && (! pulo) ){ 
		pulo = true; 
		contFrames = 0; 
	}
	//*movimentação do pulo*
	//se o pulo estiver ativo 
	if (pulo) {
		contFrames++; 
		//movimenta o pulo
		yp = 0.5*(contFrames)*(contFrames - 50);
		//Se o valor da amplitude do pulo for menor que zero
		if (yp > 0) {
                        // O pulo deve ser finalizado 
			// habilida a ocorrência de um novo pulo 
			pulo = false;
			yp = 0; 		
		}
	}
      
     
    if(keyIsDown(DOWN_ARROW)){
                y = y+5
    }      
    if(keyIsDown(LEFT_ARROW)){                
                x = x-5
    }      
    if(keyIsDown(RIGHT_ARROW)){
                x = x+5
    }
    //*LIMITES DA TELA*
    if(x<0+50){
        x=0+50
    }      
    if(x>500-50){
        x=500-50
    }      
    if(y<0+50){
        y=0+50
    }     
    if(y>500-50){
      y =500-50
    }
  
    //*CRIAÇÃO DO INIMIGO*
    noFill()
    noStroke()
    image(inimigo1,posx-33, 343)
    rect(posx,374,50,100);  
    fill(0,0,0)
    //***MOVIMENTAÇÃO DO INIMIGO
    if(posx<500){
        posx=posx-3
    }
    if(posx<-30){
        posx=474
    }
      
    //*COLISÃO DO PERSONAGEM COM INIMIGO*
    if(pulo==false){
    if(dist(x,y,posx,374)<50+30){
    x=50
    y=450
    posx=474
    vida--
    }
    }
    //*TIRO DO PERSONAGEM*
      if(balas>0){
    if(keyIsDown(CONTROL) && (!tiro)){
        if(tiro==false){
            balax= x+50
            balay= y+yp
            tiro=true;
            balas--
            somtiroplayer.setVolume(0.9);
            somtiroplayer.play(); 
        }
    }      
    if(balax>500){
      balax=-50
      tiro=false;
    }     
    if(tiro){
     balax=balax+5;
    }
    //*CRIAÇÃO DA BALA*
    fill(255, 215,0)
    rect(balax,balay,10,2)
      }
    //*COLISÃO DA BALA COM O INIMIGO*
    if(dist(balax,balay,posx,374)<50-13){
            balax=1000
            balay=450
            posx=-1000
            pontos=pontos+10
            sim=true
            pontos2=pontos2+10
            som=false
            sommorteinimigo.setVolume(0.9)
            sommorteinimigo.play()
    }
  
    //**TEXTOS DA TELA**
    textSize(20)
    fill(color(255, 165, 0))
    text("Tempo: "+tempo+ " segundos", 5 ,30)
    text("Vidas restantes: "+vida, 5, 60)
    text("Pontuação: "+pontos, 5, 90)
    text("Nivel: 2", 400, 30)
    text("Balas: "+balas, 200, 30)
      
//================================================================
    
      //**CRIAÇÃO DA MUNIÇÃO**
      fill(0,0,0)
      image(caixademunicao,municaoX-14,municaoY-20)
      noFill()
      noStroke()
      rect(municaoX,municaoY, 20, 20)
      //colisão com a munição
      if(pulo==false){
          if(dist(x,y,municaoX,municaoY)<50+10){
              balas=balas+10
              municaoX=700
              municaoY=700
          }
      }
      
      //*"ALEATORIZAÇÃO" DA CAIXA DE MUNIÇÃO***
          for(cont1=0;cont1<3;cont1++){
              aux2++
          }
          if(aux2%250==0){
            municaoX=250
            municaoY=413
          }
            
      
      //**TIRO DO INIMIGO**
      fill(255, 215,0)
      noStroke()  
      
      if(sim==true){
      rect(balaXinimigo-50,370,10,2);  
      if(balaXinimigo<500){
        balaXinimigo=balaXinimigo-4
    }
    if(balaXinimigo<-90){
        balaXinimigo=posx-50
    }
      
      
      //**COLISÃO DA BALA DO INIMIGO COM O PLAYER**
        if(pulo==false){
            if(dist(balaXinimigo,370,x,y)<90){
                  x=0
                  y=450
                  pontos=pontos-10
                  vida--
                  balaXinimigo=-70+8
             }
        }
      }
      //**ALEATORIZAÇÃO DA PORTA QUE MUDA O NIVEL**
      if(pontos2>=100){
            image(chave,nivel2X-15,nivel2Y-25)
            noFill()
            noStroke()
            rect(nivel2X,nivel2Y,24,24)
            for(cont3=0;cont3<3;cont3++){
                  aux3++
              }        
            if(aux3>300){
                nivel2X=450
            }
            if(aux3>450){
                nivel2X=1000
                aux3=0
            }
        } 
      
      //**COLISÃO COM A PASSAGEM DE NIVEL**02
      if(y+yp>0&&y+yp<100){
            if(dist(x,y,nivel2X,400)<50+5){
                    tela=5
                    municaoX=120
                    municaoY=300
                    zerar=true
                    ayuwokiX=650
                    ayuwokiVida=220
                    repetir=true
                    quedaX=120; quedaY=-20
                    y=450-yp
                    x=50
                    
            }
      }
      //**MUDANÇA PARA TELA DE GAME OVER**
    if(vida<0){
      tela=0
      fase2som.stop()
      som0=false
      somgameover.setVolume(0.9)
      somgameover.play()
      vida=10
      som2=false
      tempo=0
      pontos=0
      pontos2=0
      ayuwokiX=650
      ayuwokiVida=220
      repetir=true
      quedaX=120; quedaY=-20
    }
}
  
//==================================================
  
  
  
  
  
  
  
  
  
  //**FASE 3/BOSS**
  if(tela==5){
    background(80)
    fase2som.stop()
    
      if(zerar==true){
          y=450; x=50; balaXinimgo=ayuwokiX
          zerar=false
       }     
    //**MOVIMENTAÇÃO DO FUNDO**
       image(fase3, imgx,-580);
        imgx--
        if(imgx<=-1400){
            imgx=0
          }
   
    image(montanha1, montanha1x, 265)
    montanha1x--
    if(540-montanha1x*(-1)<0){
          montanha1x=0;   
        }
      if(b==false){
        b=true;
        i++;
      }
    
   image(montanha2, montanha2x, 265)
    montanha2x--
    if(540-montanha2x*(-1)<540){
          montanha2x=540;   
        }
      if(b==false){
        b=true;
        i++;
      }
     image(mato1,mato1x,265)
    mato1x--
    if(540-mato1x*(-1)<0){
          mato1x=0;   
        }
      if(b==false){
        b=true;
        i++;
      }
    image(mato2,mato2x,265)
    mato2x--
    if(540-mato2x*(-1)<540){
          mato2x=540;   
        }
      if(b==false){
        b=true;
        i++;
      }
    
    
    //**ATIVAÇÃO DO SOM FASE 3**
    if(som3==false){
        fase3som.setVolume(0.5);
        fase3som.play()
        som3=true
    }
    
//======**DAQUI PRA BAIXO É REPETIÇÃO DOS COMANDOS (EX: CONTROLES, LIMITES, TIRO INIMIGO, COLISOES E ETC |||| PODE PULAR PARA O FINAL)=====**
      
      //*CHAO*
    fill(112,100,106)
    rect(250,500,500,151)
    //colisão com chao
    if(y>425-50){
          y=425-50
    }
    
    //*CRIAÇÃO DO BONECO CONTROLAVEL/PERSONAGEM*
    noFill()
    image(personagem,x-66, y-58+yp)
    noStroke()
    ellipse(x,y+yp,100,100)
    stroke(0,0,0)
    //*CONTROLE DO BONECO*
      //controle da gravidade
       if (keyIsDown(UP_ARROW) && (! pulo) ){ 
		pulo = true; 
		contFrames = 0; 
	}
	//*movimentação do pulo*
	//se o pulo estiver ativo 
	if (pulo) {
		contFrames++; 
		//movimenta o pulo
		yp = 0.5*(contFrames)*(contFrames - 50);
		//Se o valor da amplitude do pulo for menor que zero
		if (yp > 0) {
                        // O pulo deve ser finalizado 
			// habilida a ocorrência de um novo pulo 
			pulo = false;
			yp = 0; 		
		}
	}
      
     
    if(keyIsDown(DOWN_ARROW)){
                y = y+5
    }      
    if(keyIsDown(LEFT_ARROW)){                
                x = x-5
    }      
    if(keyIsDown(RIGHT_ARROW)){
                x = x+5
    }
    //*LIMITES DA TELA*
    if(x<0+50){
        x=0+50
    }      
    if(x>500-50){
        x=500-50
    }      
    if(y<0+50){
        y=0+50
    }     
    if(y>500-50){
      y =500-50
    }
      
    //*COLISÃO DO PERSONAGEM COM INIMIGO*
    if(pulo==false){
    if(dist(x,y,posx,374)<50+30){
    x=50
    y=450
    posx=474
    vida--
    }
    }
    //*TIRO DO PERSONAGEM*
      if(balas>0){
    if(keyIsDown(CONTROL) && (!tiro)){
        if(tiro==false){
            balax= x+50
            balay= y+yp
            tiro=true;
            balas--
            somtiroplayer.setVolume(0.9);
            somtiroplayer.play(); 
        }
    }      
    if(balax>500){
      balax=-50
      tiro=false;
    }     
    if(tiro){
     balax=balax+5;
    }
    //*CRIAÇÃO DA BALA*
    fill(255, 215,0)
    rect(balax,balay,10,2)
      }
  
    //**TEXTOS DA TELA**
    textSize(20)
    fill(255, 2, 57)
    text("Vidas restantes: "+vida, 5, 30)
    fill(color(255, 165, 0)) 
    text("Nivel: Final", 400, 30)
    text("Balas: "+balas, 200, 30)
    
//========================================================
    
    
    //**MOVIMENTAÇÃO E CRIAÇÃO DE AYUWOKI**
        if(ayuwokiX!==300){
              ayuwokiX=ayuwokiX-1    
              if(ayuwokiX<410){
                   ayuwokiX=409
                   fill(219, 0, 32)
                   text("Ayuwoki: "+ayuwokiVida, 190,90) 
                    fill(21, 139, 198)
                  //(o disparo de ayuwoki é criado aqui)
                        rect(balaXinimigo,370,20,20); 
                
                //**COLISÃO COM AYUWOKI**
                  if(dist(x,y+yp,ayuwokiX,232)<50+120){
                        vida--
                        x=50
                        y=450
                        ayuwokiVida=ayuwokiVida+10
                  }
                
                //*COLISÃO DA BALA COM AYUWOKI*
            if(dist(balax,balay,ayuwokiX,232)<50+100){
                balax=1000
                balay=450
                ayuwokiVida=ayuwokiVida-10
                pontos=pontos+10
            }
                }    
              fill(255,255,255)
              image(ayuwoki,ayuwokiX-170,-5)
              noFill()
              noStroke()
              rect(ayuwokiX, 232, 170, 380)
        }
    
    
   //**CRIAÇÃO DA MUNIÇÃO**
      fill(255,0,55)
      image(caixademunicao,municaoX-14,municaoY-20)
      noFill()
      noStroke()
      rect(municaoX,municaoY, 20, 20)
      //colisão com a munição
      if(pulo==true){
          if(dist(x,y+yp,municaoX,municaoY)<50+10){
              balas=balas+10
              vida++
              municaoX=700
              municaoY=700
          }
      }
      
      //*"ALEATORIZAÇÃO" DA CAIXA DE MUNIÇÃO***
          for(cont1=0;cont1<3;cont1++){
              aux2++
          }
          if(aux2%1000==0){
            municaoX=120
            municaoY=300
          }
    //**OBJETO QUE CAI**
             fill(244, 155, 66)
            image(rusbe,quedaX-20,quedaY-20)
            noFill()
            noStroke()
            rect(quedaX, quedaY, 20, 20)
          
          if(quedaY>-131){
            quedaY=quedaY+5
          }
          if(quedaY>520){
            quedaY=-20
            quedaX=quedaX+60
            if(quedaX>240){
              quedaX=60
            }
          }  
      
      //**TIRO DO INIMIGO**
      fill(255, 215,0)
      noStroke()    
          if(balaXinimigo<700){
            balaXinimigo=balaXinimigo-3
          }
          if(balaXinimigo<-10){
            balaXinimigo=ayuwokiX
          }
      
      //**COLISÃO DA BALA DE AYUWOKI COM O PLAYER**
        if(pulo==false){
          if(ayuwokiX==409){
            if(dist(balaXinimigo+10,370,x,y)<50){
                  x=0
                  y=450
                  pontos=pontos-10
                  vida--
                  balaXinimigo=-70+8
             }
        }
        }
    
    //**COLISÃO DO OBJETO COM O PLAYER**
    if(dist(x,y+yp,quedaX,quedaY)<50+10){
              x=0
              y=450
              vida--
              quedaY=521
    }
    
      
    //**VITORIA**
        if(ayuwokiVida<=0){
          tela=6
             /* ayuwokiX=ayuwokiX+7
              quedaX=600
              quedaY=600
              municaoX=1000
              municaoY=1000
              aux2=-99999999
              if(ayuwokiX>600){
                   ayuwokiX=599
              }*/
            
              image(ayuwoki,ayuwokiX-170,-5)
              noFill()
              noStroke()
              rect(ayuwokiX, 232, 170, 380)
              
        }
    //**MUDANÇA PARA TELA DE GAME OVER**
    if(vida<0){
      tela=0
      fase3som.stop()
      som0=false
      somgameover.setVolume(0.9)
      somgameover.play()
      vida=10
      som3=false
      tempo=0
      pontos=0
    }
    
  }
    
    
  //**TELA DE VITORIA**
  
  if(tela==6){
    clear()
    fase3som.stop()
    if(somV==true){
    somvitoria.setVolume(0,7)
    somvitoria.play()
    somV=false
    }
    background(vitoria)
    som0=false
    vida=10
    som3=false
    tempo=0
    textSize(20)
    fill(255,255,255)
    text("Sua pontuação foi: "+pontos, 155, 300)
    repetir=true
    som1=false
    if(keyIsDown(71)){ 
             tela=1
    }
    
  
  }
  
  //*TELA DE GAMER OVER*
  if(tela==0){
      clear()
      background(perdeu)
    //botao para tentar de novo
      if(keyIsDown(71)){ 
             tela=1
        repetir=true        
      }
  }
}