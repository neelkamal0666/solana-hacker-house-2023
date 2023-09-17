import { ExpandMore } from '@mui/icons-material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Popover } from 'react-tiny-popover';

function Network() {
    const [openNet, setOpenNet] = useState(false);
    const appCtx = useSelector((state) => state.app);
    return (
        <Popover
            isOpen={openNet}
            positions={['bottom', 'right']}
            padding={20}
            reposition={false}
            onClickOutside={() => setOpenNet(false)}
            content={({ position }) => (
                <div className="flex flex-col">
                    {appCtx?.mainnet ? (
                        <></>
                    ) : (
                        <div className="bg-inherit w-60 bg-white  shadow-xl text-black  p-4 rounded-md break-words">
                            <div className='font-semibold'>
                                You are currently on testnet, your marketplace will be eligible for  mainnet after 14 days, if
                                you want early access you can request us at <Link to="#" onClick={(e) =>{
                                    window.location.href = "mailto:info@onnftverse.com";
                                    e.preventDefault();
                                }}> info@onnftverse.com</Link> 
                            </div>
                        </div>
                    )}
                </div>
            )}
        >
            <button className="mt-1" onClick={() => setOpenNet(!openNet)}>
                <div className="flex gap-2  items-center border py-2 px-3 rounded-full">
                    <div> {appCtx?.mainnet ? 'Mainnet' : 'TestNet'}</div> <ExpandMore />
                </div>
            </button>
        </Popover>
    );
}

export default Network;
