
import {
    CardMembershipSharp,
    Class,
    Collections,
    CreditCardOutlined,
    Event,
    Outbound,
    QueuePlayNextOutlined,
    StorefrontRounded,
} from '@mui/icons-material';

import { useState, useEffect } from 'react';

import { useLocation, NavLink } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SidebarItem from './SidebarItem';
import DescriptionIcon from '@mui/icons-material/Description';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faCertificate, faList } from '@fortawesome/free-solid-svg-icons';

export const EventPageSideBar = ({ isExpanded, setExpandMarketplaceCustomization, setExpandNfts, expandNfts, setHighLightButton, expandMarketplaceCustomization, marketplace, appCtx }) => {
    const [currentPage, setCurrentPage] = useState("");
    const location = useLocation();
    const [isExpandedSidebar, setExpanded] = useState([false, false, false,false]);

    useEffect(() => {
        setCurrentPage(location.pathname)
    }, [location])
    return (
        <>

            <SidebarItem
                icon={
                    <div className="flex flex-col">
                        <StorefrontRounded fontSize="large" />
                        {!isExpanded && <div className="text-[10px] justify-center items-center">Pages</div>}
                    </div>
                }
                navigate={'/marketplace'}
            >
                <div className=''
                    onClick={() => {
                        setExpandMarketplaceCustomization(!expandMarketplaceCustomization);
                        setExpandNfts(false);
                        setExpanded([!isExpandedSidebar[0], isExpandedSidebar[1], isExpandedSidebar[2],isExpandedSidebar[3]])
                    }}
                >
                    <span className="">oraganization page</span>
                    {!expandMarketplaceCustomization ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </div>
            </SidebarItem>
            {/* {isExpanded && expandMarketplaceCustomization && ( */}
            {isExpanded &&
                isExpandedSidebar[0] && (
                    <div className="bg-inherit p-3 flex flex-col items-start pl-16 gap-5">
                        <NavLink
                            to="/marketplace/update-header"
                            className={({ isActive }) =>
                                isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                            }
                        >
                            <div className="flex gap-1 items-center">
                                <CallToActionOutlinedIcon className="transform rotate-180" />

                                <div>Header</div>
                            </div>
                        </NavLink>
                        <NavLink
                            to={`/marketplace/pages`}
                            className={({ isActive }) =>
                                isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                            }
                        // navto={[
                        //     `/marketplace`,
                        //     `/marketplace/pages/edit-home-page`,
                        //     // `/marketplace/edit-footer-page`,
                        //     `/marketplace/pages/edit-about-page`,
                        //     `/marketplace/pages/edit-privacy-page`,
                        //     `/marketplace/pages/edit-faq-page`,
                        //     `/marketplace/pages/edit-tos-page`
                        // ]}
                        >
                            <div className="flex gap-1 items-center">
                                <DescriptionIcon />
                                <div>Pages</div>
                            </div>
                        </NavLink>

                        <NavLink
                            to={`/marketplace/edit-footer-page?marketplaceId=${marketplace?.marketplaceId}&marketplaceName=${marketplace?.name}&domain=${marketplace?.domain}`}
                            className={({ isActive }) =>
                                isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                            }
                        >
                            <div className="flex gap-1 items-center" >
                                <CallToActionOutlinedIcon />
                                <div>Footer</div>
                            </div>
                        </NavLink>
                        <button
                            className={`flex text-sm items-center`}
                            onClick={() => {

                                window.open(`http://${marketplace?.domain}`);
                            }}
                        >
                            <Outbound />
                            <div>Visit oraganization Page</div>
                        </button>
                    </div>
                )}
            <SidebarItem
                icon={
                    <div className="flex flex-col">
                        <Event fontSize="large" />
                        {!isExpanded && <span className="text-[10px] justify-center items-center">Events</span>}
                    </div>
                }
                navigate={'/events'}
            >
                <div onClick={() => {
                    setExpanded([isExpandedSidebar[0], !isExpandedSidebar[1], isExpandedSidebar[2],isExpandedSidebar[3]])

                }}>
                    <span className="">Events</span>
                    {currentPage?.split('/')[1] !== 'events' ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </div>
            </SidebarItem>
            {/* {isExpanded && currentPage?.split('/')[1] === 'events' && (   */}
            {isExpanded && isExpandedSidebar[1] && (
                <div className="bg-inherit p-3 flex flex-col items-start pl-16 gap-3">
                    <NavLink
                        to="/events/my-event"
                        className={({ isActive }) =>
                            isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                        }
                    >
                        <div className="flex gap-1 items-center">
                            <Event />

                            <div>My Events</div>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/events/create-event"
                        className={({ isActive }) =>
                            isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                        }
                    >
                        <div className="flex gap-1 items-center">
                            <FontAwesomeIcon icon={faCalendarPlus} />
                            <div>Create Event</div>
                        </div>
                    </NavLink>
                    <NavLink
                        to={`events/proof-of-attendence`}
                        className={({ isActive }) =>
                            isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                        }
                    >
                        <div className="flex gap-1 items-center">
                            <FontAwesomeIcon icon={faCertificate} />
                            <div>POA NFTs</div>
                        </div>
                    </NavLink>
                    <NavLink
                        to={`events/attendees-list`}
                        className={({ isActive }) =>
                            isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                        }
                    >
                        <div className="flex gap-1 items-center">
                            <FontAwesomeIcon icon={faList} />
                            <div>Attendees List</div>
                        </div>
                    </NavLink>
                    <NavLink
                        to={`events/claimers-list`}
                        className={({ isActive }) =>
                            isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                        }
                    >
                        <div className="flex gap-1 items-center">
                            <FontAwesomeIcon icon={faList} />
                            <div>Claimers List</div>
                        </div>
                    </NavLink>
                </div>
            )}
            <SidebarItem
                icon={
                    <div className="flex flex-col">
                        <CardMembershipSharp fontSize="large" />
                        {!isExpanded && <div className="text-[10px] justify-center items-center">Certificate</div>}
                    </div>
                }
                navigate={'/certificate'}
            >
                <div className='flex justify-center'
                    onClick={() => {
                        setExpandMarketplaceCustomization(!expandMarketplaceCustomization);
                        setExpandNfts(false);
                        setExpanded([isExpandedSidebar[0], isExpandedSidebar[1], !isExpandedSidebar[2],isExpandedSidebar[3]])
                    }}
                >
                    <span className="">Certificate</span>
                    {!expandMarketplaceCustomization ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </div>
            </SidebarItem>
            {isExpanded && isExpandedSidebar[2] && (<>
                <div className="bg-inherit p-3 flex flex-col items-start pl-16 gap-3">
                    <NavLink
                        to="/certificate/my-certificate"
                        className={({ isActive }) =>
                            isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                        }
                    >
                        <div className="flex gap-1 items-center">
                            <CreditCardOutlined />

                            <div>My Certificates</div>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/certificate/create"
                        className={({ isActive }) =>
                            isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                        }
                    >
                        <div className="flex gap-1 items-center">
                            <QueuePlayNextOutlined />

                            <div>Create certificate</div>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/certificate/collections"
                        className={({ isActive }) =>
                            isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                        }
                    >
                        <div className="flex gap-1 items-center">
                            <Collections />

                            <div>Collections</div>
                        </div>
                    </NavLink>
                </div>

            </>
            )}

            <SidebarItem
                icon={
                    <div className="flex flex-col">
                        <Class fontSize="large" />
                        {!isExpanded && <div className="text-[10px] justify-center items-center">Member</div>}
                    </div>
                }
                navigate={'/membership'}
            >
                <div className='flex justify-center'
                    onClick={() => {
                        setExpandMarketplaceCustomization(!expandMarketplaceCustomization);
                        setExpandNfts(false);
                        setExpanded([isExpandedSidebar[0], isExpandedSidebar[1], isExpandedSidebar[2],!isExpandedSidebar[3]])
                    }}
                >
                    <span className="">Members</span>
                    {!expandMarketplaceCustomization ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </div>
            </SidebarItem>
            {isExpanded && isExpandedSidebar[3] && (<>
                <div className="bg-inherit p-3 flex flex-col items-start pl-16 gap-3">
                    <NavLink
                        to="/membership/list"
                        className={({ isActive }) =>
                            isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                        }
                    >
                        <div className="flex gap-1 items-center">
                            <CreditCardOutlined />

                            <div>My Members</div>
                        </div>
                    </NavLink>
                    {/* <NavLink
                        to="/membership/create"
                        className={({ isActive }) =>
                            isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                        }
                    >
                        <div className="flex gap-1 items-center">
                            <QueuePlayNextOutlined />

                            <div>Create Membership</div>
                        </div>
                    </NavLink> */}
                    
                </div>

            </>
            )}

        </>
    );
}
