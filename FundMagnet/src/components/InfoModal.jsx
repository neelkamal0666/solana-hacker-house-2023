import React, { useState } from "react";
import { toast } from "react-toastify";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import useHttp from "../hooks/use-http";

function InfoModal() {
    const makeRequest = useHttp();
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState('');
    const [isQueryEmailSent, setIsQueryEmailSent] = useState(false);
    const sendEmail = () => {
        let flag  = true;
        if(!email){
            flag = false;
            toast.error("email can't be empty")
        }
        if(!query){
            flag = false;
            toast.error("query can't be empty")
        }
        if(flag){
        makeRequest(
            {
                url: `https://us-dev.api.onnftverse.com/v1/internal/email/send`,
                data: {
                    "body": `${email} ${query}`,
                    "email": "info@onnftverse.com",
                    "subject": 'NFTVerse Info query Details'
                },
                method: "post",
                headers: {
                    "X-App-Token": process.env.REACT_APP_APP_TOKEN,
                    "Content-Type": "application/json",
                },
            },
            (data) => {
                console.log(data);
                setIsQueryEmailSent(true);
                setEmail('');
                setQuery('');
                toast.success('Your Query Mailed successfully!')
                
            },
        )
        }
    }
    const handleEmailChange = (emailId) => {
        setEmail(emailId);
    }
    const handleQueryChange = (queryText) => {
        setQuery(queryText);
    }
    return (
        <>
            <div className="w-full">
                <img src='/images/Popup.svg' alt='logo' />
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col ml-[24px] mr-[24px] mb-[24px]">
                    <div className="flex flex-col">
                        <div className="w-[100%] mb-[9px] text-left font-medium text-[18px] leading-8">
                            Your Email
                        </div>
                        <div className="mb-[20px]">
                            <input style={{
                                width: "100%",
                                height: "42px",
                                background: "rgba(187, 255, 0, 0.05)",
                                borderRadius: "15px",
                                paddingLeft: "20px",
                                color:"black"
                            }}
                                value={email}
                                placeholder='Enter your email here'
                                onChange={(e) => handleEmailChange(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <div className="w-[100%] mb-[9px] text-left font-medium text-[18px] leading-8">
                            Your Query
                        </div>
                        <div className="mb-[20px]">
                            <input style={{
                                width: "100%",
                                height: "42px",
                                background: "rgba(187, 255, 0, 0.05)",
                                borderRadius: "15px",
                                paddingLeft: "20px",
                                color:"black"
                            }} 
                            value={query}
                            onChange={(e)=>{handleQueryChange(e.target.value)}}
                            placeholder='Enter Your Query here' />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        {!isQueryEmailSent ?
                            <button className="w-[44%] h-[45px] bg-black" style={{ borderRadius: "33px", color: "#BDFD00" }} onClick={() => { sendEmail() }}>
                                Submit
                            </button>
                            :
                            <div className="flex"><CheckCircleOutlineIcon style={{color: "rgb(163 202 47)"}}/> <div className="ml-[10px]" style={{color: "rgb(163 202 47)"}}>We will Notify you soon</div></div>
                        }
                    </div>
                </div>
            </div>

        </>
    );
}

export default InfoModal;
