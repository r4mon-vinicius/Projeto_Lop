const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var x_centro = canvas.width / 2;
var y_centro = canvas.height / 2;
var raio_joystick = 75;
var raio_background = 100;
var desenhando = false;

canvas.addEventListener("mousedown", dentro);
canvas.addEventListener("mousemove", desenhar);
document.addEventListener("mouseup", retornar_origem);

//Desenha o background ao centro do canvas (OK!)
function background() {
  ctx.beginPath();
  ctx.arc(x_centro, y_centro, raio_background, 0, Math.PI * 2, true);
  ctx.fillStyle = "#d2d2d2";
  ctx.fill();
}

//Desenha o joystick na coordenada que está sendo passada (OK!)
function joystick(coordenada_x, coordenada_y) {
  ctx.beginPath();
  ctx.arc(coordenada_x, coordenada_y, raio_joystick, 0, Math.PI * 2, true);
  ctx.fillStyle = "#F08080";
  ctx.fill();
}

//verifica se o clique ocorreu dentro do joystick e o posiciona no local do clique
function dentro(Event) {
  //calcula a posição do clique em relação ao (0,0)
  let clique_dentro;
  let mouse_Xabsoluto = Event.clientX - canvas.offsetLeft;
  let mouse_Yabsoluto = Event.clientY - canvas.offsetTop;

  //calcula a distância do evento do clique ao centro, verificando se está dentro ou não da área do joystick
  let distancia = Math.sqrt(
    Math.pow(mouse_Xabsoluto - x_centro, 2) +
      Math.pow(mouse_Yabsoluto - y_centro, 2)
  );
  //verifica se o ato de clicar e segurar ocorreu dentro do joystick
  if (distancia <= raio_joystick) {
    desenhando = true;
    clique_dentro = true;
  } else {
    clique_dentro = false;
  }

  if (clique_dentro) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background();
    joystick(mouse_Xabsoluto, mouse_Yabsoluto);
  }
}

//acompanha a movimentação do usuário
function desenhar(Event) {
  if (desenhando) {
    let mouse_Xabsoluto = Event.clientX - canvas.offsetLeft;
    let mouse_Yabsoluto = Event.clientY - canvas.offsetTop;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background();

    let angulo = Math.atan2(
      mouse_Yabsoluto - y_centro,
      mouse_Xabsoluto - x_centro
    );
    let distancia = Math.sqrt(
      Math.pow(mouse_Xabsoluto - x_centro, 2) +
        Math.pow(mouse_Yabsoluto - y_centro, 2)
    );

    if (distancia > raio_joystick) {
      x = raio_joystick * Math.cos(angulo) + x_centro;
      y = raio_joystick * Math.sin(angulo) + y_centro;
      joystick(x, y);
    } else {
      joystick(mouse_Xabsoluto, mouse_Yabsoluto);
    }
  }
}

function retornar_origem() {
  desenhando = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background();
  joystick(x_centro, y_centro);
}

background();
joystick(x_centro, y_centro);
