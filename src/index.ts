import './index.scss';
import header from './blocks/header';
import Game from './game';
import pauseInfo from './blocks/pauseInfo';

document.body.appendChild(header().getDom());
document.body.appendChild(pauseInfo().getDom());

const testBtn = document.createElement('button');
testBtn.innerText = 'test';
testBtn.onclick = event => {
  const game = Game.getInstance();
  game.likes += 50;
}
document.body.appendChild(testBtn);

const game = Game.getInstance();
game.init();
