import { useParams } from "react-router-dom";
import PageNav from "../components/PageNav"
import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";
import styles from "./DashboardTab.module.css";
import BackButton from "../components/BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function DashboardTab() {
    const {currentCity, getCity, getFlag, isLoading} = useCities();
    const {id} = useParams();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(function() {
        getCity(id);
    }, [id]);

    function handleFavorite() {

    }

    const { cityName, emoji, date, notes, population,language, currency, timezone, weather } = currentCity;

    return (
       <div className={styles.homepage}>
            <PageNav />
            <section>
            <div>
                <BackButton />
            </div>

            <div className={styles.city}>
                <div className={styles.row}>
                    <h6>City name</h6>
                    <span>{emoji ? getFlag(emoji) : ""}</span>
                    <h3>
                     {cityName}
                    </h3>
                </div>

                <div className={styles.row}>
                    <h6>You went to {cityName} on</h6>
                    <p>{formatDate(date || null)}</p>
                </div>

                {notes && (
                    <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{notes}</p>
                    </div>
                )}

                <div className={styles.row}>
                    <h6>Learn more</h6>
                    <a
                    href={`https://en.wikipedia.org/wiki/${cityName}`}
                    target="_blank"
                    rel="noreferrer"
                    >
                    Check out {cityName} on Wikipedia &rarr;
                    </a>
                </div>
                </div>
            

            </section>
      </div>
    )
}

export default DashboardTab
