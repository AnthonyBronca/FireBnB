import React from 'react';

const NoResource:React.FC = ():JSX.Element => {
  return (
    <div className='nr-container'>
      <div className='nr-header1'>
        <a href="/">
          <img className='nr-img' src="https://seeklogo.com/images/F/fire-nation-logo-5E4284DCC6-seeklogo.com.png" />
        </a>
        <h1 className='nr-h1-top'>Firebnb</h1>
      </div>
      <div className='nr-header2'>
        <div>
          <h1 className='nr-h1-bot'>Oops!</h1>
          <p>We can't seem to find the page you're looking for.</p>
          <p>Error code: 404</p>
          <ul>
            <li>Here are some helpful links instead:</li>
            <li><a href="/">Home</a></li>
            <li><a href="https://github.com/AnthonyBronca">Anthony's Github</a></li>
          <li><a href="https://github.com/OGALEXI">Alexi's Github</a></li>
        </ul>
      </div>
      <img src="https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif" />
    </div>
        </div >
  );
}

export default NoResource;
