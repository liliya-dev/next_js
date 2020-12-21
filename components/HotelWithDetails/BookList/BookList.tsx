import { BookItem } from './BookItem/BookItem';
import classes from './BookList.module.scss';
import { Room } from './interface';

interface Props {
    rooms: Room[]
  }


export const BookList: React.FC<Props> = ({ rooms }) => {
  return (
    <div className={classes.container}>
      <ul className={classes.headersList}>
        <li>Room name</li>
        <li>Photos</li>
        <li>Options</li>
        <li>Today's price</li>
      </ul>
      <ul>
        {
          rooms && rooms.map(room => <BookItem key={room.name} room={room} />)
        }
      </ul>
    </div>
  )
}