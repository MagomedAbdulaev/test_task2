import React from 'react';
import {Outlet} from "react-router-dom";


function Layout(props) {
  return (
    <div className='wrapper'>

      <main className='main'>
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;