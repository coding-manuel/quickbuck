import React from 'react';
import { createStyles, Container, Group, ActionIcon, Footer } from '@mantine/core';
import Logo from '../assets/logo.svg';

const useStyles = createStyles((theme) => ({
  footer: {
    position: 'initial',
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export default function FooterComp() {
  const { classes } = useStyles();

  return (
    <Footer className={classes.footer}>
      <Container size='lg' className={classes.inner}>
        <img style={{height: 40}} src={Logo} alt="" />
        <Group spacing={0} className={classes.links} position="right" noWrap>
        </Group>
      </Container>
    </Footer>
  );
}
