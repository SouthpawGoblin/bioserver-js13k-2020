import $ from '../event';
import './pauseInfo.scss';
import Game from '../game_old';
import SimpleDom from '../simple-dom';

export default function pauseInfo(): SimpleDom {
  const pauseInfo = new SimpleDom('div');
  pauseInfo.class('pause-info');

  $.on('PauseChanged', event => {
    const { oldVal, newVal } = (event as CustomEvent).detail;
    pauseInfo.text(
      newVal
        ? 'Press Space to continue the game.'
        : 'Press Space to pause and do some shopping.'
    );
  });

  // press space key to toggle pause
  window.addEventListener('keyup', event => {
    if (event.key === ' ') {
      const game = Game.getInstance();
      game.paused = !game.paused;
    }
  });

  return pauseInfo;
}
