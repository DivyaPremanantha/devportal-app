import { useEffect } from 'react';
import React from 'react';

function Navbar({ content }) {

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = content.mainStylesheetContent;
    document.head.appendChild(styleElement);

  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content.navContent }}></div>
    </>
  )
}

export default Navbar;