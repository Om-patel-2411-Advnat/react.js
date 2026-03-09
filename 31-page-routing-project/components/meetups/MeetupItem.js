import { useRouter } from 'next/router';

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {

  const router = useRouter();

  function ShowDetailsHandler(){
    // this doesn't just give the URL data it's also have methods to navigate programmatically
    // this pushes a new page onto the stack of pages and it's the equivalent of using the link component 
    // it takes the path to which you want to navigate
    router.push(`/${props.id}`);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={ShowDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
