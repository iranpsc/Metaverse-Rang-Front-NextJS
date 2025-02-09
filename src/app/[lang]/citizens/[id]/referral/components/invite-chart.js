"use client";
import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto"; // Import Chart.js
import axios from "axios";



export default function InviteChart({params,referralPageArrayContent,initChartData}) {
  const canvasRef = useRef(null); // useRef to reference the canvas
  const chartRef = useRef(null);
  const [currentData, setCurrentData] = useState(initChartData); // Default to daily data
  const [invBtn, setInvBtn  ] = useState(true)
  const [giftBtn, setGiftBtn] = useState(true)
  const [timePeriodBtns, setTimePeriodBtns] = useState('daily')
  

  function localFind(_name) {
    return referralPageArrayContent.find((item) => item.name == _name)
      .translation;
  }

  // Convert all digits to Persian digits
  const convertToPersianDigits = (str) => {
    return str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  const sumation = (_array)=>{
    return _array.reduce((sum, current) => sum + current, 0)
  }

  const fetchChartData = async (_searchParam) => {
    try {
      const response = await axios.get(
        `https://api.rgb.irpsc.com/api/citizen/${params.id}/referrals/chart?range=${_searchParam}`,{
          headers: {
            "Content-Type": "application/json" 
          },}
      );
      return response.data.data
    } 
    catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };


  // Create the chart and store it in chartRef
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: currentData.labels,
        datasets: [
          {
            label: "دعوتی ها",
            data: currentData.data[0],
            borderColor: "#0066FF",
            backgroundColor: "rgba(0, 102, 255, 0.2)",
            fill: true,
            pointRadius: 8,
            pointBackgroundColor: "rgba(0, 102, 255, 0.5)",
            pointBorderColor: "#0066FF",
            pointBorderWidth: 2,
          },
          {
            label: "پاداش ها",
            data: currentData.data[1],
            borderColor: "#FFC700",
            backgroundColor: "rgba(255, 199, 0, 0.2)",
            fill: true,
            pointRadius: 8,
            pointBackgroundColor: "rgba(255, 199, 0, 0.5)",
            pointBorderColor: "#FFC700",
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: "white",
              font: {
                size: 14,
                family: "AzarMehrFD",
              },
              maxRotation: 45,
              minRotation: 45,
              autoSkip: true,
              autoSkipPadding: 10,
            },
            grid: {
              color: "#484850",
              drawOnChartArea: true,
              drawTicks: false,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: "white",
            },
            grid: {
              color: "#484850",
              drawOnChartArea: true,
              drawTicks: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    // Store the chart instance in chartRef
    chartRef.current = newChart;

    // Cleanup the chart on component unmount
    return () => {
      newChart.destroy();
    };
  }, [currentData]);

    // Handle dataset toggle visibility on legend click
    const handleLegendClick = (datasetIndex) => {
      // handling style of chart btn
      if(datasetIndex == 0)
        setInvBtn(!invBtn)
      else
        setGiftBtn(!giftBtn)
      const chart = chartRef.current;
      chart.setDatasetVisibility(datasetIndex, !chart.isDatasetVisible(datasetIndex));
      chart.update();
    };

  // Function to update the chart data based on the selected timeframe
  const handleTimeframeClick = async (timeframe) => {
    setInvBtn(true)
    setGiftBtn(true)
    setTimePeriodBtns(timeframe)
    const fetchData = async () => {
      try {
        const chartData = await fetchChartData(timeframe);
        
        let myLabels
        let referralsCount
        let referralsAmount
        let newData = {labels:[],data:[]}
    
        switch (timeframe) {
          case "daily":
            myLabels = await chartData.chart_data.map((label) => convertToPersianDigits(label.hour))
            referralsCount = chartData.chart_data.map((label) => label.referrals_count)
            referralsAmount = chartData.chart_data.map((label) => label.referral_orders_amount)
            break;
          case "weekly":
            myLabels = await chartData.chart_data.map((label) => convertToPersianDigits(label.day))
            referralsCount = chartData.chart_data.map((label) => label.referrals_count)
            referralsAmount = chartData.chart_data.map((label) => label.referral_orders_amount)
            break;
          case "monthly":
            myLabels = await chartData.chart_data.map((label) => convertToPersianDigits(label.month))
            referralsCount = chartData.chart_data.map((label) => label.referrals_count)
            referralsAmount = chartData.chart_data.map((label) => label.referral_orders_amount)
    
            break;
          case "yearly":
            myLabels = await chartData.chart_data.map((label) => convertToPersianDigits(label.year))
            referralsCount = chartData.chart_data.map((label) => label.total_referrals_count)
            referralsAmount = chartData.chart_data.map((label) => label.total_referral_orders_amount)
            break;
          default:
            break;
        }
        // creating new data for chart
    
        newData.labels = myLabels
        newData.data[0] =  referralsCount
        newData.data[1] =  referralsAmount
    
        setCurrentData(newData); // Update the current data based on the selected timeframe
    
        setCurrentData(newData); // Update the state with fetched data
      } catch (error) {
        console.log('Error in fetching chart data', error);
      }
    };
    fetchData()

  };


  return (
    <div className="w-full pt-7 text-right flex flex-col gap-3">
      <div className="w-full pt-7 text-right flex flex-col gap-3">
        <h2 className="text-black dark:text-white text-lg font-black font-azarMehr lg:text-2xl">
         {localFind("reward history table")}
        </h2>
        <p className="text-[#A0A0AB] text-lg my-3">
          {localFind("in this table, you can see the am")}
        </p>

        <div className="flex justify-between gap-4 md:max-w-[50%] lg:max-w-[30%] h-[64px]">
          <button
            onClick={() => handleTimeframeClick("daily")}
            className={`moment bg-white dark:bg-darkGray text-[#84858F] p-2 rounded-xl w-full ${timePeriodBtns == 'daily'?"border border-[#33353B]":''}`}
          >
            {localFind('daily')}
          </button>
          <button
            onClick={() => handleTimeframeClick("weekly")}
            className={`moment bg-white dark:bg-darkGray text-[#84858F] p-2 rounded-xl w-full ${timePeriodBtns == 'weekly'?"border border-[#33353B]":''}`}
          >
            {localFind('weekly')}
          </button>
          <button
            onClick={() => handleTimeframeClick("monthly")}
            className={`moment bg-white dark:bg-darkGray text-[#84858F] p-2 rounded-xl w-full ${timePeriodBtns == 'monthly'?"border border-[#33353B]":''}`}
          >
            {localFind('monthly')}
          </button>
          <button
            onClick={() => handleTimeframeClick("yearly")}
            className={`moment bg-white dark:bg-darkGray text-[#84858F] p-2 rounded-xl w-full ${timePeriodBtns == 'yearly'?"border border-[#33353B]":''}`}
          >
            {localFind('annually')}
          </button>
        </div>
      </div>
      {/* LEGENDARY buttons */}
      <div className="flex justify-start md:justify-end gap-6 text-right mt-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLegendClick(0)}>
          <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-[#0066FF]"></div>
          <span className={`text-[#0066FF] ${invBtn?"":"line-through"}`}>{localFind("invitations")}</span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLegendClick(1)}>
          <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-[#FFC700]"></div>
          <span className={`text-[#FFC700] ${giftBtn?"":"line-through"}`}>{localFind("-rewards")}</span>
        </div>
      </div>
      {/* BIG CARDS - 1 */}

      <div className=" w-full pt-2  text-right flex flex-col gap-3 md:flex-row">
        <div className="bg-[#0066ff78] h-[96px]  rounded-xl flex justify-between px-6 items-center w-full relative lg:h-44">
          <div className="absolute top-0 right-0">
            <svg
              className="lg:w-[111px] lg:h-[59px]"
              width="50"
              height="25"
              viewBox="0 0 111 59"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0.09375H98.193C104.82 0.09375 110.193 5.46633 110.193 12.0937V52.0938C110.193 52.0938 106.5 72.0938 41.4997 43.0938C-23.5 14.0938 8 0.09375 8 0.09375Z"
                fill="#003C95"
              />
            </svg>
          </div>
          <div className="absolute top-1 left-0  z-40">
            <svg
              className="lg:w-[60px] lg:h-[102px]"
              width="40"
              height="50"
              viewBox="0 0 73 102"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.660883 93.0841L0.620241 11.0166C0.620241 11.0166 13.3941 -5.81132 38.9942 2.79481C64.5943 11.4009 83.4943 57.7928 66.4943 86.7951C49.4943 115.797 0.660883 93.0841 0.660883 93.0841Z"
                fill="#003C95"
              />
            </svg>
          </div>

          <div className="text-right flex flex-col gap-2 mt-2 ">
            <p className="text-white text-sm lg:text-base">{localFind("the total number of invitations")}</p>
            <p
              id="invite"
              className="text-white text-3xl font-semibold lg:text-5xl"
            >{currentData.data[0] && currentData.data[0].length > 0 ? sumation(currentData.data[0]) : ""}</p>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <svg
              className="lg:w-[109px] lg:h-[31px]"
              width="70"
              height="15"
              viewBox="0 0 109 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M106.701 30.3781L20.1633 30.3781L0.164742 30.6094C0.164742 30.6094 15.2159 -9.06122 68.3597 3.3313C121.503 15.7238 106.701 30.3781 106.701 30.3781Z"
                fill="#003C95"
                fillOpacity="0.4"
              />
            </svg>
          </div>

          <div className="relative">
            <svg
              className="lg:w-28 lg:h-28 pt-2 lg:pt-6"
              width="48"
              height="49"
              viewBox="0 0 48 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36 14.8747C35.88 14.8547 35.74 14.8547 35.62 14.8747C32.86 14.7747 30.66 12.5147 30.66 9.71469C30.66 6.85469 32.96 4.55469 35.82 4.55469C38.68 4.55469 40.98 6.87469 40.98 9.71469C40.96 12.5147 38.76 14.7747 36 14.8747Z"
                stroke="white"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M33.94 29.435C36.68 29.895 39.7 29.415 41.82 27.995C44.64 26.115 44.64 23.035 41.82 21.155C39.68 19.735 36.62 19.255 33.88 19.735"
                stroke="white"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.94 14.8747C12.06 14.8547 12.2 14.8547 12.32 14.8747C15.08 14.7747 17.28 12.5147 17.28 9.71469C17.28 6.85469 14.98 4.55469 12.12 4.55469C9.25996 4.55469 6.95996 6.87469 6.95996 9.71469C6.97996 12.5147 9.17996 14.7747 11.94 14.8747Z"
                stroke="white"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 29.435C11.26 29.895 8.24 29.415 6.12 27.995C3.3 26.115 3.3 23.035 6.12 21.155C8.26 19.735 11.32 19.255 14.06 19.735"
                stroke="white"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.9999 29.8122C23.8799 29.7922 23.7399 29.7922 23.6199 29.8122C20.8599 29.7122 18.6599 27.4522 18.6599 24.6522C18.6599 21.7922 20.9599 19.4922 23.8199 19.4922C26.6799 19.4922 28.9799 21.8122 28.9799 24.6522C28.9599 27.4522 26.7599 29.7322 23.9999 29.8122Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.1799 36.1134C15.3599 37.9934 15.3599 41.0734 18.1799 42.9534C21.3799 45.0934 26.6199 45.0934 29.8199 42.9534C32.6399 41.0734 32.6399 37.9934 29.8199 36.1134C26.6399 33.9934 21.3799 33.9934 18.1799 36.1134Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="bg-[#806300] h-[96px]  rounded-xl flex justify-between px-6  items-center w-full relative  lg:h-44">
          <div className="absolute top-0 right-0 ">
            <svg
              className="lg:w-[75px] lg:h-[46px]"
              width="35"
              height="25"
              viewBox="0 0 72 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.87786 0H59.8779C66.5053 0 71.8779 5.37258 71.8779 12V34.0924C71.8779 34.0924 38.3779 59 14.113 34.0924C-10.1518 9.18478 5.87786 0 5.87786 0Z"
                fill="#947300"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 z-40  ">
            <svg
              className="lg:w-14 lg:h-28"
              width="40"
              height="70"
              viewBox="0 0 72 132"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.87785 123.074L0.87785 1.57813C0.87785 1.57813 10.3779 -1.92186 27.3779 1.57813C44.3779 5.07812 98.8778 68.0741 54.3556 108.448C9.83338 148.822 0.87785 123.074 0.87785 123.074Z"
                fill="#947300"
              />
            </svg>
          </div>

          <div className="text-right flex flex-col gap-2 mt-2">
            <p className="text-white text-sm lg:text-base">
              {localFind("bonus received per unit (psc)")}
            </p>
            <p
              id="reward"
              className="text-white text-3xl font-semibold lg:text-5xl"
            >{currentData.data[1] && currentData.data[1].length > 0 ? sumation(currentData.data[1]) : ""}</p>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <svg
              className="lg:w-[81px] lg:h-[45px]"
              width="40"
              height="20"
              viewBox="0 0 81 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M75.2562 44.0781L1.31507 43.5502C1.31507 43.5502 -0.773712 37.7534 1.43021 27.4226C3.63414 17.0918 42.2096 -15.8026 66.5875 11.4686C90.9653 38.7398 75.2562 44.0781 75.2562 44.0781Z"
                fill="#947300"
                fillOpacity="0.4"
              />
            </svg>
          </div>
          <div className="relative">
            <svg
              className="lg:w-[113px] lg:h-[100px] "
              width="61"
              height="55"
              viewBox="0 0 61 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.8903 29.5363L18.8768 22.3308L21.3115 22.6641C21.8767 22.7415 22.3248 22.9068 22.6558 23.1599C22.9894 23.4111 23.2194 23.721 23.3457 24.0895C23.4721 24.4581 23.5062 24.8546 23.4481 25.2792C23.39 25.7037 23.2504 26.0777 23.0293 26.4011C22.8105 26.7248 22.5076 26.9653 22.1205 27.1225C21.7336 27.2775 21.26 27.3166 20.6994 27.2398L18.9543 27.0009L19.0602 26.2269L20.7772 26.4619C21.1642 26.5149 21.4841 26.4906 21.737 26.389C21.9899 26.2874 22.1846 26.1301 22.3213 25.9171C22.4607 25.702 22.5501 25.4502 22.5896 25.1617C22.6291 24.8732 22.6105 24.6078 22.5337 24.3655C22.4593 24.1235 22.3125 23.9218 22.0933 23.7604C21.8744 23.5966 21.5691 23.4879 21.1773 23.4343L19.6434 23.2242L18.7629 29.6557L17.8903 29.5363ZM30.6557 26.2373L29.7832 26.1178C29.7659 25.8598 29.7058 25.6269 29.6028 25.4193C29.5022 25.2119 29.3692 25.0313 29.2039 24.8772C29.0413 24.7211 28.8542 24.5952 28.6427 24.4993C28.4312 24.4034 28.2059 24.3391 27.9666 24.3064C27.5303 24.2467 27.12 24.3028 26.7357 24.4748C26.3536 24.6471 26.0289 24.9336 25.7614 25.3342C25.4962 25.7352 25.3209 26.2477 25.2355 26.8716C25.1501 27.4955 25.1812 28.0362 25.3288 28.4937C25.4788 28.9515 25.7146 29.3147 26.0363 29.5834C26.3603 29.8523 26.7404 30.0167 27.1767 30.0764C27.4159 30.1092 27.6503 30.1078 27.8798 30.0723C28.1092 30.0368 28.3231 29.9669 28.5214 29.8627C28.7223 29.7564 28.8991 29.6169 29.0518 29.4442C29.2071 29.2696 29.3276 29.0614 29.4132 28.8199L30.2858 28.9393C30.1697 29.2986 30.0049 29.6118 29.7916 29.8788C29.5782 30.1459 29.3285 30.3638 29.0426 30.5326C28.7569 30.699 28.4462 30.813 28.1104 30.8745C27.777 30.9364 27.4285 30.9424 27.0649 30.8927C26.4504 30.8085 25.9244 30.5836 25.487 30.2179C25.0497 29.8521 24.7316 29.3737 24.533 28.7826C24.3343 28.1915 24.287 27.5159 24.3911 26.756C24.4951 25.996 24.7223 25.358 25.0725 24.8421C25.4227 24.3261 25.8576 23.9507 26.3772 23.716C26.8968 23.4813 27.4638 23.406 28.0784 23.4901C28.4419 23.5399 28.776 23.6394 29.0805 23.7886C29.3874 23.9382 29.6559 24.1326 29.886 24.372C30.1164 24.609 30.2984 24.8849 30.4322 25.1995C30.5663 25.5117 30.6408 25.8577 30.6557 26.2373ZM36.0678 26.5194C36.0744 26.1571 35.9411 25.8569 35.6678 25.6188C35.3946 25.3806 35.0398 25.2317 34.6035 25.172C34.2845 25.1283 33.9984 25.1417 33.745 25.2122C33.494 25.2829 33.2892 25.3995 33.1308 25.5618C32.9747 25.7244 32.881 25.9206 32.8495 26.1505C32.8232 26.3428 32.8463 26.5145 32.9188 26.6654C32.994 26.8143 33.098 26.9444 33.2309 27.0558C33.3642 27.1648 33.5065 27.2596 33.658 27.34C33.8098 27.4182 33.9501 27.484 34.079 27.5375L34.7838 27.8347C34.9647 27.9096 35.1642 28.0062 35.3821 28.1245C35.6025 28.2431 35.8079 28.3919 35.9985 28.5709C36.1917 28.7479 36.3416 28.9619 36.4482 29.2131C36.5548 29.4642 36.585 29.7587 36.5387 30.0965C36.4854 30.4858 36.3352 30.8237 36.0881 31.11C35.8434 31.3967 35.5136 31.6061 35.0989 31.7381C34.6865 31.8704 34.2036 31.8986 33.65 31.8229C33.134 31.7522 32.6986 31.6078 32.3437 31.3895C31.9912 31.1716 31.7275 30.899 31.5525 30.5715C31.3798 30.2444 31.3064 29.8819 31.3322 29.484L32.2329 29.6073C32.2191 29.8826 32.2797 30.1203 32.4148 30.3204C32.5526 30.5185 32.7387 30.6778 32.9731 30.7983C33.2101 30.9168 33.4717 30.9956 33.7579 31.0348C34.091 31.0804 34.3974 31.0674 34.6772 30.9957C34.9574 30.9218 35.1882 30.7981 35.3696 30.6246C35.5514 30.4487 35.6603 30.2295 35.6962 29.9668C35.729 29.7275 35.6888 29.5237 35.5757 29.3553C35.4625 29.1869 35.3033 29.0408 35.098 28.9171C34.8927 28.7934 34.6682 28.6791 34.4245 28.574L33.5726 28.1993C33.0318 27.9604 32.6178 27.6684 32.3305 27.3232C32.0433 26.978 31.9328 26.5626 31.9993 26.0771C32.0546 25.6737 32.2118 25.3368 32.471 25.0664C32.7329 24.794 33.0606 24.5999 33.454 24.4841C33.85 24.3663 34.2779 24.3389 34.7377 24.4018C35.2021 24.4654 35.6035 24.6052 35.9419 24.8212C36.2806 25.0348 36.536 25.2991 36.7079 25.6142C36.8822 25.9296 36.9503 26.2698 36.9122 26.635L36.0678 26.5194Z"
                fill="white"
              />
              <circle
                cx="33.216"
                cy="27.8773"
                r="23.25"
                transform="rotate(7.79551 33.216 27.8773)"
                stroke="white"
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              <circle
                cx="27.0336"
                cy="27.0335"
                r="23.25"
                transform="rotate(7.79551 27.0336 27.0335)"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center md:justify-end gap-6 text-right">
        <canvas ref={canvasRef} id="myChart" height='300'></canvas>
      </div>
    </div>
  );
}
