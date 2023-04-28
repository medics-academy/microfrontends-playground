import { Text, Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <Flex gap="1rem" direction="column">
            <Text>
                {/*
          I use this little customization to differentiate
          between app-1 and app-2
        */}
                Add by one each click <strong>APP-1</strong>
            </Text>
            <Text>Your click count : {count} </Text>

            {/*
        I use this little customization to differentiate
        between app-1 and app-2
      */}
            <Button onClick={() => setCount(count + 1)}>Click me</Button>
        </Flex>
    );
};

export default Counter;
