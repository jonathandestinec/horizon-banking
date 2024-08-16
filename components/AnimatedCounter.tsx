"use client"

import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({ amount }: { amount: number }) => {
    return (
        <div>
            <CountUp
                end={amount}
                decimal=','
                prefix='$'
                decimals={2}
                className='w-full'
            />
        </div>
    )
}

export default AnimatedCounter