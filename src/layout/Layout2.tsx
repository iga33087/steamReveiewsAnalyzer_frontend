import { Outlet } from 'react-router';
import HeaderBox from '../components/HeaderBox';
import Loading from '../components/Loading';
import { useSelector, useDispatch } from 'react-redux'

export default function RootLayout() {
  const store = useSelector(state => state)
  return (
    <>
      {store.global.loading && <Loading />}
      <HeaderBox />
      <div className="content">
        <div className="layout2">
          <Outlet /> 
        </div>
      </div>
    </>
  );
}