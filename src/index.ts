import './index.scss';
import Game from './game';
import Header from './components/Header';
import PauseInfo from './components/PauseInfo';
import RequestQueue from './components/RequestQueue';

Game.add(new Header());
Game.add(new PauseInfo());
Game.add(new RequestQueue());

const testBtn = document.createElement('button');
testBtn.innerText = 'test';
testBtn.onclick = event => {
  Game.setState({
    ...Game.state!,
    likes: Game.state!.likes + 50,
  });
}
document.body.appendChild(testBtn);

Game.start();
