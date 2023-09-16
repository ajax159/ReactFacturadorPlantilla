import { Card, Flex, Metric, ProgressBar, Text } from '@tremor/react';
import React from 'react'

export const CardBase = () => {
  return (
    <Card className="max-w-xs mx-auto">
        <Text>Facturas</Text>
        <Metric>$100000</Metric>
        <Flex className="mt-4">
            <Text>32% of annual target</Text>
            <Text>$9999</Text>
        </Flex>
        <ProgressBar Value={50} className="mt-2" />
    </Card>
  )
}

export default CardBase;
