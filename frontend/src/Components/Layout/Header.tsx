import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
        <div className={classes.logoContainer}>
            <img src="/vial-logo.svg" alt="logo" className={classes.logo} />
        </div>
    </header>
  );
}

export default Header;