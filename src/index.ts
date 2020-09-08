import './index.scss';
import Game from './game';
import Header from './components/Header';
import PauseInfo from './components/PauseInfo';
import RequestQueue from './components/RequestQueue';
import Card404 from './components/response-cards/Card404';
import Conveyor from './components/Conveyor';
import Divider from './components/Divider';
import Store from './components/Store';

const handleStart = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    window.removeEventListener('keypress', handleStart);
    document.getElementById('start-splash')!.style.display = 'none';
    document.getElementById('win-splash')!.style.display = 'none';
    Game.add(new Header());
    Game.add(new PauseInfo());
    Game.add(new Divider());
    Game.add(new RequestQueue());
    Game.add(new Divider());
    Game.add(new Card404());
    Game.add(new Conveyor('CLASS', 4));
    Game.add(new Conveyor('COLOR', 4));
    Game.add(new Conveyor('CREATURE', 5));
    Game.add(new Store());
    Game.start();
  }
}

window.addEventListener('keypress', handleStart);
