import './index.scss';
import Game from './game';
import Header from './components/Header';
import PauseInfo from './components/PauseInfo';
import RequestQueue from './components/RequestQueue';
import Card404 from './components/response-cards/Card404';
import Conveyor from './components/Conveyor';

Game.add(new Header());
Game.add(new PauseInfo());
Game.add(new RequestQueue());
Game.add(new Card404());
Game.add(new Conveyor('CLASS', 4));
Game.add(new Conveyor('COLOR', 4));
Game.add(new Conveyor('CREATURE', 4));

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
