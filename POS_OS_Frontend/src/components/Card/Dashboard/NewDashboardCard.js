import React, { Fragment } from "react";
import "./style.css";

const NewDashboardCard = ({ information }) => {
  return (
    <Fragment>
      <div>
        <div className="row">
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card dashboard-card">
              <div className="card-content">
                <div className="card-body dashboard-card-body" style={{borderRadius: "10px", background: "linear-gradient(90deg, #8CB8ED 10%, #5A8DE0 75%)"}}>
                  <div className="media d-flex">
                    <div className="media-body text-left">
                      <h3 className="">
                        {information?.purchase_total
                          ? information?.purchase_total
                          : 0}
                      </h3>
                      <span className="">Total Purchase</span>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="icon-cloud-download font-large-2 float-right"
                        style={{ color: "#fff	" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card dashboard-card">
              <div className="card-content">
                <div className="card-body dashboard-card-body" style={{borderRadius: "10px", background: "linear-gradient(90deg, #BD5FD3 10%, #7E3C8E 75%)"}}>
                  <div className="media d-flex">
                    <div className="media-body text-left">
                      <h3 className="">
                        {information?.sale_total ? information?.sale_total : 0}
                      </h3>
                      <span className="">Total Sale</span>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="icon-rocket font-large-2 float-right"
                        style={{ color: "#fff	" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card dashboard-card">
              <div className="card-content">
                <div className="card-body dashboard-card-body" style={{borderRadius: "10px", background: "linear-gradient(90deg, #65E5AB 10%, #52B289 75%)"}}>
                  <div className="media d-flex">
                    <div className="media-body text-left">
                      <h3 className="">
                        {information?.sale_profit
                          ? information?.sale_profit
                          : 0}
                      </h3>
                      <span className="">Total Profit</span>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="icon-wallet font-large-2 float-right"
                        style={{ color: "#fff	" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card dashboard-card">
              <div className="card-content">
                <div className="card-body dashboard-card-body" style={{borderRadius: "10px", background: "linear-gradient(90deg, #E0489B 10%, #9E1057 75%)"}}>
                  <div className="media d-flex">
                    <div className="media-body text-left">
                      <h3 className="">
                        {information?.sale_count ? information?.sale_count : 0}
                      </h3>
                      <span className="">Total Sale</span>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="icon-wallet font-large-2 float-right"
                        style={{ color: "#fff	" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewDashboardCard;
