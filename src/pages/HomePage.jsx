import { Link} from 'react-router-dom'
import styles from './HomePage.module.css'
import PageNav from '../components/PageNav'

function HomePage() {
    return (
        <main className={styles.homepage}> 
           <PageNav />

                 <section>
      <h1>
        Every pin tells a story.
        <br />
        Let your journey leave a mark with WonderWorld.
      </h1>

        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>

        <Link to='/login' className="cta">Start tracking now</Link>
         </section>
        </main>
    )
}

export default HomePage
