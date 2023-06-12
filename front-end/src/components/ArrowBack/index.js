import { useNavigate } from 'react-router-dom';

import styles from './styles.module.css';

const ArrowBack = () => {
    const navigate = useNavigate();

    return (
        <i className={`material-symbols-outlined ${styles.return}`} onClick={() => navigate('/admin')}>arrow_back</i>
    )
};

export default ArrowBack;