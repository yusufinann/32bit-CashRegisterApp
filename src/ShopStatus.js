import React from 'react';
import { useStoreStatus } from './contexts/StoreStatusContext';
import { FiberManualRecord as FiberManualRecordIcon } from '@mui/icons-material';

const ShopStatus = ({t}) => {
    const { isOnline } = useStoreStatus();

    // Çevrimiçi ve çevrimdışı durumlar için stil belirleme
    const statusStyle = {
        display: 'flex',
        alignItems: 'center',
        
    };

    // Yuvarlak simge stili
    const iconStyle = {
        marginRight: '5px',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
    };

    // Çevrimiçi ve çevrimdışı durumlar için ikon belirleme
    const icon = isOnline ? <FiberManualRecordIcon style={{ ...iconStyle, color: 'green' }} /> : <FiberManualRecordIcon style={{ ...iconStyle, color: 'red' }} />;

    return (
        <div style={statusStyle}>
            {icon}
            {isOnline ? t('online') : t('offline')}
        </div>
    );
};

export default ShopStatus;
