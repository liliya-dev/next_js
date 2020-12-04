import classes from './SearchPage.module.scss';
import { NextPage } from 'next';
import { SearchForm } from '../../components/SearchComponents/SearchForm/SearchForm';


const SearchPage: NextPage = () => {

  return (
    <div className={classes.page}>
      <SearchForm />
    </div>
  )
}
  
export default SearchPage;