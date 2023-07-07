import React from "react";
import {  Row, Col, Button } from "react-bootstrap";
import "./index.scss";



const ThankYouPage = () => {
  const exitSurvey = () => {
    window.history.pushState({},undefined,"/")
    window.location.reload();
  }
  
  return (
    <Row className="justify-content-md-center thankYouPageContainer">
      <Col md={5} className="thankYouText">
        <Row>
          <svg
            width="63"
            height="63"
            viewBox="0 0 63 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.9046 19.819C18.2655 19.819 17.7529 20.0081 17.3809 20.38C17.1285 20.6325 16.9622 20.9454 16.8796 21.3156L13.2191 32.8176C13.2167 32.8253 13.2146 32.8327 13.2121 32.8404L7.93729 49.4148C7.93624 49.4184 7.93624 49.4219 7.93518 49.4254C7.9285 49.4475 7.92569 49.4707 7.92112 49.4939C7.91549 49.5203 7.90846 49.5463 7.906 49.5727C7.90495 49.5846 7.90635 49.598 7.906 49.6107C7.9046 49.6479 7.90284 49.6852 7.90635 49.7221C7.90741 49.7298 7.90987 49.7369 7.91092 49.745C7.91655 49.7872 7.92463 49.8286 7.93729 49.8691C7.93764 49.8712 7.93764 49.8726 7.93835 49.8747C7.9394 49.8782 7.94186 49.8807 7.94292 49.8842C7.96612 49.9531 7.99952 50.0178 8.04065 50.0772C8.04557 50.0842 8.04979 50.092 8.05471 50.099C8.09655 50.1545 8.14752 50.2038 8.20377 50.2466C8.21432 50.2547 8.22486 50.2614 8.23541 50.2688C8.29447 50.3085 8.3574 50.3433 8.42841 50.3662C8.50435 50.389 8.58134 50.4003 8.65728 50.4003C8.73323 50.4003 8.81056 50.389 8.88721 50.3651L37.0671 41.3978C37.0798 41.3939 37.0907 41.3872 37.1033 41.3823C37.4218 41.2916 37.6996 41.1433 37.9214 40.9218C40.0635 38.7787 35.7153 32.4793 30.7692 27.5325C26.1556 22.9182 21.3876 19.8185 18.9045 19.8185L18.9046 19.819ZM18.2859 25.9723C19.6689 28.3549 21.8877 31.123 24.5328 33.7693C27.8895 37.126 31.3236 39.6741 33.9045 40.8168L28.2043 42.6308C25.3576 42.4371 22.1296 40.9904 19.3227 38.6427C17.335 36.9802 15.761 35.0374 14.7432 33.0111L17.4794 24.4133C17.6963 24.8981 17.9628 25.417 18.2855 25.9724L18.2859 25.9723ZM18.4821 45.7246C16.744 45.0307 15.0019 43.9788 13.4301 42.665C12.9555 42.2677 12.5041 41.8441 12.0713 41.4099L14.1167 34.9844C15.1928 36.719 16.6318 38.3622 18.3537 39.8026C20.4877 41.5871 22.8657 42.8952 25.1845 43.5927L18.4821 45.7246ZM11.557 43.0254C11.8502 43.2989 12.1519 43.5661 12.4602 43.8241C13.6783 44.8426 14.9956 45.7141 16.3403 46.406L9.82064 48.4806L11.557 43.0254ZM36.8524 39.8521C36.7498 39.9548 36.5234 39.9699 36.3978 39.9699H36.3975C34.6456 39.9696 30.3752 37.4728 25.602 32.6996C23.0462 30.1438 20.9122 27.4849 19.5938 25.2131C18.5197 23.3625 18.2613 22.2097 18.3439 21.6996L18.346 21.6925C18.3485 21.6834 18.3492 21.6749 18.3517 21.6658C18.3724 21.5667 18.4055 21.4925 18.4501 21.4482C18.5528 21.3455 18.7792 21.3304 18.9047 21.3304C20.6565 21.3304 24.9269 23.8276 29.7002 28.6007C35.6535 34.5551 37.5481 39.1568 36.8524 39.8525L36.8524 39.8521Z"
              fill="#0D65BE"
            />
            <path
              d="M29.8746 17.405C29.1187 17.8688 28.2616 18.3943 27.5659 19.86C27.3869 20.2376 27.5473 20.6879 27.9241 20.8675C28.0289 20.9174 28.1393 20.941 28.2483 20.941C28.5309 20.941 28.8023 20.7817 28.9317 20.5089C29.4352 19.4486 29.978 19.1154 30.6649 18.6942C31.4208 18.2305 32.2779 17.7042 32.9736 16.2392C33.6701 14.7736 33.5372 13.7773 33.4198 12.8976C33.3129 12.0978 33.2289 11.4657 33.7327 10.4047C34.2371 9.34371 34.78 9.01008 35.4672 8.5878C36.2231 8.12374 37.0802 7.59744 37.7766 6.13143C37.9556 5.75385 37.7956 5.3035 37.4184 5.12388C37.0415 4.94493 36.5905 5.10525 36.4115 5.48212C35.907 6.54313 35.3641 6.87712 34.6762 7.29904C33.9207 7.7631 33.0639 8.2894 32.3675 9.75505C31.6703 11.2211 31.8036 12.2181 31.921 13.097C32.0279 13.8968 32.1126 14.5289 31.6081 15.5899C31.1047 16.6499 30.5619 16.9831 29.8745 17.4051L29.8746 17.405Z"
              fill="#DB8A11"
            />
            <path
              d="M47.7443 25.1596C48.7568 24.5619 49.3938 24.59 50.1995 24.6248C51.0837 24.6642 52.0899 24.7071 53.4877 23.882C53.8477 23.6696 53.9669 23.2063 53.7549 22.8466C53.5422 22.4866 53.0785 22.3688 52.7195 22.5794C51.7063 23.1767 51.0689 23.1479 50.2642 23.1141C49.3797 23.0755 48.3742 23.0319 46.9757 23.857C45.5787 24.6814 45.1311 25.5821 44.7366 26.3766C44.3773 27.0998 44.094 27.6704 43.0818 28.2677C42.0707 28.865 41.4333 28.8362 40.6289 28.8021C39.7409 28.7617 38.7389 28.7195 37.3428 29.5428C36.9828 29.7552 36.8637 30.2185 37.0757 30.5782C37.2166 30.8176 37.4687 30.9502 37.7274 30.9502C37.8586 30.9502 37.9901 30.9164 38.111 30.8454C39.1221 30.2495 39.7591 30.2762 40.5624 30.3128C41.4491 30.3514 42.4535 30.3954 43.8506 29.5703C45.2476 28.7448 45.6956 27.8444 46.0904 27.0503C46.4501 26.3267 46.7338 25.7569 47.7442 25.1595L47.7443 25.1596Z"
              fill="#DB8A11"
            />
            <path
              d="M37.4915 10.3114C37.4029 10.5849 37.4767 10.8855 37.6831 11.0865L39.4486 12.8078L39.0316 15.2371C38.9828 15.5208 39.0998 15.8077 39.3326 15.9764C39.4648 16.072 39.6205 16.1209 39.777 16.1209C39.8975 16.1209 40.0185 16.0921 40.1289 16.0341L42.311 14.8869L44.4928 16.0341C44.7477 16.1677 45.0556 16.1466 45.2891 15.9768C45.5218 15.808 45.6382 15.5211 45.59 15.2374L45.1731 12.8078L46.939 11.0865C47.145 10.8858 47.2192 10.5852 47.1306 10.3113C47.0413 10.0378 46.805 9.83814 46.5203 9.79665L44.0804 9.44193L42.9888 7.23099C42.8619 6.97294 42.5993 6.80981 42.311 6.80981C42.0228 6.80981 41.7601 6.97294 41.6332 7.23099L40.5416 9.44193L38.1018 9.79665C37.8167 9.83849 37.5804 10.0382 37.4915 10.3114ZM41.1519 10.8812C41.398 10.8454 41.6111 10.6907 41.7211 10.4678L42.3107 9.27385L42.9003 10.4678C43.0103 10.6907 43.2233 10.8457 43.4694 10.8812L44.7864 11.0728L43.8329 12.0024C43.6547 12.1764 43.5735 12.4263 43.6153 12.6717L43.84 13.9837L42.6622 13.3643C42.5518 13.3063 42.4313 13.2775 42.3103 13.2775C42.1897 13.2775 42.0688 13.3066 41.9584 13.3643L40.7799 13.9837L41.0053 12.6724C41.0471 12.4271 40.9659 12.1771 40.7877 12.0031L39.8342 11.0736L41.1519 10.8812Z"
              fill="#7A1AA7"
            />
            <path
              d="M16.4367 8.22944L19.0298 9.6473L20.4477 12.2404C20.5802 12.483 20.8347 12.6334 21.1111 12.6334C21.3874 12.6334 21.6419 12.4826 21.7745 12.2404L23.1923 9.6473L25.7848 8.22944C26.0274 8.0969 26.1778 7.84237 26.1778 7.56604C26.1778 7.28972 26.027 7.03519 25.7848 6.90264L23.1923 5.48478L21.7741 2.89171C21.6416 2.64913 21.387 2.49866 21.1107 2.49866C20.8344 2.49866 20.5799 2.64948 20.4473 2.89171L19.0291 5.48478L16.436 6.90264C16.1934 7.03519 16.043 7.28972 16.043 7.56604C16.0423 7.84237 16.1941 8.0969 16.4367 8.22944H16.4367ZM19.9495 6.70475C20.0764 6.63514 20.1805 6.53143 20.2498 6.40452L21.1107 4.82988L21.9717 6.40452C22.0413 6.53108 22.145 6.6355 22.2719 6.70475L23.8459 7.56573L22.2719 8.4267C22.145 8.49631 22.041 8.60003 21.9717 8.72693L21.1107 10.3016L20.2498 8.72693C20.1801 8.60002 20.0757 8.49596 19.9495 8.4267L18.3749 7.56573L19.9495 6.70475Z"
              fill="#7A1AA7"
            />
            <path
              d="M28.17 12.4443C27.8662 12.1585 27.3867 12.1722 27.1016 12.4766L24.872 14.8458C24.5859 15.1495 24.6003 15.6284 24.9044 15.9142C25.0506 16.0513 25.2366 16.1198 25.4219 16.1198C25.623 16.1198 25.8241 16.04 25.9728 15.8818L28.2023 13.5127C28.4885 13.2089 28.4744 12.7308 28.17 12.4443L28.17 12.4443Z"
              fill="#83A2CF"
            />
            <path
              d="M50.31 30.3633C47.4479 30.3633 45.1191 32.6913 45.1191 35.5534C45.1191 39.0269 47.9447 41.8523 51.4181 41.8523C51.8354 41.8523 52.1739 41.5138 52.1739 41.0965C52.1739 40.6792 51.8354 40.3406 51.4181 40.3406C48.7785 40.3406 46.6311 38.1929 46.6311 35.5537C46.6311 33.5255 48.2814 31.8757 50.3099 31.8757C51.8497 31.8757 53.1017 33.1276 53.1017 34.6667C53.1017 35.8142 52.1672 36.7487 51.019 36.7487C50.184 36.7487 49.5045 36.0695 49.5045 35.2346C49.5045 34.6499 49.9798 34.1743 50.5648 34.1743C50.9821 34.1743 51.3206 33.8357 51.3206 33.4184C51.3206 33.0011 50.9821 32.6625 50.5648 32.6625C49.1465 32.6625 47.9924 33.8167 47.9924 35.2349C47.9924 36.9038 49.3498 38.2608 51.019 38.2608C53.0011 38.2608 54.6134 36.6486 54.6134 34.6668C54.6134 32.2937 52.6826 30.3633 50.31 30.3633V30.3633Z"
              fill="#83A2CF"
            />
            <path
              d="M43.688 19.8485L34.5791 22.5046C34.1783 22.6217 33.948 23.0408 34.0644 23.4419C34.1607 23.772 34.4627 23.9868 34.7896 23.9868C34.8603 23.9868 34.9306 23.9766 35.002 23.9562L44.1109 21.3001C44.5117 21.1831 44.7419 20.764 44.6256 20.3629C44.5085 19.9611 44.0884 19.7311 43.688 19.8485V19.8485Z"
              fill="#83A2CF"
            />
            <path
              d="M52.1058 19.4121C53.7564 19.4121 55.099 18.0687 55.099 16.4181C55.099 14.7675 53.7564 13.4242 52.1058 13.4242C50.4552 13.4242 49.1118 14.7675 49.1118 16.4181C49.1118 18.0687 50.4544 19.4121 52.1058 19.4121ZM52.1058 14.936C52.9228 14.936 53.5869 15.6008 53.5869 16.4179C53.5869 17.2349 52.9228 17.8997 52.1058 17.8997C51.2887 17.8997 50.6239 17.2349 50.6239 16.4179C50.6239 15.6008 51.2887 14.936 52.1058 14.936Z"
              fill="#FF7C7C"
            />
            <path
              d="M25.9995 1.51209C27.9771 1.51209 29.5858 3.43827 29.5858 5.8068C29.5858 6.22445 29.924 6.56266 30.3417 6.56266C30.7594 6.56266 31.0976 6.22445 31.0976 5.8068C31.0983 2.60478 28.811 0 25.9995 0C25.5819 0 25.2437 0.338202 25.2437 0.755856C25.2437 1.17386 25.5819 1.51206 25.9995 1.51206L25.9995 1.51209Z"
              fill="#FF7C7C"
            />
          </svg>
        </Row>
        <Row className="title">
          <h4>Thank you for taking the time to complete this survey!</h4>
        </Row>
        <Row className="subtext">
          <h5>
            We truly value the information you have provided. Your responses
            will contribute to our analyses of the deep fakes and suggest new
            lines of approach to the corpus data.
          </h5>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={2}>
          <Button onClick={()=>exitSurvey()}>Exit</Button>
          </Col>
          
        </Row>
      </Col>
    </Row>
  );
};

export default ThankYouPage;
