import React, { Fragment } from "react";
import "./Dashboard/style.css";

const DashboardCard = ({ information, count, isCustomer, title }) => {
	return (
		<Fragment>
			<div>
				<div className='row'>
					<div className='col-xl-3 col-sm-6 col-12'>
						<div className='card dashboard-card'>
							<div className='card-content'>
								<div
									className='card-body dashboard-card-body'
									style={{
										borderRadius: "10px",
										background:
											"linear-gradient(90deg, #8CB8ED 10%, #5A8DE0 75%)",
									}}>
									<div className='media d-flex'>
										<div className='media-body text-left'>
											<h3 className=''>{count?.id ? count?.id : 0}</h3>
											<span className=''>Invoice</span>
										</div>
										<div className='align-self-center'>
											<i
												className='icon-cloud-download font-large-2 float-right'
												style={{ color: "#fff	" }}></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-xl-3 col-sm-6 col-12'>
						<div className='card dashboard-card'>
							<div className='card-content'>
								<div
									className='card-body dashboard-card-body'
									style={{
										borderRadius: "10px",
										background:
											"linear-gradient(90deg, #BD5FD3 10%, #7E3C8E 75%)",
									}}>
									<div className='media d-flex'>
										<div className='media-body text-left'>
											<h3 className=''>
												{information?.total_amount
													? information?.total_amount
													: 0}
											</h3>
											<span className=''>Total Amount</span>
										</div>
										<div className='align-self-center'>
											<i
												className='icon-rocket font-large-2 float-right'
												style={{ color: "#fff	" }}></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='col-xl-3 col-sm-6 col-12'>
						<div className='card dashboard-card'>
							<div className='card-content'>
								<div
									className='card-body dashboard-card-body'
									style={{
										borderRadius: "10px",
										background:
											"linear-gradient(90deg, #65E5AB 10%, #52B289 75%)",
									}}>
									<div className='media d-flex'>
										<div className='media-body text-left'>
											<h3 className=''>
												{information?.profit ? information?.profit : 0}
											</h3>
											<span className=''>Total Profit</span>
										</div>
										<div className='align-self-center'>
											<i
												className='icon-wallet font-large-2 float-right'
												style={{ color: "#fff	" }}></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-xl-3 col-sm-6 col-12'>
						<div className='card dashboard-card'>
							<div className='card-content'>
								<div
									className='card-body dashboard-card-body'
									style={{
										borderRadius: "10px",
										background:
											"linear-gradient(90deg, #E0489B 10%, #9E1057 75%)",
									}}>
									{isCustomer ? (
										<div className='media d-flex'>
											<div className='media-body text-left'>
												<h3 className=''>
													{information?.paid_amount
														? information?.paid_amount
														: 0}
												</h3>
												<span className=''>Paid Amount</span>
											</div>
											<div className='align-self-center'>
												<i
													className='icon-wallet font-large-2 float-right'
													style={{ color: "#fff	" }}></i>
											</div>
										</div>
									) : (
										<div className='media d-flex'>
											<div className='media-body text-left'>
												<h3 className=''>
													{information?.due_amount
														? information?.due_amount
														: 0}
												</h3>
												<span className=''>Due Amount</span>
											</div>
											<div className='align-self-center'>
												<i
													className='icon-wallet font-large-2 float-right'
													style={{ color: "#fff	" }}></i>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default DashboardCard;
