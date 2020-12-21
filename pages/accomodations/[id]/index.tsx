import React from 'react';
import { NextPage, NextPageContext } from 'next';
import classes from './AccomodationPage.module.scss';
import { getCurrentHotel,  getCurrentHotelPhotots } from '../../../utils/accomodations/helpers';
import { HotelWithDetails } from '../../../components/HotelWithDetails/HotelWithDetails';
import { MainLayout } from '../../../components/MainLayout/MainLayout';
import { ReloadButton } from '../../../components/ReloadButton/ReloadButton';

interface Props {
  data?: any,
  photos?: any,
  isError: boolean
}

const AccomodationPage: NextPage<Props> = ({ data, photos, isError }) => {
    return (
      <MainLayout title="hotel">
        {
          data && photos && !isError && (
            <div className={classes.container}>
              <div className={classes.wrapper}>
                <HotelWithDetails hotelData={data} photos={photos} />
              </div>
            </div>
          )
        }
        {
          isError && <ReloadButton />
        }
      </MainLayout>
    )
}

AccomodationPage.getInitialProps = async (context: NextPageContext) => {
  try {
    const { checkIn, checkOut, currency, rooms, id } = context.query;
    const data = await getCurrentHotel(id, checkIn, checkOut, currency, rooms);
    const photos = await getCurrentHotelPhotots(id);
    
    return { 
      data,
      photos, 
      isError: false
    }
  }

  catch(error) {
    return {  
      isError: true
    }
  }
}


export default AccomodationPage;