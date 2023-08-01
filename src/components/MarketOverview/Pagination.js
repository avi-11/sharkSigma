import React from 'react';
import styles from './Pagination.module.css';
import NextPage from './assets/NextPage.svg';
import PreviousPage from './assets/PreviousPage.svg';

function Pagination({nextPage, previousPage, numberOfPages, currentPage}) {
    return (
        <div className={styles.pagination}>
            <div className={styles.pagination__pageNumber}>
                <p>Page <span>{currentPage}</span> of {numberOfPages}</p>
            </div>

            <div className={styles.pagination__buttons}>
                <button onClick={previousPage}><img src={PreviousPage} alt=""/></button>

                <button onClick={nextPage}><img src={NextPage} alt=""/></button>
            </div>
        </div>
    )
}

export default Pagination;