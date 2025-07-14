import styles from './Dashboard.module.css'
import PageNav from '../components/PageNav'
import { useCities } from '../contexts/CitiesContext';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchFilter } from './SearchFilter';

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function Dashboard() {
      const {currentCity, getCity, cities, isLoading, getFlag, deleteCity} = useCities();
      
    const [search, setSearch] = useState();
     const [filter, setFilter] = useState("all");
     const [sortOrder, setSortOrder] = useState('asc');


    if(isLoading) return <Spinner />

    if(!cities.length) {
        return <Message message='Add your first city by clicking on a city on the map.' />
    }

    // Filter, search, and sort the list of cities based on user input
      const filteredCities = cities
        .filter((city) =>
          search
            ? city.cityName.toLowerCase().includes(search.toLowerCase())
            : true
        )
        .filter((city) => (filter === "all" ? true : city.country === filter))
        .sort((a, b) => {
          if (sortOrder === "asc") {
            return a.cityName.localeCompare(b.cityName);
          } else {
            return b.cityName.localeCompare(a.cityName);
          }
        });


    return (
      <div className={styles.homepage}>
            <PageNav />
          <SearchFilter search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} setSortOrder={setSortOrder} />
            <section>
            <ul className={styles.cityList}>
                   {filteredCities.map((city) => (
                        <li key={city.id}>
                          {/* <Link className={`${styles.cityItem} ${city.id === currentCity.id ? styles["cityItem-active"] : ''}`} to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}> */}
                          <div className={`${styles.cityItem} ${city.id === currentCity.id ? styles["cityItem-active"] : ''}`}>
                            <span className={styles.emoji}>{getFlag(city.emoji)}</span>
                            <h3 className={styles.name}>{city.cityName}</h3>
                            {/* <p className={styles.coords}>📍 {city.position.lat.toFixed(2)}, {city.position.lng.toFixed(2)}</p> */}
                            <time className={styles.date}>({formatDate(city.date)})</time>
                            <button className={styles.deleteBtn} onClick={(e) => {
                              e.preventDefault();
                              deleteCity(city.id);
                            }}>&times;</button>
                          {/* </Link> */}
                          </div>
                        </li>


                   ))}
             </ul>
            </section>
      </div>
    )
}

export default Dashboard;
