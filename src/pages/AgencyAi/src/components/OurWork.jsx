import assets from "../assets/assets.js";
import Title from "./Title.jsx";
import {LoremIpsum} from 'lorem-ipsum'

const OurWork = () => {
    const lorem = new LoremIpsum();

    const workData = [
        {
            title: 'Mobile app marketing',
            desc: `${lorem.generateWords(15)}`,
            image: assets.work_mobile_app
        },
        {
            title: 'Dashboard Managament',
            desc: `${lorem.generateWords(15)}`,
            image: assets.work_dashboard_management
        },
        {
            title: 'Fitness app promotion',
            desc: `${lorem.generateWords(15)}`,
            image: assets.work_fitness_app
        }
    ]
    return (
        <div id="our-work" className="flex flex-col items-center gap-7 px-4 sm:px-12 xl:px-40 lg:px24 pt-30 text-gray-700 dark:text-white">
            
            <Title title='Our latest Work' desc={`${lorem.generateWords(15)}`}/>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                {workData.map((work,index)=>(
                    <div key={index} className="hover:scale-105 transition-all duration-500 cursor-pointer">
                        <img src={work.image} alt="" className="w-full rounded-xl" />
                        <h3 className="mt-3 mb-2 font-semibold text-lg">{work.title}</h3>
                        <p className="text-sm opacity-60 w-5/6">{work.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurWork;