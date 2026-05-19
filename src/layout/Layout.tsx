import { Outlet } from 'react-router';
import HeaderBox from '../components/HeaderBox';

export default function RootLayout() {
  return (
    <>
      <HeaderBox />
      <div className="content">
        <Outlet /> 
      </div>
    </>
  );
}