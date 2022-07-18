import React, { useEffect, useState } from "react";
import searchIcon from "../../resources/images/search-icon.svg"
import controlsIcon from "../../resources/images/controls-icon.svg"
import exportIcon from "../../resources/images/export-icon.svg"
import filterIcon from "../../resources/images/filter-icon.svg"



export const QuoteLibrary = () => {
    const [quotes, setQuotes] = useState([])
    const [isDateFilterShown, setIsDateFilterShown] = useState(false)
    const [filterSearchInput, setfilterSearchInput] = useState("")
    const [filteredQuotes, setfilteredQuotes] = useState(quotes)
    const [dateRange, setDateRange] = useState([])
    const [dateRangeSelection, setDateRangeSelection] = useState("")
    const [dateRangeSelectionCustom, setDateRangeSelectionCustom] = useState(["", ""])
    let url = "http://localhost:8080/quotes"
    //this is for actual endpoint for api
    //let url = "http://localhost:52773/csp/clariti/restapi/getQuotes/"
    // function getQuotes() {
    //     //let url = '"http://localhost:1234/quotes"'
    //     //let url = '../../resources/jsonMock/quoteMock.json'
    //     let url = ""
    //     //let config = {}
    //     fetchQuotes(url).then(quotes => {
    //         quotes
    //     });

    //     console.log(quotes)
    // }

    // const fetchQuotes = async (url) => {
    //     return fetch(`${url}/quotes`)
    //         .then(res => res.json())
    //     //const response = await fetch(`${url}/quotes`)
    //     //const quotes = await response.json()
    //     //return quotes
    //   };


    useEffect(
        () => {
            if (dateRange == "") {
                fetch(`${url}`, {
                    method: 'GET'
                })
                    .then(response => response.json())
                    .then((quotes) => {
                        setQuotes(quotes)
                        console.log(quotes)
                    })
            } else if (dateRange) {

                fetch(`${url}`, {
                    method: 'GET'
                })
                    .then(response => response.json())
                    .then((quotes) => {
                        setQuotes(quotes)
                        console.log(quotes)
                    })

            }
        },
        []
    )

    //handle date filter
    const handlefilterByDate = (selection) => {


        // this gives us the current date to pass as needed
        let today = new Date();

        let initialDate = "";
        let finalDate = "";

        if (selection == "today") {
            //let today = new Date();
            let todayFormatted = formatDate(today)
            initialDate = todayFormatted;
            finalDate = todayFormatted;
            console.log("today ", todayFormatted)
            setDateRange([initialDate, finalDate])
        }

        if (selection == "month") {
            //this gives us the month range
            let firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
            //console.log("first Day")
            let initialDate = formatDate(firstDay)

            let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
            let finalDate = formatDate(lastDay)
            console.log("selection is ", selection, initialDate, finalDate)
            setDateRange([initialDate, finalDate])
        }

        if (selection == "week") {
            //currently set for sunday to saturday, if you need to shift to monday to sunday, replace code with following:
            // let firstWeekDay = new Date(today.setDate(today.getDate() - today.getDay() + 1));
            // let lastWeekDay = new Date(today.setDate(today.getDate() - today.getDay() + 7));
            let firstWeekDay = new Date(today.setDate(today.getDate() - today.getDay()));
            let lastWeekDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));

            let initialDate = formatDate(firstWeekDay)
            let finalDate = formatDate(lastWeekDay)
            console.log("selection is ", selection, initialDate, finalDate)
            setDateRange([initialDate, finalDate])
        }

        if (selection == "custom") {
            //select date ranges from date picker and formate them
            initialDate = dateRangeSelectionCustom[0]
            finalDate = dateRangeSelectionCustom[1]
            setDateRange([initialDate, finalDate])
        }
        if (selection == "") {
            let initialDate = ""
            let finalDate = ""
            console.log("selection is reset ")
            setDateRange([initialDate, finalDate])
        }
        // //this gives us the month range
        // let firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
        // //let firstDate = firstDay.toLocaleDateString();

        // //console.log("first Day")
        // let formattedFirstDate = formatDate(firstDay)
        // console.log("first ", formattedFirstDate)

        // let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        // let formattedLastDate = formatDate(lastDay)
        // console.log("last ", formattedLastDate)
        //console.log("today ", todayDate)

        //console.log(firstDate, + " " + lastDate)


        //ending format should look like: localhost:8080/quotes?startDate=20220716&endDate=20220717
    };

    const formatDate = (dateObj) => {
        var dd = String(dateObj.getDate()).padStart(2, '0');
        var mm = String(dateObj.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = dateObj.getFullYear();
        //rearrange dates as needed
        let dateFormatted = yyyy + '-' + mm + '-' + dd;
        //console.log("Date Formatted: ", dateFormatted);
        return dateFormatted
    }

    const handleDateRangeCustom = (direction, value) => {
        console.log("custom value, ", value)

        if (direction == "from") {
            setDateRangeSelectionCustom([value, dateRangeSelectionCustom[1]])
        }
        if (direction == "to") {
            setDateRangeSelectionCustom([dateRangeSelectionCustom[0], value])
        }
    }
    // useEffect()
    //     () => {
    //         const filteredResults = quotes.filter(quote => quote.patient )
    //     }



    const handleFilterSearch = (searchValue) => {
        const keyword = searchValue
        console.log("searchvalue", searchValue, "keyword", keyword)

        if (keyword !== '') {
            const results = quotes.filter((quote) => {
                return quote.patient.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setfilteredQuotes(results);
        } else {
            setfilteredQuotes(quotes);
            // If the text field is empty, show all users
        }

        setfilterSearchInput(keyword);

        // setfilterSearchInput(searchValue)
        // //setSearchInput(searchValue)
        // if (filterSearchInput !== '') {
        //     const filteredData = quotes.filter((item) => {
        //         console.log("quotes", quotes, filterSearchInput[0].patient)
        //         //return Object.values(item.patient).join('').toLowerCase().includes(filterSearchInput.patient.toLowerCase())

        //     })
        //     setfilterSearchInput(filteredData)
        // }
        // else{
        //     setfilterSearchInput(quotes)
        // }
    };







    return (
        <>
            <div className="table-container">
                <div className="table-title">Quotes</div>
                <div className="filterTable">
                    <div>Filter</div>
                    <div>Quote Date Range</div>
                    {isDateFilterShown ?
                        <>
                            <button id="hideDateFilterBtn" onClick={(e) => { e.preventDefault(); setIsDateFilterShown(false) }}>x</button>
                            <div id="dateFilterMenu">
                                <div>
                                    <input name="dateFilter" type="radio" id="dateRangeToday" onClick={(e) => { setDateRangeSelection("today") }} value="dateRangeToday"></input>
                                    <label htmlFor="dateRangeToday">Today</label>
                                </div>
                                <div>
                                    <input name="dateFilter" type="radio" id="dateRangeWeek" onClick={(e) => { setDateRangeSelection("week") }} value="dateRangeWeek"></input>
                                    <label htmlFor="dateRangeWeek">This Week</label>
                                </div>
                                <div>
                                    <input name="dateFilter" type="radio" id="dateRangeMonth" onClick={(e) => { setDateRangeSelection("month") }} value="dateRangeMonth"></input>
                                    <label htmlFor="dateRangeMonth">This Month</label>
                                </div>
                                <div>
                                    <input name="dateFilter" type="radio" id="dateRangeCustom" onClick={(e) => { setDateRangeSelection("custom") }} value="dateRangeCustom"></input>
                                    <label htmlFor="dateRangeCustom">Custom</label>
                                </div>
                                <div>
                                    <label name="dateFilter" htmlFor="customDateFrom">From</label>
                                    <input type="date" onChange={(e) => { handleDateRangeCustom("from", e.target.value) }} id="customDateFrom"></input>
                                </div>
                                <div>
                                    <label name="dateFilter" htmlFor="customDateTo">To</label>
                                    <input type="date" onChange={(e) => { handleDateRangeCustom("to", e.target.value) }} id="customDateTo"></input>
                                </div>
                                <button onClick={(e) => { e.preventDefault(); handlefilterByDate("") }}>Reset</button>
                                <button onClick={(e) => { e.preventDefault(); handlefilterByDate(dateRangeSelection) }}>Search</button>
                            </div>
                        </> :
                        <></>
                    }
                </div>
                <div className="table-body">
                    <div className="table-header">
                        <div className="table-header-left">
                            <button id="showDateFilterBtn" onClick={() => setIsDateFilterShown(true)}>
                                <img src={filterIcon} />
                            </button>
                            <div className="table-search">
                                <img src={searchIcon} />
                                <input onChange={e => handleFilterSearch(e)} placeholder="Search Placeholder Text"></input>
                            </div>
                        </div>
                        <div className="table-header-right">
                            <img src={controlsIcon} />
                            <img src={exportIcon} />
                            <button className="table-new-btn">Co-Provider Quote +</button>
                        </div>
                    </div>
                    <div className="quotes-table">
                        {
                            quotes.map(
                                (quote) => {
                                    return <section key={quote.Id}>
                                        <div>{quote.Id}</div>
                                        <div>{quote.CreateDate}</div>
                                        <div>{quote.LastName}</div>
                                        <div>{quote.FirstName}</div>
                                    </section>

                                }
                            )
                        }
                    </div>
                </div>
            </div>
            <button onClick={() => setQuotes([])}>Get Quote</button>
        </>
    )
}