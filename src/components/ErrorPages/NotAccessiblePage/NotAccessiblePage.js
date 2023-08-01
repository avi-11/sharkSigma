import React from 'react';
import styles from './NotAccessiblePage.module.css';

function NotAccessiblePage() {
    return (
        <div className={styles.notAccessiblePage}>
            <h1>You are not authorized to access this page!</h1>
        </div>
    )
}

export default NotAccessiblePage
