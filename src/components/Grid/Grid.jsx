import React, { useReducer, useState, useEffect } from 'react'
import { axiosWithAuth } from '../../utils/axiosWithAuth'
import { AgGridReact } from 'ag-grid-react'
import queryString from 'query-string'

import { GridContext } from '../../contexts'
import { initialState, reducer } from '../../store'

import { Container } from 'reactstrap'
import { Dropdown, Button, Form, Message } from 'semantic-ui-react'
import moment from 'moment'
import { DatePicker } from 'antd'

import { currencyOptions } from '../../config/gridDropdown'
import LoadingOverlay from 'react-loading-overlay'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'antd/dist/antd.css'
import './Grid.scss'

const { RangePicker } = DatePicker
const NOCACHE = true

const Grid = ({ token }) => {

  // * LOCALSTORAGE HANDLER
  const manageLS = (method, name = '', data = undefined) => {
    if (method === 'get' && name) return JSON.parse(localStorage.getItem(name))
    if (method === 'set' && data && name) return localStorage.setItem(name, JSON.stringify(data))
    if (method === 'clear') return localStorage.clear()
  }

  const [store, dispatch] = useReducer(reducer, initialState)
  const { columnDefs, rowData, gridStyle } = store
  const [err, setErr] = useState(false)

  //Usestate to set inputs for table
  const [list, setList] = useState(null)

  // UseState to set queries in URL
  const [countryQuery, setCountryQuery] = useState()
  const [marketQuery, setMarketQuery] = useState()
  const [sourceQuery, setSourceQuery] = useState()
  const [pCatQuery, setPCatQuery] = useState()
  const [pAggQuery, setPAggQuery] = useState()
  const [productQuery, setProductQuery] = useState()
  const [currentPage, setCurrentPage] = useState()
  const [pageCount, setPageCount] = useState(manageLS('get', 'page') ? manageLS('get', 'page').next - 1 : 0)
  const [countries, setCountries] = useState([])
  const [markets, setMarkets] = useState([])
  const [sources, setSources] = useState([])
  const [pCats, setPCats] = useState([])
  const [pAggs, setPAggs] = useState([])
  const [products, setProducts] = useState([])
  const [currency, setCurrency] = useState('USD')

  const [dateRanges, setDateRanges] = useState(
    localStorage.getItem('dates')
      ? deserialize(localStorage.getItem('dates'))
      : []
  )

  const [spinner, setSpinner] = useState(false)
  const [exportCSV, setExportCSV] = useState(null)

  // * FOR TRAVERSING DATA USING SELECTED OPTIONS ON GRID
  const dateRangeQuery =
    dateRanges && dateRanges[0]
      ? `&startDate=${dateRanges[0].format(
        'YYYY-MM-DD'
      )}&endDate=${dateRanges[1].format('YYYY-MM-DD')}`
      : ''

  // * QUERY TEMPLATE FOR UPDATING THE GRID DATA UPON SELECTED FILTERS
  const query = `/sauti/client/?currency=${currency || 'USD'}${countryQuery ||
    ''}${marketQuery || ''}${sourceQuery || ''}${pCatQuery || ''}${pAggQuery ||
    ''}${productQuery || ''}${dateRangeQuery}&next=${manageLS('get', 'data') ? manageLS('get', 'data').next : ''}`


  useEffect(() => {
    console.log('TOKEN ' + token)
    const setInitialData = async () => {
      const query = `https://sauti-marketprice-data.herokuapp.com/sauti/client/?currency=${currency ||
        'USD'}${countryQuery || ''}${sourceQuery || ''}${marketQuery || ''}${pCatQuery ||
        ''}${pAggQuery || ''}${productQuery || ''}${dateRangeQuery}`

      return await axiosWithAuth([token]).get(query)
        .then(res => res.data.pageCount)
        .then(res => setPageCount(res))
    }

    if (!!pageCount === false || isNaN(pageCount)) setInitialData()

    setSpinner('One moment please...') // Overlay on top of dropdowns while superlist is populating the dropdown menu options
    restoreQuery()
    const cachedRowData = manageLS('get', 'rowdata')
    if (cachedRowData) dispatch({ type: 'SET_ROW_DATA', payload: cachedRowData })

    axiosWithAuth([token])
      .get('/sauti/client/superlist')
      .then(res => {
        if (res.error) throw new Error(res.error)
        setList(res.data)
        setSpinner(false)
      })
      .catch(err => {
        setSpinner(false)
        setErr(`${err.message}`)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Options for dropDown
  let countriesOptions,
    marketOptions,
    sourceOptions,
    pCategoryOptions,
    pAggregatorOptions,
    productOptions
  if (list) {
    countriesOptions = list.countries.map((country, index) => ({
      key: `country-${index}`,
      value: country.country,
      text: country.country
    }))
    // Translate country abbreviations for dropdown 
    countriesOptions.map((index)=>{
      if(index.value === "BDI"){
        index.text = "Burundi"
      }
      if(index.value === 'DRC'){
        index.text = "Democratic Republic of the Congo"
      }
      if(index.value === 'KEN'){
        index.text = "Kenya"
      }
      if(index.value === 'MWI'){
        index.text = "Malawi"
      }
      if(index.value === 'RWA'){
        index.text = "Rwanda"
      }
      if(index.value === 'SSD'){
        index.text = "South Sudan"
      }
      if(index.value === 'TZA'){
        index.text = "Tanzania"
      }
      if(index.value === 'UGA'){
        index.text = "Uganda"
      }
    })
    marketOptions = list.markets.map((market, index) => ({
      key: `market-${index}`,
      text: market.market,
      value: market.market
    }))
    sourceOptions = list.sources.map((source, index) => ({
      key: `source-${index}`,
      text: source.source,
      value: source.source
    }))
    pCategoryOptions = list.categories.map((product_cat, index) => ({
      key: `category-${index}`,
      text: product_cat.product_cat,
      value: product_cat.product_cat
    }))
    pAggregatorOptions = list.aggregators.map((product_agg, index) => ({
      key: `Aggregator-${index}`,
      text: product_agg.product_agg,
      value: product_agg.product_agg
    }))
    productOptions = list.products.map((product, index) => ({
      key: `product-${index}`,
      text: product.product,
      value: product.product
    }))
  }


  // Submit handlers for dropDown
  const dropdownHandler = (value, valueUpdater, queryUpdater, prefix) => {
    valueUpdater(value)
    if (Array.isArray(value)) {
      if (value.length) {
        queryUpdater(`&${prefix}=${value.join(`&${prefix}=`)}`)
      } else {
        queryUpdater(null)
      }
    }
    // localStorage.setItem(prefix, JSON.stringify(value))
  }

  // Moment timestamps need special handling before running JSON.stringify on them
  function serialize(collection) {
    return JSON.stringify(collection, function (k, v) {
      if (
        typeof v === 'string' &&
        v.match(
          /\d{4}-[01]\d-[0-3]\dT?[0-2]\d:[0-5]\d(?::[0-5]\d(?:.\d{1,6})?)?(?:([+-])([0-2]\d):?([0-5]\d)|Z)/
        ) // Check if ISO datetime is present, if so transform to timestamp, otherwise return unchanged
      ) {
        return 'moment:' + moment(v).valueOf()
      }
      return v
    })
  }

  // Moment timestamps need special handling before running JSON.parse on them
  function deserialize(serializedData) {
    // If a moment timestamp is found, extract it for use. If not, return unchanged
    return JSON.parse(serializedData, function (k, v) {
      if (typeof v === 'string' && v.includes('moment:')) {
        return moment(parseInt(v.split(':')[1], 10))
      }
      return v
    })
  }

  function datesHandler(dates) {
    if (dates) {
      setDateRanges(dates)
      localStorage.setItem('dates', serialize(dates)) // Stored in local storage to later restore parameters if user reloads page. Serialization needed to handle moment dates
    } else localStorage.removeItem('dates')
  }

  function restoreQuery() {
    // Restore a saved query string from localstorage and parse into dropdown menu options for prepopulating most recent search
    const query = manageLS('get', 'q')
    if (query) {
      const {
        c = [],
        m = [],
        s = [],
        p = [],
        pcat = [],
        pagg = [],
        currency = '',
        startDate = null,
        endDate = null
      } = queryString.parse(query.split('?')[1])

      dropdownHandler(
        Array.isArray(c) ? c : [c],
        setCountries,
        setCountryQuery,
        'c'
      )
      dropdownHandler(
        Array.isArray(m) ? m : [m],
        setMarkets,
        setMarketQuery,
        'm'
      )
      dropdownHandler(
        Array.isArray(s) ? s : [s],
        setSources,
        setSourceQuery,
        's'
      )
      dropdownHandler(
        Array.isArray(p) ? p : [p],
        setProducts,
        setProductQuery,
        'p'
      )
      dropdownHandler(
        Array.isArray(pcat) ? pcat : [pcat],
        setPCats,
        setPCatQuery,
        'pcat'
      )
      dropdownHandler(
        Array.isArray(pagg) ? pagg : [pagg],
        setPAggs,
        setPAggQuery,
        'pagg'
      )
      dropdownHandler(currency, setCurrency, null, 'cur')
      datesHandler(
        startDate && endDate ? [moment(startDate), moment(endDate)] : []
      )
    }
  }

  // Reset all stored search parameters and local storage
  function resetSearch() {
    setErr(false)
    setSpinner('One moment please...')
    localStorage.clear()
    dropdownHandler([], setCountries, setCountryQuery, 'C')
    dropdownHandler([], setMarkets, setMarketQuery, 'm')
    dropdownHandler([], setSources, setSourceQuery, 's')
    dropdownHandler([], setProducts, setProductQuery, 'p')
    dropdownHandler([], setPCats, setPCatQuery, 'pcat')
    dropdownHandler([], setPAggs, setPAggQuery, 'pagg')
    dropdownHandler('USD', setCurrency, null, 'cur')
    datesHandler([])
    setCurrentPage(0)
    dispatch({ type: 'SET_ROW_DATA', payload: [] })
    setSpinner(false)
  }

  function disabledDate(current) {
    // Can not select days after today and today
    return current && current > moment().endOf('day')
  }

  const onGridReady = params => {
    // Responsive grid
    params.api.sizeColumnsToFit()
    // Set up an Export CSV wrapper
    setExportCSV(params.api)
  }

  // For all API calls except CSV request, axiosWithAuth wraps a caching layer. If a query result is found in the cache, it will be returned without hitting the backend

  // * NEXT API CALL
  const nextApiCall = async () => {
    setErr(false)
    // Stored in local storage to later restore parameters if user reloads page
    manageLS('set', 'q', query)

    axiosWithAuth([token])
      .get(query)
      .then(async res => {
        console.log(res)
        if (res.error) throw new Error(res.error)
        dispatch({ type: 'SET_ROW_DATA', payload: res.data.records })
        setSpinner(false)

        await setCurrentPage(res.data.next - 1)

        // * STORE DATA IN LOCALSTORAGE IF RESULTS EXISTS
        if (res) {
          manageLS('set', 'page', res.data.next - 1)
          manageLS('set', 'data', { ...res.data })
          console.log('NEXT BUTTON CALL', manageLS('get', 'data'))
        }
      })
      .catch(e => {
        setErr(`${e.message}`)
        setSpinner(false)
      })
  }

  // * API CALL
  const apiCall = async () => {
    const query = `https://sauti-marketprice-data.herokuapp.com/sauti/client/?currency=${currency ||
      'USD'}${countryQuery || ''}${sourceQuery || ''}${marketQuery || ''}${pCatQuery ||
      ''}${pAggQuery || ''}${productQuery || ''}${dateRangeQuery}`

    setErr(false)

    // Stored in local storage to later restore parameters if user reloads page
    manageLS('set', 'q', query)

    axiosWithAuth([token])
      .get(query)
      .then(async res => {
        if (res) console.log(res)
        if (res.error) throw new Error(res.error)
        dispatch({ type: 'SET_ROW_DATA', payload: res.data.records })
        setSpinner(false)

        // Stored in local storage to later restore parameters if user reloads page
        if (res) {
          console.log(res.data.next - 1)
          manageLS('set', 'page', res.data.next - 1)
          manageLS('set', 'data', { ...res.data })
          console.log('UPDATE BUTTON CALL', manageLS('get', 'data'))
        }
      })
      .catch(e => {
        setErr(`${e.message}`)
        setSpinner(false)
      })
  }

  // * PREVIOUS PAGE API CALL
  const prevApiCall = async () => {
    const query = `/sauti/client/?currency=${currency || 'USD'}${countryQuery ||
      ''}${marketQuery || ''}${pCatQuery || ''}${sourceQuery || ''}${pAggQuery ||
      ''}${productQuery || ''}${dateRangeQuery}&next=${manageLS('get', 'data') ? manageLS('get', 'data').prev : ''}`
    setErr(false)

    // checks that the previous page will not be less than 
    setCurrentPage(
      currentPage === 'number' && currentPage > 1 && manageLS('get', 'data').next - 1
    )

    // * STORE DATA
    manageLS('set', 'page', currentPage)
    manageLS('set', 'q', query)

    axiosWithAuth([token])
      .get(query)
      .then(async res => {
        if (res) console.log('PREVIOUS CALL', res)
        dispatch({ type: 'SET_ROW_DATA', payload: res.data.records })
        setSpinner(false)
        manageLS('set', 'data', { ...res.data })
      })
      .catch(e => {
        setSpinner(false)
        setErr(`${e.message}`)
      })
    setSpinner(false)
  }

  // * CSV CALL TO EXPORT CSV
  const apiCallForCSV = async () => {
    setErr(false)
    const query = `https://sauti-marketprice-data.herokuapp.com/sauti/client/export/?currency=${currency ||
      'USD'}${countryQuery || ''}${sourceQuery || ''}${marketQuery || ''}${pCatQuery ||
      ''}${pAggQuery || ''}${productQuery || ''}${dateRangeQuery}`
    axiosWithAuth([token], NOCACHE)
      .get(query)
      .then(async res => {
        setSpinner(false)
        if (res.error) throw new Error(res.error)
        window.location.href = res.config.url
      })
      .catch(e => {
        setErr(`${e.message}`)
        setSpinner(false)
      })
  }

  return (
    <Container className="flex-grow-1 mt-5">
      <GridContext.Provider value={{ store, dispatch }}>
        <div>
          {token && (
            <LoadingOverlay
              active={spinner && spinner !== 'Getting data...'}
              spinner
              text={spinner}>
              <Form>
                <Dropdown
                  placeholder="Countries"
                  fluid
                  multiple
                  search
                  selection
                  options={(countriesOptions) || []}
                  onChange={(e, { value }) =>
                    dropdownHandler(value, setCountries, setCountryQuery, 'c')
                  }
                  value={countries}
                />
                <Dropdown
                  placeholder="Markets"
                  fluid
                  multiple
                  search
                  selection
                  options={marketOptions || []}
                  onChange={(e, { value }) =>
                    dropdownHandler(value, setMarkets, setMarketQuery, 'm')
                  }
                  value={markets}
                />
                <Dropdown
                  placeholder="Sources"
                  fluid
                  multiple
                  search
                  selection
                  options={sourceOptions || []}
                  onChange={(e, { value }) =>
                    dropdownHandler(value, setSources, setSourceQuery, 's')
                  }
                  value={sources}
                />
                <Dropdown
                  placeholder="Product category"
                  fluid
                  multiple
                  search
                  selection
                  options={pCategoryOptions || []}
                  onChange={(e, { value }) =>
                    dropdownHandler(value, setPCats, setPCatQuery, 'pcat')
                  }
                  value={pCats}
                />
                <Dropdown
                  placeholder="Product sub-category"
                  fluid
                  multiple
                  search
                  selection
                  options={pAggregatorOptions || []}
                  onChange={(e, { value }) =>
                    dropdownHandler(value, setPAggs, setPAggQuery, 'pagg')
                  }
                  value={pAggs}
                />
                <Dropdown
                  placeholder="Products"
                  fluid
                  multiple
                  search
                  selection
                  options={productOptions || []}
                  onChange={(e, { value }) =>
                    dropdownHandler(value, setProducts, setProductQuery, 'p')
                  }
                  value={products}
                />
                <Dropdown
                  class="currency"
                  placeholder="Currency"
                  fluid
                  search
                  selection
                  options={currencyOptions || ''}
                  onChange={(e, { value }) =>
                    dropdownHandler(value, setCurrency, null, 'cur')
                  }
                  value={currency}
                />
                <RangePicker
                  value={dateRanges}
                  disabledDate={disabledDate}
                  onChange={(dates, date) => {
                    datesHandler(dates)
                  }}
                />
              </Form>
              <div class="grid-nav">
                <Button
                  onClick={() => {
                    apiCall()
                    setSpinner('Getting data...')
                  }}
                >
                  Update Grid
                </Button>{' '}
                <Button onClick={() => resetSearch()}>Reset</Button>{' '}
                {rowData[0] && (
                  <>
                    <Button onClick={() => exportCSV.exportDataAsCsv(rowData)}>
                      Export Page as CSV
                    </Button>{' '}
                    <Button
                      onClick={() => {
                        apiCallForCSV()
                        setSpinner('This may take a while, please wait...')
                      }}>
                      Export All Data as CSV
                    </Button>
                  </>
                )}
              </div>
            </LoadingOverlay>
          )}
          {err && (
            <Message negative>
              <Message.Header>{err}</Message.Header>
            </Message>
          )}
          <LoadingOverlay
            active={spinner && spinner !== 'One moment please...'}
            spinner
            text={spinner}
          >
            <div style={gridStyle} className="ag-theme-balham">
              <AgGridReact
                // properties
                columnDefs={columnDefs}
                rowData={rowData}
                domLayout="autoHeight"
                reactNext={true}
                // events
                onGridReady={onGridReady}>
                {/* On load of the grid, check for localstoragePut the ability to save RowData into local storage*/}
              </AgGridReact>
            </div>
          </LoadingOverlay>

          {!currentPage ? (
            <Button disabled>{'<'}</Button>
          ) : currentPage === 2 ? (
            <Button
              onClick={() => {
                apiCall()
                setSpinner('Getting data...')
              }}>
              {'<'}
            </Button>
          ) : currentPage === 1 ? (
            <Button disabled>{'<'}</Button>
          ) : (
                  <Button
                    onClick={() => {
                      prevApiCall()
                      setSpinner('Getting data...')
                    }}>
                    {'<'}
                  </Button>
                )}
          {manageLS('get', 'data').next && manageLS('get', 'data').next - 1 < pageCount ? (
            <Button
              onClick={() => {
                nextApiCall()
                setSpinner('Getting data...')
              }}>{`>`}</Button>
          ) : (
              <Button
                disabled
                onClick={() => {
                  nextApiCall()
                  setSpinner('Getting data...')
                }}>{`>`}</Button>
            )}
          {currentPage && pageCount > 0 ? <span>{`${manageLS('get', 'page')} of ${pageCount}`}</span> : null}
        </div>
      </GridContext.Provider>
    </Container>
  )
}

export default Grid
