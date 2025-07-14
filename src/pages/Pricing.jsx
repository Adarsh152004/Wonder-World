import styles from './Product.module.css'
import PageNav from '../components/PageNav'

function Pricing() {
    return (
        <main className={styles.product}>
            <PageNav />
            <section>
                <div>
                    <h2>
                        Simple pricing.
                        <br />
                        Just 1000rs/month.
                    </h2>
                              <p>
                                Capture your wanderlust on a living map that grows with every trip you take. Whether it's a solo backpacking trip through Europe or a family vacation to the coasts of Goa, mark each memory with pride.
                            </p>
                </div>
               <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
            </section>
        </main>
    )
}

export default Pricing
