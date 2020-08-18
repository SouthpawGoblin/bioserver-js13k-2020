import './requestCard.scss';
import SimpleDom from '../simple-dom';

type RequestCardState = 'LAST' | 'CURRENT' | 'NEXT';

interface ReqRes {
  req: string;
  res: string;
}

interface RequestCardProps {
  requestNum: number;
  state: RequestCardState;
  action?: ReqRes,
  class?: ReqRes,
  creature: ReqRes,
}

export default function requestCard(props: RequestCardProps): SimpleDom {
  const card = new SimpleDom('div');
  card.class('request-card');

  const title = new SimpleDom('div');
  title
    .class('title')
    .text(`Request No.${props.requestNum}`);
  card.append(title);

  const content = new SimpleDom('div');
  content.class('content');

  return card;
}
