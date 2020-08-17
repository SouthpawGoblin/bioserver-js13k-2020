import $ from '../event';
import './pauseInfo.scss';
import Game from '../game';

export default function pauseInfo(): HTMLElement {
  const pauseInfo = document.createElement('div');
  pauseInfo.className = 'pause-info';

  $.on('PauseChanged', event => {
    const { oldVal, newVal } = (event as CustomEvent).detail;
    pauseInfo.innerText = newVal
      ? 'Press Space to continue the game.'
      : 'Press Space to pause and do some shopping.'
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
