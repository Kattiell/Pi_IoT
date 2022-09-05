import styles from './styles.module.css';

export default function Button({ backgroundColor, color, circleTopIcon, children }) {

    return <div id={styles.container}>
        {circleTopIcon}
        <button>
            {children}
        </button>
    </div>

}