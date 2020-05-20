var myChart = echarts.init(document.getElementsByClassName('echarts-container')[0]); 
                    var dataBJ = [
                        [1,55,"良"],
                        [2,25,"优"],
                        [3,56,"良"],
                        [4,33,"优"],
                        [5,42,"优"],
                        [6,82,"良"],
                        [7,74,"良"],
                        [8,78,"良"],
                        [9,267,"重度污染"],
                        [10,185,"中度污染"],
                        [11,39,"优"],
                        [12,41,"优"],
                        [13,64,"良"],
                        [14,108,"轻度污染"],
                        [15,108,"轻度污染"],
                        [16,33,"优"],
                        [17,94,"良"],
                        [18,186,"中度污染"],
                        [19,57,"良"],
                        [20,22,"优"],
                        [21,39,"优"],
                        [22,94,"良"],
                        [23,99,"良"],
                        [24,31,"优"],
                        [25,42,"优"],
                        [26,154,"中度污染"],
                        [27,234,"重度污染"],
                        [28,160,"中度污染"],
                        [29,134,"轻度污染"],
                        [30,52,"良"]
                    ];

                    var dataGZ = [
                        [1,26,"优"],
                        [2,85,"良"],
                        [3,78,"良"],
                        [4,21,"优"],
                        [5,41,"优"],
                        [6,56,"良"],
                        [7,64,"良"],
                        [8,55,"良"],
                        [9,76,"良"],
                        [10,91,"良"],
                        [11,84,"良"],
                        [12,64,"良"],
                        [13,70,"良"],
                        [14,77,"良"],
                        [15,109,"轻度污染"],
                        [16,73,"良"],
                        [17,54,"良"],
                        [18,51,"良"],
                        [19,91,"良"],
                        [20,73,"良"],
                        [21,73,"良"],
                        [22,84,"良"],
                        [23,93,"良"],
                        [24,99,"良"],
                        [25,146,"轻度污染"],
                        [26,113,"轻度污染"],
                        [27,81,"良"],
                        [28,56,"良"],
                        [29,82,"良"],
                        [30,106,"轻度污染"]
                    ];

                    var dataSH = [
                        [1,91,"良"],
                        [2,65,"良"],
                        [3,83,"良"],
                        [4,109,"轻度污染"],
                        [5,106,"轻度污染"],
                        [6,109,"轻度污染"],
                        [7,106,"轻度污染"],
                        [8,89,"良"],
                        [9,53,"良"],
                        [10,80,"良"],
                        [11,117,"轻度污染"],
                        [12,99,"良"],
                        [13,95,"良"],
                        [14,116,"轻度污染"],
                        [15,108,"轻度污染"],
                        [16,134,"轻度污染"],
                        [17,79,"良"],
                        [18,71,"良"],
                        [19,97,"良"],
                        [20,84,"良"],
                        [21,87,"良"],
                        [22,104,"轻度污染"],
                        [23,87,"良"],
                        [24,168,"中度污染"],
                        [25,65,"良"],
                        [26,39,"优"],
                        [27,39,"优"],
                        [28,93,"良"],
                        [29,188,"中度污染"],
                        [30,174,"中度污染"]
                    ];
                    var schema = [
                        {name: 'date', index: 0, text: '日'},
                        {name: 'PM2.5', index: 1, text: 'PM2.5'},
                        {name: 'PM25', index: 2, text: '环境指数'}
                    ];
                    var itemStyle = {
                        normal: {
                            opacity: 0.8,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    };
                    option = {
                        backgroundColor: '#333',
                        color: [
                            '#dd4444', '#fec42c', '#80F1BE'
                        ],
                        legend: {
                            y: 'top',
                            data: ['南京', '上海', '广州'],
                            textStyle: {
                                color: '#fff',
                                fontSize: 16
                            }
                        },
                        grid: {
                            left: '10%',
                            right: 200,
                            top: '15%',
                            bottom: '10%'
                        },
                        tooltip: {
                            padding: 10,
                            backgroundColor: '#222',
                            borderColor: '#777',
                            borderWidth: 1,
                            formatter: function (obj) {
                                var value = obj.value;
                                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                                    + obj.seriesName + ' ' + value[0] + '日：'
                                    + value[2]
                                    + '</div>'
                                    + schema[1].text + '：' + value[1] + '<br>';
                            }
                        },
                        xAxis: {
                            type: 'value',
                            name: '天数',
                            nameGap: 16,
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 14
                            },
                            max: 30,
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#777'
                                }
                            },
                            axisTick: {
                                lineStyle: {
                                    color: '#777'
                                }
                            },
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        yAxis: {
                            type: 'value',
                            name: 'PM2.5值',
                            nameLocation: 'end',
                            nameGap: 20,
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 16
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#777'
                                }
                            },
                            axisTick: {
                                lineStyle: {
                                    color: '#777'
                                }
                            },
                            splitLine: {
                                show: false
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        visualMap: [
                            {
                                left: null,
                                right: 0,
                                dimension: 7,
                                selected: {
                                    '严重污染': false,
                                    '重度污染': false
                                },
                                categories: ['严重污染', '重度污染', '中度污染', '轻度污染', '良', '优'],
                                inRange: {
                                    symbolSize: 30,
                                    symbol: {
                                        '优': 'diamond',
                                        '': 'circle'
                                    }
                                },
                                outOfRange: {
                                    color: '#000',
                                    symbolSize: {
                                        '优': 50,
                                        '': 30
                                    },
                                    symbol: {
                                        '优': 'diamond',
                                        '': 'circle'
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                name: '南京',
                                type: 'scatter',
                                itemStyle: itemStyle,
                                data: dataBJ
                            },
                            {
                                name: '上海',
                                type: 'scatter',
                                itemStyle: itemStyle,
                                data: dataSH
                            },
                            {
                                name: '广州',
                                type: 'scatter',
                                itemStyle: itemStyle,
                                data: dataGZ
                            }
                        ]
                    };
                    // 为echarts对象加载数据 
                    myChart.setOption(option); 