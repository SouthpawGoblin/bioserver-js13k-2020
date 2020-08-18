import $ from '../event';
import './header.scss';
import { LIKES_NEEDED } from '../constants';
import SimpleDom from '../simple-dom';

export default function header(): SimpleDom {
  const header = new SimpleDom('header');
  header.class('header');

  const likes = new SimpleDom('div');
  likes.class('likes');
  
  const title = new SimpleDom('div');
  title
    .class('title')
    .text('Bio-Server');
  
  const statistics = new SimpleDom('div');
  statistics.class('statistics');
  const successCount = new SimpleDom('div');
  const failCount = new SimpleDom('div');
  statistics
    .append(successCount)
    .append(failCount);
  
  $.on('LikesChanged', event => {
    const { oldVal, newVal } = (event as CustomEvent).detail;
    likes.text(`likes: ${newVal}/${LIKES_NEEDED}`);
  });

  $.on('SuccessCountChanged', event => {
    const { oldVal, newVal } = (event as CustomEvent).detail;
    successCount.text(`success: ${newVal}`);
  });

  $.on('FailCountChanged', event => {
    const { oldVal, newVal } = (event as CustomEvent).detail;
    failCount.text(`fail: ${newVal}`);
  });

  header
    .append(likes)
    .append(title)
    .append(statistics);

  return header;
}
