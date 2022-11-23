import React, { useEffect, useState } from "react";

const Restricted = (_props) => {
  const [ethConnected, setEthConnected] = useState();
  const [interval, updateInterval] = useState();

  useEffect(() => {
    updateInterval(() => setEthConnected(localStorage.getItem("eth_connected") === "y"), 1000);
    return () => clearInterval(interval);
  }, [interval, updateInterval, setEthConnected]);

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="nothing-to-show d-flex align-items-center justify-content-center">
          <div className="card shadow-none bg-transparent">
            <div className="card-body text-center">
              <div className="row">
                <div className="col-12 col-lg-12 mx-auto">
                  <h6 className="mt-3">
                    ¡
                    {!ethConnected
                      ? "Please connect your wallet"
                      : "Nothing to show here"}
                    !
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restricted;