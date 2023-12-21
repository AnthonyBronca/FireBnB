import React from 'react';
import './footer.css'


const Footer: React.FC = (): JSX.Element => {
  return (
    <div className='footer-container'>
        <div className='about-container'>
            <h5>About</h5>
            <ul>
                <li>Firebnb is a CLONE of Airbnb. It is meant to be a project to showcase the developer
                    skills of those building it. This is purely an academic project, and is in no way affiliated with Airbnb.
                    Firebnb will NEVER require you to divulge private information, process any payments, or disclose information related to the real Airbnb.
                    Additionally, all "listings" on this site are completely fake, and utilize seeded data. No bookings, listings made, or accounts
                    will actually be processed and enforced by Firebnb. If you wish to make a real booking, please visit:
                    <a
                    style={{color: 'blue', cursor: 'pointer', paddingLeft: '5px'}}
                    href='https://www.airbnb.com/'>Airbnb</a>
                </li>
            </ul>
        </div>
        <div className='authors-container'>
            <h5>Authors</h5>
            <ul>
                <li><a href='https://github.com/AnthonyBronca'>Anthony Bronca</a></li>
                <li><a href='https://github.com/OGALEXI'>Alexi Bettinger</a></li>
            </ul>
        </div>
        <div className='projects-container'>
             <h5>Projects</h5>
             <ul>
                <li><a href=''>Anthony Link To Other Proj</a></li>
                <li><a href=''>Alexi Link To Other Proj</a></li>
            </ul>
        </div>
        <div className='other-links-container'>
             <h5>Other Links</h5>
              <ul>
                <li><a href=''>Anthony Link To Portfolio</a></li>
                <li><a href=''>Alexi Link To Portfolio</a></li>
            </ul>
        </div>
    </div>
  );
}

export default Footer;
