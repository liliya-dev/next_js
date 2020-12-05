import { getCurrentHotel,  getCurrentHotelPhotots } from '../helpers';
import { NextPage, NextPageContext } from 'next';
import { HotelWithDetails } from '../../../components/HotelWithDetails/HotelWithDetails';
import classes from './AccomodationPage.module.scss';

interface Props {
  data: any,
  photos: any
}
const AccomodationPage: NextPage<Props> = ({ data, photos }) => {
    return (
    <div className={classes.container}>
      <HotelWithDetails hotelData={data} photos={photos} />
    </div>
    )
}

AccomodationPage.getInitialProps = async (context: NextPageContext) => {
    const { checkIn, checkOut, currency, rooms, id } = context.query;
    const data = await getCurrentHotel(id, checkIn, checkOut, currency, rooms);
    const photos = await getCurrentHotelPhotots(id);
    
    return { 
      data,
      photos
    }
  }

export default AccomodationPage;