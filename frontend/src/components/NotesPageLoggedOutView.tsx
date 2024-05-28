import React from 'react';
import styles from "../styles/utils.module.css"


const NotesPageLoggedOutView = () => {
   
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Welcome to NotesApp</h1>
            <p className={styles.paragraph}>Log in to create and manage your notes in your personal space.</p>
        </div>
    );
}

export default NotesPageLoggedOutView;
