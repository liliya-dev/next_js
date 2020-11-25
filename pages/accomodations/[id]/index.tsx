import { getCurrentHotel, getCurrentHotelPhotots } from '../helpers';
import { NextPage, NextPageContext } from 'next';

interface Props {
  data: any,
  photos: any
}
const AccomodationPage: NextPage<Props> = ({ data, photos }) => {
    console.log(photos, data)
    return (
    <h1>jj</h1>
    )
}

AccomodationPage.getInitialProps = async (context: NextPageContext) => {
    const id = context.query.id;
    const data = await getCurrentHotel(id)
    let photos = await getCurrentHotelPhotots(id) 
    
    
    return { 
      data,
      photos
    }
  }

export default AccomodationPage;