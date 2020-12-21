import classes from './searchPage.module.scss';
import { NextPage } from 'next';
import { MainLayout } from '../components/MainLayout/MainLayout';
import { SearchForm } from '../components/SearchComponents/SearchForm/SearchForm';

const StartPage: NextPage = () => {

  return (
    <MainLayout title='search'>
      <div className={classes.page}>
        <SearchForm />
      </div>
    </MainLayout>
  )
}
  
export default StartPage;