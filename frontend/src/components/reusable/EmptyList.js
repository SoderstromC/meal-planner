import React from 'react';
import Lottie from 'lottie-react';
import loading from 'lotties/empty-list';

const EmptyList = () => <Lottie animationData={loading} loop />;

export default EmptyList;