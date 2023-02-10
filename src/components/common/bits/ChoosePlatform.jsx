import React, { useEffect } from 'react'

const ChoosePlatform = () => {

  useEffect(() => {
    const platform = window.navigator.platform
    console.log("window.navigator.platform", platform)
    if(platform == 'Macintosh' || platform == 'MacIntel' || platform == 'MacPPC' || platform == 'Mac68K' || platform == 'iPhone'){
      window.location.replace('https://apps.apple.com/gh/app/asasefie/id1666692315');
    }else{
      window.location.replace('https://play.google.com/store/apps/details?id=com.asasefie.realestate.app&hl=en&gl=US');
    }
  }, [])

  return (
    <div className='download__img'>
        {/* <h3>Get the app</h3> */}
        <a href='https://apps.apple.com/gh/app/asasefie/id1666692315' style={{ color: 'black', textDecoration: 'none' }}>
          <img className='image__tag' src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/640px-Download_on_the_App_Store_Badge.svg.png"} alt="" />
        </a>

        <a href='https://play.google.com/store/apps/details?id=com.asasefie.realestate.app&hl=en&gl=US' style={{ color: 'black', textDecoration: 'none' }}>
          <img className='image__tag' src={"https://mylapels.com/wp-content/uploads/2019/02/global-playstore.png"} alt="" />
        </a>
    </div>
  )
}

export default ChoosePlatform