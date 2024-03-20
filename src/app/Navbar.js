import { useEffect } from 'react';
import React from 'react';

function Navbar({ content }) {

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content.navContent }}></div>
    </>
  )
}

export default Navbar;