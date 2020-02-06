import React, { useRef, useState } from 'react'
import FilterPlayground from '../Playground/filterPlayground.js'
import DrPlayground from '../Playground/dateRangePlayground.js'
import PmPlayground from '../Playground/productMarketPlayground.js'
import {
  Container,
  Header,
  Menu,
  Table,
  Popup,
  Icon,
  Button
} from 'semantic-ui-react'
import Highlight from 'react-highlight'

import apiKeyGif from '../../assets/apiKey.gif'
import listGif from '../../assets/listexample.gif'
import filterGif from '../../assets/filterexample.gif'
import priceAllGif from '../../assets/priceallmarketsexample.gif'
import priceProductMarketGif from '../../assets/pricemarketproductexample.gif'
import priceDateGif from '../../assets/pricedateexample.gif'
import countryGif from '../../assets/country.gif'
import currenciesGif from '../../assets/currencies.gif'
import marketsGif from '../../assets/markets.gif'
import productGif from '../../assets/product.gif'
import dateRangeGif from '../../assets/date-range.gif'

import { baseURL } from '../../urls'

import 'highlight.js/styles/monokai-sublime.css'
import './Documentation.scss'

const SideNav = () => {
  //Managing the state of Side Nav Tabbing between by setting the active item
  const [sidenav, toggleSidenav] = useState(true)

  //conditionally render playground components via boolean
  const [playFilter, setPlayFilter] = useState(false)
  const [playDate, setPlayDate] = useState(false)
  const [playPrice, setPlayPrice] = useState(false)

  //Applying scrolling to places of the page
  
  const scrollToPlay = ref => {
    window.scrollTo(0, ref.current.offsetTop - 40)
    toggleSidenav(!sidenav) //Closes the menu once scrolling is initiated
  }
  const api = useRef()
  const quick = useRef()
  const refer = useRef()
  const list = useRef()
  const filter = useRef()
  const latestPrice = useRef()
  const lastestMarketPrice = useRef()
  const dateRange = useRef()
  const errorBox = useRef()
  const pivotdocs = useRef()

  return (
    <div className={sidenav ? 'side-nav' : 'side-nav hide-nav'}>
      <Menu size="massive" pointing vertical className="side-nav-items">
        <div className="menu-content">
          <Menu.Item name="API" onClick={() => scrollToPlay(api)} />
          <Menu.Item name="Quick Start" onClick={() => scrollToPlay(quick)} />
          <Menu.Item name="Reference" onClick={() => scrollToPlay(refer)} />
          <Menu.Item name="Lists Endpoint" onClick={() => scrollToPlay(list)} />
          <Menu.Item
            name="Filter Search Endpoint"
            onClick={() => scrollToPlay(filter)}
          />
          <Menu.Item
            name="Latest Price in All Markets Endpoint"
            onClick={() => scrollToPlay(latestPrice)}
          />
          <Menu.Item
            name="Latest Price by Market Endpoint"
            onClick={() => scrollToPlay(lastestMarketPrice)}
          />
          <Menu.Item
            name="Latest Price by Date Range Endpoint"
            onClick={() => scrollToPlay(dateRange)}
          />
          <Menu.Item name="Errors" onClick={() => scrollToPlay(errorBox)} />
          <Menu.Item
            name="Get Data Table"
            onClick={() => scrollToPlay(pivotdocs)}
          />
        </div>
        <div className="menu-control">
          <Button role="button" onClick={() => toggleSidenav(!sidenav)}>
            Menu
          </Button>
        </div>
      </Menu>

      <Container fluid className="center-api-column">
        <section className="articles-examples" ref={api}>
          <article className="left-article">
            <Header as="h2">API</Header>
            <p>
              Sauti Africa Market Prices API is designed to provide up-to-date
              daily prices for over 150 products across more than 100
              marketplaces in East Africa. The API has resource-oriented URLs,
              returns JSON-encoded responses and uses standard HTTP response
              codes, authentication and verbs.
            </p>
          </article>
          <article className="right-article">
            {/* Used for spacing with the right article */}
            <Header as="h2"></Header>
            <p></p>
          </article>
        </section>
        <section className="articles-examples" ref={quick}>
          <article className="left-article">
            <Header as="h2">Quick Start</Header>
            <h3>API Access Key & Authentication</h3>
            <p>
              After signing up, every user is assigned a personal API access
              key, a unique combination of letters and digits provided to access
              any of the API's data endpoints. To authenticate with the Sauti
              Africa Market Prices API, simply pass the API Key as part of the
              headers.
            </p>
            <img src={apiKeyGif} alt="entering api key gif" />
          </article>
          <article className="right-article">
            <h3>API Endpoints</h3>
            <p>
              The Sauti Africa Market Prices API offers 5 customizable
              endpoints, all of which provide different kinds of data.
            </p>
            <h5>
              Base URL: All API requests start out with the following base URL:
            </h5>
            <Highlight language="javascript">
              {
                `${baseURL}/sauti/developer`
              }
            </Highlight>
            <h5>Available Endpoints</h5>

            <h6>specific list - market, country, source, product</h6>
            <Highlight language="javascript">
              {
                `${baseURL}/sauti/developer/lists/`
              }
            </Highlight>

            <h6>filter</h6>
            <Highlight language="javascript">
              {
                `${baseURL}/sauti/developer/filter/`
              }
            </Highlight>

            <h6>
              “latest price” - latest prices on a product across all markets
            </h6>
            <Highlight language="javascript">
              {
                `${baseURL}/sauti/developer/product/latestprice/`
              }
            </Highlight>

            <h6>
              “latest market price” - latest price on a product in a particular
              market
            </h6>
            <Highlight language="javascript">
              {
                `${baseURL}/sauti/developer/product/pricebymarket/`
              }
            </Highlight>

            <h6>
              “product prices by date range” - prices of a product across a date
              range
            </h6>
            <Highlight language="javascript">
              {
                `${baseURL}/sauti/developer/product/range/`
              }
            </Highlight>
          </article>
        </section>
        <section className="articles-examples" ref={refer}>
          <article className="left-article">
            <Header as="h2">API Reference</Header>

            {/* Specific List: Market, Country, Source, Product */}
            <h3 style={{ color: 'chartreuse' }} ref={list}>
              GET{' '}
              <span style={{ color: 'black' }}>
                Specific List: Market, Country, Source, Product
              </span>
            </h3>
            <p>
              Returns a list based on query parameter of /?list= If incorrect
              parameter is passed, it will default to returning a list of all
              markets.
              <Popup
                trigger={<Icon name="question circle" size="large" />}
                content="You can scroll the URL below horizontally"
                position="right center"
              />
            </p>
            <Highlight language="javascript" className="highlight">
              {`${baseURL}/sauti/`}
              <br />
              {'developer/lists/?list=[MARKET][COUNTRY][SOURCE][PRODUCT]'}
            </Highlight>
            <h3>Request Parameters</h3>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Parameter</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>list</Table.Cell>
                  <Table.Cell>
                    Enter one of the strings: market, country, source, product
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </article>
          <article className="right-article">
            <img
              src={listGif}
              alt="Example lists endpoint"
              className="gif-examples"
            />
          </article>
        </section>
        <section className="articles-examples">
          <article className="left-article">
            {/* Perform Filter Search */}
            <h3 style={{ color: 'chartreuse' }} ref={filter}>
              GET <span style={{ color: 'black' }}>Perform Filter Search</span>
            </h3>
            <p>
              Returns array of records via query. Query filters accepted are
              product, product_agg,category, market and country. Additional
              query parameters for cursor pagination include count (optional)
              and next (optional). Multiple choices in the same filter type can
              be passed too by simply adding same query key with appropriate
              value. Default is to return 50 records based on latest dates.
            </p>
            <p>All records are sorted by date descending and id descending.</p>
            <p>Check the example.</p>
            <p>
              This endpoint has cursor pagination built in. Default count of
              records is 50. Maximum count of records is 500 per call. Along
              with the records, this endpoint returns a next value and a
              topPageValue for ease of use in implementing pagination in
              applications. On initial calls (i.e. when no next value is passed
              in), a pageCount (total count of pages based on number of records
              and count) will also be returned.{' '}
              <Popup
                trigger={<Icon name="question circle" size="large" />}
                content="You can scroll the URL below horizontally"
                position="right center"
              />
            </p>
            <Highlight language="javascript">
              {`${baseURL}/sauti/`}
              <br />
              {
                'developer/filter/?p=[PRODUCT]&market=[MARKET]&pcat=[PRODUCT CATEGORY]'
              }
              <br />
              {
                '&pagg=[PRODUCT AGGREGATE]&c=[COUNTRY]&count=[NUMBER OF RECORDS PER PAGE]&next=[NEXT VALUE]'
              }
            </Highlight>
            <h3>Request Parameters</h3>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Parameter</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>p</Table.Cell>
                  <Table.Cell>
                    Product name - 3rd Level - You can retrieve a list of
                    Products from lists endpoint
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>market</Table.Cell>
                  <Table.Cell>Market name</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>pcat</Table.Cell>
                  <Table.Cell>Product Category name - 1st Level</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>pagg</Table.Cell>
                  <Table.Cell>Product aggregate name - 2nd Level</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>count</Table.Cell>
                  <Table.Cell>
                    Sets the count for number of records in each call. Max is
                    500. Default to 50.
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>next</Table.Cell>
                  <Table.Cell>
                    Concatenation of the date and id of the first record on the
                    next page. This value is returned to the user on each call.
                    This allows for pagination of records.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button color="violet" onClick={() => setPlayFilter(!playFilter)}>
              {!playFilter ? 'try it now' : 'close playground'}
            </Button>
            {playFilter && <FilterPlayground />}
          </article>
          <article className="right-article">
            <img
              src={filterGif}
              alt="Example Filterable search endpoint"
              className="gif-examples"
            />
          </article>
        </section>
        <section className="articles-examples">
          <article className="left-article">
            {/* Latest Prices on a Product across all Markets */}
            <h3 style={{ color: 'chartreuse' }} ref={latestPrice}>
              GET{' '}
              <span style={{ color: 'black' }}>
                Latest Prices on a Product across all Markets
              </span>
            </h3>
            <p>
              Returns all records on given product. Pass the query /?product=
            </p>
            <Highlight language="javascript">
              {`${baseURL}/sauti/`}
              <br />
              {'developer/product/latestprice/?product=[PRODUCT]'}
            </Highlight>
            <h3>Request Parameters</h3>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Parameter</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>product</Table.Cell>
                  <Table.Cell>Name of a product</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </article>
          <article className="right-article">
            <img
              src={priceAllGif}
              alt="Example Filterable search endpoint"
              className="gif-examples"
            />
          </article>
        </section>
        <section className="articles-examples">
          <article className="left-article">
            {/* Latest Price on a product in a particular market */}
            <h3 style={{ color: 'chartreuse' }} ref={lastestMarketPrice}>
              GET{' '}
              <span style={{ color: 'black' }}>
                Latest Price on a product in a particular market
              </span>
            </h3>
            <p>
              Returns price of a single product from a single market.{' '}
              <Popup
                trigger={<Icon name="question circle" size="large" />}
                content="You can scroll the URL below horizontally"
                position="right center"
              />
            </p>
            <Highlight language="javascript">
              {`${baseURL}/sauti/`}
              <br />
              {
                'developer/product/pricebymarket/?market=[MARKET]&product=[PRODUCT]'
              }
            </Highlight>
            <h3>Request Parameters</h3>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Parameter</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>market</Table.Cell>
                  <Table.Cell>Enter name of a market</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>product</Table.Cell>
                  <Table.Cell>Enter name of a product</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button color="violet" onClick={() => setPlayPrice(!playPrice)}>
              {!playPrice ? 'try it now' : 'close playground'}
            </Button>
            {playPrice && <PmPlayground />}
          </article>
          <article className="right-article">
            <img
              src={priceProductMarketGif}
              alt="Example Filterable search endpoint"
              className="gif-examples"
            />
          </article>
        </section>
        <section className="articles-examples">
          <article className="left-article">
            {/* Find prices of a product across a date range */}
            <h3 style={{ color: 'chartreuse' }} ref={dateRange}>
              GET{' '}
              <span style={{ color: 'black' }}>
                Find prices of a product across a date range
              </span>
            </h3>
            <p>
              Pass the query paramaters of a product, startDate, endDate, count
              (optional), and next (optional). Sends a response of all available
              records in that date range separated by cursor pagination. This
              endpoint has cursor pagination built in. Default count of records
              is 50. Maximum count of records is 500 per call. Along with the
              records, this endpoint returns a next value and a topPageValue for
              ease of use in implementing pagination in applications. On initial
              calls (i.e. when no next value is passed in), a pageCount (total
              count of pages based on number of records and count) will also be
              returned. <br />
              <br />
              startDate needs to be older than endDate for successful query.
              <Popup
                trigger={<Icon name="question circle" size="large" />}
                content="You can scroll the URL below horizontally"
                position="right center"
              />
            </p>
            <Highlight language="javascript">
              {`${baseURL}/sauti/`}
              <br />
              {
                'developer/product/range/?product=[PRODUCT]&startDate=[START DATE]&endDate=[END DATE]&count=[COUNT]&next=[NEXT]'
              }
            </Highlight>
            <h3>Request Parameters</h3>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Parameter</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>Product</Table.Cell>
                  <Table.Cell>Enter name of a product</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>startDate</Table.Cell>
                  <Table.Cell>
                    Starting date (must be older than EndDate)
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>endDate</Table.Cell>
                  <Table.Cell>Ending date where range stops</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>count</Table.Cell>
                  <Table.Cell>
                    Sets the count for number of records in each call. Max is
                    500. Default to 50.
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>next</Table.Cell>
                  <Table.Cell>
                    Concatenation of the date and id of the first record on the
                    next page. This value is returned to the user on each call.
                    This allows for pagination of records.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button color="violet" onClick={() => setPlayDate(!playDate)}>
              {!playDate ? 'try it now' : 'close playground'}
            </Button>
            {playDate && <DrPlayground />}
          </article>
          <article className="right-article">
            <img
              src={priceDateGif}
              alt="Example price by date endpoint"
              className="gif-examples"
            />
          </article>
        </section>
        <section className="articles-examples" ref={errorBox}>
          <article className="left-article">
            <h2>Errors</h2>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Error Code</Table.HeaderCell>
                  <Table.HeaderCell>Summary</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    200{' '}
                    <span role="img" aria-label="checkmark">
                      ✅
                    </span>
                  </Table.Cell>
                  <Table.Cell>OK - Worked as expected!</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    400{' '}
                    <span role="img" aria-label="upside-down smiley face">
                      🙃
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    Bad Request - Request was missing a parameter.
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    401{' '}
                    <span role="img" aria-label="halt hand sign">
                      ✋
                    </span>
                  </Table.Cell>
                  <Table.Cell>Unauthorized - Not valid API key.</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    403{' '}
                    <span role="img" aria-label="stop sign">
                      🛑
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    Forbidden - Reached maximum API call limit.
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    404{' '}
                    <span role="img" aria-label="surprised face">
                      😱
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    Not Found - The requested resource does not exist.
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    500{' '}
                    <span role="img" aria-label="crying face">
                      😭
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    Server Error - Something went wrong on our end.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </article>
        </section>

        <section className="articles-examples" ref={pivotdocs}>
          <article className="left-article">
            <h2>Get Data Table</h2>
            <h2>Filters</h2>
            <h3>Countries</h3>
            <p>
              Users have the ability to filter through the records based on the
              country. The countries are abbreviated below along with their full
              country names.
            </p>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Abbreviation</Table.HeaderCell>
                  <Table.HeaderCell>Country Name</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>BDI</Table.Cell>
                  <Table.Cell>Burundi</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>DRC</Table.Cell>
                  <Table.Cell>Democratic Republic of the Congo</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>KEN</Table.Cell>
                  <Table.Cell>Kenya</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>MWI</Table.Cell>
                  <Table.Cell>Malawi</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>RWA</Table.Cell>
                  <Table.Cell>Rawanda</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>SSD</Table.Cell>
                  <Table.Cell>South Sudan</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>TZA</Table.Cell>
                  <Table.Cell>Tanzania</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>UGA</Table.Cell>
                  <Table.Cell>Uganda</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </article>
          <article className="right-article">
            <img
              src={countryGif}
              alt="Example countries filter"
              className="gif-example-country"
            />
          </article>
        </section>
        <section className="articles-examples">
          <article className="left-article">
            <h3>Currency</h3>
            <p>
              The currency filter allows the user to convert search result
              retail and wholesale values to the selected currency. Currently,
              the returned values are not adjusted for inflation.
            </p>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Abbreviation</Table.HeaderCell>
                  <Table.HeaderCell>Currency</Table.HeaderCell>
                  <Table.HeaderCell>Country</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>BIF</Table.Cell>
                  <Table.Cell>The Franc</Table.Cell>
                  <Table.Cell>Burundi</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>CDF</Table.Cell>
                  <Table.Cell>The Congolese Franc</Table.Cell>
                  <Table.Cell>Democratic Republic of the Congo</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>KES</Table.Cell>
                  <Table.Cell>Kenyan Shilling</Table.Cell>
                  <Table.Cell>Kenya</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>MWK</Table.Cell>
                  <Table.Cell>Kwachas</Table.Cell>
                  <Table.Cell>Malawi</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>RWF</Table.Cell>
                  <Table.Cell>The Rawandan Franc</Table.Cell>
                  <Table.Cell>Rawanda</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>UGX</Table.Cell>
                  <Table.Cell>The Shilling</Table.Cell>
                  <Table.Cell>Uganda</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>TZS</Table.Cell>
                  <Table.Cell>Tanzanian Shilling</Table.Cell>
                  <Table.Cell>Tanzania</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>USD</Table.Cell>
                  <Table.Cell>U.S. Dollar</Table.Cell>
                  <Table.Cell>United States</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </article>
          <article className="right-article">
            <img
              src={currenciesGif}
              alt="Example currency filter"
              className="gif-examples"
            />
          </article>
        </section>
        <section className="articles-examples">
          <article className="left-article">
            <h3>Markets</h3>
            <p>
              Markets range from all over Eastern Africa from Acura to Ziniya.
              There are currently over 100 markets. Find multiple products in
              these markets as well as prices from specific items.
            </p>
          </article>
          <article className="right-article">
            <img
              src={marketsGif}
              alt="Example markets filter"
              className="gif-examples"
            />
          </article>
        </section>
        <section className="articles-examples">
          <article className="left-article">
            <h3>Products</h3>
            <p>
              When using the products filters, user has the ability to search
              even more specific records. You must first understand that there
              is a hierarchy. The top is products category, second is products
              aggregators, and last is products. Using these filters in unison
              can bring up records of market prices based on a specific product.
            </p>
          </article>
          <article className="right-article">
            <img
              src={productGif}
              alt="Example products filter"
              className="gif-examples"
            />
          </article>
        </section>
        <section className="articles-examples">
          <article className="left-article">
            <h3>Date Ranges</h3>
            <p>
              Market prices are always changing and being updated. We wanted the
              user to be able to search countries, markets, products and
              currency from different dates so the user can get the most up to
              date data for their use. The user can retrieve records back from
              2013. With that ability to pick a start date and end date. We’ll
              generate every record in between for the user.
            </p>
          </article>
          <article className="right-article">
            <img
              src={dateRangeGif}
              alt="Example date ranges filter"
              className="gif-examples"
            />
          </article>
        </section>
      </Container>
    </div>
  )
}

export default SideNav
