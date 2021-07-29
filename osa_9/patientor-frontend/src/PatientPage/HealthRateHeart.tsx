import React from 'react';
import { Icon } from 'semantic-ui-react';
import { HealthCheckRating } from '../types';

const HealthRateHeart = ({ healthrating }: {healthrating: HealthCheckRating}): JSX.Element => {
    switch(healthrating) {
        case 1: {
            return <Icon name="heart" size="large" color="yellow"  />;
        }
        case 2: {
            return <Icon name="heart" size="large" color="orange"  />;
        }
        case 3: {
            return <Icon name="heart" size="large" color="red"  />;
        }
        default: {
            return <Icon name="heart" size="large" color="green"  />;
        }
    }
};

export default HealthRateHeart;