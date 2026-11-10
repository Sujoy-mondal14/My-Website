import toast from "react-hot-toast";
import assets from "../assets/assets.js";
import Title from "./Title.jsx";
import { LoremIpsum } from 'lorem-ipsum'

const ContactUs = () => {
    const lorem = new LoremIpsum()

    const onSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

        try {

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Thank u for ur submision!')
                event.target.reset();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)

        }

    }
    return (
        <div id="contact-us" className="flex flex-col items-center gap-7 px-4 sm:px-12 xl:px-40 lg:px24 pt-30 text-gray-700 dark:text-white">
            <Title title='Reach Out to Us' desc={`${lorem.generateWords(15)}`} />

            <form onSubmit={onSubmit}>

                <div>
                    <p className="mb-2 text-sm font-medium">Your name</p>
                    <div className="flex pl-3 rounded-lg border border-gray-300 dark:border-gray-600">
                        <img src={assets.person_icon} alt="" />
                        <input name="name" type="text" placeholder="Enter Your Name" className="w-full p-3 text-sm outline-none" required />
                    </div>
                </div>

                <div>
                    <p className="mb-2 text-sm font-medium">email id</p>
                    <div className="flex pl-3 rounded-lg border border-gray-300 dark:border-gray-600">
                        <img src={assets.email_icon} alt="" />
                        <input name="message" type="email" placeholder="Enter Your Email" className="w-full p-3 text-sm outline-none" required />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <p className="mb-2 text-sm font-medium"> Message</p>
                    <textarea name='message' required rows={8} placeholder="Enter your message" className="w-full p-3 text-sm outline-none rounded-lg border border-gray-300 dark:border-gray-600" />
                </div>

                <button type="submit" className="w-max flex gap-2 bg-primary text-white text-sm px-10 py-3 rounded-full cursor-pointer hover:scale-105">
                    Submit <img src={assets.arrow_icon} className="w-4" />
                </button>
            </form>
        </div>
    );
};


export default ContactUs;