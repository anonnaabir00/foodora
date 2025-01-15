// components/MenuSkeleton.js
import { Skeleton } from 'antd';

export default function MenuSkeleton() {
    return (
        <div className="container">
            {/* Skeleton for Restaurant Details */}
            <div className="food-box">
                <div className="container food-box-inner">
                    <div className="food-content">
                        <div className="col-md-8 food-item">
                            <Skeleton.Image active style={{ width: '70px', height: '70px' }} />
                            <Skeleton active paragraph={{ rows: 1 }} style={{
                                marginLeft: '10px',
                                marginTop: '10px'
                            }} />
                        </div>
                        <div className="col-md-4 food-rank-time">
                            <Skeleton active paragraph={{ rows: 1 }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Skeleton for Menu Tabs */}
            <div className="foot-types">
                <div className="container foot-type-inner">
                    <Skeleton active paragraph={{ rows: 1 }} />
                </div>
            </div>

            {/* Skeleton for Menu Items */}
                <div className="row">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="col-md-4 item-details" style={{ marginBottom: '1.5rem', marginRight: '1rem' }}>
                            <div style={{ display: 'flex' }}>
                                <Skeleton.Image active style={{
                                    width: '111px',
                                    height: '111px',
                                    marginRight: '15px'
                                }} />
                                <Skeleton active paragraph={{ rows: 2 }} style={{ flex: 1 }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
}