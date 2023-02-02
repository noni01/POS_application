import React from "react";
import { Link } from "react-router-dom";
import "./quick-links.css";

export default function QuickLinks({ sideNavOpenKeysHandler }) {
	const QuickLinksContainer = ({ link, icon, bg, linkName }) => {
		return (
			<Link to={link}>
				<div className='quick-links-inner-container'>
					<div style={{ backgroundColor: bg }} className='quick-link'>
						{icon}
					</div>
					<span className='quick-link-title'>{linkName}</span>
				</div>
			</Link>
		);
	};

	return (
		<div className='quick-links-wrapper'>
			<p className='quick-links-title'>Quick Links</p>

			<div className='quick-links-container'>
				<QuickLinksContainer
					link='/product'
					bg='#5A8DE040'
					linkName='PRODUCT'
					icon={
						<i
							style={{ color: "#5A8DE0" }}
							class='bi bi-box-fill quick-links-icon'></i>
					}
				/>
				<QuickLinksContainer
					link='/supplier'
					bg='#BD5FD340'
					linkName='PURCHASE'
					icon={
						<i
							style={{ color: "#BD5FD3" }}
							class='bi bi-bag-fill quick-links-icon'></i>
					}
				/>
				<QuickLinksContainer
					link='/customer'
					bg='#52B28940'
					linkName='SALE'
					icon={
						<i
							style={{ color: "#52B289" }}
							class='bi bi-receipt quick-links-icon'></i>
					}
				/>
				<QuickLinksContainer
					link='/account'
					bg='#E0489B40'
					linkName='ACCOUNTS'
					icon={
						<i
							style={{ color: "#E0489B" }}
							class='bi bi-wallet-fill quick-links-icon'></i>
					}
				/>
				<QuickLinksContainer
					link='/account/trial-balance'
					bg='#8CB8ED40'
					linkName='REPORT'
					icon={
						<i
							style={{ color: "#8CB8ED" }}
							class='bi bi-flag-fill quick-links-icon'></i>
					}
				/>
				<QuickLinksContainer
					link='/hr/staffs'
					bg='#9E105740'
					linkName='HR'
					icon={
						<i
							style={{ color: "#9E1057" }}
							class='bi bi-person-circle quick-links-icon'></i>
					}
				/>
				<QuickLinksContainer
					link='/pos'
					bg='#7E3C8E40'
					linkName='POS'
					icon={
						<i
							style={{ color: "#7E3C8E" }}
							class='bi bi-cart-check-fill quick-links-icon'></i>
					}
				/>
				<QuickLinksContainer
					link='/invoice-setting'
					bg='#65E5AB40'
					linkName='SETTINGS'
					icon={
						<i
							style={{ color: "#65E5AB" }}
							class='bi bi-gear-fill quick-links-icon'></i>
					}
				/>
			</div>
		</div>
	);
}
