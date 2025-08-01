import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../reducx/orderSlice";
import Spinner from "../../Spinner";

function Dashboard() {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.orders
  );
 
 
const orderMetrics = useMemo(() => {
  if (!Array.isArray(orders)) return { total: 0, pending: 0, delivered: 0 };
  return {
    total: orders.length,
    pending: orders.filter((order) => order.status === "pending").length,
    delivered: orders.filter((order) => order.status === "delivered").length,
  };
}, [orders]);

  useEffect(() => {
    if (!orders) {
      dispatch(fetchOrders());
    }
  }, [dispatch]);


  return (
    <div className="dashboard-main-body">
      <div className="row gy-4">
        <div className="col-xxl-12">
          <div className="card radius-8 border-0">
            <div className="row gy-4">
              <div className="col-xxl-3 col-sm-6">
                <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
                  <div className="card-body p-0">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                      <div className="d-flex align-items-center gap-2">
                        <span className="mb-0 w-48-px h-48-px bg-primary-600 flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0">
                          <iconify-icon
                            icon="mingcute:user-follow-fill"
                            className="icon"
                          />
                        </span>
                        <div>
                          <span className="mb-2 fw-medium text-secondary-light text-sm">
                            Users
                          </span>
                          <h6 className="fw-semibold">{orderMetrics.total}</h6>
                        </div>
                      </div>
                      <div
                        id="new-user-chart"
                        className="remove-tooltip-title rounded-tooltip-value"
                        style={{ minHeight: 42 }}
                      >
                        <div
                          id="apexcharts9fto3iubk"
                          className="apexcharts-canvas apexcharts9fto3iubk apexcharts-theme-light"
                          style={{ width: 100, height: 42 }}
                        >
                          <svg
                            id="SvgjsSvg5451"
                            width={100}
                            height={42}
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xmlns:svgjs="http://svgjs.dev"
                            className="apexcharts-svg"
                            xmlns:data="ApexChartsNS"
                            transform="translate(0, 0)"
                            style={{ background: "transparent" }}
                          >
                            <foreignObject x={0} y={0} width={100} height={42}>
                              <div
                                className="apexcharts-legend"
                                xmlns="http://www.w3.org/1999/xhtml"
                                style={{ maxHeight: 21 }}
                              />
                            </foreignObject>
                            <rect
                              id="SvgjsRect5456"
                              width={0}
                              height={0}
                              x={0}
                              y={0}
                              rx={0}
                              ry={0}
                              opacity={1}
                              strokeWidth={0}
                              stroke="none"
                              strokeDasharray={0}
                              fill="#fefefe"
                            />
                            <g
                              id="SvgjsG5489"
                              className="apexcharts-yaxis"
                              rel={0}
                              transform="translate(-18, 0)"
                            />
                            <g
                              id="SvgjsG5453"
                              className="apexcharts-inner apexcharts-graphical"
                              transform="translate(0, -3)"
                            >
                              <defs id="SvgjsDefs5452">
                                <clipPath id="gridRectMask9fto3iubk">
                                  <rect
                                    id="SvgjsRect5458"
                                    width={106}
                                    height={47}
                                    x={-3}
                                    y={-1}
                                    rx={0}
                                    ry={0}
                                    opacity={1}
                                    strokeWidth={0}
                                    stroke="none"
                                    strokeDasharray={0}
                                    fill="#fff"
                                  />
                                </clipPath>
                                <clipPath id="forecastMask9fto3iubk" />
                                <clipPath id="nonForecastMask9fto3iubk" />
                                <clipPath id="gridRectMarkerMask9fto3iubk">
                                  <rect
                                    id="SvgjsRect5459"
                                    width={104}
                                    height={49}
                                    x={-2}
                                    y={-2}
                                    rx={0}
                                    ry={0}
                                    opacity={1}
                                    strokeWidth={0}
                                    stroke="none"
                                    strokeDasharray={0}
                                    fill="#fff"
                                  />
                                </clipPath>
                                <linearGradient
                                  id="SvgjsLinearGradient5464"
                                  x1={0}
                                  y1={0}
                                  x2={0}
                                  y2={1}
                                >
                                  <stop
                                    id="SvgjsStop5465"
                                    stopOpacity="0.75"
                                    stopColor="rgba(72,127,255,0.75)"
                                    offset={0}
                                  />
                                  <stop
                                    id="SvgjsStop5466"
                                    stopOpacity="0.3"
                                    stopColor="#487fff00"
                                    offset={1}
                                  />
                                  <stop
                                    id="SvgjsStop5467"
                                    stopOpacity="0.3"
                                    stopColor="#487fff00"
                                    offset={1}
                                  />
                                </linearGradient>
                              </defs>
                              <line
                                id="SvgjsLine5457"
                                x1={0}
                                y1={0}
                                x2={0}
                                y2={45}
                                stroke="#b6b6b6"
                                strokeDasharray={3}
                                strokeLinecap="butt"
                                className="apexcharts-xcrosshairs"
                                x={0}
                                y={0}
                                width={1}
                                height={45}
                                fill="#b1b9c4"
                                filter="none"
                                fillOpacity="0.9"
                                strokeWidth={1}
                              />
                              <g id="SvgjsG5470" className="apexcharts-grid">
                                <g
                                  id="SvgjsG5471"
                                  className="apexcharts-gridlines-horizontal"
                                />
                                <g
                                  id="SvgjsG5472"
                                  className="apexcharts-gridlines-vertical"
                                />
                                <line
                                  id="SvgjsLine5475"
                                  x1={0}
                                  y1={45}
                                  x2={100}
                                  y2={45}
                                  stroke="transparent"
                                  strokeDasharray={0}
                                  strokeLinecap="butt"
                                />
                                <line
                                  id="SvgjsLine5474"
                                  x1={0}
                                  y1={1}
                                  x2={0}
                                  y2={45}
                                  stroke="transparent"
                                  strokeDasharray={0}
                                  strokeLinecap="butt"
                                />
                              </g>
                              <g
                                id="SvgjsG5460"
                                className="apexcharts-area-series apexcharts-plot-series"
                              >
                                <g
                                  id="SvgjsG5461"
                                  className="apexcharts-series"
                                  seriesname="series1"
                                  data:longestseries="true"
                                  rel={1}
                                  data:realindex={0}
                                >
                                  <path
                                    id="SvgjsPath5468"
                                    d="M 0 45 L 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30C 100 30 100 30 100 45M 100 30z"
                                    fill="url(#SvgjsLinearGradient5464)"
                                    fillOpacity={1}
                                    strokeOpacity={1}
                                    strokeLinecap="round"
                                    strokeWidth={0}
                                    strokeDasharray={0}
                                    className="apexcharts-area"
                                    index={0}
                                    clipPath="url(#gridRectMask9fto3iubk)"
                                    pathto="M 0 45 L 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30C 100 30 100 30 100 45M 100 30z"
                                    pathfrom="M -1 90 L -1 90 L 12.5 90 L 25 90 L 37.5 90 L 50 90 L 62.5 90 L 75 90 L 87.5 90 L 100 90"
                                  />
                                  <path
                                    id="SvgjsPath5469"
                                    d="M 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30"
                                    fill="none"
                                    fillOpacity={1}
                                    stroke="#487fff"
                                    strokeOpacity={1}
                                    strokeLinecap="round"
                                    strokeWidth={2}
                                    strokeDasharray={0}
                                    className="apexcharts-area"
                                    index={0}
                                    clipPath="url(#gridRectMask9fto3iubk)"
                                    pathto="M 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30"
                                    pathfrom="M -1 90 L -1 90 L 12.5 90 L 25 90 L 37.5 90 L 50 90 L 62.5 90 L 75 90 L 87.5 90 L 100 90"
                                    fillRule="evenodd"
                                  />
                                  <g
                                    id="SvgjsG5462"
                                    className="apexcharts-series-markers-wrap apexcharts-hidden-element-shown"
                                    data:realindex={0}
                                  >
                                    <g className="apexcharts-series-markers">
                                      <circle
                                        id="SvgjsCircle5493"
                                        r={0}
                                        cx={0}
                                        cy={0}
                                        className="apexcharts-marker wfx8ifqra no-pointer-events"
                                        stroke="#ffffff"
                                        fill="#487fff"
                                        fillOpacity={1}
                                        strokeWidth={2}
                                        strokeOpacity="0.9"
                                        default-marker-size={0}
                                      />
                                    </g>
                                  </g>
                                </g>
                                <g
                                  id="SvgjsG5463"
                                  className="apexcharts-datalabels"
                                  data:realindex={0}
                                />
                              </g>
                              <g
                                id="SvgjsG5473"
                                className="apexcharts-grid-borders"
                              />
                              <line
                                id="SvgjsLine5476"
                                x1={0}
                                y1={0}
                                x2={100}
                                y2={0}
                                stroke="#b6b6b6"
                                strokeDasharray={0}
                                strokeWidth={1}
                                strokeLinecap="butt"
                                className="apexcharts-ycrosshairs"
                              />
                              <line
                                id="SvgjsLine5477"
                                x1={0}
                                y1={0}
                                x2={100}
                                y2={0}
                                strokeDasharray={0}
                                strokeWidth={0}
                                strokeLinecap="butt"
                                className="apexcharts-ycrosshairs-hidden"
                              />
                              <g
                                id="SvgjsG5478"
                                className="apexcharts-xaxis"
                                transform="translate(0, 0)"
                              >
                                <g
                                  id="SvgjsG5479"
                                  className="apexcharts-xaxis-texts-g"
                                  transform="translate(0, 4)"
                                />
                              </g>
                              <g
                                id="SvgjsG5490"
                                className="apexcharts-yaxis-annotations"
                              />
                              <g
                                id="SvgjsG5491"
                                className="apexcharts-xaxis-annotations"
                              />
                              <g
                                id="SvgjsG5492"
                                className="apexcharts-point-annotations"
                              />
                            </g>
                          </svg>
                          <div className="apexcharts-tooltip apexcharts-theme-light">
                            <div
                              className="apexcharts-tooltip-title"
                              style={{
                                fontFamily: "Helvetica, Arial, sans-serif",
                                fontSize: 12,
                              }}
                            />
                            <div
                              className="apexcharts-tooltip-series-group"
                              style={{ order: 1 }}
                            >
                              <span
                                className="apexcharts-tooltip-marker"
                                style={{ backgroundColor: "rgb(0, 143, 251)" }}
                              />
                              <div
                                className="apexcharts-tooltip-text"
                                style={{
                                  fontFamily: "Helvetica, Arial, sans-serif",
                                  fontSize: 12,
                                }}
                              >
                                <div className="apexcharts-tooltip-y-group">
                                  <span className="apexcharts-tooltip-text-y-label" />
                                  <span className="apexcharts-tooltip-text-y-value" />
                                </div>
                                <div className="apexcharts-tooltip-goals-group">
                                  <span className="apexcharts-tooltip-text-goals-label" />
                                  <span className="apexcharts-tooltip-text-goals-value" />
                                </div>
                                <div className="apexcharts-tooltip-z-group">
                                  <span className="apexcharts-tooltip-text-z-label" />
                                  <span className="apexcharts-tooltip-text-z-value" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                            <div className="apexcharts-yaxistooltip-text" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-3">
                  <div className="card-body p-0">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                      <div className="d-flex align-items-center gap-2">
                        <span className="mb-0 w-48-px h-48-px bg-purple text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                          <iconify-icon
                            icon="mdi:message-text"
                            className="icon"
                          />
                        </span>
                        <div>
                          <span className="mb-2 fw-medium text-secondary-light text-sm">
                            Ordered Products
                          </span>
                          <h6 className="fw-semibold">{orderMetrics.total}</h6>
                        </div>
                      </div>
                      <div
                        id="conversion-user-chart"
                        className="remove-tooltip-title rounded-tooltip-value"
                        style={{ minHeight: 42 }}
                      >
                        <div
                          id="apexchartstw6q23dv"
                          className="apexcharts-canvas apexchartstw6q23dv apexcharts-theme-light"
                          style={{ width: 100, height: 42 }}
                        >
                          <svg
                            id="SvgjsSvg5583"
                            width={100}
                            height={42}
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xmlns:svgjs="http://svgjs.dev"
                            className="apexcharts-svg"
                            xmlns:data="ApexChartsNS"
                            transform="translate(0, 0)"
                            style={{ background: "transparent" }}
                          >
                            <foreignObject x={0} y={0} width={100} height={42}>
                              <div
                                className="apexcharts-legend"
                                xmlns="http://www.w3.org/1999/xhtml"
                                style={{ maxHeight: 21 }}
                              />
                            </foreignObject>
                            <rect
                              id="SvgjsRect5588"
                              width={0}
                              height={0}
                              x={0}
                              y={0}
                              rx={0}
                              ry={0}
                              opacity={1}
                              strokeWidth={0}
                              stroke="none"
                              strokeDasharray={0}
                              fill="#fefefe"
                            />
                            <g
                              id="SvgjsG5621"
                              className="apexcharts-yaxis"
                              rel={0}
                              transform="translate(-18, 0)"
                            />
                            <g
                              id="SvgjsG5585"
                              className="apexcharts-inner apexcharts-graphical"
                              transform="translate(0, -3)"
                            >
                              <defs id="SvgjsDefs5584">
                                <clipPath id="gridRectMasktw6q23dv">
                                  <rect
                                    id="SvgjsRect5590"
                                    width={106}
                                    height={47}
                                    x={-3}
                                    y={-1}
                                    rx={0}
                                    ry={0}
                                    opacity={1}
                                    strokeWidth={0}
                                    stroke="none"
                                    strokeDasharray={0}
                                    fill="#fff"
                                  />
                                </clipPath>
                                <clipPath id="forecastMasktw6q23dv" />
                                <clipPath id="nonForecastMasktw6q23dv" />
                                <clipPath id="gridRectMarkerMasktw6q23dv">
                                  <rect
                                    id="SvgjsRect5591"
                                    width={104}
                                    height={49}
                                    x={-2}
                                    y={-2}
                                    rx={0}
                                    ry={0}
                                    opacity={1}
                                    strokeWidth={0}
                                    stroke="none"
                                    strokeDasharray={0}
                                    fill="#fff"
                                  />
                                </clipPath>
                                <linearGradient
                                  id="SvgjsLinearGradient5596"
                                  x1={0}
                                  y1={0}
                                  x2={0}
                                  y2={1}
                                >
                                  <stop
                                    id="SvgjsStop5597"
                                    stopOpacity="0.75"
                                    stopColor="rgba(130,82,233,0.75)"
                                    offset={0}
                                  />
                                  <stop
                                    id="SvgjsStop5598"
                                    stopOpacity="0.3"
                                    stopColor="#8252e900"
                                    offset={1}
                                  />
                                  <stop
                                    id="SvgjsStop5599"
                                    stopOpacity="0.3"
                                    stopColor="#8252e900"
                                    offset={1}
                                  />
                                </linearGradient>
                              </defs>
                              <line
                                id="SvgjsLine5589"
                                x1={0}
                                y1={0}
                                x2={0}
                                y2={45}
                                stroke="#b6b6b6"
                                strokeDasharray={3}
                                strokeLinecap="butt"
                                className="apexcharts-xcrosshairs"
                                x={0}
                                y={0}
                                width={1}
                                height={45}
                                fill="#b1b9c4"
                                filter="none"
                                fillOpacity="0.9"
                                strokeWidth={1}
                              />
                              <g id="SvgjsG5602" className="apexcharts-grid">
                                <g
                                  id="SvgjsG5603"
                                  className="apexcharts-gridlines-horizontal"
                                />
                                <g
                                  id="SvgjsG5604"
                                  className="apexcharts-gridlines-vertical"
                                />
                                <line
                                  id="SvgjsLine5607"
                                  x1={0}
                                  y1={45}
                                  x2={100}
                                  y2={45}
                                  stroke="transparent"
                                  strokeDasharray={0}
                                  strokeLinecap="butt"
                                />
                                <line
                                  id="SvgjsLine5606"
                                  x1={0}
                                  y1={1}
                                  x2={0}
                                  y2={45}
                                  stroke="transparent"
                                  strokeDasharray={0}
                                  strokeLinecap="butt"
                                />
                              </g>
                              <g
                                id="SvgjsG5592"
                                className="apexcharts-area-series apexcharts-plot-series"
                              >
                                <g
                                  id="SvgjsG5593"
                                  className="apexcharts-series"
                                  seriesname="series1"
                                  data:longestseries="true"
                                  rel={1}
                                  data:realindex={0}
                                >
                                  <path
                                    id="SvgjsPath5600"
                                    d="M 0 45 L 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30C 100 30 100 30 100 45M 100 30z"
                                    fill="url(#SvgjsLinearGradient5596)"
                                    fillOpacity={1}
                                    strokeOpacity={1}
                                    strokeLinecap="round"
                                    strokeWidth={0}
                                    strokeDasharray={0}
                                    className="apexcharts-area"
                                    index={0}
                                    clipPath="url(#gridRectMasktw6q23dv)"
                                    pathto="M 0 45 L 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30C 100 30 100 30 100 45M 100 30z"
                                    pathfrom="M -1 90 L -1 90 L 12.5 90 L 25 90 L 37.5 90 L 50 90 L 62.5 90 L 75 90 L 87.5 90 L 100 90"
                                  />
                                  <path
                                    id="SvgjsPath5601"
                                    d="M 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30"
                                    fill="none"
                                    fillOpacity={1}
                                    stroke="#8252e9"
                                    strokeOpacity={1}
                                    strokeLinecap="round"
                                    strokeWidth={2}
                                    strokeDasharray={0}
                                    className="apexcharts-area"
                                    index={0}
                                    clipPath="url(#gridRectMasktw6q23dv)"
                                    pathto="M 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30"
                                    pathfrom="M -1 90 L -1 90 L 12.5 90 L 25 90 L 37.5 90 L 50 90 L 62.5 90 L 75 90 L 87.5 90 L 100 90"
                                    fillRule="evenodd"
                                  />
                                  <g
                                    id="SvgjsG5594"
                                    className="apexcharts-series-markers-wrap apexcharts-hidden-element-shown"
                                    data:realindex={0}
                                  >
                                    <g className="apexcharts-series-markers">
                                      <circle
                                        id="SvgjsCircle5625"
                                        r={0}
                                        cx={0}
                                        cy={0}
                                        className="apexcharts-marker wg3dgywmm no-pointer-events"
                                        stroke="#ffffff"
                                        fill="#8252e9"
                                        fillOpacity={1}
                                        strokeWidth={2}
                                        strokeOpacity="0.9"
                                        default-marker-size={0}
                                      />
                                    </g>
                                  </g>
                                </g>
                                <g
                                  id="SvgjsG5595"
                                  className="apexcharts-datalabels"
                                  data:realindex={0}
                                />
                              </g>
                              <g
                                id="SvgjsG5605"
                                className="apexcharts-grid-borders"
                              />
                              <line
                                id="SvgjsLine5608"
                                x1={0}
                                y1={0}
                                x2={100}
                                y2={0}
                                stroke="#b6b6b6"
                                strokeDasharray={0}
                                strokeWidth={1}
                                strokeLinecap="butt"
                                className="apexcharts-ycrosshairs"
                              />
                              <line
                                id="SvgjsLine5609"
                                x1={0}
                                y1={0}
                                x2={100}
                                y2={0}
                                strokeDasharray={0}
                                strokeWidth={0}
                                strokeLinecap="butt"
                                className="apexcharts-ycrosshairs-hidden"
                              />
                              <g
                                id="SvgjsG5610"
                                className="apexcharts-xaxis"
                                transform="translate(0, 0)"
                              >
                                <g
                                  id="SvgjsG5611"
                                  className="apexcharts-xaxis-texts-g"
                                  transform="translate(0, 4)"
                                />
                              </g>
                              <g
                                id="SvgjsG5622"
                                className="apexcharts-yaxis-annotations"
                              />
                              <g
                                id="SvgjsG5623"
                                className="apexcharts-xaxis-annotations"
                              />
                              <g
                                id="SvgjsG5624"
                                className="apexcharts-point-annotations"
                              />
                            </g>
                          </svg>
                          <div className="apexcharts-tooltip apexcharts-theme-light">
                            <div
                              className="apexcharts-tooltip-title"
                              style={{
                                fontFamily: "Helvetica, Arial, sans-serif",
                                fontSize: 12,
                              }}
                            />
                            <div
                              className="apexcharts-tooltip-series-group"
                              style={{ order: 1 }}
                            >
                              <span
                                className="apexcharts-tooltip-marker"
                                style={{ backgroundColor: "rgb(0, 143, 251)" }}
                              />
                              <div
                                className="apexcharts-tooltip-text"
                                style={{
                                  fontFamily: "Helvetica, Arial, sans-serif",
                                  fontSize: 12,
                                }}
                              >
                                <div className="apexcharts-tooltip-y-group">
                                  <span className="apexcharts-tooltip-text-y-label" />
                                  <span className="apexcharts-tooltip-text-y-value" />
                                </div>
                                <div className="apexcharts-tooltip-goals-group">
                                  <span className="apexcharts-tooltip-text-goals-label" />
                                  <span className="apexcharts-tooltip-text-goals-value" />
                                </div>
                                <div className="apexcharts-tooltip-z-group">
                                  <span className="apexcharts-tooltip-text-z-label" />
                                  <span className="apexcharts-tooltip-text-z-value" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                            <div className="apexcharts-yaxistooltip-text" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-2">
                  <div className="card-body p-0">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                      <div className="d-flex align-items-center gap-2">
                        <span className="mb-0 w-48-px h-48-px bg-success-main flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6">
                          <iconify-icon
                            icon="mingcute:user-follow-fill"
                            className="icon"
                          />
                        </span>
                        <div>
                          <span className="mb-2 fw-medium text-secondary-light text-sm">
                            Delivered Products
                          </span>
                          <h6 className="fw-semibold">
                            {orderMetrics.delivered}
                          </h6>
                        </div>
                      </div>
                      <div
                        id="active-user-chart"
                        className="remove-tooltip-title rounded-tooltip-value"
                        style={{ minHeight: 42 }}
                      >
                        <div
                          id="apexcharts745f11yz"
                          className="apexcharts-canvas apexcharts745f11yz apexcharts-theme-light"
                          style={{ width: 100, height: 42 }}
                        >
                          <svg
                            id="SvgjsSvg5495"
                            width={100}
                            height={42}
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xmlns:svgjs="http://svgjs.dev"
                            className="apexcharts-svg"
                            xmlns:data="ApexChartsNS"
                            transform="translate(0, 0)"
                            style={{ background: "transparent" }}
                          >
                            <foreignObject x={0} y={0} width={100} height={42}>
                              <div
                                className="apexcharts-legend"
                                xmlns="http://www.w3.org/1999/xhtml"
                                style={{ maxHeight: 21 }}
                              />
                            </foreignObject>
                            <rect
                              id="SvgjsRect5500"
                              width={0}
                              height={0}
                              x={0}
                              y={0}
                              rx={0}
                              ry={0}
                              opacity={1}
                              strokeWidth={0}
                              stroke="none"
                              strokeDasharray={0}
                              fill="#fefefe"
                            />
                            <g
                              id="SvgjsG5533"
                              className="apexcharts-yaxis"
                              rel={0}
                              transform="translate(-18, 0)"
                            />
                            <g
                              id="SvgjsG5497"
                              className="apexcharts-inner apexcharts-graphical"
                              transform="translate(0, -3)"
                            >
                              <defs id="SvgjsDefs5496">
                                <clipPath id="gridRectMask745f11yz">
                                  <rect
                                    id="SvgjsRect5502"
                                    width={106}
                                    height={47}
                                    x={-3}
                                    y={-1}
                                    rx={0}
                                    ry={0}
                                    opacity={1}
                                    strokeWidth={0}
                                    stroke="none"
                                    strokeDasharray={0}
                                    fill="#fff"
                                  />
                                </clipPath>
                                <clipPath id="forecastMask745f11yz" />
                                <clipPath id="nonForecastMask745f11yz" />
                                <clipPath id="gridRectMarkerMask745f11yz">
                                  <rect
                                    id="SvgjsRect5503"
                                    width={104}
                                    height={49}
                                    x={-2}
                                    y={-2}
                                    rx={0}
                                    ry={0}
                                    opacity={1}
                                    strokeWidth={0}
                                    stroke="none"
                                    strokeDasharray={0}
                                    fill="#fff"
                                  />
                                </clipPath>
                                <linearGradient
                                  id="SvgjsLinearGradient5508"
                                  x1={0}
                                  y1={0}
                                  x2={0}
                                  y2={1}
                                >
                                  <stop
                                    id="SvgjsStop5509"
                                    stopOpacity="0.75"
                                    stopColor="rgba(69,179,105,0.75)"
                                    offset={0}
                                  />
                                  <stop
                                    id="SvgjsStop5510"
                                    stopOpacity="0.3"
                                    stopColor="#45b36900"
                                    offset={1}
                                  />
                                  <stop
                                    id="SvgjsStop5511"
                                    stopOpacity="0.3"
                                    stopColor="#45b36900"
                                    offset={1}
                                  />
                                </linearGradient>
                              </defs>
                              <line
                                id="SvgjsLine5501"
                                x1={0}
                                y1={0}
                                x2={0}
                                y2={45}
                                stroke="#b6b6b6"
                                strokeDasharray={3}
                                strokeLinecap="butt"
                                className="apexcharts-xcrosshairs"
                                x={0}
                                y={0}
                                width={1}
                                height={45}
                                fill="#b1b9c4"
                                filter="none"
                                fillOpacity="0.9"
                                strokeWidth={1}
                              />
                              <g id="SvgjsG5514" className="apexcharts-grid">
                                <g
                                  id="SvgjsG5515"
                                  className="apexcharts-gridlines-horizontal"
                                />
                                <g
                                  id="SvgjsG5516"
                                  className="apexcharts-gridlines-vertical"
                                />
                                <line
                                  id="SvgjsLine5519"
                                  x1={0}
                                  y1={45}
                                  x2={100}
                                  y2={45}
                                  stroke="transparent"
                                  strokeDasharray={0}
                                  strokeLinecap="butt"
                                />
                                <line
                                  id="SvgjsLine5518"
                                  x1={0}
                                  y1={1}
                                  x2={0}
                                  y2={45}
                                  stroke="transparent"
                                  strokeDasharray={0}
                                  strokeLinecap="butt"
                                />
                              </g>
                              <g
                                id="SvgjsG5504"
                                className="apexcharts-area-series apexcharts-plot-series"
                              >
                                <g
                                  id="SvgjsG5505"
                                  className="apexcharts-series"
                                  seriesname="series1"
                                  data:longestseries="true"
                                  rel={1}
                                  data:realindex={0}
                                >
                                  <path
                                    id="SvgjsPath5512"
                                    d="M 0 45 L 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30C 100 30 100 30 100 45M 100 30z"
                                    fill="url(#SvgjsLinearGradient5508)"
                                    fillOpacity={1}
                                    strokeOpacity={1}
                                    strokeLinecap="round"
                                    strokeWidth={0}
                                    strokeDasharray={0}
                                    className="apexcharts-area"
                                    index={0}
                                    clipPath="url(#gridRectMask745f11yz)"
                                    pathto="M 0 45 L 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30C 100 30 100 30 100 45M 100 30z"
                                    pathfrom="M -1 90 L -1 90 L 12.5 90 L 25 90 L 37.5 90 L 50 90 L 62.5 90 L 75 90 L 87.5 90 L 100 90"
                                  />
                                  <path
                                    id="SvgjsPath5513"
                                    d="M 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30"
                                    fill="none"
                                    fillOpacity={1}
                                    stroke="#45b369"
                                    strokeOpacity={1}
                                    strokeLinecap="round"
                                    strokeWidth={2}
                                    strokeDasharray={0}
                                    className="apexcharts-area"
                                    index={0}
                                    clipPath="url(#gridRectMask745f11yz)"
                                    pathto="M 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30"
                                    pathfrom="M -1 90 L -1 90 L 12.5 90 L 25 90 L 37.5 90 L 50 90 L 62.5 90 L 75 90 L 87.5 90 L 100 90"
                                    fillRule="evenodd"
                                  />
                                  <g
                                    id="SvgjsG5506"
                                    className="apexcharts-series-markers-wrap apexcharts-hidden-element-shown"
                                    data:realindex={0}
                                  >
                                    <g className="apexcharts-series-markers">
                                      <circle
                                        id="SvgjsCircle5537"
                                        r={0}
                                        cx={0}
                                        cy={0}
                                        className="apexcharts-marker ww9iz8cgx no-pointer-events"
                                        stroke="#ffffff"
                                        fill="#45b369"
                                        fillOpacity={1}
                                        strokeWidth={2}
                                        strokeOpacity="0.9"
                                        default-marker-size={0}
                                      />
                                    </g>
                                  </g>
                                </g>
                                <g
                                  id="SvgjsG5507"
                                  className="apexcharts-datalabels"
                                  data:realindex={0}
                                />
                              </g>
                              <g
                                id="SvgjsG5517"
                                className="apexcharts-grid-borders"
                              />
                              <line
                                id="SvgjsLine5520"
                                x1={0}
                                y1={0}
                                x2={100}
                                y2={0}
                                stroke="#b6b6b6"
                                strokeDasharray={0}
                                strokeWidth={1}
                                strokeLinecap="butt"
                                className="apexcharts-ycrosshairs"
                              />
                              <line
                                id="SvgjsLine5521"
                                x1={0}
                                y1={0}
                                x2={100}
                                y2={0}
                                strokeDasharray={0}
                                strokeWidth={0}
                                strokeLinecap="butt"
                                className="apexcharts-ycrosshairs-hidden"
                              />
                              <g
                                id="SvgjsG5522"
                                className="apexcharts-xaxis"
                                transform="translate(0, 0)"
                              >
                                <g
                                  id="SvgjsG5523"
                                  className="apexcharts-xaxis-texts-g"
                                  transform="translate(0, 4)"
                                />
                              </g>
                              <g
                                id="SvgjsG5534"
                                className="apexcharts-yaxis-annotations"
                              />
                              <g
                                id="SvgjsG5535"
                                className="apexcharts-xaxis-annotations"
                              />
                              <g
                                id="SvgjsG5536"
                                className="apexcharts-point-annotations"
                              />
                            </g>
                          </svg>
                          <div className="apexcharts-tooltip apexcharts-theme-light">
                            <div
                              className="apexcharts-tooltip-title"
                              style={{
                                fontFamily: "Helvetica, Arial, sans-serif",
                                fontSize: 12,
                              }}
                            />
                            <div
                              className="apexcharts-tooltip-series-group"
                              style={{ order: 1 }}
                            >
                              <span
                                className="apexcharts-tooltip-marker"
                                style={{ backgroundColor: "rgb(0, 143, 251)" }}
                              />
                              <div
                                className="apexcharts-tooltip-text"
                                style={{
                                  fontFamily: "Helvetica, Arial, sans-serif",
                                  fontSize: 12,
                                }}
                              >
                                <div className="apexcharts-tooltip-y-group">
                                  <span className="apexcharts-tooltip-text-y-label" />
                                  <span className="apexcharts-tooltip-text-y-value" />
                                </div>
                                <div className="apexcharts-tooltip-goals-group">
                                  <span className="apexcharts-tooltip-text-goals-label" />
                                  <span className="apexcharts-tooltip-text-goals-value" />
                                </div>
                                <div className="apexcharts-tooltip-z-group">
                                  <span className="apexcharts-tooltip-text-z-label" />
                                  <span className="apexcharts-tooltip-text-z-value" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                            <div className="apexcharts-yaxistooltip-text" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-3">
                  <div className="card-body p-0">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                      <div className="d-flex align-items-center gap-2">
                        <span className="mb-0 w-48-px h-48-px bg-yellow text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                          <iconify-icon
                            icon="iconamoon:discount-fill"
                            className="icon"
                          />
                        </span>
                        <div>
                          <span className="mb-2 fw-medium text-secondary-light text-sm">
                            Pending Products
                          </span>
                          <h6 className="fw-semibold">
                            {orderMetrics.pending}
                          </h6>
                        </div>
                      </div>
                      <div
                        id="total-sales-chart"
                        className="remove-tooltip-title rounded-tooltip-value"
                        style={{ minHeight: 42 }}
                      >
                        <div
                          id="apexchartslwm6lwr7"
                          className="apexcharts-canvas apexchartslwm6lwr7 apexcharts-theme-light"
                          style={{ width: 100, height: 42 }}
                        >
                          <svg
                            id="SvgjsSvg5539"
                            width={100}
                            height={42}
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xmlns:svgjs="http://svgjs.dev"
                            className="apexcharts-svg"
                            xmlns:data="ApexChartsNS"
                            transform="translate(0, 0)"
                            style={{ background: "transparent" }}
                          >
                            <foreignObject x={0} y={0} width={100} height={42}>
                              <div
                                className="apexcharts-legend"
                                xmlns="http://www.w3.org/1999/xhtml"
                                style={{ maxHeight: 21 }}
                              />
                            </foreignObject>
                            <rect
                              id="SvgjsRect5544"
                              width={0}
                              height={0}
                              x={0}
                              y={0}
                              rx={0}
                              ry={0}
                              opacity={1}
                              strokeWidth={0}
                              stroke="none"
                              strokeDasharray={0}
                              fill="#fefefe"
                            />
                            <g
                              id="SvgjsG5577"
                              className="apexcharts-yaxis"
                              rel={0}
                              transform="translate(-18, 0)"
                            />
                            <g
                              id="SvgjsG5541"
                              className="apexcharts-inner apexcharts-graphical"
                              transform="translate(0, -3)"
                            >
                              <defs id="SvgjsDefs5540">
                                <clipPath id="gridRectMasklwm6lwr7">
                                  <rect
                                    id="SvgjsRect5546"
                                    width={106}
                                    height={47}
                                    x={-3}
                                    y={-1}
                                    rx={0}
                                    ry={0}
                                    opacity={1}
                                    strokeWidth={0}
                                    stroke="none"
                                    strokeDasharray={0}
                                    fill="#fff"
                                  />
                                </clipPath>
                                <clipPath id="forecastMasklwm6lwr7" />
                                <clipPath id="nonForecastMasklwm6lwr7" />
                                <clipPath id="gridRectMarkerMasklwm6lwr7">
                                  <rect
                                    id="SvgjsRect5547"
                                    width={104}
                                    height={49}
                                    x={-2}
                                    y={-2}
                                    rx={0}
                                    ry={0}
                                    opacity={1}
                                    strokeWidth={0}
                                    stroke="none"
                                    strokeDasharray={0}
                                    fill="#fff"
                                  />
                                </clipPath>
                                <linearGradient
                                  id="SvgjsLinearGradient5552"
                                  x1={0}
                                  y1={0}
                                  x2={0}
                                  y2={1}
                                >
                                  <stop
                                    id="SvgjsStop5553"
                                    stopOpacity="0.75"
                                    stopColor="rgba(244,148,30,0.75)"
                                    offset={0}
                                  />
                                  <stop
                                    id="SvgjsStop5554"
                                    stopOpacity="0.3"
                                    stopColor="#f4941e00"
                                    offset={1}
                                  />
                                  <stop
                                    id="SvgjsStop5555"
                                    stopOpacity="0.3"
                                    stopColor="#f4941e00"
                                    offset={1}
                                  />
                                </linearGradient>
                              </defs>
                              <line
                                id="SvgjsLine5545"
                                x1={0}
                                y1={0}
                                x2={0}
                                y2={45}
                                stroke="#b6b6b6"
                                strokeDasharray={3}
                                strokeLinecap="butt"
                                className="apexcharts-xcrosshairs"
                                x={0}
                                y={0}
                                width={1}
                                height={45}
                                fill="#b1b9c4"
                                filter="none"
                                fillOpacity="0.9"
                                strokeWidth={1}
                              />
                              <g id="SvgjsG5558" className="apexcharts-grid">
                                <g
                                  id="SvgjsG5559"
                                  className="apexcharts-gridlines-horizontal"
                                />
                                <g
                                  id="SvgjsG5560"
                                  className="apexcharts-gridlines-vertical"
                                />
                                <line
                                  id="SvgjsLine5563"
                                  x1={0}
                                  y1={45}
                                  x2={100}
                                  y2={45}
                                  stroke="transparent"
                                  strokeDasharray={0}
                                  strokeLinecap="butt"
                                />
                                <line
                                  id="SvgjsLine5562"
                                  x1={0}
                                  y1={1}
                                  x2={0}
                                  y2={45}
                                  stroke="transparent"
                                  strokeDasharray={0}
                                  strokeLinecap="butt"
                                />
                              </g>
                              <g
                                id="SvgjsG5548"
                                className="apexcharts-area-series apexcharts-plot-series"
                              >
                                <g
                                  id="SvgjsG5549"
                                  className="apexcharts-series"
                                  seriesname="series1"
                                  data:longestseries="true"
                                  rel={1}
                                  data:realindex={0}
                                >
                                  <path
                                    id="SvgjsPath5556"
                                    d="M 0 45 L 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30C 100 30 100 30 100 45M 100 30z"
                                    fill="url(#SvgjsLinearGradient5552)"
                                    fillOpacity={1}
                                    strokeOpacity={1}
                                    strokeLinecap="round"
                                    strokeWidth={0}
                                    strokeDasharray={0}
                                    className="apexcharts-area"
                                    index={0}
                                    clipPath="url(#gridRectMasklwm6lwr7)"
                                    pathto="M 0 45 L 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30C 100 30 100 30 100 45M 100 30z"
                                    pathfrom="M -1 90 L -1 90 L 12.5 90 L 25 90 L 37.5 90 L 50 90 L 62.5 90 L 75 90 L 87.5 90 L 100 90"
                                  />
                                  <path
                                    id="SvgjsPath5557"
                                    d="M 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30"
                                    fill="none"
                                    fillOpacity={1}
                                    stroke="#f4941e"
                                    strokeOpacity={1}
                                    strokeLinecap="round"
                                    strokeWidth={2}
                                    strokeDasharray={0}
                                    className="apexcharts-area"
                                    index={0}
                                    clipPath="url(#gridRectMasklwm6lwr7)"
                                    pathto="M 0 37.5C 4.375 37.5 8.125 22.5 12.5 22.5C 16.875 22.5 20.625 33 25 33C 29.375 33 33.125 28.5 37.5 28.5C 41.875 28.5 45.625 36 50 36C 54.375 36 58.125 25.5 62.5 25.5C 66.875 25.5 70.625 34.5 75 34.5C 79.375 34.5 83.125 7.5 87.5 7.5C 91.875 7.5 95.625 30 100 30"
                                    pathfrom="M -1 90 L -1 90 L 12.5 90 L 25 90 L 37.5 90 L 50 90 L 62.5 90 L 75 90 L 87.5 90 L 100 90"
                                    fillRule="evenodd"
                                  />
                                  <g
                                    id="SvgjsG5550"
                                    className="apexcharts-series-markers-wrap apexcharts-hidden-element-shown"
                                    data:realindex={0}
                                  >
                                    <g className="apexcharts-series-markers">
                                      <circle
                                        id="SvgjsCircle5581"
                                        r={0}
                                        cx={0}
                                        cy={0}
                                        className="apexcharts-marker w6078hxl2 no-pointer-events"
                                        stroke="#ffffff"
                                        fill="#f4941e"
                                        fillOpacity={1}
                                        strokeWidth={2}
                                        strokeOpacity="0.9"
                                        default-marker-size={0}
                                      />
                                    </g>
                                  </g>
                                </g>
                                <g
                                  id="SvgjsG5551"
                                  className="apexcharts-datalabels"
                                  data:realindex={0}
                                />
                              </g>
                              <g
                                id="SvgjsG5561"
                                className="apexcharts-grid-borders"
                              />
                              <line
                                id="SvgjsLine5564"
                                x1={0}
                                y1={0}
                                x2={100}
                                y2={0}
                                stroke="#b6b6b6"
                                strokeDasharray={0}
                                strokeWidth={1}
                                strokeLinecap="butt"
                                className="apexcharts-ycrosshairs"
                              />
                              <line
                                id="SvgjsLine5565"
                                x1={0}
                                y1={0}
                                x2={100}
                                y2={0}
                                strokeDasharray={0}
                                strokeWidth={0}
                                strokeLinecap="butt"
                                className="apexcharts-ycrosshairs-hidden"
                              />
                              <g
                                id="SvgjsG5566"
                                className="apexcharts-xaxis"
                                transform="translate(0, 0)"
                              >
                                <g
                                  id="SvgjsG5567"
                                  className="apexcharts-xaxis-texts-g"
                                  transform="translate(0, 4)"
                                />
                              </g>
                              <g
                                id="SvgjsG5578"
                                className="apexcharts-yaxis-annotations"
                              />
                              <g
                                id="SvgjsG5579"
                                className="apexcharts-xaxis-annotations"
                              />
                              <g
                                id="SvgjsG5580"
                                className="apexcharts-point-annotations"
                              />
                            </g>
                          </svg>
                          <div className="apexcharts-tooltip apexcharts-theme-light">
                            <div
                              className="apexcharts-tooltip-title"
                              style={{
                                fontFamily: "Helvetica, Arial, sans-serif",
                                fontSize: 12,
                              }}
                            />
                            <div
                              className="apexcharts-tooltip-series-group"
                              style={{ order: 1 }}
                            >
                              <span
                                className="apexcharts-tooltip-marker"
                                style={{ backgroundColor: "rgb(0, 143, 251)" }}
                              />
                              <div
                                className="apexcharts-tooltip-text"
                                style={{
                                  fontFamily: "Helvetica, Arial, sans-serif",
                                  fontSize: 12,
                                }}
                              >
                                <div className="apexcharts-tooltip-y-group">
                                  <span className="apexcharts-tooltip-text-y-label" />
                                  <span className="apexcharts-tooltip-text-y-value" />
                                </div>
                                <div className="apexcharts-tooltip-goals-group">
                                  <span className="apexcharts-tooltip-text-goals-label" />
                                  <span className="apexcharts-tooltip-text-goals-value" />
                                </div>
                                <div className="apexcharts-tooltip-z-group">
                                  <span className="apexcharts-tooltip-text-z-label" />
                                  <span className="apexcharts-tooltip-text-z-value" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                            <div className="apexcharts-yaxistooltip-text" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xxl-9 col-lg-12">
          <div className="card h-100">
            <div className="card-body p-24">
              <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20">
                <h6 className="mb-2 fw-bold text-lg mb-0">Recent Orders</h6>
                <a
                  href="/dashboard/orders"
                  className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
                >
                  View All
                  <iconify-icon
                    icon="solar:alt-arrow-right-linear"
                    className="icon"
                  />
                </a>
              </div>
              <div className="table-responsive scroll-sm">
                <table className="table bordered-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Users</th>
                      <th scope="col">Invoice</th>
                      <th scope="col">Email</th>
                      <th scope="col">Address</th>
                      <th scope="col" className="text-center">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <Spinner />
                    ) : (
                      orders && (
                        <>
                          {orders.map((order) => {
                            return (
                              <>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <img
                                        src="/dashboard/assets/images/users/user1.png"
                                        alt=""
                                        className="flex-shrink-0 me-12 radius-8"
                                      />
                                      <span className="text-lg text-secondary-light fw-semibold flex-grow-1">
                                        {order.full_name}
                                      </span>
                                    </div>
                                  </td>
                                  <td>#{order.order_number}</td>
                                  <td>{order.email}</td>
                                  <td>{order.address}</td>
                                  <td className="text-center">
                                    <span
                                      className={`px-24 py-4 rounded-pill fw-medium text-sm ${
                                        order.status === "pending"
                                          ? "bg-danger-focus text-danger-main" // Red for pending
                                          : "bg-success-focus text-success-main" // Green for delivered
                                      }`}
                                    >
                                      {order.status}
                                    </span>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20">
                <h6 className="mb-2 fw-bold text-lg mb-0">Top Customers</h6>
                <a
                  href="/dashboard/orders"
                  className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
                >
                  View All
                  <iconify-icon
                    icon="solar:alt-arrow-right-linear"
                    className="icon"
                  />
                </a>
              </div>
              <div className="mt-32">
                {loading ? (
                  <div className="flex justify-center items-center w-full">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    {Array.isArray(orders) &&
                      orders.map((o) => (
                        <div
                          key={o.id}
                          className="d-flex align-items-center justify-content-between gap-3 mb-32"
                        >
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src="/dashboard/assets/images/users/user6.png"
                              alt=""
                              className="w-40-px h-40-px radius-8 flex-shrink-0"
                            />
                            <div className="flex-grow-1">
                              <h6 className="text-md mb-0 fw-normal">
                                {o.full_name}
                              </h6>
                              <span className="text-sm text-secondary-light fw-normal">
                                {o.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
