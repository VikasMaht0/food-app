import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download text-center m-6 sm:m-10 lg:mt-16 lg:m-16' id='app-download'>
      
        <h2 className='text-3xl font-semibold sm:leading-tight sm:text-4xl lg:text-5xl lg:leading-tight'>For Better Experience Download<br></br>Our App</h2>
        <div className="app-download-content flex flex-col justify-center items-center mt-12 sm:flex-row sm:gap-8 lg:gap-20 lg:mt-16">
            <img className='w-72 lg:w-[25rem]' src={assets.app_download} alt="" />
            <div className="app-download-platforms flex flex-col justify-center gap-4 m-4">
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
            </div>
        </div>

    </div>
  )
}

export default AppDownload
