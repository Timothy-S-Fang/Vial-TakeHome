import { Container } from '@mantine/core';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <div className={classes.logoContainer}>
            <img src="/vial-logo.svg" alt="logo" className={classes.logo} />
        </div>
      </Container>
    </header>
  );
}

export default Header;