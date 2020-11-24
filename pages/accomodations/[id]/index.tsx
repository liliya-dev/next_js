import { getCurrentHotel } from '../helpers';
import { NextPage, NextPageContext } from 'next';

interface Props {
  data: any
}
const AccomodationPage: NextPage<Props> = ({data}) => {
    console.log(data)
    return (
    <h1>{data.body.propertyDescription.name}</h1>
    )
}

AccomodationPage.getInitialProps = async (context: NextPageContext) => {
    const id = context.query.id;
    const data = await getCurrentHotel(id)
    
    return { 
      data
    }
  }

export default AccomodationPage;