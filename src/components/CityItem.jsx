
import { useCities } from '../contexts/CitiesContext';
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom';

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({city}) {
    const {currentCity, deleteCity, getFlag} = useCities();
    const {cityName, emoji, date, id, position} = city;

    function handleClick(e) {
        e.preventDefault();
        deleteCity(id);
    }

    return ( 
        <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem-active'] : ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
            <span className={styles.emoji}>{getFlag(emoji)}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>({formatDate(date)})</time>
            {/* <button className={styles.deleteBtn} onClick={handleClick}>&times;</button> */}
        </Link>
    )
}

export default CityItem;
