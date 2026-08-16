import React from "react";
import { useTranslation } from "react-i18next";
import "../css/About.css";


export default function About() {


  const { t } = useTranslation();



  return (


    <div>

      <div className="about-container">



        <h1>
          🍌 {t("about_title")}
        </h1>





        <p>
          {t("about_para1")}
        </p>




        <p>
          {t("about_para2")}
        </p>




        <p>
          {t("about_para3")}
        </p>







        <div className="about-features">






          <div className="feature-card">

            <h3>
              🌱 {t("fresh_bananas")}
            </h3>


            <p>
              {t("fresh_bananas_desc")}
            </p>


          </div>








          <div className="feature-card">

            <h3>
              🏭 {t("manufacturing")}
            </h3>


            <p>
              {t("manufacturing_desc")}
            </p>


          </div>








          <div className="feature-card">

            <h3>
              📦 {t("quality_packing")}
            </h3>


            <p>
              {t("quality_packing_desc")}
            </p>


          </div>








          <div className="feature-card">

            <h3>
              🤝 {t("fair_pricing")}
            </h3>


            <p>
              {t("fair_pricing_desc")}
            </p>


          </div>





        </div>



      </div>


    </div>


  );

}