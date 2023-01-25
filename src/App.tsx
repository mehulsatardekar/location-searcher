import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import './App.css'
import { MapDataType } from './types'
import { useSearchParams } from 'react-router-dom';
import { FiShare } from 'react-icons/fi';
import { WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon } from 'react-share';
import { useToast } from './hooks'
import { Toaster } from 'react-hot-toast';
import { Map, ErrorFallback, Loader } from './components';
import { ErrorBoundary } from "react-error-boundary";

function App() {

  const { notifySuccess } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userSearchQuery, setUserSearchQuery] = useState<string | undefined>(searchParams.get('query')! ?? 'kalyan');
  const [searchHistory, setSearchHistory] = useState<string[]>(['Boston', "washington", 'polska', 'Madrid']);

  const [mapdata, setMapdata] = useState<MapDataType[]>();
  const userInput = useRef<null | HTMLInputElement>(null);

  const getLocation = () => {
    if (userInput.current?.value !== "") {
      setUserSearchQuery(userInput.current?.value);
      setSearchParams({ query: userInput.current?.value! })
      setSearchHistory([...searchHistory!, userInput.current?.value!])
    } else {
      notifySuccess("please enter something")
    }
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${userSearchQuery}&limit=1&format=json&polygon_geojson=1&addressdetails=1&extratags=1`);
      const data = await response.json();
      setMapdata(data);
      setIsLoading(false);
    })()
  }, [userSearchQuery, searchParams.get('query')])


  const setCurrentCity = (city: string) => {
    setUserSearchQuery(city);
    setSearchParams({ query: city })
  }

  const shareLocationDetails = (url: string) => {
    navigator.clipboard.writeText(url)
    notifySuccess('Link Details copied');
  }


  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <main className="container">
        <section className='search-container'>
          <label htmlFor="cityinput" className='label'>Search City</label>
          <input className='input' id="cityinput" placeholder='Search By Countries,Cities' type="text" ref={userInput} />
          <button className='btn' onClick={getLocation}>Search Location</button>
        </section>
        <section className='map-container'>
          <div className='users-history'>
            <div className="title">
              <h1>Recent Search</h1>
            </div>
            <div className="list-container">
              {
                searchHistory.map((list, index) => <div className="list-details" key={index + "-"}>
                  <div className='details'>
                    <h4>{list}</h4>
                    <div className='icon-box' onClick={(e) => shareLocationDetails(`${window.location.origin}?query=${list}`)}>
                      <FiShare />
                    </div>
                  </div>
                  <div className="group-btns">
                    <div className="social-icons">
                      <WhatsappShareButton url={`${window.location.origin}/?query=${list}`} separator={" "} title={`Location of ${list} checkout ${window.location.origin} to search more locations.  `}>
                        <WhatsappIcon size={25} round={true} />
                      </WhatsappShareButton>
                      <TwitterShareButton url={`${window.location.origin}/?query=${list}`} title={`Location of ${list} checkout ${window.location.origin} to search more locations.  `}>
                        <TwitterIcon size={25} round={true} />
                      </TwitterShareButton>
                      <EmailShareButton url={`${window.location.origin}/?query=${list}`} body={`Location of ${list} checkout ${window.location.origin} to search more locations.  `}>
                        <EmailIcon size={25} round={true} />
                      </EmailShareButton>
                    </div>
                    <button className='btn btn-sm' onClick={(e) => setCurrentCity(list)}>Select Details</button>
                  </div>
                  <hr />
                </div>)
              }

            </div>

          </div>
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={() => {
            setUserSearchQuery("boston");
            setSearchParams({ query: "boston" });
            setSearchHistory(['Boston', "washington", 'polska', 'Madrid'])

          }
          }>
            {
              isLoading ? (<> <Loader /> </>) : (<Map mapdata={mapdata} />)
            }
          </ErrorBoundary>
        </section>
      </main>
    </>
  )
}

export default App
