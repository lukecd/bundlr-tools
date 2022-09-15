import "../index.css";

import React, { useState } from "react";
import Logo from "../assets/umbrella-64.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import { ConnectButton } from "@rainbow-me/rainbowkit";

/**
 * @returns Top navigation bar
 */
const Navbar = () => {
	const [nav, setNav] = useState(false);
	const handleClick = () => setNav(!nav);

	return (
		<div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-primary text-text z-10">
			<div>
				<img src={Logo} alt="Umbrella" style={{ width: "50px" }} />
			</div>
			{/* desktop menu */}
			<ul className="hidden md:flex">
				<li>
					<Link
						className="hover:border-background border-2 px-4 py-2"
						to="about"
						smooth={true}
						duration={500}
					>
						about
					</Link>
				</li>
				<li>
					<Link
						className="hover:border-background border-2 px-4 py-2"
						to="wallet-balance"
						smooth={true}
						duration={500}
					>
						wallet balance
					</Link>
				</li>
				<li>
					<Link
						className="hover:border-background border-2 px-4 py-2"
						to="check-price"
						smooth={true}
						offset={-100}
						duration={500}
					>
						check price
					</Link>
				</li>
				<li>
					<Link
						className="hover:border-background border-2 px-4 py-2"
						to="batch-upload"
						smooth={true}
						offset={-100}
						duration={500}
					>
						batch upload
					</Link>
				</li>
			</ul>
			<div className="pr-5">
				<ConnectButton />
			</div>

			{/* hamburger */}
			<div onClick={handleClick} className="md:hidden z-10">
				{!nav ? <FaBars /> : <FaTimes />}
			</div>
			{/* mobile menu */}
			<ul
				className={
					!nav
						? "hidden"
						: "absolute top-0 left-0 w-full h-screen bg-primary text-text flex flex-col justify-center items-center"
				}
			>
				<li className="py-6 text-4xl">
					<Link onClick={handleClick} to="about" smooth={true} duration={500}>
						about
					</Link>
				</li>
				<li className="py-6 text-4xl">
					<Link onClick={handleClick} to="wallet-balance" smooth={true} duration={500}>
						wallet balance
					</Link>
				</li>
				<li className="py-6 text-4xl">
					<Link onClick={handleClick} to="check-price" smooth={true} duration={500}>
						check price
					</Link>
				</li>
				<li className="py-6 text-4xl">
					<Link onClick={handleClick} to="batch-upload" smooth={true} duration={500}>
						batch upload
					</Link>
				</li>
			</ul>
			{/* social */}
			<div className="hidden"></div>
		</div>
	);
};

export default Navbar;
