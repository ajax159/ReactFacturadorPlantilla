import React from 'react'
import { Card, Flex, Metric, ProgressBar, Text } from '@tremor/react';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <Card className="max-w-xs mx-auto">
    <Text>Facturas</Text>
    <Metric>$100000</Metric>
    <Flex className="mt-4">
        <Text>32% of annual target</Text>
        <Text>$9999</Text>
    </Flex>
    <ProgressBar value={50} className="mt-2" />
  </Card>
  );

}

export default Home