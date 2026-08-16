import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../css/MyRequests.css";


function MyRequests() {

  const { t } = useTranslation();


  const [requests, setRequests] = useState([]);




  const fetchRequests = useCallback(async () => {

    try {

      const client_id = localStorage.getItem("client_id");


      const res = await axios.get(
        `http://localhost:5000/my-requests/${client_id}`
      );


      setRequests(res.data);


    } catch (error) {

      console.log(error);

      alert(t("unable_load_requests"));

    }


  }, [t]);





  useEffect(() => {

    fetchRequests();

  }, [fetchRequests]);





  return (
    <>


      {/* Page Header */}

      <div className="page-header">


        <h1>
          📋 {t("my_banana_requests")}
        </h1>


        <p>
          {t("view_submitted_requests")}
        </p>


      </div>





      {/* Requests */}

      <div className="request-grid">


        {
          requests.length > 0 ? (


            requests.map((item) => (


              <div 
                className="request-card" 
                key={item.id}
              >



                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.banana_name}
                />





                <div className="request-info">



                  <h2>
                    {item.banana_name}
                  </h2>





                  <p>

                    <strong>
                      📦 {t("quantity")}:
                    </strong>{" "}

                    {item.quantity} KG

                  </p>





                  <p>

                    <strong>
                      💰 {t("price")}:
                    </strong>{" "}

                    ₹{item.price}

                  </p>





                  <p>

                    <strong>
                      📍 {t("location")}:
                    </strong>{" "}

                    {item.location}

                  </p>





                  <p>

                    <strong>
                      📝 {t("description")}:
                    </strong>


                    <br />


                    {item.description}


                  </p>






                  <p>

                    <strong>
                      📅 {t("date")}:
                    </strong>


                    <br />


                    {new Date(item.created_at).toLocaleString()}


                  </p>







                  <span
                    className={`status ${item.status.toLowerCase()}`}
                  >

                    {item.status}

                  </span>




                </div>


              </div>


            ))



          ) : (




            <div className="empty-state">


              <h2>
                📭 {t("no_requests")}
              </h2>



              <p>
                {t("no_request_message")}
              </p>



            </div>




          )
        }



      </div>


    </>
  );
}


export default MyRequests;