import Title from "./Title.jsx";
import {LoremIpsum} from 'lorem-ipsum'
import {teamData} from './../assets/assets.js'

const Teams = () => {
    const lorem = new LoremIpsum();
    return (
        <div className="flex flex-col items-center gap-7 px-4 sm:px-12 xl:px-40 lg:px24 pt-30 text-gray-800 dark:text-white">
            <Title title='Meet the Team' desc={`${lorem.generateWords(15)}`} />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {teamData.map((team, index)=>(
                    <div key={index} className="flex max-sm:flex-col items-center gap-5 p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl shadow-gray-100 dark:shadow-white/5 hover:scale-105 transition-all duration-400 ">

                        <img src={team.image} alt="" className="rounded-full w-12 h-12" />

                        <div className="flex-1">
                            <h3 className="font-bold text-sm">{team.name}</h3>
                            <p className="opacity-60 text-xs">{team.title}</p>

                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};


export default Teams;