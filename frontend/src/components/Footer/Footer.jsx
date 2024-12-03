import './Footer.css'
import { assets } from '../../assets/assets'
import { FaSquareInstagram,FaSquareTwitter,FaSquareFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer flex flex-col items-center bg-[#848484] text-[#ebebeb] p-6
        lg:gap-8 lg:px-20 lg:py-12" id='footer'>

        <div className="footer-content w-full flex flex-col gap-8 my-4 md:grid lg:grid lg:gap-32">
                <div className="footer-content-left">
                    <img className='w-20 mb-4 sm:w-24 lg:w-32' src={assets.logo} alt="" />
                    <p className='text-xs md:text-sm lg:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse maxime blanditiis explicabo laboriosam optio aspernatur vero necessitatibus? Ipsa dolore atque quae, nobis sit aut! Omnis itaque numquam asperiores quibusdam vel!</p>
                    <div className="flex items-center mt-4 gap-3">
                        <FaSquareInstagram className='footer-social-icons' />
                        <FaSquareTwitter className='footer-social-icons' />
                        <FaSquareFacebook className='footer-social-icons' />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>ABOUT US</h2>
                    <ul>
                        <li>Who We Are</li>
                        <li>Blog</li>
                        <li>Work With Us</li>
                        <li>Investor Relations</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>FOR RESTAURANTS</h2>
                    <ul>
                        <li>Partner With Us</li>
                        <li>Apps For You</li>
                    </ul>
                </div>
        </div>
        <hr className='w-full h-[1px] m-4 bg-[#c8c8c8]' />
        <p className="footer-copyright text-xs md:text-sm lg:text-base">
            By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2024 © QuickBite™ Ltd. All rights reserved.
        </p>

    </div>
  )
}

export default Footer
