import React, { useContext } from 'react'
import { Group, Title, Stack, Paper, NumberInput, Button, TextInput, MediaQuery } from '@mantine/core'
import { useForm } from '@mantine/form';
import Transactions from '../components/Transactions';
//import {  } from "react-icons/bi";

import { TransactionContext } from '../context/TransactionsContext';

export default function Home() {
  const {connectWallet, currentAccount, sendTransaction, loading} = useContext(TransactionContext);
  const form = useForm({
    initialValues: {
      address: '',
      amount: '',
      keyword: '',
      message: '',
    },

    validate:{
      amount: (value) => typeof(value) === 'number' ? null : 'Enter only the amount (without ETH)'
    },
  });

  const handleSubmit = (values) =>{
    console.log(values)
    sendTransaction(values)
  }

  return (
    <Stack>
      <MediaQuery
        query="(max-width: 600px)"
        styles={{ flexDirection: 'column'}}
      >
        <Group spacing='lg' my={40} grow position='center'>
          <MediaQuery
            query="(max-width: 600px)"
            styles={{width: '80%', maxWidth: '80%', textAlign: 'center' }}
          >
            <Stack>
              <Title order={3}>
                Send Crypto from <br />Anywhere <br /> to<br />Anyone
              </Title>
              {!currentAccount &&
                <Button onClick={connectWallet} sx={{width: '60%'}}>
                  Connect Wallet
                </Button>
              }
            </Stack>
          </MediaQuery>
          <MediaQuery
            query="(max-width: 600px)"
            styles={{width: '80%', maxWidth: '80%'}}
          >
            <Paper shadow="md" radius="md" p="lg">
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                  {currentAccount &&
                  <TextInput
                    placeholder={currentAccount}
                    label="Your Account"
                    radius="md"
                    disabled
                  />
                  }
                  <TextInput
                    placeholder="Recipient"
                    label="Recipient"
                    description="Get the public key of the recipient"
                    radius="md"
                    required
                    {...form.getInputProps('address')}
                  />
                  <NumberInput
                    placeholder="1.035"
                    label="Amount (in ETH)"
                    required
                    hideControls
                    min={0}
                    precision={4}
                    {...form.getInputProps('amount')}
                  />
                  <TextInput
                    placeholder="Keyword"
                    label="Keyword"
                    radius="md"
                    required
                    {...form.getInputProps('keyword')}
                  />
                  <TextInput
                    placeholder="Here is your lunch money"
                    label="Message"
                    radius="md"
                    {...form.getInputProps('message')}
                  />
                  <Button loading={loading} variant='outline' type="submit">Send Now</Button>
                </Stack>
              </form>
            </Paper>
          </MediaQuery>
        </Group>
      </MediaQuery>
      <Transactions />
    </Stack>
  )
}
