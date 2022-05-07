import React, {useContext} from 'react'
import { Paper, Stack, Title, Grid, Text, Center, Box, Divider } from '@mantine/core';
import DummyData from '../utils/DummyData'
import { shortenAddress } from '../utils/shorternAddress'
import { TransactionContext } from '../context/TransactionsContext'

const TransactionCard = ({id, url, message, timestamp, addressFrom, amount, addressTo }) => {
  return(
    <Grid.Col md={3} sm={4} xs={4}>
      <Paper shadow="md" radius="md" p="lg">
        <Text size='md'>From: <Text component="span" weight={600}>{shortenAddress(addressFrom)}</Text></Text>
        <Text size='md'>To: <Text component="span" weight={600}>{shortenAddress(addressTo)}</Text></Text>
        <Text size='md'>Amount: <Text component="span" weight={600}>{amount} ETH</Text></Text>
        <Divider my="sm" />
        <Text size='md' color="red" weight={600} >{timestamp}</Text>
      </Paper>
    </Grid.Col>
  )
}

export default function Transactions() {
    const {currentAccount, transactions} = useContext(TransactionContext);
    return (
      <Stack>
          <Title order={5}>
              Latest Transactions
          </Title>
          {!currentAccount ? <Title order={6}>Connect</Title> :
          <Grid>
            {transactions.reverse().map((transaction, i) =>{
              return <TransactionCard key={i} {...transaction} />
            })}
          </Grid>
          }
      </Stack>
    )
}
