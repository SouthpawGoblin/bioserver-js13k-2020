import $ from '../event';
import './header.scss';
import { LIKES_NEEDED } from '../constants';

export default function header(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'header';

  const likes = document.createElement('div');
  likes.className = 'likes';
  
  const title = document.createElement('div');
  title.className = 'title';
  title.innerText = 'Bio-Server';
  
  const statistics = document.createElement('div');
  statistics.className = 'statistics';
  const successCount = document.createElement('div');
  const failCount = document.createElement('div');
  statistics.appendChild(successCount);
  statistics.appendChild(failCount);
  
  $.on('LikesChanged', event => {
    const { oldVal, newVal } = (event as CustomEvent).detail;
    likes.innerText = `likes: ${newVal}/${LIKES_NEEDED}`;
  });

  $.on('SuccessCountChanged', event => {
    const { oldVal, newVal } = (event as CustomEvent).detail;
    successCount.innerHTML = `success: ${newVal}`;
  });

  $.on('FailCountChanged', event => {
    const { oldVal, newVal } = (event as CustomEvent).detail;
    failCount.innerHTML = `fail: ${newVal}`;
  });

  header.appendChild(likes);
  header.appendChild(title);
  header.appendChild(statistics);

  return header;
}
