import React from "react";
import { useTranslation } from "react-i18next";
import "../css/Contact.css";


function Contact() {


    const { t } = useTranslation();



    return (


        <div className="contact-container">



            <h1>
                📞 {t("contact_title")}
            </h1>





            <p className="contact-text">

                {t("contact_text")}

            </p>







            <div className="contact-content">





                {/* Contact Information */}


                <div className="contact-info">



                    <h2>
                        📍 {t("contact_information")}
                    </h2>






                    <div className="info-box">

                        <h3>
                            🏢 {t("office_address")}
                        </h3>


                        <p>
                            BananaMart Pvt. Ltd.<br />
                            Agra, Uttar Pradesh, India
                        </p>


                    </div>







                    <div className="info-box">

                        <h3>
                            📞 {t("phone")}
                        </h3>


                        <p>
                            +91 9876543210
                        </p>


                    </div>







                    <div className="info-box">

                        <h3>
                            📧 {t("email")}
                        </h3>


                        <p>
                            support@bananamart.com
                        </p>


                    </div>







                    <div className="info-box">

                        <h3>
                            🕒 {t("working_hours")}
                        </h3>


                        <p>
                            {t("working_time")}
                        </p>


                    </div>




                </div>









                {/* Contact Form */}



                <div className="contact-form">


                    <h2>
                        ✉ {t("send_message")}
                    </h2>






                    <form>


                        <input
                            type="text"
                            placeholder={t("your_name")}
                            required
                        />



                        <input
                            type="email"
                            placeholder={t("your_email")}
                            required
                        />



                        <input
                            type="text"
                            placeholder={t("subject")}
                            required
                        />



                        <textarea
                            placeholder={t("write_message")}
                            required
                        ></textarea>





                        <button type="submit">

                            {t("send_message")}

                        </button>



                    </form>



                </div>






            </div>



        </div>



    );

}


export default Contact;