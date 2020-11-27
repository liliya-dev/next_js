import { getCurrentHotel,  getCurrentHotelPhotots } from '../helpers';
import { NextPage, NextPageContext } from 'next';
import { HotelWithDetails } from '../../../components/HotelWithDetails/HotelWithDetails';

interface Props {
  data: any,
  photos: any
}
const AccomodationPage: NextPage<Props> = ({ data, photos }) => {
    return (
    <div>
      <HotelWithDetails hotelData={data} photos={photos} />
    </div>
    )
}

AccomodationPage.getInitialProps = async (context: NextPageContext) => {
    const id = context.query.id;
    const data = await getCurrentHotel(id)
    const photos = await getCurrentHotelPhotots(id)
    
    
    return { 
      data,
      photos
    }
  }

export default AccomodationPage;