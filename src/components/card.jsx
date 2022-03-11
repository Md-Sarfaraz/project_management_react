import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { BiMinus } from 'react-icons/bi'

const Card = (props) => {
    const [cardStyle, setCardStyle] = useState({ minus: false, close: false })
    return (
        <div className={(cardStyle.close ? 'hidden ' : ' ') + ' rounded-lg shadow-lg  shadow-indigo-500'}>
            <div className="py-2 pl-4 pr-2 btn-indigo rounded-t-lg flex flex-row text-white font-semibold">
                <div className='w-2/3 my-auto'>
                    {props.card.title}
                </div>
                <div className='w-1/3 flex justify-end'>
                    <BiMinus className='mx-2 my-1 h-6 w-6 text-white rounded-full hover:bg-indigo-500' onClick={() => { setCardStyle({ ...cardStyle, minus: !cardStyle.minus }) }} />
                    <IoClose className={(props.card.close ? '' : 'hidden ') + 'mx-2 my-1 h-6 w-6 text-white rounded-full hover:bg-indigo-500'} onClick={() => { setCardStyle({ ...cardStyle, close: !cardStyle.close }) }} />
                </div>
            </div>
            <div className={(cardStyle.minus ? ' hidden ' : '') + "  rounded-b-lg"}>
                {props.children}
            </div>
        </div>
    )
}

export default Card